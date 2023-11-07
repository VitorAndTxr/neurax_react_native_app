import React, { useEffect, useState } from 'react';
import { H2, InputLabel, LoginTextLabel, PrimaryButton, RegularButtonText } from '../../screens/BaseViewStyles';
import { Modal, View, TextInput, BackHandler} from 'react-native';
import { useBluetoothContext } from '../../context/BluetoothContext';
import { ModalContainer, ModalContent } from './BluetoothConnectionErrorModal';
import Slider from "react-native-a11y-slider";
import { Divider } from '@rneui/themed';

enum BluetoothTestSEmgModalState{
  selectDificulty,
  tryToDetect,
  loading
}

export const BluetoothTestSEmgModal = () => {
  const {
    setShowSEmgTestModal, showSEmgTestModal
  } = useBluetoothContext();

  const [modalState , setModalState] =  useState<BluetoothTestSEmgModalState>(BluetoothTestSEmgModalState.selectDificulty)

  useEffect(()=>{
    
    },[]
  )

  function testSEmg(){
    setModalState(BluetoothTestSEmgModalState.loading)

    setModalState(BluetoothTestSEmgModalState.tryToDetect)
  }

  function changeDificulty(){
    setModalState(BluetoothTestSEmgModalState.loading)

    setModalState(BluetoothTestSEmgModalState.selectDificulty)
  }

  return (
    <Modal transparent={true} visible={showSEmgTestModal} animationType="slide" onRequestClose={()=>setShowSEmgTestModal(false)}>
      <ModalContainer>
          <ModalContent style={{maxHeight:400}}>
            <H2 style={{
              marginBottom: 10
            }}>
              Teste sEMG
            </H2>
            <Divider style={{marginVertical:10}}/>


            <View style={{justifyContent:'center', height:200}}>
              <RenderBluetoothTestSEmgModalState
                modalState={modalState}
              />
            </View>

            <Divider style={{marginVertical:5}}/>  
            {
              modalState === BluetoothTestSEmgModalState.selectDificulty?
              (
                <PrimaryButton 
                onPress={testSEmg}
                
              >
                <RegularButtonText >
                  Testar sEMG
                </RegularButtonText>
              </PrimaryButton>
              )
              :
              (
                <PrimaryButton 
                onPress={changeDificulty}
                
              >
                <RegularButtonText >
                  Trocar dificuldade
                </RegularButtonText>
              </PrimaryButton>
              )
            }            


          </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

interface RenderBluetoothTestSEmgModalStateProps{
  modalState:BluetoothTestSEmgModalState
}

function RenderBluetoothTestSEmgModalState({modalState}:RenderBluetoothTestSEmgModalStateProps){
  switch(modalState){
    case BluetoothTestSEmgModalState.selectDificulty:
      return (
        <View style={{flexDirection:'col', width:330, justifyContent:'center', alignItems:'center'}}>
          <InputLabel style={{marginVertical:10}}>
              Dificuldade:
          </InputLabel>
          <View style={{flexDirection:'row', width:300, height:'auto', justifyContent:'center', alignItems:'center', paddingBottom:15}}>
            <InputLabel>
              1
            </InputLabel>  
            <Slider 
              min={1}
              max={10}
              increment={1}
              values={[7]}
              labelTextStyle={{
                color:'#08415C',
                fontSize:15
              }}
              labelStyle={{
                
              }}
              style={{width:250}}
              selectedTrackStyle={{
                
              }}
            />          
            <InputLabel>
              110
            </InputLabel>
          </View>
        </View>
      )

    case BluetoothTestSEmgModalState.tryToDetect:
      return(
        <View style={{flexDirection:'col', width:330, justifyContent:'center', alignItems:'center'}}>
          <InputLabel >
              Tente mover seu pulso
          </InputLabel>
        </View>
      )
    default:
      return<></>

  }

}
