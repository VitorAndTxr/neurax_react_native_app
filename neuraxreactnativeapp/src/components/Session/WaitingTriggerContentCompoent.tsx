import React, { useEffect, useState } from 'react';
import { H2, InputLabel, LoginTextLabel, ModalContent, PrimaryButton, PrimaryRedButton, RegularButtonText } from '../BaseViewStyles';
import { ToastAndroid, View } from 'react-native';
import { NeuraXBluetoothProtocolBodyPropertyEnum, useBluetoothContext } from '../../context/BluetoothContext';
import { useSessionContext } from '../../context/SessionContext';
import { StimulatingModalState } from './StimulatingModalState';
import SegmentService from '../../services/SegmentService';
import { SessionSegmentStatusEnum } from '../../domain/enum/SessionSegmentStatusEnum';

const segmentService = new SegmentService();

export function WaitingTriggerContentCompoent() {

  const { 
    setStimulationModalState, 
    setShowStimulationModal, 
    setStimulatingTimeout,
    stimulatingTimeout,
    repetitions,
    setRepetitions,
    emergencyStopRepetition,
    emergencyStopHandle
    

  } = useSessionContext()

  const { 
    triggerDettected,
    emergencyStop,
    setTriggerDetected,
    pauseSession 
  } = useBluetoothContext()

  const [counter, setCounter] = useState(10);

  function createTimeout(){
    const timeout = setTimeout(() => setCounter(counter - 1), 1000);
    setStimulatingTimeout(timeout)
  }
  useEffect(() => {
    createTimeout()
  }, []);


  useEffect(() => {
    if(triggerDettected){
      segmentService.smgDetected(repetitions[repetitions.length-1].id)
  
      if(stimulatingTimeout){
        clearTimeout(stimulatingTimeout)
        setStimulatingTimeout(null)
      }

      setRepetitions(current=>{
        let test = [...current]
        test[repetitions.length-1].intensity = SessionSegmentStatusEnum.Done

        return test
      })
  
  
      setStimulationModalState(StimulatingModalState.Stimulating)
    }
  }, [triggerDettected]);

  useEffect(() => {
    if(emergencyStop){
      pauseSession()
      emergencyStopRepetition()
    }
  }, [emergencyStop]);

  useEffect(() => {
    if(counter>0){
      createTimeout()
    }else{
      setStimulatingTimeout(null)
      setShowStimulationModal(false)
      setStimulationModalState(StimulatingModalState.Instructions)
      pauseSession()
      showToast()
    }
  }, [counter]);

  const showToast = () => {
    ToastAndroid.show('Gatilho não detectado, diminua a dificuldade', ToastAndroid.CENTER);
  };
  
  return (
    <ModalContent style={{ maxHeight: 300 }}>
      <H2 style={{
        marginBottom: 20
      }}>
        Tente mover o pulso
      </H2>
      <LoginTextLabel>        
        Levante as costas de sua mão o máximo que conseguir:
      </LoginTextLabel>
      <H2>
        {counter}
      </H2>
      <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
        <PrimaryRedButton activeOpacity={1} onPress={emergencyStopHandle}>
          <RegularButtonText style={{ fontSize: 20 }}>
            Parada de Emergência
          </RegularButtonText>
        </PrimaryRedButton>
      </View>
    </ModalContent>
  );
}
