import React, { useEffect, useState } from 'react';
import { H2, InputLabel, ModalContent, PrimaryButton, RegularButtonText } from '../BaseViewStyles';
import { ToastAndroid, View } from 'react-native';
import { NeuraXBluetoothProtocolBodyPropertyEnum, useBluetoothContext } from '../../context/BluetoothContext';
import { useSessionContext } from '../../context/SessionContext';
import { StimulatingModalState } from './StimulatingModalState';

export function FesStimulationContentCompoent() {
  const {fesParams} = useBluetoothContext()

  const [counter, setCounter] = useState(fesParams[NeuraXBluetoothProtocolBodyPropertyEnum.STIMULI_DURATION]!);

  const { 
    setStimulationModalState,
    setShowStimulationModal,
    setStimulatingTimeout,
    emergencyStopRepetition
  } = useSessionContext();

  function createTimeout(){
    const timeout = setTimeout(() => setCounter(counter - 0.1), 100);
    setStimulatingTimeout(timeout)
  }

  useEffect(() => {
    createTimeout
  }, []);

  useEffect(() => {
    if(counter>0){
      createTimeout()
    }else{
      setStimulatingTimeout(null)
      setShowStimulationModal(false)
      setStimulationModalState(StimulatingModalState.Instructions)
      showToast()
    }
  }, [counter]);

  const showToast = () => {
    ToastAndroid.show('Repetição finalizada com sucesso', ToastAndroid.CENTER);
  };
  
  return (
    <ModalContent style={{ maxHeight: 300 }}>
      <H2 style={{
        marginBottom: 20
      }}>
        Estimulando...
      </H2>
      <InputLabel>
      Continue levantando as costas da sua mão o máximo que conseguir:
      </InputLabel>
      <H2>
        {counter.toFixed(1)}
      </H2>
      <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>

        <PrimaryButton activeOpacity={1} onPress={() => {emergencyStopRepetition() }}>
          <RegularButtonText style={{ fontSize: 20 }}>
            Cancelar
          </RegularButtonText>
        </PrimaryButton>
      </View>
    </ModalContent>
  );
}
