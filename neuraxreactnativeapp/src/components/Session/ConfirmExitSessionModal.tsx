import React from 'react';
import { H2, ModalContainer, ModalContent, RegularButtonText } from '../BaseViewStyles';
import { Modal, View } from 'react-native';
import { CustomPrimaryGreenButton, CustomPrimaryRedButton } from '../PatientList/DeletePatientModal';


export const ConfirmExitSessionModal = () => {

  return (
    <Modal transparent={true} visible={false} animationType="slide">
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

            <CustomPrimaryGreenButton activeOpacity={1} onPress={() => { }}>
              <RegularButtonText style={{ fontSize: 20 }}>
                Cancelar
              </RegularButtonText>
            </CustomPrimaryGreenButton>
            <CustomPrimaryRedButton activeOpacity={1}>
              <RegularButtonText style={{ fontSize: 20 }} onPress={() => { }}>
                Finalizar
              </RegularButtonText>
            </CustomPrimaryRedButton>
          </View>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};
