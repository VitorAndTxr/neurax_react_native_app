import React from 'react';
import { View } from 'react-native';
import { H3, LoginTextBold, LoginTextLabel, PrimaryButton, PrimaryRedButton, RegularButtonText } from '../../screens/BaseViewStyles';
import { useBluetoothContext } from '../../context/BluetoothContext';
import { PairedDeviceListComponent } from './PairedDeviceListComponent';
import styled from 'styled-components';

export function BluetoothDeviceInfoComponent() {
    const {
        bluetoothOn, 
        initBluetooth, 
        neuraDevices, 
        selectedDevice,
        disconnect,
        setShowFesTestModal,
        setShowSEmgTestModal
    } = useBluetoothContext();

    const neuraRenderedDevices = [...neuraDevices];
    return (
        <View style={{
            paddingTop:30,
            paddingBottom:30,

        }}>
            <>
                {bluetoothOn ?
                    (
                        <>
                            {selectedDevice !== undefined ?
                                (
                                    <>
                                        <H3>
                                            Informações do dispositivo
                                        </H3>
                                        <View style={{
                                            flexDirection: "row"
                                        }}>
                                            <LoginTextLabel>
                                                Nome:
                                            </LoginTextLabel>
                                            <LoginTextBold
                                                style={{marginStart:'auto'}}
                                            >
                                                {selectedDevice.name}
                                            </LoginTextBold>
                                        </View>
                                        <View style={{
                                            flexDirection: "row"
                                        }}>
                                            <LoginTextLabel>
                                                Id:
                                            </LoginTextLabel>
                                            <LoginTextBold
                                                style={{marginStart:'auto'}}
                                            >
                                                {selectedDevice.address}
                                            </LoginTextBold>
                                        </View>
                                        <View style={{
                                            flexDirection: "row"
                                        }}>
                                            <LoginTextLabel>
                                                Bateria estímulo:
                                            </LoginTextLabel>
                                            <LoginTextBold
                                                style={{marginStart:'auto'}}
                                            >
                                                100%
                                            </LoginTextBold>
                                        </View>
                                        <View style={{
                                            flexDirection: "row"
                                        }}>
                                            <LoginTextLabel>
                                                Bateria Digital:
                                            </LoginTextLabel>
                                            <LoginTextBold
                                                style={{marginStart:'auto'}}
                                            >
                                                100%
                                            </LoginTextBold>
                                        </View>
                                        <TestButton 
                                            activeOpacity={1} 
                                            onPress={()=>setShowFesTestModal(true)} 
                                            style={{
                                                marginStart: 'auto',
                                                marginTop:30
                                            }}>
                                            <RegularButtonText>
                                                Testar FES
                                            </RegularButtonText>
                                        </TestButton>
                                        <TestButton 
                                            activeOpacity={1} 
                                            onPress={()=>setShowSEmgTestModal(true)} 
                                            style={{
                                                marginStart: 'auto',
                                                marginTop:20
                                            }}>
                                            <RegularButtonText>
                                                Testar sEMG
                                            </RegularButtonText>
                                        </TestButton>
                                        <TestButton 
                                            activeOpacity={1} 
                                            onPress={()=>console.log(selectedDevice)} 
                                            style={{
                                                marginStart: 'auto',
                                                marginTop:20
                                            }}>
                                            <RegularButtonText>
                                                Medir mobilidade
                                            </RegularButtonText>
                                        </TestButton>
                                        <DisconnectButton 
                                            activeOpacity={1} 
                                            onPress={disconnect} 
                                            style={{
                                                marginStart: 'auto',
                                                marginTop:20
                                            }}>
                                            <RegularButtonText>
                                                Desconectar
                                            </RegularButtonText>
                                        </DisconnectButton>
                                        
                                        
                                    </>
                                )
                                :
                                (
                                    <>
                                        {neuraRenderedDevices.length > 0 ?
                                            (<PairedDeviceListComponent />)
                                            :
                                            (
                                                <>
                                                    <LoginTextLabel>
                                                        Pareie e selecione um dispositivo NeuraEstimulator para começar
                                                    </LoginTextLabel>
                                                    <PrimaryButton activeOpacity={1} onPress={initBluetooth} style={{
                                                        marginStart: 'auto'
                                                    }}>
                                                        <RegularButtonText>
                                                            B
                                                        </RegularButtonText>
                                                    </PrimaryButton>
                                                </>
                                            )}
                                    </>
                                )}
                        </>
                    )
                    :
                    (
                        <LoginTextLabel>É necessário que o bluetooth esteja ativado e que um dispositivo compatível tenha sido pareado</LoginTextLabel>
                    )}
            </>
        </View>);
}

const TestButton = styled(PrimaryButton)`
    width:100%
`

const DisconnectButton = styled(PrimaryRedButton)`
    width:100%
`
