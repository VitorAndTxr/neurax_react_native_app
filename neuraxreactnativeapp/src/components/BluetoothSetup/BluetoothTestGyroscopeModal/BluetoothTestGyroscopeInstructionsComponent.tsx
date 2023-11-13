import React from 'react';
import { LoginTextLabel, PrimaryButton, PrimaryRedButton, RegularButtonText } from '../../BaseViewStyles';
import { View } from 'react-native';
import { Divider } from '@rneui/themed';
import { useStackNavigatorContext } from '../../../routes/StackNavigatorProvider';
import { AppRoutesEnum } from '../../../routes/AppRoutesEnum';
import { useSessionContext } from '../../../context/SessionContext';

export function BluetoothTestGyroscopeInstructionsComponent({ initMeasurement }: BluetoothTestGyroscopeInstructionsComponentProps) {
  const {currentScreen} = useStackNavigatorContext()
  const {cancelSession} = useSessionContext()
  
  return (
    <>
      {
        currentScreen!==AppRoutesEnum.Session&&<Divider style={{ marginVertical: 10 }} />
      }
      <View style={{ justifyContent: 'center', height: (currentScreen===AppRoutesEnum.Session?'auto':200)}}>
      {
        currentScreen===AppRoutesEnum.Session&&
        <>
          <LoginTextLabel style={{marginBottom:30}}>
            Afim de avaliar o progresso do paciente ao longo do tempo, é necessário salvar informações sobre a amplitude da movimentação do punho do paciente
          </LoginTextLabel>
        </>
      }
        <LoginTextLabel style={{ marginBottom: (currentScreen===AppRoutesEnum.Session?30:0)}}>
          O paciente deve estar com o pulso em posição de repouso antes de iniciar a medição para garantir a precisão da medida
        </LoginTextLabel>
      </View>
      {
        currentScreen!==AppRoutesEnum.Session&&<Divider style={{ marginVertical: 10 }} />
      }
      <PrimaryButton
        onPress={initMeasurement}
      >
        <RegularButtonText>
          Iniciar medição
        </RegularButtonText>
      </PrimaryButton>
      {
        currentScreen===AppRoutesEnum.Session&&
        <PrimaryRedButton
          onPress={()=>cancelSession()}
          style={{marginTop:20}}
        >
          <RegularButtonText>
            Cancelar
          </RegularButtonText>
        </PrimaryRedButton>
      }
    </>
  );
}
interface BluetoothTestGyroscopeInstructionsComponentProps {
  initMeasurement: () => void;
}
