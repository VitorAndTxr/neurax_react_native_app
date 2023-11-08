import React, { ReactNode, createContext, useContext, useState } from 'react';
import AccountService from '../services/AccountService';
import { Buffer } from "buffer";
import { useAuthContext } from '../../framework/auth/AuthContextProvider';
import TokenService from '../../framework/auth/TokenService';

const accountService = new AccountService();
const tokenService = TokenService.getInstance();


const LoginScreenContext = createContext({} as LoginScreenContextData);
interface LoginScreenContextProviderProps {
    children: ReactNode;
}

export function LoginScreenContextProvider(props: LoginScreenContextProviderProps) {
    const {setToken, setIsAuthenticating } = useAuthContext()
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')

    async function onLogin(){
        setIsAuthenticating(true)
        let encodedPass = Buffer.from(pass).toString('base64');

        let response = await accountService.authorization({
            login:login,
            password:encodedPass,
            accessToken:''
        })
        if(response?.success){
            setToken(response?.result.token)
        }else{
            
        }
        setIsAuthenticating(false)
    }



    return (
        <>
            <LoginScreenContext.Provider value={{
                setLogin,
                setPass,
                onLogin
            }}>
                {props.children}
            </LoginScreenContext.Provider>
        </>
    );
}

export function useLoginScreenContext() {
    return useContext(LoginScreenContext);
}
interface LoginScreenContextData {
    onLogin:()=>void;
    setLogin:React.Dispatch<React.SetStateAction<string>>;
    setPass:React.Dispatch<React.SetStateAction<string>>;
}