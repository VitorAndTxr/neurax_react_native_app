import React from 'react';
import { H2, PrimaryButton, RegularButtonText } from '../../BaseViewStyles';
import { View } from 'react-native';
import { Divider } from '@rneui/themed';

export function BluetoothTestGyroscopeFinalResultsComponent({ restartMeasurement, totalAmplitude }: BluetoothTestGyroscopeFinalResultsComponentProps) {
  return (
    <>
      <Divider style={{ marginVertical: 10 }} />
      <View style={{ justifyContent: 'center', height: 200 }}>
        <H2>
          Amplitude Máxima:{totalAmplitude}º
        </H2>
      </View>
      <Divider style={{ marginVertical: 5 }} />
      <PrimaryButton
        onPress={restartMeasurement}
      >
        <RegularButtonText>
          Repetir
        </RegularButtonText>
      </PrimaryButton>
    </>
  );
}
interface BluetoothTestGyroscopeFinalResultsComponentProps {
  restartMeasurement: () => void;
  totalAmplitude: number;
}
