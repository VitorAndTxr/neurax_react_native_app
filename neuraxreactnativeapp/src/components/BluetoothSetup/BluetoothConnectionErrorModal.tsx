import React from 'react';
import { H2, LoginTextLabel, ModalContainer, ModalContent, PrimaryButton, RegularButtonText } from '../BaseViewStyles';
import { Modal, SafeAreaView } from 'react-native';
import { useBluetoothContext } from '../../context/BluetoothContext';

export const BluetoothConnectionErrorModal = () => {
  const {
    showConnectionErrorModal, setShowConnectionErrorModal
  } = useBluetoothContext();
  return (
    <Modal transparent={true} visible={showConnectionErrorModal} animationType="slide">
        <ModalContainer>
          <ModalContent style={{maxHeight:250}}>
            <H2 style={{
              marginBottom: 20
            }}>
              Falha na conexão
            </H2>
            <LoginTextLabel
              style={{
                marginBottom: 20,
                textAlign: 'center'
              }}>
              O dispositivo selecionado não está disponível para conexão
            </LoginTextLabel>

            <PrimaryButton onPress={() => setShowConnectionErrorModal(false)}>
              <RegularButtonText>
                Ok
              </RegularButtonText>
            </PrimaryButton>
          </ModalContent>
        </ModalContainer>
    </Modal>
  );
};


