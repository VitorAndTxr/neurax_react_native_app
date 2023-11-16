import React, { useEffect, useState } from 'react';
import { H2, ModalContainer, ModalContent } from '../../BaseViewStyles';
import { Modal } from 'react-native';
import {  useBluetoothContext } from '../../../context/BluetoothContext';
import { BluetoothTestGyroscopeContentModal } from './BluetoothTestGyroscopeContentModal';
import { GyroscopeMeasurementStateEnum } from '../../../domain/enum/GyroscopeMeasurementStateEnum';

export const BluetoothTestGyroscopeModal = () => {
  const {
    setShowTestGyroscopeModal, 
    showTestGyroscopeModal, 
    wristAmplitude,
    measureAmplitude
  } = useBluetoothContext();

  const gyroscopeMeasurementTimeMS = 15000

  const [modalState, setModalState] = useState<GyroscopeMeasurementStateEnum>(GyroscopeMeasurementStateEnum.Instructions);
  const [measurementTimeout, setMeasurementTimeout] = useState<NodeJS.Timeout|undefined>();

  useEffect(()=>{
    if(modalState===GyroscopeMeasurementStateEnum.Measuring){

      const timeOut = setTimeout(
      ()=>{
        setModalState(GyroscopeMeasurementStateEnum.FinalResults)
      }
      , gyroscopeMeasurementTimeMS)

      setMeasurementTimeout(timeOut)
    }
  },[modalState])

  function initMeasurement() {
    setModalState(GyroscopeMeasurementStateEnum.Measuring)
    measureAmplitude()
  }

  function cancelMeasurement() {    
    clearTimeout(measurementTimeout)
    setMeasurementTimeout(undefined) 
    setModalState(GyroscopeMeasurementStateEnum.Instructions)
  }

  function restartMeasurement() {
    setModalState(GyroscopeMeasurementStateEnum.Instructions)
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

