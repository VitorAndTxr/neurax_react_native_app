import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';
import { H3, LoginTextLabel, PrimaryButton, RegularButtonText, PrimaryGreenButton } from '../BaseViewStyles';
import { useTherapistContext } from '../../context/TherapistContext';
import { useStackNavigatorContext } from '../../routes/StackNavigatorProvider';
import Spinner from 'react-native-loading-spinner-overlay';

export function SessionListComponent() {
  const {sessions, isLoading, onSelectPatient, resetPatientForm, setIsEditing} = useTherapistContext();
  const renderedSessions = [...sessions];
  
  const { push } = useStackNavigatorContext()
  return (<View style={{
    justifyContent: 'center',
    flexDirection: 'col',
    marginTop:'300px',
  }}>
    
    <View style={{justifyContent: 'center'}}><H3 style={{marginBottom: 0}}>Histórico de Sessões</H3></View>
    


    <View style={{
            paddingTop:30,
            paddingBottom:30,
    }}>
      <SafeAreaView style={{height:655}}>
        <ScrollView>
          {renderedSessions.map((session) => {
            return (
              <CardStyle key={session.id} onPress={() => {onSelectPatient(session.id)}}>
                
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Data:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                  {(new Date(session.creationDate)).toLocaleDateString()}
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Hora:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    {(new Date(session.creationDate)).toLocaleTimeString()}
                  </LoginTextLabel>
                </View>
              </CardStyle>
            );
          })}
          <Spinner
                    visible={isLoading}
                    textContent={'Carregando...'}
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
