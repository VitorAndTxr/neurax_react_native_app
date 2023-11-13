import React from 'react';
import { H2, PrimaryButton, PrimaryGreenButton, RegularButtonText } from '../../BaseViewStyles';
import { View } from 'react-native';
import { Divider } from '@rneui/themed';
import { useStackNavigatorContext } from '../../../routes/StackNavigatorProvider';
import { AppRoutesEnum } from '../../../routes/AppRoutesEnum';

export function GyroscopeFinalResultsComponent({ 
  restartMeasurement, 
  startSession, 
  totalAmplitude 
}: BluetoothTestGyroscopeFinalResultsComponentProps) {

  const { currentScreen}= useStackNavigatorContext()

  return (
    <>
      {
        currentScreen===AppRoutesEnum.BluetoothSetup&&<Divider style={{ marginVertical: 10 }} />
      }
      <View style={{ justifyContent: 'center', height: 200 }}>
        <H2>
          Amplitude Máxima:{totalAmplitude}º
        </H2>
      </View>
      {
        currentScreen===AppRoutesEnum.Session 
        &&
        <>
          <PrimaryGreenButton
            onPress={startSession}
            style={{marginBottom:40}}
          >
            <RegularButtonText>
              Iniciar Sessão
            </RegularButtonText>
          </PrimaryGreenButton>
        </>
      }
      {
        currentScreen===AppRoutesEnum.BluetoothSetup 
        &&
        <>
          <Divider style={{ marginVertical: 5 }} />
        </>
      }
      <PrimaryButton
        onPress={restartMeasurement}
      >
        <RegularButtonText>
          Repetir Medição
        </RegularButtonText>
      </PrimaryButton>

    </>
  );
}

interface BluetoothTestGyroscopeFinalResultsComponentProps {
  restartMeasurement: () => void;
  startSession:() => void
  totalAmplitude: number;
}
