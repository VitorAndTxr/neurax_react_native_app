import React, { useState } from 'react';
import { ModalContainer } from '../BaseViewStyles';
import { Modal } from 'react-native';
import { FesInstructionsContentCompoent } from './FesInstructionsContentCompoent';
import { WaitingTriggerContentCompoent } from './WaitingTriggerContentCompoent';
import { FesStimulationContentCompoent } from './FesStimulationContentCompoent';
import { useSessionContext } from '../../context/SessionContext';
import { StimulatingModalState } from './StimulatingModalState';


export function StimulatingModal() {

  const { 
    showStimulationModal,
    stimulationModalState,
    cancelRepetition
  } = useSessionContext();

  function requescClose(){
    if(stimulationModalState === StimulatingModalState.Instructions){
      cancelRepetition()
    }
  }

  return (
    <Modal 
      transparent={true} 
      visible={showStimulationModal}
      onRequestClose={requescClose}
      animationType="slide">
      <ModalContainer>
        {
        <StimulatingModalContent
          modalState={stimulationModalState} 
        />}
      </ModalContainer>
    </Modal>
  );
}
;
export function StimulatingModalContent({ modalState }: StimulatingModalContentProps) {
  switch (modalState) {
    case StimulatingModalState.Instructions:
      return (
        <FesInstructionsContentCompoent />
      );
    case StimulatingModalState.WaitingTrigger:
      return (
        <WaitingTriggerContentCompoent />

      );
    case StimulatingModalState.Stimulating:
      return (
        <FesStimulationContentCompoent />
      );
    default:
      return <></>;
  }
}
interface StimulatingModalContentProps {
  modalState: StimulatingModalState;
}
