import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Routes } from './src/routes';
import { AuthContextProvider } from './framework/auth/AuthContextProvider';
import { useEffect } from 'react';
import { decode, encode } from 'base-64';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}




export default function App() {
  useEffect(()=>{
    RNBluetoothClassic.isBluetoothEnabled().then((value)=> console.log(value,'bluetoot lado'));
    RNBluetoothClassic.connectToDevice('70:B8:F6:5A:F8:7A').then((device)=>{
      console.log(device);
      
      RNBluetoothClassic.writeToDevice('70:B8:F6:5A:F8:7A', '{\"cd\":1}')

    })


  },[])
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
