import React from 'react';
import { PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import { Routes } from './src/routes';
import { AuthContextProvider } from './framework/auth/AuthContextProvider';
import { useEffect } from 'react';
import { decode, encode } from 'base-64';
import { BluetoothContextProvider } from './src/context/BluetoothContext';

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}




export default function App() {
  useEffect(()=>{

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
