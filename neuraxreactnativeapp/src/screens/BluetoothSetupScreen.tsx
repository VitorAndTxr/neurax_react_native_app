import React, { useEffect, useState } from 'react';
import { Text, Switch, PermissionsAndroid, Button, StyleSheet, View } from 'react-native';
import { BaseViewStyles, H2, H3, LoggedViewStyles, LoginTextLabel, PrimaryButton, PrimaryRedButton, RegularButtonText } from './BaseViewStyles';
import { DeviceConnectButton } from './HomeScreen';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { BluetoothScreenHeaderComponent } from '../components/BluetoothSetup/BluetoothScreenHeaderComponent';
import { BluetoothDeviceInfoComponent } from '../components/BluetoothSetup/BluetoothDeviceInfoComponent';
import { Modal } from 'react-native';
import { useBluetoothContext } from '../context/BluetoothContext';
import styled from 'styled-components/native';


export function BluetoothSetupScreen() {
    return (
        <BaseViewStyles>
            <LoggedViewStyles style={{ flex: 1}}>
                <BluetoothScreenHeaderComponent/>
                <BluetoothDeviceInfoComponent />
                <ModalComponent/>
            </LoggedViewStyles>
        </BaseViewStyles>
    );
}

const ModalComponent = () => {
    const {
        showConnectionErrorModal,
        setShowConnectionErrorModal
    } = useBluetoothContext()
    return (
      <Modal transparent={true} visible={showConnectionErrorModal} animationType="slide">
        <ModalContainer>
          <ModalContent>
            <H2 style={{
                marginBottom:20
                }}>
                    Falha na conexão
            </H2>
            <LoginTextLabel 
                style={{
                    marginBottom:20, 
                    textAlign:'center'
                }}>
                O dispositivo selecionado não está disponível para conexão
            </LoginTextLabel>

            <PrimaryButton onPress={()=>setShowConnectionErrorModal(false)}>
                <RegularButtonText>
                    Ok
                </RegularButtonText>
            </PrimaryButton>
          </ModalContent>
        </ModalContainer>
      </Modal>
    );
  };
  
  const ModalContainer = styled.View`
      flex: 1;
      justify-content:center;
      align-items:center;
      background-color: #000000cc;
`

  const ModalContent = styled.View`
    background-color: white;
      padding: 20px;
      border-radius: 10px;
      margin-left:5px;
  `





