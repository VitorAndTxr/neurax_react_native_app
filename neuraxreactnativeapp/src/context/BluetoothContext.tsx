import React, { useEffect, useState } from 'react';
import { ReactNode, createContext, useContext } from "react";
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';

const BluetoothContext = createContext({} as BluetoothContextData);
interface BluetoothContextProviderProps {
    children: ReactNode;
}

type ActivableBluetoothDevice = BluetoothDevice&{active:boolean}

export function BluetoothContextProvider(props: BluetoothContextProviderProps) {
    const verifyConnectionDelayms = 10000
    const [bluetoothOn, setBluetoothOn] = useState(false)
    const [reload, callReload] = useState(false)

    const [neuraDevices, setNeuraDevices] = useState<ActivableBluetoothDevice[]>([])
    const [selectedDevice, setSelectedDevice] = useState<ActivableBluetoothDevice>()
    const [showConnectionErrorModal, setShowConnectionErrorModal] = useState(false)

    useEffect(()=>{
        initBluetooth()
    },[])

    async function initBluetooth() {
        try{
            let BTEnabled = await RNBluetoothClassic.requestBluetoothEnabled()
            setBluetoothOn(BTEnabled)
    
            if(BTEnabled){
                updatePairedDevices()
            }
        }catch(error){
            console.error(error)
        }
            
        
    }
    async function verifyCurrentConnection(currentDevice:ActivableBluetoothDevice){
        try {             
            let response = await RNBluetoothClassic.isDeviceConnected(currentDevice.address!)
            if(response){
                setTimeout(()=>{
                    verifyCurrentConnection(currentDevice)
                }, verifyConnectionDelayms)
            }
            else{
                setSelectedDevice(undefined)
            }
        } catch (error) {
            console.error(error,'BluetoothContext.verifyCurrentConnection.Error')
            
        }

    }

    async function updatePairedDevices(){
        try {
            let processedNeuraDevices:ActivableBluetoothDevice[] =[] 
            let boundedDevices = await RNBluetoothClassic.getBondedDevices()
            let boundedNeuraDevices = boundedDevices.filter( item => {return item.name === 'ESP32test'})

            for (let index = 0; index < boundedNeuraDevices.length; index++) {
                const boundedNeuraDevice = boundedNeuraDevices[index];
                let isConnectedResponse = await boundedNeuraDevice.isConnected()
               
                processedNeuraDevices.push({
                    active:isConnectedResponse,
                    ...boundedNeuraDevice
                }as ActivableBluetoothDevice)
                
            }
        
            setNeuraDevices(processedNeuraDevices)
            callReload(!reload)
            
            if(boundedNeuraDevices.length ===0){
                setTimeout(()=>{
                    updatePairedDevices()
                },5000)
            }
            
        } catch (error) {
            console.log(error,'BluetoothContext.updatePairedDevices.Error')
            
        }
    }

    async function connectBluetooth(address:string){
        try {
            console.log(address);
            
            let response = await RNBluetoothClassic.connectToDevice(address)
            console.log(response);
            
            if(response){
                const deviceCopy:ActivableBluetoothDevice = {...response} as ActivableBluetoothDevice
                setSelectedDevice({
                    active:true,
                    ...response
                }as ActivableBluetoothDevice)
                setTimeout(async ()=>{
                    await verifyCurrentConnection(deviceCopy)
                }, 1000)
            }
            
            
        } catch (error) {
            console.log(error,'BluetoothContext.BluetoothConnect.Error') 
            setShowConnectionErrorModal(true)           
        }
    }
    function openBluetoothSettings(){
        RNBluetoothClassic.openBluetoothSettings()
    }

    async function disconnect() {
        try {
            let response = await RNBluetoothClassic.disconnectFromDevice(selectedDevice!.address)
            if(response){
                setSelectedDevice(undefined)
            }

        } catch (error) {
            console.error(error,'BluetoothContext.disconnect.Error')
        }
        
    }




    return (
        <>
            <BluetoothContext.Provider value={{
                bluetoothOn,
                neuraDevices,
                showConnectionErrorModal, setShowConnectionErrorModal,

                selectedDevice,
                setSelectedDevice,

                connectBluetooth,
                initBluetooth,
                openBluetoothSettings,

                disconnect
            }}>
                {props.children}
            </BluetoothContext.Provider>
        </>
    );
}

export function useBluetoothContext() {
    return useContext(BluetoothContext);
}
interface BluetoothContextData {
    bluetoothOn:boolean

    neuraDevices:ActivableBluetoothDevice[]

    selectedDevice:ActivableBluetoothDevice|undefined
    setSelectedDevice:React.Dispatch<React.SetStateAction<ActivableBluetoothDevice|undefined>>
    showConnectionErrorModal:boolean
    setShowConnectionErrorModal:React.Dispatch<React.SetStateAction<boolean>>
    disconnect:()=>void
    openBluetoothSettings:()=>void
    initBluetooth:()=>void
    connectBluetooth:(address:string)=>void
}
