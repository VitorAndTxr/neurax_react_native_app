import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';
import { H3, LoginTextLabel, PrimaryButton, RegularButtonText, PrimaryGreenButton } from '../BaseViewStyles';
import { useTherapistContext } from '../../context/TherapistContext';
import { useStackNavigatorContext } from '../../routes/StackNavigatorProvider';

export function PatientListComponent() {
  const {patients, setPatientId, onSelectPatient, resetPatientForm, setIsEditing} = useTherapistContext();
  const renderedPatients = [...patients];
  
  const { push } = useStackNavigatorContext()
  return (<View style={{
    justifyContent: 'center',
    flexDirection: 'col',
    marginTop:'300px',
  }}>
    <View style={{ flexDirection: "row" }}>
      <View style={{justifyContent: 'center'}}><H3 style={{marginBottom: 0}}>Lista de Pacientes</H3></View>
    
    <PrimaryGreenButton style={{marginStart:'auto'}} activeOpacity={1} onPress={() => {setIsEditing(false), resetPatientForm(), push('NewPatient')}}>
      <Text>+</Text>
    </PrimaryGreenButton>
    </View>


    <View style={{
            paddingTop:30,
            paddingBottom:30,
    }}>
      <SafeAreaView>
        <ScrollView>
          {renderedPatients.map((patient) => {
            return (
              <CardStyle key={patient.id} onPress={() => {onSelectPatient(patient.id)}}>
                
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
              </CardStyle>
            );
          })}
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
