import React, { useState } from "react";
import { ReactNode, createContext, useContext } from "react";
import { SessionParametersViewModel } from "../domain/models/SessionParametersViewModel";
import { SessionSegmentViewModel } from "../domain/models/SessionSegmentViewModel";
import { PatientViewModel } from "../domain/models/PatientViewModel";
import { SessionSegmentStatusEnum } from "../domain/enum/SessionSegmentStatusEnum";

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

    const [sessionState, setSessionState] = useState<SessionStateEnum>(SessionStateEnum.MeasureWrist);

    const [repetitions, setRepetitions] = useState<SessionSegmentViewModel[]>([]);
    
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
    }

    return (
        <>
            <SessionContext.Provider value={{

            }}>
                {
                    children
                }
            </SessionContext.Provider>
        </>
    )
}

enum SessionStateEnum{
    MeasureWrist,
    SendPhoto,
    ConfiguringStimulus,
    Stimuling
}

export function useSessionContext() {
    return useContext(SessionContext);
}

interface SessionContextData {

}