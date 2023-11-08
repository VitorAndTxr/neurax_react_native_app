import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';
import { H2, LoginTextLabel, PrimaryButton, RegularButtonText, PrimaryGreenButton, PrimaryRedButton } from '../../screens/BaseViewStyles';
import { useTherapistContext } from '../../context/TherapistContext';
import { useStackNavigatorContext } from '../../routes/StackNavigatorProvider';

export function PatientDetailsComponent() {
  const {patients} = useTherapistContext();
  const renderedPatients = [...patients];
  
  const { push } = useStackNavigatorContext()
  return (<View style={{
    justifyContent: 'center',
    flexDirection: 'col',
    marginTop:'300px',
  }}>
    <H2>Lista de Pacientes</H2>

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
                    Fulano
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Nascimento:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    {(new Date('1999-09-23')).toLocaleDateString()}
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Email:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    email@teste.com
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Telefone:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    00 00000000
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Resp.:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    Fulano de tal
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Tel. Resp.:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    Fulano de tal
                  </LoginTextLabel>
                </View>

                

              </CardStyle>
              <View style={{
            paddingTop:15,
            paddingBottom:10,
    }}>
                <PrimaryGreenButton
                            activeOpacity={1}
                            onPress={()=>push('PatientList')}>
                            <RegularButtonText>
                                Iniciar Sessão
                            </RegularButtonText>
                        </PrimaryGreenButton>
                        <PrimaryButton
                            activeOpacity={1}
                            onPress={()=>push('PatientList')}>
                            <RegularButtonText>
                                Histórico de Sessões
                            </RegularButtonText>
                        </PrimaryButton>
                        <PrimaryButton
                            activeOpacity={1}
                            onPress={()=>push('PatientList')}>
                            <RegularButtonText>
                                Parâmetros
                            </RegularButtonText>
                        </PrimaryButton>
                        <PrimaryGreenButton
                            activeOpacity={1}
                            onPress={()=>push('PatientList')}>
                            <RegularButtonText>
                                Liberar sessões
                            </RegularButtonText>
                        </PrimaryGreenButton>
                        <PrimaryButton
                            activeOpacity={1}
                            onPress={()=>push('PatientList')}>
                            <RegularButtonText>
                                Editar Informações
                            </RegularButtonText>
                        </PrimaryButton>
                        <PrimaryRedButton
                            activeOpacity={1}
                            onPress={()=>push('PatientList')}>
                            <RegularButtonText>
                                Excluir Paciente
                            </RegularButtonText>
                        </PrimaryRedButton>
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
