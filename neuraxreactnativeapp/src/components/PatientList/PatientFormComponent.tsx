import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';
import { H3, LoginTextLabel, PrimaryButton, RegularButtonText, PrimaryGreenButton, PrimaryRedButton, StyledTextInput, LoginButton } from '../../screens/BaseViewStyles';
import { useTherapistContext } from '../../context/TherapistContext';
import { useStackNavigatorContext } from '../../routes/StackNavigatorProvider';
import Spinner from 'react-native-loading-spinner-overlay';

export function PatientFormComponent() {
  const {selectedPatient} = useTherapistContext();
  const patient = selectedPatient;
  
  const { push } = useStackNavigatorContext()
  return (<View style={{
    justifyContent: 'center',
    flexDirection: 'col',
    marginTop:'300px',
  }}>
    <H3>Novo Paciente</H3>

    <LoginTextLabel>
        Nome completo
    </LoginTextLabel>
    <CustomStyledTextInput
        editable
    />
    <LoginTextLabel>
        Data de Nascimento
    </LoginTextLabel>
    <CustomStyledTextInput
        editable
    />
    <LoginTextLabel>
        E-mail
    </LoginTextLabel>
    <CustomStyledTextInput
        editable
    />
    <LoginTextLabel>
        Telefone
    </LoginTextLabel>
    <CustomStyledTextInput
        editable
    />
    <LoginTextLabel>
        Nome do responsável
    </LoginTextLabel>
    <CustomStyledTextInput
        editable
    />
    <LoginTextLabel>
        Telefone do responsável
    </LoginTextLabel>
    <CustomStyledTextInput
        editable
    />
                
    <View style={{
            paddingTop:10,
            paddingBottom:30,
    }}>
      <SafeAreaView>
        <ScrollView>

              <View style={{flex: 1, justifyContent:'space-between', flexDirection: 'row'}}>

              <CustomPrimaryRedButton
                            activeOpacity={1}
                            onPress={()=>push('PatientList')}>
                            <RegularButtonText  style={{fontSize:20}}>
                                Cancelar
                            </RegularButtonText>
                        </CustomPrimaryRedButton>
                        <CustomPrimaryGreenButton
                            activeOpacity={1}
                            onPress={()=>push('PatientList')}>
                            <RegularButtonText  style={{fontSize:20}}>
                                Criar
                            </RegularButtonText>
                        </CustomPrimaryGreenButton>

                </View>
                <Spinner
                    visible={false}
                    textContent={'Autenticando...'}
                    color='#08415C'
                    overlayColor='#C6EAFA'
                    textStyle={{ color: '#08415C' }}
                    size={"large"}
                    
                />
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


export const CustomPrimaryGreenButton = styled(PrimaryGreenButton)`
    margin-top:5px;
    padding: 15px 39px ;
`
export const CustomPrimaryRedButton = styled(PrimaryRedButton)`
    margin-top:5px;
    padding: 15px;
`


export const CustomStyledTextInput = styled(StyledTextInput)`
    border-radius: 10px;
    background: #FFF;
    elevation:10;
    margin-bottom:10px;
    margin-top:5px;
    color: #000;

    font-size:18px;
    padding:12px;
`