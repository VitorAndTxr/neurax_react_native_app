import React from 'react';
import { BluetoothTestGyroscopeFinalResultsComponent } from './BluetoothTestGyroscopeFinalResultsComponent';
import { BluetoothTestGyroscopeMeasuringComponent } from './BluetoothTestGyroscopeMeasuringComponent';
import { BluetoothTestGyroscopeInstructionsComponent } from './BluetoothTestGyroscopeInstructionsComponent';
import { BluetoothTestGyroscopeModalState } from './BluetoothTestGyroscopeModal';

export function BluetoothTestGyroscopeContentModal({
  modalState, initMeasurement, cancelMeasurement, restartMeasurement, totalAmplitude
}: BluetoothTestGyroscopeContentModalProps) {
  switch (modalState) {
    case BluetoothTestGyroscopeModalState.Instructions:
      return (
        <BluetoothTestGyroscopeInstructionsComponent
          initMeasurement={initMeasurement} />
      );
    case BluetoothTestGyroscopeModalState.Measuring:
      return (
        <BluetoothTestGyroscopeMeasuringComponent
          cancelMeasurement={cancelMeasurement} />
      );
    case BluetoothTestGyroscopeModalState.FinalResults:
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
  modalState: BluetoothTestGyroscopeModalState;
  totalAmplitude: number;
  initMeasurement: () => void;
  cancelMeasurement: () => void;
  restartMeasurement: () => void;
}
