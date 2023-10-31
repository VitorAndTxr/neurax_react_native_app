import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useAuthContext } from '../../framework/auth/AuthContextProvider';
import { UserProfileEnum } from '../../framework/domain/enum/UserProfileEnum';
import { BigButtonText, LoginButton } from './BaseViewStyles';


export function HomeScreen() {

    const{ 
        logout,
        userProfile
    } =  useAuthContext()

    useEffect(() => {

    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'blue' , justifyContent:'center'}}>
            <BigButtonText>{userProfile === UserProfileEnum.Theraphist?("Terapeuta"):("Paciente")}</BigButtonText>
            <LoginButton
                activeOpacity={1}
                onPress={logout}>
                <BigButtonText>
                    logout
                </BigButtonText>
            </LoginButton>
        </View>
    );
}
