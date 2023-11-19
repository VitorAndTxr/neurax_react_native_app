import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';
import { H3, LoginTextLabel, PrimaryButton, RegularButtonText, PrimaryGreenButton } from '../BaseViewStyles';
import { useTherapistContext } from '../../context/TherapistContext';
import { useStackNavigatorContext } from '../../routes/StackNavigatorProvider';
import Spinner from 'react-native-loading-spinner-overlay';
import SessionService from '../../services/SessionService';

const sessionService = new SessionService();

export function BrTime (date: Date) : Date {
  let dt = new Date(date);
  dt.setHours(dt.getHours() - 3);
  return dt;
}

export function SessionListComponent() {
  const {sessions, isLoading, setIsLoading, setSelectedSession} = useTherapistContext();
  const renderedSessions = [...sessions];

  const { push } = useStackNavigatorContext()

  async function onSelectSession(id: string){
    setIsLoading(true)
    await getSessionById(id);
    push('SessionDetails')
    setIsLoading(false)
  }

  async function getSessionById(guid: string){
    await sessionService.getSessionsById(guid)
    .then((response)=>{
        if(response?.success){
            console.log(response.result)
            setSelectedSession(response.result)
        }
    })
    .catch((response)=>{

    })
  }
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
              <CardStyle key={session.id} onPress={() => {onSelectSession(session.id)}}>
                
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Data:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                  {(BrTime(session.creationDate)).toLocaleDateString()}
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Hora:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    {(BrTime(session.creationDate)).toLocaleTimeString('pt-BR')}
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
