import React, { useEffect } from 'react';
import { BigButtonText, H1,LoginButton, LoginTextLabel, LoginViewStyles, StyledTextInput } from '../components/BaseViewStyles';
import { useLoginScreenContext } from '../context/LoginScreenContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { useAuthContext } from '../../framework/auth/AuthContextProvider';

export function LoginScreen() {

    const {setLogin,setPass,onLogin} = useLoginScreenContext()
    const {isAuthenticating} = useAuthContext()
  
    return (
        <LoginViewStyles
            style={{padding:'35px'}}
        >
                <H1>
                    NeuraEstimulator
                </H1>
                <LoginTextLabel>
                    Login
                </LoginTextLabel>
                <StyledTextInput
                    onChangeText={(login:string) => setLogin(login)}
                    editable
                />
                <LoginTextLabel>
                    Senha
                </LoginTextLabel>
                <StyledTextInput
                    secureTextEntry={true}
                    editable
                    onChangeText={(pass:string) => setPass(pass)}
                />
                <LoginButton
                    activeOpacity={1}
                    onPress={onLogin}>
                    <BigButtonText>
                        Login
                    </BigButtonText>
                </LoginButton>
                <Spinner
                    visible={isAuthenticating}
                    textContent={'Autenticando...'}
                    color='#08415C'
                    overlayColor='#C6EAFA'
                    textStyle={{ color: '#08415C' }}
                    size={"large"}
                    
                />
        </LoginViewStyles>

  );
}



