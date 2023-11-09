import React, { useEffect } from 'react';
import { H2, InputLabel, PrimaryButton, RegularButtonText } from '../../screens/BaseViewStyles';
import { Modal, View, SafeAreaView, ScrollView } from 'react-native';
import { useBluetoothContext } from '../../context/BluetoothContext';
import { ModalContainer, ModalContent } from './BluetoothConnectionErrorModal';
import Slider from "react-native-a11y-slider";
import { Divider } from '@rneui/themed';


export const BluetoothFesConfigModal = () => {
  const {
    setShowFesTestModal, showFesTestModal
  } = useBluetoothContext();

  return (
    <Modal transparent={true} visible={showFesTestModal} animationType="slide" onRequestClose={() => setShowFesTestModal(false)}>
      <ModalContainer>
        <ModalContent>
          <H2 style={{
            marginBottom: 10
          }}>
            Teste FES
          </H2>
          <SafeAreaView style={{ justifyContent: 'center' }}>
            <ScrollView style={{ height: 570 }}>
              <Divider style={{ marginVertical: 10 }} />
              <View style={{ flexDirection: 'col', width: 330, justifyContent: 'center', alignItems: 'center' }}>
                <InputLabel style={{ marginVertical: 10 }}>
                  Amplitude do Estimulo:
                </InputLabel>
                <View style={{ flexDirection: 'row', width: 300, height: 'auto', justifyContent: 'center', alignItems: 'center', paddingBottom: 15 }}>
                  <InputLabel>
                    5V
                  </InputLabel>
                  <Slider
                    min={5}
                    max={12}
                    increment={1}
                    values={[7]}
                    labelTextStyle={{
                      color: '#08415C',
                      fontSize: 15
                    }}
                    labelStyle={{}}
                    style={{ width: 250 }}
                    selectedTrackStyle={{}} />
                  <InputLabel>
                    12V
                  </InputLabel>
                </View>
              </View>
              <Divider style={{ marginVertical: 5 }} />
              <View style={{ flexDirection: 'col', width: 330, justifyContent: 'center', alignItems: 'center' }}>
                <InputLabel style={{ marginVertical: 10 }}>
                  Largura do Pulso:
                </InputLabel>
                <View style={{ flexDirection: 'row', width: 300, height: 'auto', justifyContent: 'center', alignItems: 'center', paddingBottom: 15 }}>
                  <InputLabel>
                    50us
                  </InputLabel>
                  <Slider
                    min={50}
                    max={1000}
                    increment={50}
                    values={[100]}
                    labelTextStyle={{
                      color: '#08415C',
                      fontSize: 15
                    }}
                    labelStyle={{}}
                    style={{ width: 220 }}
                    selectedTrackStyle={{}} />
                  <InputLabel>
                    1000us
                  </InputLabel>
                </View>
              </View>
              <Divider style={{ marginVertical: 5 }} />
              <View style={{ flexDirection: 'col', width: 330, justifyContent: 'center', alignItems: 'center' }}>
                <InputLabel style={{ marginVertical: 10 }}>
                  Frequência:
                </InputLabel>
                <View style={{ flexDirection: 'row', width: 330, height: 'auto', justifyContent: 'center', alignItems: 'center', paddingBottom: 15 }}>
                  <InputLabel>
                    30Hz
                  </InputLabel>
                  <Slider
                    min={30}
                    max={90}
                    increment={5}
                    values={[50]}
                    labelTextStyle={{
                      color: '#08415C',
                      fontSize: 15
                    }}
                    labelStyle={{}}
                    style={{ width: 230 }}
                    selectedTrackStyle={{}} />
                  <InputLabel>
                    90Hz
                  </InputLabel>
                </View>
              </View>
              <Divider style={{ marginVertical: 5 }} />
              <View style={{ flexDirection: 'col', width: 330, justifyContent: 'center', alignItems: 'center' }}>
                <InputLabel style={{ marginVertical: 10 }}>
                  Tempo do estimulo:
                </InputLabel>
                <View style={{ flexDirection: 'row', width: 300, height: 'auto', justifyContent: 'center', alignItems: 'center', paddingBottom: 15 }}>
                  <InputLabel>
                    0.5s
                  </InputLabel>
                  <Slider
                    min={0.5}
                    max={10}
                    increment={0.5}
                    values={[2]}
                    labelTextStyle={{
                      color: '#08415C',
                      fontSize: 15
                    }}
                    labelStyle={{}}
                    style={{ width: 250 }}
                    selectedTrackStyle={{}} />
                  <InputLabel>
                    10s
                  </InputLabel>
                </View>
              </View>
              <Divider style={{ marginVertical: 5 }} />
            </ScrollView>

            <PrimaryButton onPress={() => { }}>
              <RegularButtonText>
                Testar FES
              </RegularButtonText>
            </PrimaryButton>
          </SafeAreaView>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};