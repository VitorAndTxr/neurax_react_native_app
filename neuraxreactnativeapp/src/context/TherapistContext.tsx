import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import AccountService from '../services/AccountService';
import { Buffer } from "buffer";
import { useAuthContext } from '../../framework/auth/AuthContextProvider';
import TokenService from '../../framework/auth/TokenService';
import PatientService from '../services/PatientService';
import { PatientListViewModel } from '../domain/models/PatientListViewModel';
import { PatientViewModel } from '../domain/models/PatientViewModel';

const patientService = new PatientService();


const TherapistContext = createContext({} as TherapistContextData);
interface TherapistContextProviderProps {
    children: ReactNode;
}

export function TherapistContextProvider(props: TherapistContextProviderProps) {

    const [patients, setPatients] = useState<PatientListViewModel[]>([])

    
    const [selectedPatient, setSelectedPatient] = useState<PatientViewModel>({} as PatientViewModel);

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

    function getPatientById(guid: string){

        patientService.getPatientById(guid)
        .then((response)=>{
            if(response?.success){
                console.log(response.result)
                setSelectedPatient(response.result)
            }
        })
        .catch((response)=>{

        })
    }
    
    const [patientId, setPatientId] = useState('');
    useEffect(()=>{
        console.log("setou paciente id");
        console.log(patientId);
        if(patientId != ''){
            console.log("chama update paciente");
            getPatientById(patientId);
        }
        
    },[patientId])

    return (
        <>
            <TherapistContext.Provider value={{
                patients, patientId, setPatientId, selectedPatient

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

  patientId:string;
  setPatientId: React.Dispatch<React.SetStateAction<string>>;
  selectedPatient: PatientViewModel;
}
