import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import AccountService from '../services/AccountService';
import { Buffer } from "buffer";
import { useAuthContext } from '../../framework/auth/AuthContextProvider';
import TokenService from '../../framework/auth/TokenService';
import PatientService from '../services/PatientService';
import { PatientListViewModel } from '../domain/models/PatientListViewModel';

const patientService = new PatientService();


const TherapistContext = createContext({} as TherapistContextData);
interface TherapistContextProviderProps {
    children: ReactNode;
}

export function TherapistContextProvider(props: TherapistContextProviderProps) {

    const [patients, setPatients] = useState<PatientListViewModel[]>([])

    const [selectedPatient, setSelectedPatient] = useState('')

    useEffect(()=>{
        getPatients()
    },[])

    useEffect(()=>{
        //codigo
    },[selectedPatient])

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
            <TherapistContext.Provider value={{
                patients
            }}>
                {props.children}
            </TherapistContext.Provider>
        </>
    );
}

export function useTherapistContext() {
    return useContext(TherapistContext);
}
interface TherapistContextData {
    patients: PatientListViewModel[];

    selectedPatient:string;
    selectedPatient: React.Dispatch<React.SetStateAction<string>>;
}
