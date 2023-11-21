import { View, ScrollView, SafeAreaView, Text, Modal, Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { H3, H4, LoginTextLabel, PrimaryButton, RegularButtonText, PrimaryGreenButton, PrimaryRedButton, ModalContainer, ModalContent } from '../BaseViewStyles';
import { useTherapistContext } from '../../context/TherapistContext';
import { useStackNavigatorContext } from '../../routes/StackNavigatorProvider';
import Spinner from 'react-native-loading-spinner-overlay';
import React, { useState } from 'react';
import { AppRoutesEnum } from '../../routes/AppRoutesEnum';
import SessionService from '../../services/SessionService';
import { BrTime } from './SessionListComponent';

const sessionService = new SessionService();

export function SessionDetailsComponent() {
  const {
    selectedSession, 
    isLoading,
    setIsLoading, 
    onEnterSessionList
  } = useTherapistContext();

  const session = {...selectedSession};

  
  const { push } = useStackNavigatorContext()
  const [stateModal, setStateModal] = useState(false);
  const [uri, setUri] = useState('');
  const [indicePhoto, setIndicePhoto] = useState(0);
  function showPhotos(){
    setUri(session.photos.at(0));
  }
    

  return (
  <View style={{
    justifyContent: 'center',
    flexDirection: 'col',
    marginTop:'300px',
  }}>
    <H3 style={{marginBottom: '-1px'}}>Detalhes da Sessão</H3>

    <View style={{
            paddingTop:30,
            paddingBottom:30,
    }}>
      <SafeAreaView style={{height:550}}>
        <ScrollView>
              <CardStyle activeOpacity={1}>
              <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Data:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    {(BrTime(session.creationDate)).toLocaleDateString()}
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Hora:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                  {(BrTime(session.creationDate)).toLocaleTimeString()}
                  </LoginTextLabel>
                </View>
                <View>
                  <LoginTextLabel></LoginTextLabel>
                  <LoginTextLabel style={{textAlign: 'center'}}>Informações do estímulo</LoginTextLabel>
                  <LoginTextLabel></LoginTextLabel>
                </View>
                
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Tensão:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    {session.parameters.amplitude} V
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Frequência:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    {session.parameters.frequency} Hz
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Tempo do estímulo:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    {session.parameters.stimulationTime} s
                  </LoginTextLabel>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <LoginTextLabel>Repetições:</LoginTextLabel>
                  <LoginTextLabel style={{ marginStart: 'auto' }}>
                    {session.repetitions}
                  </LoginTextLabel>
                </View>
                {
                  session.photos.length > 0 &&
                  <CustomPrimaryButton style={{marginTop: 20}}
                    activeOpacity={1}
                    onPress={()=>setStateModal(true)}>
                    <RegularButtonText style={{fontSize:20}}>
                        Ver Fotos
                    </RegularButtonText>
                  </CustomPrimaryButton>
                }
              </CardStyle>
              <H4 style={{marginBottom: '15px'}}>Repetições</H4>
              {session.segments.map((segment) => {
                return (
                  <CardStyle key={segment.id} activeOpacity={1}>
                    <View style={{ flexDirection: "row" }}>
                      <LoginTextLabel>Intensidade:</LoginTextLabel>
                      <LoginTextLabel style={{ marginStart: 'auto' }}>
                        {segment.intensity}
                      </LoginTextLabel>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <LoginTextLabel>Dificuldade:</LoginTextLabel>
                      <LoginTextLabel style={{ marginStart: 'auto' }}>
                      {segment.difficulty}
                      </LoginTextLabel>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <LoginTextLabel>Detectado Smg:</LoginTextLabel>
                      <LoginTextLabel style={{ marginStart: 'auto' }}>
                      {segment.smgDetected ? "Sim" : "Não"}
                      </LoginTextLabel>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <LoginTextLabel>Emergência:</LoginTextLabel>
                      <LoginTextLabel style={{ marginStart: 'auto' }}>
                      {segment.emergency ? "Sim" : "Não"}
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
                <Modal transparent={true} visible={stateModal} animationType="slide" onRequestClose={() => {setStateModal(false), setIndicePhoto(0)}}>
                  <ModalContainer>
                    <ModalContent style={{ maxHeight: 550 }}>
                      <View style={{ flex: 1, height: 450, width: 280 }}>
                        {
                          session.photos.length > 0 &&
                          <Image style={StyleSheet.absoluteFill} source={{uri: session.photos?.at(indicePhoto).path}}></Image>
                        }
                      </View>
                      {
                        session.photos.length > 1 &&
                        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                          {
                            indicePhoto == 0 &&
                            <CustomPrimaryButton style={{width:280}} activeOpacity={1} onPress={() => setIndicePhoto(indicePhoto+1)}>
                              <RegularButtonText style={{ fontSize: 20 }}>
                                Próxima
                              </RegularButtonText>
                            </CustomPrimaryButton>
                            
                          }
                          {
                            indicePhoto + 1 == session.photos.length &&
                            <CustomPrimaryButton style={{width:280}} activeOpacity={1} onPress={() => setIndicePhoto(indicePhoto-1)}>
                              <RegularButtonText style={{ fontSize: 20 }}>
                                Anterior
                              </RegularButtonText>
                            </CustomPrimaryButton>
                          }
                          {
                            indicePhoto > 0 && indicePhoto < session.photos.length - 1 &&
                            <>
                              <PreviousButton activeOpacity={1} onPress={() => setIndicePhoto(indicePhoto-1)}>
                                <RegularButtonText style={{ fontSize: 20 }}>
                                  Anterior
                                </RegularButtonText>
                              </PreviousButton>
                              <NextButton activeOpacity={1}>
                                <RegularButtonText style={{ fontSize: 20 }} onPress={() => setIndicePhoto(indicePhoto+1)}>
                                  Próxima
                                </RegularButtonText>
                              </NextButton>
                            </>
                          }

                        </View>
                      }
                      
                    </ModalContent>
                  </ModalContainer>
                </Modal>
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

export const PreviousButton = styled(PrimaryButton)`
    margin-top:5px;
    padding: 15px 20px ;
    margin-right:20px;
`
export const NextButton = styled(PrimaryButton)`
    margin-top:5px;
    padding: 15px 20px;
`