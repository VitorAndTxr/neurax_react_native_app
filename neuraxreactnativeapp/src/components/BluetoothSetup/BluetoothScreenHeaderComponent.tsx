import React from 'react';
import { View } from 'react-native';
import { H2, LoginTextLabel, PrimaryButton, RegularButtonText } from '../../screens/BaseViewStyles';
import { useBluetoothContext } from '../../context/BluetoothContext';

export function BluetoothScreenHeaderComponent() {
    const {
        bluetoothOn, openBluetoothSettings,
    } = useBluetoothContext();

    return (
        <View style={{
            justifyContent: 'center',
            flexDirection: 'col',
            marginTop:'300px',
        }}>
            <H2>
                Conectar Dispositivo
            </H2>
            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{
                    justifyContent: 'center',
                    flexDirection: 'col'
                }}>
                    <LoginTextLabel>
                        Seu bluetooth está
                    </LoginTextLabel>
                    <LoginTextLabel>
                        {bluetoothOn ? "Ativado" : "Desativado"}
                    </LoginTextLabel>
                </View>
                <View style={{
                    justifyContent: 'center',
                    marginStart: 'auto'
                }}>
                    <PrimaryButton activeOpacity={1} onPress={openBluetoothSettings} style={{
                        marginStart: 'auto'
                    }}>
                        <RegularButtonText>
                            B
                        </RegularButtonText>
                    </PrimaryButton>
                </View>
            </View>
        </View>
    );
}
