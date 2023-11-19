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


const therapistService = new TherapistService();

const patientService = new PatientService();

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
        wristAmplitude
    } = useBluetoothContext()

    const [sessionState, setSessionState] = useState<SessionStateEnum>(SessionStateEnum.ConfiguringStimulus);

    const [repetitions, setRepetitions] = useState<SessionSegmentViewModel[]>([]);

    const [difficulty, setDifficulty] = useState(1);

    const [intensity, setIntensity] = useState(1);

    const [showStimulationModal, setShowStimulationModal] = useState(false);

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

    function addFinalWristMeasurement(amplitude:number){
        setSession(
            current =>{
                return{
                    ...current,
                    finishWristAmplitudeMeasurement:amplitude
                }
            }
        )
    }
    
    
    function addRepetition(){


        setRepetitions(currentRepetitions =>{
            let repetitions = [...currentRepetitions]

            let newRepetition:SessionSegmentViewModel = {
                intensity:intensity,
                difficulty:difficulty,
                status:SessionSegmentStatusEnum.Untriggered
            }

            repetitions.push(newRepetition)            

            return repetitions
        })

        //mandar requisição bluetooth de configuração pro bluetooth
        setStimulationModalState(StimulatingModalState.Instructions)
        setShowStimulationModal(true)
    }

    function cancelRepetition(){
        setRepetitions(currentRepetitions =>{
            let repetitions = [...currentRepetitions]

            repetitions[repetitions.length-1].status = SessionSegmentStatusEnum.Canceled

            return repetitions
        })
        setShowStimulationModal(false)
        setSessionState(SessionStateEnum.ConfiguringStimulus)
    }

    function emergencyStopRepetition(){
        setRepetitions(currentRepetitions =>{
            let repetitions = [...currentRepetitions]

            repetitions[repetitions.length-1].status = SessionSegmentStatusEnum.EmergencyStop

            return repetitions
        })
        setSessionState(SessionStateEnum.ConfiguringStimulus)
    }
    

    function cancelSession(){
        pop()
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

                addInitialWristMeasurement,
                addFinalWristMeasurement,
                addRepetition,
                cancelRepetition,
                emergencyStopRepetition,
                cancelSession

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

    stimulationModalState:StimulatingModalState
    setStimulationModalState:React.Dispatch<React.SetStateAction<StimulatingModalState>>

    addRepetition:()=>void
    cancelRepetition:()=>void
    emergencyStopRepetition:()=>void
    cancelSession:()=>void

    addInitialWristMeasurement:(amplitude:number)=>Promise<void>
    addFinalWristMeasurement:(amplitude:number)=>void
}