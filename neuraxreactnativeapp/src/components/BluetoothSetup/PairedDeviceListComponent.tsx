import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { LoginTextLabel } from '../../screens/BaseViewStyles';
import { useBluetoothContext } from '../../context/BluetoothContext';
import styled from 'styled-components/native';

export function PairedDeviceListComponent() {
    const {
         neuraDevices, connectBluetooth
    } = useBluetoothContext();
    const neuraRenderedDevices = [...neuraDevices];

    return (<>
        <LoginTextLabel>
            Lista de Neura devices
        </LoginTextLabel>
        <SafeAreaView>
            <ScrollView>
                {neuraRenderedDevices.map((neuraDevice) => {
                    return (
                        <CardStyle
                            key={neuraDevice.id}
                            onPress={() => connectBluetooth(neuraDevice.address)}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <LoginTextLabel>
                                    Nome:
                                </LoginTextLabel>
                                <LoginTextLabel style={{ marginStart: 'auto' }}>
                                    {neuraDevice.name}
                                </LoginTextLabel>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <LoginTextLabel>
                                    Id:
                                </LoginTextLabel>
                                <LoginTextLabel style={{ marginStart: 'auto' }}>
                                    {neuraDevice.id}
                                </LoginTextLabel>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <LoginTextLabel>
                                    Ativo:
                                </LoginTextLabel>
                                <LoginTextLabel style={{ marginStart: 'auto' }}>
                                    {neuraDevice.active ? ("Ativo") : ("Indisponivel")}
                                </LoginTextLabel>
                            </View>
                        </CardStyle>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    </>);
}
const CardStyle = styled.TouchableOpacity`
    background-color:#D3EBF5;
    elevation:10;
    flex:1;
    margin:10px 0px;
    border-radius:10px;
    padding: 15px; 
`;
