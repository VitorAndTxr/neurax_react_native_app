import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import AccountService from '../services/AccountService';
import { Buffer } from "buffer";
import { useAuthContext } from '../../framework/auth/AuthContextProvider';
import TokenService from '../../framework/auth/TokenService';
import PatientService from '../services/PatientService';
import { PatientListViewModel } from '../domain/models/PatientListViewModel';

const patientService = new PatientService();


const PatientListScreenContext = createContext({} as PatientListScreenContextData);
interface PatientListScreenContextProviderProps {
    children: ReactNode;
}

export function PatientListScreenContextProvider(props: PatientListScreenContextProviderProps) {

    const [patients, setPatients] = useState<PatientListViewModel[]>([])

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
            <PatientListScreenContext.Provider value={{
                patients
            }}>
                {props.children}
            </PatientListScreenContext.Provider>
        </>
    );
}

export function usePatientListScreenContext() {
    return useContext(PatientListScreenContext);
}
interface PatientListScreenContextData {
    patients: PatientListViewModel[];
}
