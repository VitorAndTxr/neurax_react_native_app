import React, { useEffect, useState } from 'react';
import { H2, LoginTextLabel, PrimaryButton, RegularButtonText } from '../../BaseViewStyles';
import { View } from 'react-native';
import { Divider } from '@rneui/themed';

export function BluetoothTestGyroscopeMeasuringComponent({ cancelMeasurement }: BluetoothTestGyroscopeMeasuringComponentProps) {
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    setTimeout(() => setCounter(counter - 1), 1000);
  }, []);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <>
      <Divider style={{ marginVertical: 10 }} />
      <View style={{ justifyContent: 'center', height: 200 }}>
        <LoginTextLabel>
          Levante a costas da sua mão o máximo que conseguir:
        </LoginTextLabel>
        <H2>
          {counter}s
        </H2>
      </View>
      <Divider style={{ marginVertical: 5 }} />
      <PrimaryButton
        onPress={cancelMeasurement}
      >
        <RegularButtonText>
          Iniciar medição
        </RegularButtonText>
      </PrimaryButton>
    </>
  );
}
interface BluetoothTestGyroscopeMeasuringComponentProps {
  cancelMeasurement: () => void;
}
