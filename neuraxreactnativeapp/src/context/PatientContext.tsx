import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from '../../framework/auth/AuthContextProvider';
import PatientService from "../services/PatientService";
import { useStackNavigatorContext } from '../routes/StackNavigatorProvider';
import { PatientViewModel } from '../domain/models/PatientViewModel';

const patientService = new PatientService();


const PatientContext = createContext({} as PatientContextData);
interface PatientContextProviderProps {
    children: ReactNode;
}

export function PatientContextProvider(props: PatientContextProviderProps) {

    const {getDecodedToken} = useAuthContext();
    const {push, pop} = useStackNavigatorContext();

    const [patientId, setPatientId] = useState('');
    const [patient, setPatient] = useState<PatientViewModel|null>(null);


    useEffect(()=>{
        getDecodedToken().then((result) => {
            if(result?.sub != undefined){
                patientService.getPatientIdByAccountId(result?.sub)
                .then((response)=>{
                    if(response?.success){
                        setPatientId(response.result)

                        patientService.getPatientById(response.result).then(
                            (getPatientResponse) => {
                                if(getPatientResponse?.success){
                                    setPatient(getPatientResponse.result)
                                }
                            }
                        )
                    }
                })
                .catch((response)=>{
        
                })
            }
            
        })
    },[])

    return (
        <>
            <PatientContext.Provider value={{ 
                patientId, setPatientId,

                patient, setPatient
            }}>
                {props.children}
            </PatientContext.Provider>
        </>
    );
}

export function usePatientContext() {
    return useContext(PatientContext);
}
interface PatientContextData {
  patientId:string;
  setPatientId: React.Dispatch<React.SetStateAction<string>>;

  patient:PatientViewModel|null
  setPatient:React.Dispatch<React.SetStateAction<PatientViewModel|null>>;
}

