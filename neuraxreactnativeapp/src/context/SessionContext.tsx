import React, { useEffect, useState } from "react";
import { ReactNode, createContext, useContext } from "react";
import { SessionParametersViewModel, SessionViewModel } from "../domain/models/SessionParametersViewModel";
import { SessionSegmentViewModel } from "../domain/models/SessionSegmentViewModel";
import { PatientViewModel } from "../domain/models/PatientViewModel";
import { SessionSegmentStatusEnum } from "../domain/enum/SessionSegmentStatusEnum";
import { SessionStateEnum } from "../domain/enum/SessionStateEnum";
import { useAuthContext } from "../../framework/auth/AuthContextProvider";
import { UserProfileEnum } from "../../framework/domain/enum/UserProfileEnum";
import { useStackNavigatorContext } from "../routes/StackNavigatorProvider";
import { StimulatingModalState } from "../components/Session/StimulatingModalState";
import TherapistService from "../services/TherapistService";
import PatientService from "../services/PatientService";
import { NeuraXBluetoothProtocolBodyPropertyEnum, useBluetoothContext } from "./BluetoothContext";
import SessionService from "../services/SessionService";
import { ToastAndroid } from "react-native";
import SegmentService from "../services/SegmentService";


const therapistService = new TherapistService();

const patientService = new PatientService();

const sessionService = new SessionService();

const segmentService = new SegmentService();



const SessionContext = createContext({} as SessionContextData)


interface SessionContextProviderProps {
    children: ReactNode;
    sessionParameters: SessionParametersViewModel
    patient:PatientViewModel
}

export function SessionContextProvider({
    children,
    sessionParameters,
    patient
}: SessionContextProviderProps) {

    const { userProfile } = useAuthContext()

    const { pop } = useStackNavigatorContext()

    const {
        setFesParams, 
        wristAmplitude,
        sendFesParams,
        startSession,
        stopSession,
        resumeSession,
        pauseSession
    } = useBluetoothContext()

    const [sessionState, setSessionState] = useState<SessionStateEnum>(SessionStateEnum.ConfiguringStimulus);

    const [stimulatingTimeout, setStimulatingTimeout] = useState<NodeJS.Timeout|null>(null);


    const [repetitions, setRepetitions] = useState<SessionSegmentViewModel[]>([]);

    const [difficulty, setDifficulty] = useState(1);

    const [intensity, setIntensity] = useState(1);

    const [showStimulationModal, setShowStimulationModal] = useState(false);
    const [showConfirmExitModal, setShowConfirmExitModal] = useState(false);


    const [stimulationModalState, setStimulationModalState] = useState(StimulatingModalState.Instructions);

    const [session, setSession] = useState<SessionViewModel>({
        startWristAmplitudeMeasurement:0,
        finishWristAmplitudeMeasurement:0,
        id:''
    });

    useEffect(()=>{        
        switch(userProfile){
            case UserProfileEnum.Patient:
                setSessionState(SessionStateEnum.SendPhoto)
                break;
            case UserProfileEnum.Theraphist:
                setSessionState(SessionStateEnum.MeasureWrist)
                break;
            default:
                break;
        }
    },[])

    function patientCreateSession(){

    }

    async function therapistAddInitialWristMeasurement(amplitude:number){
        try {
            let response = await therapistService.createSession({
                patientId:patient.id,
                wristAmplitudeMeasurement:amplitude
            })            
            if(response?.success){
                setSession(response.result)
                setSessionState(SessionStateEnum.ConfiguringStimulus)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function addInitialWristMeasurement(amplitude:number){
        switch(userProfile){
            case UserProfileEnum.Patient:
                setSessionState(SessionStateEnum.SendPhoto)
                break;
            case UserProfileEnum.Theraphist:
                await therapistAddInitialWristMeasurement(amplitude)
                break;
            default:
                break;
        }
        setFesParams({
            [NeuraXBluetoothProtocolBodyPropertyEnum.AMPLITUDE]:            patient.parameters.amplitude,
            [NeuraXBluetoothProtocolBodyPropertyEnum.FREQUENCY]:            patient.parameters.frequency,
            [NeuraXBluetoothProtocolBodyPropertyEnum.PULSE_WIDTH]:          patient.parameters.minPulseWidth,
            [NeuraXBluetoothProtocolBodyPropertyEnum.DIFFICULTY]:           difficulty,
            [NeuraXBluetoothProtocolBodyPropertyEnum.STIMULI_DURATION]:     patient.parameters.stimulationTime
        })
    }

    async function addFinalWristMeasurement(amplitude:number){

        let response = await sessionService.finishSession({
            sessionId:session.id,
            wristAmplitudeMeasurement:amplitude
        })

        console.log('addFinalWristMeasurement:',response);
        
        setSession(
            current =>{
                return{
                    ...current,
                    finishWristAmplitudeMeasurement:amplitude
                }
            }
        )
        pop()
    }
    
    
    function addRepetition(){

        let pulseWidth = patient.parameters.minPulseWidth+((patient.parameters.maxPulseWidth-patient.parameters.minPulseWidth)/9)*(intensity-1)

        setFesParams(current =>{

            current[NeuraXBluetoothProtocolBodyPropertyEnum.DIFFICULTY] = difficulty
            current[NeuraXBluetoothProtocolBodyPropertyEnum.PULSE_WIDTH] = Math.round(pulseWidth)

            return current
        })

        sendFesParams(5)
        setStimulationModalState(StimulatingModalState.Instructions)
        setShowStimulationModal(true)
    }

    async function startRepetition(){
        try {
            let response = await sessionService.addSessionSegment({
                sessionId:session.id,
                difficulty:difficulty,
                intensity:intensity
            })
            
            if(response?.success){
                if(repetitions.length ===0){
                    await startSession()
                }
                else{
                    await resumeSession()
                }
        
                setRepetitions(currentRepetitions =>{
                    let repetitions = [...currentRepetitions]
        
                    let newRepetition:SessionSegmentViewModel = {
                        id:response!.result.id,
                        intensity:intensity,
                        difficulty:difficulty,
                        status:SessionSegmentStatusEnum.Untriggered
                    }
        
                    repetitions.push(newRepetition)            
        
                    return repetitions
                })
                // mandar requisição pra ESP
        
                setStimulationModalState(StimulatingModalState.WaitingTrigger)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function cancelRepetition(){
        setShowStimulationModal(false)
        setSessionState(SessionStateEnum.ConfiguringStimulus)

    }

    async function emergencyStopRepetition(){
        if(stimulatingTimeout){
            clearTimeout(stimulatingTimeout)
            setStimulatingTimeout(null)
        }



        await pauseSession()

        setRepetitions(currentRepetitions =>{
            let repetitions = [...currentRepetitions]

            repetitions[repetitions.length-1].status = SessionSegmentStatusEnum.EmergencyStop

            return repetitions
        })
        ToastAndroid.show('Parada de emergência solicitada', ToastAndroid.CENTER);
        
        setSessionState(SessionStateEnum.ConfiguringStimulus)
        setShowStimulationModal(false)
        segmentService.emergencyStop(repetitions[repetitions.length-1].id)
        
    }
    
    function cancelSession(){
        pop()
    }

    function finishSession(){
        stopSession()
        setSessionState(SessionStateEnum.MeasureWrist)
    }
    return (
        <>
            <SessionContext.Provider value={{
                sessionParameters,
                patient,

                sessionState, setSessionState,
                repetitions, setRepetitions,
                session, setSession,
                difficulty, setDifficulty,
                intensity, setIntensity,
                showStimulationModal, setShowStimulationModal,
                stimulationModalState, setStimulationModalState,
                stimulatingTimeout, setStimulatingTimeout,
                showConfirmExitModal, setShowConfirmExitModal,

                addInitialWristMeasurement,
                addFinalWristMeasurement,
                addRepetition,
                startRepetition,
                cancelRepetition,
                emergencyStopRepetition,
                cancelSession,

                finishSession

            }}>
                {
                    children
                }
            </SessionContext.Provider>
        </>
    )
}

export function useSessionContext() {
    return useContext(SessionContext);
}

interface SessionContextData {
    sessionParameters: SessionParametersViewModel
    patient:PatientViewModel

    sessionState:SessionStateEnum
    setSessionState:React.Dispatch<React.SetStateAction<SessionStateEnum>>

    repetitions:SessionSegmentViewModel[]
    setRepetitions:React.Dispatch<React.SetStateAction<SessionSegmentViewModel[]>>

    session:SessionViewModel
    setSession:React.Dispatch<React.SetStateAction<SessionViewModel>>

    difficulty:number
    setDifficulty:React.Dispatch<React.SetStateAction<number>>

    intensity:number
    setIntensity:React.Dispatch<React.SetStateAction<number>>

    showStimulationModal:boolean
    setShowStimulationModal:React.Dispatch<React.SetStateAction<boolean>>

    showConfirmExitModal:boolean 
    setShowConfirmExitModal:React.Dispatch<React.SetStateAction<boolean>>

    stimulationModalState:StimulatingModalState
    setStimulationModalState:React.Dispatch<React.SetStateAction<StimulatingModalState>>

    stimulatingTimeout:NodeJS.Timeout|null
    setStimulatingTimeout:React.Dispatch<React.SetStateAction<NodeJS.Timeout|null>>

    addRepetition:()=>void
    startRepetition:()=>Promise<void>

    cancelRepetition:()=>void
    emergencyStopRepetition:()=>void
    cancelSession:()=>void

    finishSession:()=>void

    addInitialWristMeasurement:(amplitude:number)=>Promise<void>
    addFinalWristMeasurement:(amplitude:number)=>Promise<void>
}