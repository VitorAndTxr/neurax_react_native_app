import React, { useEffect, useState } from 'react';
import { H2 } from '../../BaseViewStyles';
import { Modal } from 'react-native';
import {  useBluetoothContext } from '../../../context/BluetoothContext';
import { ModalContainer, ModalContent } from '../BluetoothConnectionErrorModal';
import { BluetoothTestGyroscopeContentModal } from './BluetoothTestGyroscopeContentModal';

export const BluetoothTestGyroscopeModal = () => {
  const {
    setShowTestGyroscopeModal, 
    showTestGyroscopeModal, 
    wristAmplitude
  } = useBluetoothContext();

  const gyroscopeMeasurementTimeMS = 10000

  const [modalState, setModalState] = useState<BluetoothTestGyroscopeModalState>(BluetoothTestGyroscopeModalState.Instructions);
  const [measurementTimeout, setMeasurementTimeout] = useState<NodeJS.Timeout|undefined>();

  useEffect(()=>{
    if(modalState===BluetoothTestGyroscopeModalState.Measuring){

      const timeOut = setTimeout(
      ()=>{
        setModalState(BluetoothTestGyroscopeModalState.FinalResults)
      }
      , gyroscopeMeasurementTimeMS)

      setMeasurementTimeout(timeOut)
    }
  },[modalState])

  function initMeasurement() {
    setModalState(BluetoothTestGyroscopeModalState.Measuring)
  }

  function cancelMeasurement() {    
    clearTimeout(measurementTimeout)
    setMeasurementTimeout(undefined) 
    setModalState(BluetoothTestGyroscopeModalState.Instructions)
  }

  function restartMeasurement() {
    setModalState(BluetoothTestGyroscopeModalState.Instructions)
  }

  return (
    <Modal transparent={true} visible={showTestGyroscopeModal} animationType="slide" onRequestClose={() => setShowTestGyroscopeModal(false)}>
      <ModalContainer>
        <ModalContent style={{ maxHeight: 400 }}>
          <H2 style={{
            marginBottom: 10
          }}>
            Medir Mobilidade
          </H2>

          <BluetoothTestGyroscopeContentModal
            modalState={modalState}
            initMeasurement={initMeasurement}
            cancelMeasurement={cancelMeasurement}
            restartMeasurement={restartMeasurement}
            totalAmplitude={wristAmplitude}
          />
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};
export enum BluetoothTestGyroscopeModalState {
  Instructions,
  Measuring,
  FinalResults
}




