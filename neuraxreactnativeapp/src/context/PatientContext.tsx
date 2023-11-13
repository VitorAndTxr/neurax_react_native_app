import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import AccountService from '../services/AccountService';
import { Buffer } from "buffer";
import { useAuthContext } from '../../framework/auth/AuthContextProvider';
import TokenService from '../../framework/auth/TokenService';
import PatientService from '../services/PatientService';
import { PatientListViewModel } from '../domain/models/PatientListViewModel';
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

    return (
        <>
            <PatientContext.Provider value={{
            }}>
                {props.children}
            </PatientContext.Provider>
        </>
    );
}

export function useTherapistContext() {
    return useContext(PatientContext);
}
interface PatientContextData {

}

