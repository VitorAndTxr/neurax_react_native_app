import React from 'react';
import { H2, LoginTextLabel, PrimaryButton, RegularButtonText, PrimaryGreenButton, PrimaryRedButton} from '../BaseViewStyles';
import { Modal, SafeAreaView, View } from 'react-native';
import { useTherapistContext } from '../../context/TherapistContext';
import styled from 'styled-components/native';
import ReactSlider from 'react-slider'

export const DeletePatientModal = () => {
  const {
    showDeletePatientModal, setShowDeletePatientModal, onDeletePatient
  } = useTherapistContext();
  return (
    <Modal transparent={true} visible={showDeletePatientModal} animationType="slide">
        <ModalContainer>
          <ModalContent style={{maxHeight:250}}>
            <H2 style={{
              marginBottom: 20
            }}>
              Você tem certeza disso?
            </H2>
            <LoginTextLabel
              style={{
                marginBottom: 20,
                textAlign: 'center'
              }}>
              Uma vez excluído, não há mais como recuperar os dados!
            </LoginTextLabel>

            <View style={{flex: 1, justifyContent:'space-between', flexDirection: 'row'}}>

            <CustomPrimaryGreenButton activeOpacity={1} onPress={() => setShowDeletePatientModal(false)}>
              <RegularButtonText  style={{fontSize:20}}>
                Cancelar
              </RegularButtonText>
            </CustomPrimaryGreenButton>
            <CustomPrimaryRedButton activeOpacity={1} >
              <RegularButtonText  style={{fontSize:20}} onPress={() => onDeletePatient()}>
                Excluir
              </RegularButtonText>
            </CustomPrimaryRedButton>
                        

                </View>
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


  export const CustomPrimaryGreenButton = styled(PrimaryGreenButton)`
    margin-top:5px;
    padding: 15px 30px ;
`
export const CustomPrimaryRedButton = styled(PrimaryRedButton)`
    margin-top:5px;
    padding: 15px 40px;
`