import {  createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreenContextProvider } from '../context/LoginScreenContext';

const { Screen, Navigator} = createNativeStackNavigator();


export function UnloggedRoutes(){
    return(
        <LoginScreenContextProvider>
            <Navigator initialRouteName="Login">
                <Screen
                    name='Login'
                    component={LoginScreen}
                    options={{
                        headerShown:false
                    }}
                    
                />
            </Navigator>
        </LoginScreenContextProvider>
    )
}

export function TherapistRoutes(){
    return(
        <Navigator initialRouteName="Home">
            <Screen
                name='Home'
                component={HomeScreen}
                options={{
                    headerShown:false
                }}
            />
        </Navigator>
    )
}

export function PatientRoutes(){
    return(
        <Navigator initialRouteName="Home">
            <Screen
                name='Home'
                component={HomeScreen}
                options={{
                    headerShown:false
                }}
            />
        </Navigator>
    )
}