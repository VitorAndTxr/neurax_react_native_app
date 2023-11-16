import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid } from 'react-native';
import { useAuthContext } from '../../framework/auth/AuthContextProvider';
import { UserProfileEnum } from '../../framework/domain/enum/UserProfileEnum';
import { BaseViewStyles, BigButtonText, LoggedViewStyles, LoginButton, PrimaryButton, PrimaryGreenButton, PrimaryRedButton, RegularButtonText } from '../components/BaseViewStyles';
import { useStackNavigatorContext } from '../routes/StackNavigatorProvider';
import styled from 'styled-components';


export function HomeScreen() {

    const{ 
        logout,
        userProfile
    } =  useAuthContext()

    const { push } = useStackNavigatorContext()

    return (
        <BaseViewStyles>
            <LoggedViewStyles style={{ flex: 1, flexDirection: 'col' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text>
                            Bem-vindo 
                        </Text>
                        <Text>
                            Fulano
                        </Text>
                    </View>
                    <PrimaryRedButton 
                        style={{marginStart:'auto'}}
                        activeOpacity={1}
                        onPress={logout}
                    >
                        <Text>
                            Logout
                        </Text>
                        
                    </PrimaryRedButton>
                </View>
                <View style={{ flex: 1, justifyContent:'center'}}>
                    {
                        userProfile === UserProfileEnum.Theraphist?
                        (
                        <PrimaryButton
                            activeOpacity={1}
                            onPress={()=>push('PatientList')}>
                            <RegularButtonText>
                                Lista de Pacientes
                            </RegularButtonText>
                        </PrimaryButton>
                        ):
                        (
                        <PrimaryGreenButton
                            activeOpacity={1}
                            onPress={()=>push('Camera')}>
                            <RegularButtonText>
                                Iniciar Sessão
                            </RegularButtonText>
                        </PrimaryGreenButton>
                        )}
                    <DeviceConnectButton
                        activeOpacity={1}
                        onPress={()=>push('BluetoothSetup')}
                        >
                        <RegularButtonText>
                            Conectar Dispositivo
                        </RegularButtonText>
                    </DeviceConnectButton>
                </View>

            </LoggedViewStyles>
        </BaseViewStyles>
    );
}

export const DeviceConnectButton = styled(PrimaryButton)`
    margin-top:30px;
`

