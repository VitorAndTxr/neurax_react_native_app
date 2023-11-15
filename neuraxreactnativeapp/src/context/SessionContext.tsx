import React, { useEffect, useState } from "react";
import { ReactNode, createContext, useContext } from "react";
import { SessionParametersViewModel, SessionViewModel } from "../domain/models/SessionParametersViewModel";
import { SessionSegmentViewModel } from "../domain/models/SessionSegmentViewModel";
import { PatientViewModel } from "../domain/models/PatientViewModel";
import { SessionSegmentStatusEnum } from "../domain/enum/SessionSegmentStatusEnum";
import { SessionStateEnum } from "../domain/enum/SessionStateEnum";
import { useAuthContext } from "../../framework/auth/AuthContextProvider";
import { UserProfileEnum } from "../../framework/domain/enum/UserProfileEnum";
import { useBackHandler } from "@react-native-community/hooks";
import { useStackNavigatorContext } from "../routes/StackNavigatorProvider";
import { Alert, BackHandler } from "react-native";

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

    const {pop} = useStackNavigatorContext()

    const [sessionState, setSessionState] = useState<SessionStateEnum>(SessionStateEnum.ConfiguringStimulus);

    const [repetitions, setRepetitions] = useState<SessionSegmentViewModel[]>([]);

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
                setSessionState(SessionStateEnum.ConfiguringStimulus)
                break;
            default:
                break;
        }
    },[])

    function addInitialWristMeasurement(amplitude:number){
        setSession(
            current =>{
                return{
                    ...current,
                    startWristAmplitudeMeasurement:amplitude
                }
            }
        )
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
    
    
    function addRepetition(intensity:number, difficulty:number){

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

        //mandar requisição bluetooth

        setSessionState(SessionStateEnum.Stimuling)
    }

    function cancelRepetition(){
        setRepetitions(currentRepetitions =>{
            let repetitions = [...currentRepetitions]

            repetitions[repetitions.length-1].status = SessionSegmentStatusEnum.Canceled

            return repetitions
        })
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

    addRepetition:(intensity:number, difficulty:number)=>void
    cancelRepetition:()=>void
    emergencyStopRepetition:()=>void
    cancelSession:()=>void

    addInitialWristMeasurement:(amplitude:number)=>void
    addFinalWristMeasurement:(amplitude:number)=>void
}