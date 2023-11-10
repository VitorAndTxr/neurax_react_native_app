import React, { useEffect, useState } from 'react';
import { H2, LoginTextLabel, PrimaryButton, RegularButtonText } from '../../screens/BaseViewStyles';
import { Modal, View, TextInput, BackHandler} from 'react-native';
import { useBluetoothContext } from '../../context/BluetoothContext';
import { ModalContainer, ModalContent } from './BluetoothConnectionErrorModal';
import { Divider } from '@rneui/themed';
import { RenderBluetoothTestSEmgModalState } from './RenderBluetoothTestSEmgModalState';

export enum BluetoothTestSEmgModalState{
  selectDificulty,
  tryToDetect,
  loading
}

export const BluetoothTestSEmgModal = () => {
  const {
    setShowSEmgTestModal, 
    showSEmgTestModal,
    triggerDettected,
    onChangeSEmgDificulty,
    fesParams,
    testFes
  } = useBluetoothContext();

  const [ modalState , setModalState] =  useState<BluetoothTestSEmgModalState>(BluetoothTestSEmgModalState.selectDificulty)

  useEffect(()=>{
    
    },[]
  )

  function testSEmg(){
    setModalState(BluetoothTestSEmgModalState.loading)
    setModalState(BluetoothTestSEmgModalState.tryToDetect)
    testFes()
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
                triggerDettected={triggerDettected}
                onChangeSEmgDificulty={onChangeSEmgDificulty}
                fesParams={fesParams}
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




