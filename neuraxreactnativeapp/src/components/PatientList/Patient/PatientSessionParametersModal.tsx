import React, { useState, useEffect } from 'react';
import { H2, InputLabel, PrimaryButton, PrimaryGreenButton, PrimaryRedButton, RegularButtonText } from '../../BaseViewStyles';
import { Modal, View, SafeAreaView, ScrollView } from 'react-native';
import { useBluetoothContext, NeuraXBluetoothProtocolBodyPropertyEnum } from '../../../context/BluetoothContext';
import { ModalContainer, ModalContent } from '../../BluetoothSetup/BluetoothConnectionErrorModal';
import Slider from "react-native-a11y-slider";
import { Divider } from '@rneui/themed';
import { useTherapistContext } from '../../../context/TherapistContext';
import { SessionParametersViewModel } from "../../../domain/models/SessionParametersViewModel";
import PatientService from '../../../services/PatientService';

const patientService = new PatientService();

export const PatientSessionParametersModal = () => {

  const {
    showPatientSessionParameterModal, 
    setShowPatientSessionParameterModal,
    selectedPatient,
    setSelectedPatient,
    setIsLoading
  } = useTherapistContext();

  const params = {...selectedPatient.parameters}

  const [patientParams,setPatientParams] = useState<SessionParametersViewModel>({
    amplitude:6,
    minPulseWidth:100,
    maxPulseWidth:300,
    frequency:60,
    stimulationTime:2
  } )

  useEffect(()=>{
    console.log("entro no modal");
    if(selectedPatient.parameters != null){
      setPatientParams(params)
    }
    
    

  },[selectedPatient])

  async function savePatientSessionParams(){
    setIsLoading(true);
    let params = {...patientParams, patientId : selectedPatient.id}
    await patientService.setPatientParameters(params)
        .then((response)=>{
          console.log(response)
            if(response?.success){
                console.log(response.result)
                setSelectedPatient(response.result)
            }
        })
        .catch((response)=>{

        })
    
    //pop()
    setShowPatientSessionParameterModal(false);
    setIsLoading(false)
  }

  function onChange(values:number[], property:string) {
    if(property==='pulseWidth'||property==='pulseWidth'){
      
      setPatientParams(currentParams =>{                        
        return {
        ...currentParams,
        minPulseWidth: (values[0] < values[1]) ? values[0] : values[1],
        maxPulseWidth: (values[0] > values[1]) ? values[0] : values[1],
        }
      })
      return
    }

    setPatientParams(currentParams =>{                        
      return {
      ...currentParams,
      [property]:values[0]
      }
    })
  }



  return (
    <Modal transparent={true} visible={showPatientSessionParameterModal} animationType="slide" onRequestClose={() => setShowPatientSessionParameterModal(false)}>
      <ModalContainer>
        <ModalContent>
          <H2 style={{
            marginBottom: 10
          }}>
            Parâmetros do Paciente
          </H2>
          <SafeAreaView style={{ justifyContent: 'center' }}>
            <ScrollView style={{ height: 550 }}>
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
                    labelStyle={{}}
                    style={{ width: 250 }}
                    values={[(patientParams.amplitude)]}
                    labelTextStyle={{
                      color: '#08415C',
                      fontSize: 15
                    }}
                    onChange={(value: number[]) => onChange(value,'amplitude')} />
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

                    labelTextStyle={{
                      color: '#08415C',
                      fontSize: 15
                    }}
                    labelStyle={{}}
                    style={{ width: 220 }}
                    values={[patientParams.minPulseWidth,patientParams.maxPulseWidth]}
                    onChange={(value: number[]) => onChange(value, 'pulseWidth')} />
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
                    labelTextStyle={{
                      color: '#08415C',
                      fontSize: 15
                    }}
                    style={{ width: 230 }}
                    values={[(patientParams.frequency!)]}
                    onChange={(value: number[]) => onChange(value, 'frequency')} />
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
                    labelTextStyle={{
                      color: '#08415C',
                      fontSize: 15
                    }}
                    labelStyle={{}}
                    style={{ width: 250 }}
                    values={[(patientParams.stimulationTime!)]}
                    onChange={(value: number[]) => onChange(value, 'stimulationTime')} />
                  <InputLabel>
                    10s
                  </InputLabel>
                </View>
              </View>
              <Divider style={{ marginVertical: 5 }} />
            </ScrollView>
            <View style={{flexDirection:'row', flex:1, paddingVertical:20}}>
              <View style={{flex:1, padding:4}}>
                <PrimaryRedButton onPress={() => {setShowPatientSessionParameterModal(false)}}>
                  <RegularButtonText>
                    Cancelar
                  </RegularButtonText>
                </PrimaryRedButton>
              </View>
              <View style={{flex:1, padding:4}}>
                <PrimaryGreenButton onPress={() => { savePatientSessionParams(); }}>
                  <RegularButtonText>
                    Salvar
                  </RegularButtonText>
                </PrimaryGreenButton>
              </View>
            </View>


          </SafeAreaView>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};
