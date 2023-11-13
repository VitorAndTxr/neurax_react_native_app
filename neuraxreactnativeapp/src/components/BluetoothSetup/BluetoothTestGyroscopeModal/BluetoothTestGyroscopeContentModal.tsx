import React from 'react';
import { BluetoothTestGyroscopeFinalResultsComponent } from './BluetoothTestGyroscopeFinalResultsComponent';
import { BluetoothTestGyroscopeMeasuringComponent } from './BluetoothTestGyroscopeMeasuringComponent';
import { BluetoothTestGyroscopeInstructionsComponent } from './BluetoothTestGyroscopeInstructionsComponent';
import { GyroscopeMeasurementStateEnum } from '../../../domain/enum/GyroscopeMeasurementStateEnum';

export function BluetoothTestGyroscopeContentModal({
  modalState, initMeasurement, cancelMeasurement, restartMeasurement, totalAmplitude
}: BluetoothTestGyroscopeContentModalProps) {
  switch (modalState) {
    case GyroscopeMeasurementStateEnum.Instructions:
      return (
        <BluetoothTestGyroscopeInstructionsComponent
          initMeasurement={initMeasurement} />
      );
    case GyroscopeMeasurementStateEnum.Measuring:
      return (
        <BluetoothTestGyroscopeMeasuringComponent
          cancelMeasurement={cancelMeasurement} />
      );
    case GyroscopeMeasurementStateEnum.FinalResults:
      return (
        <BluetoothTestGyroscopeFinalResultsComponent
          restartMeasurement={restartMeasurement}
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
