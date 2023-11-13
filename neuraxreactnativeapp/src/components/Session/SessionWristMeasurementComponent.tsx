import React, { useEffect, useState } from 'react';
import { H2 } from '../BaseViewStyles';
import { GyroscopeMeasurementStateEnum } from '../../domain/enum/GyroscopeMeasurementStateEnum';
import { GyroscopeInstructionsComponent } from '../BluetoothSetup/BluetoothTestGyroscopeModal/GyroscopeInstructionsComponent';
import { View } from 'react-native';
import { GyroscopeMeasuringComponent } from '../BluetoothSetup/BluetoothTestGyroscopeModal/GyroscopeMeasuringComponent';
import { GyroscopeFinalResultsComponent } from '../BluetoothSetup/BluetoothTestGyroscopeModal/GyroscopeFinalResultsComponent';
import { useSessionContext } from '../../context/SessionContext';
import { SessionStateEnum } from '../../domain/enum/SessionStateEnum';

export function SessionWristMeasurementComponent() {

  const gyroscopeMeasurementTimeMS = 10*1000

  const {setSessionState} = useSessionContext()
  const [measurementTimeout, setMeasurementTimeout] = useState<NodeJS.Timeout|undefined>();

  const [modalState, setModalState] = useState<GyroscopeMeasurementStateEnum>(GyroscopeMeasurementStateEnum.Instructions);

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

  function startSession(){
    setSessionState(SessionStateEnum.ConfiguringStimulus)
  }

  function initMeasurement(){
    setModalState(GyroscopeMeasurementStateEnum.Measuring)
  }

  function cancelMeasurement(){
    clearTimeout(measurementTimeout)
    setMeasurementTimeout(undefined) 
    setModalState(GyroscopeMeasurementStateEnum.Instructions)
  }

  function restartMeasurement(){
    setModalState(GyroscopeMeasurementStateEnum.Instructions) 
  }
  
  return (
    <>
      <H2 style={{
        marginBottom: 10
      }}>
        Teste de mobilidade
      </H2>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <SessionWristMeasurementContentComponent
          modalState={modalState}
          startSession={startSession}
          initMeasurement={initMeasurement}
          cancelMeasurement={cancelMeasurement}
          restartMeasurement={restartMeasurement}
          totalAmplitude={0} />
      </View>
    </>
  );
}

export function SessionWristMeasurementContentComponent({
  modalState, 
  startSession, 
  initMeasurement,
  cancelMeasurement, 
  restartMeasurement, 
  totalAmplitude
}: SessionWristMeasurementContentComponentProps) 
{
  switch (modalState) {
    case GyroscopeMeasurementStateEnum.Instructions:
      return (
        <GyroscopeInstructionsComponent
          initMeasurement={initMeasurement} />
      );
    case GyroscopeMeasurementStateEnum.Measuring:
      return (
        <GyroscopeMeasuringComponent
          cancelMeasurement={cancelMeasurement} />
      );
    case GyroscopeMeasurementStateEnum.FinalResults:
      return (
        <GyroscopeFinalResultsComponent
          startSession={startSession}
          restartMeasurement={restartMeasurement}
          totalAmplitude={totalAmplitude} />
      );
    default:
      (<></>);
  }
}

interface SessionWristMeasurementContentComponentProps {
  modalState: GyroscopeMeasurementStateEnum;
  totalAmplitude: number;
  initMeasurement: () => void;
  cancelMeasurement: () => void;
  restartMeasurement: () => void;
  startSession: () => void;
}
