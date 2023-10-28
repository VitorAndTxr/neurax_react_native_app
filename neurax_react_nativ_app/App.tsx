import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  SyncStorage  from 'sync-storage';
import { Routes } from './src/routes';
import { AuthContextProvider } from './framework/auth/AuthContextProvider';
import { useEffect } from 'react';
import { decode, encode } from 'base-64';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}



async function InitStorage() {
  const data = await SyncStorage.init()
  
}
export default function App() {

  useEffect(()=>{
    InitStorage()
  },[])

  const [fontsLoaded] = useFonts({
    Inter_400Regular, 
    Inter_700Bold
  });

  if (!fontsLoaded) {
    return null; // Ou uma tela de carregamento
  }
  return (
    <AuthContextProvider waitAuthentication={false}>
      <Routes/>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
