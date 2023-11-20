import React from 'react';
import { H2, ModalContainer, ModalContent, RegularButtonText } from '../BaseViewStyles';
import { Modal, View } from 'react-native';
import { CustomPrimaryGreenButton, CustomPrimaryRedButton } from '../PatientList/DeletePatientModal';
import { useSessionContext } from '../../context/SessionContext';


export const ConfirmExitSessionModal = () => {
  const { 
    finishSession,
    setShowConfirmExitModal,
    showConfirmExitModal
  } = useSessionContext();
  return (
    <Modal transparent={true} visible={showConfirmExitModal} animationType="slide">
      <ModalContainer>
        <ModalContent style={{ maxHeight: 250 }}>
          <H2 style={{
            marginBottom: 20
          }}>
            Você tem certeza que deseja finalizar a sessão?
          </H2>
          {/* <LoginTextLabel
              style={{
                marginBottom: 20,
                textAlign: 'center'
              }}>
              
            </LoginTextLabel> */}

          <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>

            <CustomPrimaryGreenButton activeOpacity={1} onPress={() => {setShowConfirmExitModal(false) }}>
              <RegularButtonText style={{ fontSize: 20 }}>
                Cancelar
              </RegularButtonText>
            </CustomPrimaryGreenButton>
            <CustomPrimaryRedButton activeOpacity={1}>
              <RegularButtonText style={{ fontSize: 20 }} onPress={() => {finishSession() }}>
                Finalizar
              </RegularButtonText>
            </CustomPrimaryRedButton>
          </View>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};
