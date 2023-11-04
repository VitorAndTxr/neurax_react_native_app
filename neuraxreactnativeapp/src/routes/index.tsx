import { UnloggedRoutes, UserRoutes } from './unlogged.routes';
import { useAuthContext } from '../../framework/auth/AuthContextProvider';
import { UserProfileEnum } from '../../framework/domain/enum/UserProfileEnum';
import { StackNavigatorContextProvider } from './StackNavigatorProvider';
import { BluetoothContextProvider } from '../context/BluetoothContext';
import React from 'react';


export function Routes(){
    const{ 
        userProfile,
    } =  useAuthContext()

    if(userProfile===UserProfileEnum.Unlogged){
        return(
            <StackNavigatorContextProvider
                InitialScreen='Login'
            >
                <UnloggedRoutes/>
            </StackNavigatorContextProvider>
        )
    }
    return(
        <StackNavigatorContextProvider
            InitialScreen='Home'
        >
            <BluetoothContextProvider>
                <UserRoutes/>
            </BluetoothContextProvider>
        </StackNavigatorContextProvider>
    )

}