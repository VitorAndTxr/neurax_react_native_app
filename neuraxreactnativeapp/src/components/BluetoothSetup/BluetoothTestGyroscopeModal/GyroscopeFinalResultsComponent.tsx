import React from 'react';
import { H2, PrimaryButton, PrimaryGreenButton, PrimaryRedButton, RegularButtonText } from '../../BaseViewStyles';
import { View } from 'react-native';
import { Divider } from '@rneui/themed';
import { useStackNavigatorContext } from '../../../routes/StackNavigatorProvider';
import { AppRoutesEnum } from '../../../routes/AppRoutesEnum';
import { useSessionContext } from '../../../context/SessionContext';

export function GyroscopeFinalResultsComponent({ 
  restartMeasurement, 
  startSession, 
  finishSession,
  totalAmplitude 
}: BluetoothTestGyroscopeFinalResultsComponentProps) {

  const { currentScreen}= useStackNavigatorContext()
  const {session} = useSessionContext()

  return (
    <>
      {
        currentScreen===AppRoutesEnum.BluetoothSetup&&<Divider style={{ marginVertical: 10 }} />
      }
      <View style={{ justifyContent: 'center', height: 200 }}>
        <H2>
          Amplitude Máxima:{totalAmplitude.toFixed(2)}º
        </H2>
      </View>
      {
        currentScreen===AppRoutesEnum.Session&&session.startWristAmplitudeMeasurement===0
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
        currentScreen===AppRoutesEnum.Session&&session.startWristAmplitudeMeasurement!==0
        &&
        <>
          <PrimaryRedButton
            onPress={finishSession}
            style={{marginBottom:40}}
          >
            <RegularButtonText>
              Finaliza Sessão
            </RegularButtonText>
          </PrimaryRedButton>
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
  finishSession:() => void

  totalAmplitude: number;
}
