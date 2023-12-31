import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from '../../framework/auth/AuthContextProvider';
import TherapistService from "../services/TherapistService";
import PatientService from "../services/PatientService";

import { PatientListViewModel, SessionListViewModel } from '../domain/models/ListViewModel';
import { PatientViewModel } from '../domain/models/PatientViewModel';
import { useStackNavigatorContext } from '../routes/StackNavigatorProvider';
import { SessionViewModel } from '../domain/models/SessionViewModel';

const patientService = new PatientService();
const therapistService = new TherapistService();



const TherapistContext = createContext({} as TherapistContextData);
interface TherapistContextProviderProps {
    children: ReactNode;
}

export function TherapistContextProvider(props: TherapistContextProviderProps) {

    const [showDeletePatientModal, setShowDeletePatientModal] = useState(false);

    const [showPatientSessionParameterModal, setShowPatientSessionParameterModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const {getDecodedToken} = useAuthContext();
    const {push, pop} = useStackNavigatorContext();
    const [patients, setPatients] = useState<PatientListViewModel[]>([])
    const [sessions, setSessions] = useState<SessionListViewModel[]>([])

    
    const [selectedPatient, setSelectedPatient] = useState<PatientViewModel>({} as PatientViewModel);
    const [selectedSession, setSelectedSession] = useState<SessionViewModel>({} as SessionViewModel);

    const [patientId, setPatientId] = useState('');

    const [patientForm, setPatientForm] = useState<PatientFormBody>({
        id:'',
        therapistId: '',
        birthDate: undefined,
        [PatientFormPropertyEnum.LOGIN]: '',
        [PatientFormPropertyEnum.NAME]: '',
        [PatientFormPropertyEnum.EMAIL]: '',
        [PatientFormPropertyEnum.PHONE]: '',
        [PatientFormPropertyEnum.CARETAKER_NAME]: '',
        [PatientFormPropertyEnum.CARETAKER_PHONE] : ''
    
    })

    useEffect(()=>{
        getDecodedToken().then((result) => {
            setPatientForm(currentParams =>{                        
                return {
                ...currentParams,
                therapistId:result?.sub
                }
            })
        })
        
        getPatients()
    },[])

    function getPatients(){

        therapistService.getPatients()
        .then((response)=>{
            if(response?.success){
                setPatients(response.result)
            }
        })
        .catch((response)=>{

        })
    }

    async function getPatientById(guid: string){

        await patientService.getPatientById(guid)
        .then((response)=>{
            if(response?.success){
                console.log(response.result)
                setSelectedPatient(response.result)
            }
        })
        .catch((response)=>{

        })
    }
    
    
    useEffect(()=>{
        if(patientId != ''){
            getPatientById(patientId);
        }
        
    },[patientId])

    async function onSelectPatient(id: string){
        setIsLoading(true)
        await getPatientById(id);
        setIsLoading(false)
        push('PatientDetails')
    }

    function onChangeStringsPatientForm(value:string, property:PatientFormPropertyEnum):void{
        setPatientForm(currentParams =>{                        
            return {
            ...currentParams,
            [property]:value
            }
        })
    }

    function onChangeDateBirthPatientForm(value:Date):void{
        setPatientForm(currentParams =>{                        
            return {
            ...currentParams,
            birthDate:value
            }
        })
    }

    function onPressEditPatient(){
        setIsEditing(true);
        setPatientForm(currentParams => {
            return {
                ...currentParams,
                id: selectedPatient.id,
                login: selectedPatient.login,
                name: selectedPatient.name,
                email: selectedPatient.email,
                birthDate: new Date(selectedPatient.birthDate),
                phone: selectedPatient.phone,
                caretakerName: selectedPatient.caretakerName,
                caretakerPhone: selectedPatient.caretakerPhone
            }
        })

        push('NewPatient')
    }

    function resetPatientForm(): void{
        setPatientForm(currentParams =>{                        
            return {
            ...currentParams,
            id: '',
            login: '',
            name: '',
            email: '',
            birthDate:undefined,
            phone: '',
            caretakerName: '',
            caretakerPhone: ''
            }
        })
    }

    async function onSavePatient(){
        setIsLoading(true);

        if(isEditing){
            console.log("editar paciente")
            console.log(patientForm);

            await therapistService.editPatient(patientForm)
            .then((response)=>{
                if(response?.success){
                    console.log(response.result)
                    setSelectedPatient(response.result)
                    getPatients()
                }
            })
            .catch((response)=>{

            })
        }else{
            console.log("criar paciente")
            console.log(patientForm);

            await therapistService.createPatient(patientForm)
            .then((response)=>{
                if(response?.success){
                    console.log(response.result)
                    setSelectedPatient(response.result)
                    getPatients()
                }
            })
            .catch((response)=>{

            })
        }
        
        setIsEditing(false)
        pop()
        setIsLoading(false)
        push('PatientDetails')
    }

    async function onDeletePatient(){
        setShowDeletePatientModal(false);
        setIsLoading(true);

   
        console.log("deletar paciente")

        console.log(selectedPatient.id);
        await therapistService.deletePatient(selectedPatient.id)
            .then((response)=>{
                if(response?.success){
                    console.log(response.result)
                    getPatients()
                }
            })
            .catch((response)=>{

            })
        
        pop()
        setIsLoading(false)
    }

    async function onEnterSessionList(){
        setIsLoading(true);

        console.log(selectedPatient.id);
        await patientService.getSessionsByPatientId(selectedPatient.id)
            .then((response)=>{
                if(response?.success){
                    setSessions(response.result)
                }
            })
            .catch((response)=>{

            })
        setIsLoading(false)
        push('SessionList')
        
        
    }


    return (
        <>
            <TherapistContext.Provider value={{
                patients, sessions,
                patientId, setPatientId, 
                selectedPatient, setSelectedPatient, onSelectPatient,
                selectedSession, setSelectedSession,
                showPatientSessionParameterModal, setShowPatientSessionParameterModal,
                patientForm, 
                onChangeStringsPatientForm, 
                isLoading, setIsLoading,
                onChangeDateBirthPatientForm, resetPatientForm, onSavePatient, isEditing, setIsEditing, onPressEditPatient,
                showDeletePatientModal, setShowDeletePatientModal, onDeletePatient, onEnterSessionList

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
  sessions: SessionListViewModel[];

  patientId:string;
  setPatientId: React.Dispatch<React.SetStateAction<string>>;

  selectedPatient: PatientViewModel;
  setSelectedPatient: React.Dispatch<React.SetStateAction<PatientViewModel>>

  selectedSession: SessionViewModel;
  setSelectedSession: React.Dispatch<React.SetStateAction<SessionViewModel>>

  patientForm: PatientFormBody;
  isLoading:boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>

  isEditing:boolean
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>

  showPatientSessionParameterModal:boolean
  setShowPatientSessionParameterModal:React.Dispatch<React.SetStateAction<boolean>>


  showDeletePatientModal:boolean
  setShowDeletePatientModal:React.Dispatch<React.SetStateAction<boolean>>

  onChangeStringsPatientForm:(value:string, property:PatientFormPropertyEnum) => void
  onChangeDateBirthPatientForm:(value:Date) => void

  onSelectPatient:(id:string) => void
  resetPatientForm:() => void
  onSavePatient:() => void // ação ao editar ou criar paciente
  onDeletePatient:() => void // ação ao editar ou criar paciente
  onPressEditPatient:() => void //chama tela editar paciente
  onEnterSessionList:() => void
}

export enum PatientFormPropertyEnum{
    LOGIN = 'login',
    NAME = 'name',
    EMAIL = 'email',
    PHONE = 'phone',
    CARETAKER_NAME = 'caretakerName',
    CARETAKER_PHONE =  'caretakerPhone',
}

export type PatientFormBody = {
    id: string | undefined,
    therapistId: string | undefined,
    birthDate: Date | undefined,
    [PatientFormPropertyEnum.LOGIN]: string | undefined,
    [PatientFormPropertyEnum.NAME]: string | undefined,
    [PatientFormPropertyEnum.EMAIL]: string | undefined,
    [PatientFormPropertyEnum.PHONE]: string | undefined,
    [PatientFormPropertyEnum.CARETAKER_NAME]: string | undefined,
    [PatientFormPropertyEnum.CARETAKER_PHONE] :string | undefined,
}