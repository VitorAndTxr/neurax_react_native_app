import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { ReactNode, createContext, useContext } from "react";
import {useBackHandler} from '@react-native-community/hooks'

const StackNavigatorContext = createContext({} as StackNavigatorContextData)


interface StackNavigatorContextProviderProps {
    children: ReactNode;
    InitialScreen: string;
}

export function StackNavigatorContextProvider(props: StackNavigatorContextProviderProps) {

    const [stack, setStack] = useState<string[]>([]);

    useBackHandler(() => {
        pop()
        return true
      })


    const push = (route:string) => {
    setStack((prevStack) => [...prevStack, route]);
    };

    const pop = () => {
    setStack((prevStack) => prevStack.slice(0, prevStack.length - 1));
    };

    const currentScreen = stack.length > 0 ? stack[stack.length - 1] : props.InitialScreen; 
    return (
        <>
            <StackNavigatorContext.Provider value={{
                push,
                currentScreen
            }}>
                {
                    props.children
                }
            </StackNavigatorContext.Provider>
        </>
    )
}

export function useStackNavigatorContext() {
    return useContext(StackNavigatorContext);
}

interface StackNavigatorContextData {
    push:(route: string) => void,
    currentScreen:string
}
