import React, { useEffect, useState } from 'react';
import { H2, LoginTextLabel, PrimaryButton, PrimaryRedButton, RegularButtonText } from '../../BaseViewStyles';
import { View } from 'react-native';
import { Divider } from '@rneui/themed';
import { useStackNavigatorContext } from '../../../routes/StackNavigatorProvider';
import { AppRoutesEnum } from '../../../routes/AppRoutesEnum';

export function GyroscopeMeasuringComponent({ cancelMeasurement }: BluetoothTestGyroscopeMeasuringComponentProps) {
  
  const {currentScreen} = useStackNavigatorContext()
  
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    setTimeout(() => setCounter(counter - 1), 1000);
  }, []);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <>
    {
      currentScreen===AppRoutesEnum.BluetoothSetup&&<Divider style={{ marginVertical: 10 }} />
    }
      <View style={{ justifyContent: 'center', height: 200 }}>
        <LoginTextLabel>
          Levante a costas da sua mão o máximo que conseguir:
        </LoginTextLabel>
        <H2>
          {counter}s
        </H2>
      </View>
      <Divider style={{ marginVertical: 5 }} />
      <PrimaryRedButton
        onPress={cancelMeasurement}
      >
        <RegularButtonText>
          Cancelar medida
        </RegularButtonText>
      </PrimaryRedButton>
    </>
  );
}

export function GyroscopeCalibrationComponent({ cancelMeasurement }: BluetoothTestGyroscopeMeasuringComponentProps) {
  
  const {currentScreen} = useStackNavigatorContext()
  
  const [counter, setCounter] = useState(2);

  useEffect(() => {
    setTimeout(() => setCounter(counter - 1), 1000);
  }, []);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <>
    {
      currentScreen===AppRoutesEnum.BluetoothSetup&&<Divider style={{ marginVertical: 10 }} />
    }
      <View style={{ justifyContent: 'center', height: 200 }}>
        <LoginTextLabel>
          Calibrando...
        </LoginTextLabel>
        <LoginTextLabel>
          Mantenha sua mão em repouso
        </LoginTextLabel>
      </View>
      <Divider style={{ marginVertical: 5 }} />
      <PrimaryRedButton
        onPress={cancelMeasurement}
      >
        <RegularButtonText>
          Cancelar medida
        </RegularButtonText>
      </PrimaryRedButton>
    </>
  );
}

interface BluetoothTestGyroscopeMeasuringComponentProps {
  cancelMeasurement: () => void;
}
