import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { BluetoothSetupScreen } from '../screens/BluetoothSetupScreen';
import { LoginScreenContextProvider } from '../context/LoginScreenContext';
import { useStackNavigatorContext } from './StackNavigatorProvider';
import React from 'react';
import { PatientListScreen } from '../screens/PatientListScreen';
import { PatientDetailsScreen } from '../screens/PatientDetailsScreen';
import { PatientFormScreen } from '../screens/PatientFormScreen';
import { SessionScreen } from '../screens/SessionScreen';
import { SessionContextProvider } from '../context/SessionContext';
import { useTherapistContext } from '../context/TherapistContext';
import { AppRoutesEnum } from './AppRoutesEnum';
import { CameraScreen } from '../screens/CameraScreen';
import { SessionListScreen } from '../screens/SessionListScreen';
import { SessionDetailsScreen } from '../screens/SessionDetailsScreen';


export function UnloggedRoutes(){

    const {currentScreen} = useStackNavigatorContext()

    switch (currentScreen) {
        case AppRoutesEnum.Login:
          return (
            <LoginScreenContextProvider>
                <LoginScreen/>
            </LoginScreenContextProvider>
          );
    
        default:
          return <div>Screen not found</div>;
      }
}

export function TherapistRoutes(){
    const {currentScreen} = useStackNavigatorContext()

    const {selectedPatient} = useTherapistContext()

    switch (currentScreen) {
        case AppRoutesEnum.Home:
          return (
            <HomeScreen/>
          );
        case AppRoutesEnum.BluetoothSetup:
          return(
            <BluetoothSetupScreen/>
            );
        case AppRoutesEnum.PatientList:
          return(
            <PatientListScreen/>
          );
        case AppRoutesEnum.PatientDetails:
          return(
            <PatientDetailsScreen/>
          );
        case AppRoutesEnum.NewPatient:
          return(
            <PatientFormScreen/>
          );  
        case AppRoutesEnum.Session:
          return(
            <SessionContextProvider
              patient={selectedPatient}
              sessionParameters={{
                amplitude:7,
                minPulseWidth:100,
                maxPulseWidth:300,
                frequency:60,
                stimulationTime:2
              }}
            >
              <SessionScreen/>
            </SessionContextProvider>
          );  
        case AppRoutesEnum.SessionList:
          return(
            <SessionListScreen/>
          );
        case AppRoutesEnum.SessionDetails:
          return(
            <SessionDetailsScreen/>
          );
        default:
          return <div>Screen not found</div>;
      }
}

export function PatientRoutes(){
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
      case 'Session':
        return(
          <SessionScreen/>
        );
      case 'Camera':
        return(
          <CameraScreen/>
        );
      default:
        return <div>Screen not found</div>;
    }
}

