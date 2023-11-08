import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import AccountService from '../services/AccountService';
import { Buffer } from "buffer";
import { useAuthContext } from '../../framework/auth/AuthContextProvider';
import TokenService from '../../framework/auth/TokenService';
import PatientService from '../services/PatientService';
import { PatientListViewModel } from '../domain/models/PatientListViewModel';

const patientService = new PatientService();


const PatientListScreenContext = createContext({} as PatientListScreenContext);
interface PatientListScreenContextProviderProps {
    children: ReactNode;
}

export function PatientListScreenContextProvider(props: PatientListScreenContextProviderProps) {

    const [patients, setPatients] = useState<PatientListViewModel[]>({} as any)

    useEffect(()=>{
        getPatients()
    },[])

    function getPatients(){

        patientService.getPatients()
        .then((response)=>{
            if(response?.success){
                setPatients(response.result)
            }
    
        })
        .catch((response)=>{

        })
    }


    return (
        <>
            <PatientListScreenScreenContext.Provider value={{
                patients
            }}>
                {props.children}
            </PatientListScreenScreenContext.Provider>
        </>
    );
}

export function usePatientListScreenContext() {
    return useContext(PatientListScreenContext);
}
interface PatientListScreenContextData {
    patients: PatientListViewModel[];
}
