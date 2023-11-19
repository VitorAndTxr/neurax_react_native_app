import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';
import { H3, LoginTextLabel, PrimaryButton, RegularButtonText, PrimaryGreenButton, PrimaryRedButton } from '../BaseViewStyles';
import { useTherapistContext } from '../../context/TherapistContext';
import { useStackNavigatorContext } from '../../routes/StackNavigatorProvider';
import Spinner from 'react-native-loading-spinner-overlay';
import { DeletePatientModal } from './DeletePatientModal';
import React from 'react';
import { PatientSessionParametersModal } from './Patient/PatientSessionParametersModal';
import { AppRoutesEnum } from '../../routes/AppRoutesEnum';
import PatientService from "../../services/TherapistService";

const patientService = new PatientService();

export function PatientDetailsComponent() {
  const {
    selectedPatient, 
    isLoading,
    setIsLoading, 
    onPressEditPatient, 
    showDeletePatientModal, 
    setShowDeletePatientModal,
    setShowPatientSessionParameterModal,
    showPatientSessionParameterModal,
    setSelectedPatient,
    onEnterSessionList
  } = useTherapistContext();

  const patient = selectedPatient;
  
  const { push } = useStackNavigatorContext()

  async function allowSessions(){
    setIsLoading(true);

    console.log(selectedPatient.id);
    await patientService.allowPatientSessions(selectedPatient.id)
        .then((response)=>{
            if(response?.success){
                console.log(response.result)
                setSelectedPatient(response.result)
            }
        })
        .catch((response)=>{

        })
    
    //pop()
    setIsLoading(false)
  }
  async function disallowSessions(){
    setIsLoading(true);

    console.log(selectedPatient.id);
    await patientService.disallowPatientSessions(selectedPatient.id)
        .then((response)=>{
            if(response?.success){
                console.log(response.result)
                setSelectedPatient(response.result)
            }
        })
        .catch((response)=>{

        })
    
    //pop()
    setIsLoading(false)
  }
  return (
  <View style={{
    justifyContent: 'center',
    flexDirection: 'col',
    marginTop:'300px',
  }}>
    <H3 style={{marginBottom: '15px'}}>Informações do Paciente</H3>

    <View style={{
            paddingTop:30,
            paddingBottom:30,
    }}>
      <SafeAreaView>
        <ScrollView>
              <CardStyle activeOpacity={1}>
                
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Nome:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    {patient.name}
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Nascimento:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    {(new Date(patient.birthDate)).toLocaleDateString()}
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Email:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    {patient.email}
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Telefone:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    {patient.phone}
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Resp.:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    {patient.caretakerName}
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Tel. Resp.:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    {patient.caretakerPhone}
                  </LoginTextLabel>
                </View>

                

              </CardStyle>
              <View style={{paddingTop:10, flex: 1, justifyContent:'center'}}>
                <PrimaryGreenButton
                    //disabled={patient.parameters == null || !patient.sessionAllowed}
                    activeOpacity={1}
                    onPress={()=>push(AppRoutesEnum.Session)}>
                    <RegularButtonText  style={{fontSize:20}}>
                        Iniciar Sessão
                    </RegularButtonText>
                </PrimaryGreenButton>
                        <CustomPrimaryButton
                            activeOpacity={1}
                            onPress={()=>onEnterSessionList()}>
                            <RegularButtonText style={{fontSize:20}}>
                                Histórico de Sessões
                            </RegularButtonText>
                        </CustomPrimaryButton>
                        <CustomPrimaryButton
                            activeOpacity={1}
                            onPress={()=>setShowPatientSessionParameterModal(true)}>
                            <RegularButtonText  style={{fontSize:20}}>
                                Parâmetros
                            </RegularButtonText>
                        </CustomPrimaryButton>
                        {patient.sessionAllowed ? 
                          (
                            <>
                              <CustomPrimaryRedButton
                                activeOpacity={1}
                                onPress={()=>{disallowSessions()}}>
                                  <RegularButtonText  style={{fontSize:20}}>
                                    Bloquear sessões
                                  </RegularButtonText>
                              </CustomPrimaryRedButton>
                            </>
                          ):(
                            <>
                              <CustomPrimaryGreenButton  onPress={()=>{allowSessions()}}>
                                <RegularButtonText  style={{fontSize:20}}>
                                    Liberar sessões
                                </RegularButtonText>
                              </CustomPrimaryGreenButton>
                            </>
                          )
                        }
                            
                        
                        <CustomPrimaryButton
                            activeOpacity={1}
                            onPress={()=>{onPressEditPatient()}}>
                            <RegularButtonText  style={{fontSize:20}}>
                                Editar Informações
                            </RegularButtonText>
                        </CustomPrimaryButton>
                        <CustomPrimaryRedButton
                            activeOpacity={1}
                            onPress={()=>setShowDeletePatientModal(true)}>
                            <RegularButtonText  style={{fontSize:20}}>
                                Excluir Paciente
                            </RegularButtonText>
                        </CustomPrimaryRedButton>
                </View>
                <Spinner
                    visible={isLoading}
                    textContent={'Carregando...'}
                    color='#08415C'
                    overlayColor='#C6EAFA'
                    textStyle={{ color: '#08415C' }}
                    size={"large"}
                    
                />
                {
                  showDeletePatientModal
                  &&
                  <DeletePatientModal/>
                }
                                {
                  showPatientSessionParameterModal
                  &&
                  <PatientSessionParametersModal/>
                }
        </ScrollView>
      </SafeAreaView>
    </View>
    <PatientSessionParametersModal/>
  </View>);
}

const CardStyle = styled.TouchableOpacity`
    background-color:#D3EBF5;
    elevation:10;
    flex:1;
    margin:10px 0px;
    border-radius:10px;
    padding: 15px; 
`;

export const CustomPrimaryButton = styled(PrimaryButton)`
    margin-top:5px;
    padding: 15px;
`
export const CustomPrimaryGreenButton = styled(PrimaryGreenButton)`
    margin-top:5px;
    padding: 15px;
`
export const CustomPrimaryRedButton = styled(PrimaryRedButton)`
    margin-top:5px;
    padding: 15px;
`