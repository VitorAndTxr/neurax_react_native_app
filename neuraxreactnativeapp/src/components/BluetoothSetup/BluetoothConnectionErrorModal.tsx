import React from 'react';
import { H2, LoginTextLabel, PrimaryButton, RegularButtonText } from '../BaseViewStyles';
import { Modal, SafeAreaView } from 'react-native';
import { useBluetoothContext } from '../../context/BluetoothContext';
import styled from 'styled-components/native';
import ReactSlider from 'react-slider'

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

export const ModalContainer = styled.View`
      flex: 1;
      justify-content:center;
      align-items:center;
      background-color: #000000cc;
`;
export const ModalContent = styled.ScrollView`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    margin-left:5px;
    max-height:750px;
  `;
