import { View, ScrollView, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { H2, LoginTextLabel, PrimaryButton, RegularButtonText } from '../../screens/BaseViewStyles';
import { usePatientListScreenContext } from '../../context/PatientListScreenContext';

export function PatientListComponent() {
  const {patients} = usePatientListScreenContext();
  const renderedPatients = [...patients];
  
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
          {renderedPatients.map((patient) => {
            return (
              <CardStyle>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Nome:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    {patient.name}
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Nascimento:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    {patient.birthDate}
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
