import React from 'react';
import { LoginTextLabel, PrimaryButton, RegularButtonText } from '../../BaseViewStyles';
import { View } from 'react-native';
import { Divider } from '@rneui/themed';

export function BluetoothTestGyroscopeInstructionsComponent({ initMeasurement }: BluetoothTestGyroscopeInstructionsComponentProps) {
  return (
    <>
      <Divider style={{ marginVertical: 10 }} />
      <View style={{ justifyContent: 'center', height: 200 }}>
        <LoginTextLabel>
          O paciente deve estar com o pulso em posição de repouso antes de iniciar a medição para garantir a precisão da medida
        </LoginTextLabel>
      </View>
      <Divider style={{ marginVertical: 5 }} />
      <PrimaryButton
        onPress={initMeasurement}
      >
        <RegularButtonText>
          Iniciar medição
        </RegularButtonText>
      </PrimaryButton>
    </>
  );
}
interface BluetoothTestGyroscopeInstructionsComponentProps {
  initMeasurement: () => void;
}
