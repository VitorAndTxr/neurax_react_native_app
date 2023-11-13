import React, { useState } from 'react';
import { useSessionContext } from '../../context/SessionContext';
import { SessionStateEnum } from '../../domain/enum/SessionStateEnum';
import { H2, LoginTextLabel } from '../BaseViewStyles';
import { GyroscopeMeasurementStateEnum } from '../../domain/enum/GyroscopeMeasurementStateEnum';
import { BluetoothTestGyroscopeInstructionsComponent } from '../BluetoothSetup/BluetoothTestGyroscopeModal/BluetoothTestGyroscopeInstructionsComponent';
import { View } from 'react-native';

export function SessionScreenComponent() {
  const { sessionState } = useSessionContext();

  switch (sessionState) {
    case SessionStateEnum.SendPhoto:
      return (
        <>

        </>
      );
    case SessionStateEnum.MeasureWrist:
      return (
        <SessionWristMeasurementComponent/>
      );
    case SessionStateEnum.ConfiguringStimulus:
      return (
        <ConfiguringStimulusComponent/>
      );
  }
  return (
    <>
    </>
  );
}



function ConfiguringStimulusComponent(){
  return(
    <LoginTextLabel>
      Configurando Estimulo
    </LoginTextLabel>
  )
}


function SessionWristMeasurementComponent(){

  const [modalState, setModalState] = useState<GyroscopeMeasurementStateEnum>(GyroscopeMeasurementStateEnum.Instructions);

  return(
    <>
      <H2 style={{
        marginBottom: 10
            }}>
          Teste de mobilidade
      </H2>
      <View style={{flex:1, justifyContent:'center'}}>
        <SessionWristMeasurementContentComponent
          modalState={modalState}
          initMeasurement={()=>{}}
          cancelMeasurement={()=>{}}
          restartMeasurement={()=>{}}
          totalAmplitude={0}
        />
      </View>
    </>
  )
}

function SessionWristMeasurementIntructionsComponent(){

}

export function SessionWristMeasurementContentComponent({
  modalState, initMeasurement, cancelMeasurement, restartMeasurement, totalAmplitude
}: SessionWristMeasurementContentComponentProps) {
  switch (modalState) {
    case GyroscopeMeasurementStateEnum.Instructions:
      return (
      <BluetoothTestGyroscopeInstructionsComponent
        initMeasurement={initMeasurement}/>
      );
    case GyroscopeMeasurementStateEnum.Measuring:
      return (
        <>
        </>
      );
    case GyroscopeMeasurementStateEnum.FinalResults:
      return (
        <>
        </>
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
}
