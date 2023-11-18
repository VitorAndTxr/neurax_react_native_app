import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import AccountService from '../services/AccountService';
import { Buffer } from "buffer";
import { useAuthContext } from '../../framework/auth/AuthContextProvider';
import TokenService from '../../framework/auth/TokenService';
import PatientService from '../services/PatientService';
import { PatientListViewModel } from '../domain/models/ListViewModel';
import { PatientViewModel } from '../domain/models/PatientViewModel';
import { useStackNavigatorContext } from '../routes/StackNavigatorProvider';

const patientService = new PatientService();


const PatientContext = createContext({} as PatientContextData);
interface PatientContextProviderProps {
    children: ReactNode;
}

export function PatientContextProvider(props: PatientContextProviderProps) {

    const {getDecodedToken} = useAuthContext();
    const {push, pop} = useStackNavigatorContext();

    const [patientId, setPatientId] = useState('');

    useEffect(()=>{
        getDecodedToken().then((result) => {
            if(result?.sub != undefined){
                patientService.getPatientIdByAccountId(result?.sub)
                .then((response)=>{
                    if(response?.success){
                        setPatientId(response.result)
                    }
                })
                .catch((response)=>{
        
                })
            }
            
        })
    },[])

    return (
        <>
            <PatientContext.Provider value={{ patientId, setPatientId
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
}

