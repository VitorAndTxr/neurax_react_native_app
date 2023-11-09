import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';
import { H3, LoginTextLabel, PrimaryButton, RegularButtonText, PrimaryGreenButton, PrimaryRedButton } from '../../screens/BaseViewStyles';
import { useTherapistContext } from '../../context/TherapistContext';
import { useStackNavigatorContext } from '../../routes/StackNavigatorProvider';

export function PatientDetailsComponent() {
  const {selectedPatient} = useTherapistContext();
  const patient = selectedPatient;
  
  const { push } = useStackNavigatorContext()
  return (<View style={{
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
              <CardStyle onPress={() => push('PatientDetails')}>
                
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
                    activeOpacity={1}
                    onPress={()=>push('PatientList')}>
                    <RegularButtonText  style={{fontSize:20}}>
                        Iniciar Sessão
                    </RegularButtonText>
                </PrimaryGreenButton>
                        <CustomPrimaryButton
                            activeOpacity={1}
                            onPress={()=>push('PatientList')}>
                            <RegularButtonText style={{fontSize:20}}>
                                Histórico de Sessões
                            </RegularButtonText>
                        </CustomPrimaryButton>
                        <CustomPrimaryButton
                            activeOpacity={1}
                            onPress={()=>push('PatientList')}>
                            <RegularButtonText  style={{fontSize:20}}>
                                Parâmetros
                            </RegularButtonText>
                        </CustomPrimaryButton>
                        <CustomPrimaryGreenButton
                            activeOpacity={1}
                            onPress={()=>push('PatientList')}>
                            <RegularButtonText  style={{fontSize:20}}>
                                Liberar sessões
                            </RegularButtonText>
                        </CustomPrimaryGreenButton>
                        <CustomPrimaryButton
                            activeOpacity={1}
                            onPress={()=>push('PatientList')}>
                            <RegularButtonText  style={{fontSize:20}}>
                                Editar Informações
                            </RegularButtonText>
                        </CustomPrimaryButton>
                        <CustomPrimaryRedButton
                            activeOpacity={1}
                            onPress={()=>push('PatientList')}>
                            <RegularButtonText  style={{fontSize:20}}>
                                Excluir Paciente
                            </RegularButtonText>
                        </CustomPrimaryRedButton>
                </View>
        </ScrollView>
      </SafeAreaView>
    </View>
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