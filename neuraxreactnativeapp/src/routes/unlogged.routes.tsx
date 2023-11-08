import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { BluetoothSetupScreen } from '../screens/BluetoothSetupScreen';
import { LoginScreenContextProvider } from '../context/LoginScreenContext';
import { useStackNavigatorContext } from './StackNavigatorProvider';
import React from 'react';
import { PatientListScreen } from '../screens/PatientListScreen';
import { PatientDetailsScreen } from '../screens/PatientDetailsScreen';


export function UnloggedRoutes(){

    const {currentScreen} = useStackNavigatorContext()

    switch (currentScreen) {
        case 'Login':
          return (
            <LoginScreenContextProvider>
                <LoginScreen/>
            </LoginScreenContextProvider>
          );
    
        default:
          return <div>Screen not found</div>;
      }
}

export function UserRoutes(){
    const {currentScreen} = useStackNavigatorContext()

    switch (currentScreen) {
        case 'Home':
          return (
            <HomeScreen/>
          );
        case 'BluetoothSetup':
          return(
            <BluetoothSetupScreen/>
          );
        case 'PatientList':
          return(
            <PatientListScreen/>
          );
          case 'PatientDetails':
            return(
              <PatientDetailsScreen/>
            );  
        default:
          return <div>Screen not found</div>;
      }
}