import React from 'react';
import { GyroscopeFinalResultsComponent } from './GyroscopeFinalResultsComponent';
import { GyroscopeMeasuringComponent } from './GyroscopeMeasuringComponent';
import { GyroscopeInstructionsComponent } from './GyroscopeInstructionsComponent';
import { GyroscopeMeasurementStateEnum } from '../../../domain/enum/GyroscopeMeasurementStateEnum';

export function BluetoothTestGyroscopeContentModal({
  modalState, initMeasurement, cancelMeasurement, restartMeasurement, totalAmplitude
}: BluetoothTestGyroscopeContentModalProps) {
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
          restartMeasurement={restartMeasurement}
          startSession={()=>{}}
          finishSession={()=>{}}
          totalAmplitude={totalAmplitude} />
      );
    default:
      (<></>);
  }
}
interface BluetoothTestGyroscopeContentModalProps {
  modalState: GyroscopeMeasurementStateEnum;
  totalAmplitude: number;
  initMeasurement: () => void;
  cancelMeasurement: () => void;
  restartMeasurement: () => void;
}
