import { UnloggedRoutes, UserRoutes } from './unlogged.routes';
import { useAuthContext } from '../../framework/auth/AuthContextProvider';
import { UserProfileEnum } from '../../framework/domain/enum/UserProfileEnum';
import { StackNavigatorContextProvider } from './StackNavigatorProvider';
import { BluetoothContextProvider } from '../context/BluetoothContext';
import { TherapistContextProvider } from '../context/TherapistContext';

import React from 'react';


export function Routes(){
    const{ 
        userProfile,
    } =  useAuthContext()
    switch(userProfile){
        case UserProfileEnum.Theraphist:
            return(
            <StackNavigatorContextProvider InitialScreen='Home'>
                <BluetoothContextProvider>
                    <TherapistContextProvider>
                        <UserRoutes/>
                    </TherapistContextProvider>
                </BluetoothContextProvider>
            </StackNavigatorContextProvider>
            )
        case UserProfileEnum.Patient:
            return(
            <>
            </>)
        default:
            return(
                <StackNavigatorContextProvider InitialScreen='Login'>
                    <UnloggedRoutes/>
                </StackNavigatorContextProvider>
            )
    }
}