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

    
    const [selectedPatient, setSelectedPatient] = useState<PatientViewModel>({} as PatientViewModel);

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

        patientService.getPatients()
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

            await patientService.editPatient(patientForm)
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

            await patientService.createPatient(patientForm)
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
        await patientService.deletePatient(selectedPatient.id)
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



    return (
        <>
            <TherapistContext.Provider value={{
                patients, 
                patientId, setPatientId, 
                showPatientSessionParameterModal, setShowPatientSessionParameterModal,
                selectedPatient, onSelectPatient,
                patientForm, 
                onChangeStringsPatientForm, 
                isLoading, 
                onChangeDateBirthPatientForm, resetPatientForm, onSavePatient, isEditing, setIsEditing, onPressEditPatient,
                showDeletePatientModal, setShowDeletePatientModal, onDeletePatient,

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

  patientForm: PatientFormBody;
  isLoading:boolean

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