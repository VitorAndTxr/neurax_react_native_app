import React, { useEffect, useState } from 'react';
import { ReactNode, createContext, useContext } from "react";
import { DeviceEventEmitter,    
    NativeModules,
    NativeAppEventEmitter, } from 'react-native';
import RNBluetoothClassic, { BluetoothDevice, BluetoothEventSubscription, BluetoothNativeDevice} from 'react-native-bluetooth-classic';

const BluetoothContext = createContext({} as BluetoothContextData);
interface BluetoothContextProviderProps {
    children: ReactNode;
}

type ActivableBluetoothDevice = BluetoothDevice&{active:boolean}



export function BluetoothContextProvider(props: BluetoothContextProviderProps) {
    const verifyConnectionDelayms = 10000
    const verifySerialDelayms = 1000

    const [bluetoothOn, setBluetoothOn] = useState(false)
    const [reload, callReload] = useState(false)

    const [neuraDevices, setNeuraDevices] = useState<ActivableBluetoothDevice[]>([])
    const [selectedDevice, setSelectedDevice] = useState<BluetoothDevice>()
    const [btDataRecieveSubscription, setBtDataRecieveSubscription] = useState<BluetoothEventSubscription>()
    const [btDisconectSubscription, setBtDisconectSubscription] = useState<BluetoothEventSubscription>()


    const [showConnectionErrorModal, setShowConnectionErrorModal] = useState(false)

    useEffect(()=>{
        initBluetooth()
    },[])

    useEffect(()=>{
        if(selectedDevice!==undefined){
        }
    },[selectedDevice])



    function removeListener() {

    }

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
    async function verifyCurrentConnection(address:string){
        try {             
            let response = await RNBluetoothClassic.isDeviceConnected(address)
            
            if(response){
                //checkSerialOutput(address)
                setTimeout(()=>{
                    verifyCurrentConnection(address)
                }, verifyConnectionDelayms)
            }
            else{
                setSelectedDevice(undefined)
            }
        } catch (error) {
            console.error(error,'BluetoothContext.verifyCurrentConnection.Error')
            
        }
    }

    async function checkSerialOutput(address:string){
        try {          
            let connectedDevice = await RNBluetoothClassic.connectToDevice(address ,{
                secureSocket: false,
                charset:'utf-8',
                delimiter: "\n",
            })


            // let deviceAvaliable = await connectedDevice.available()
            // if(deviceAvaliable>0){
            //     let test3 = await connectedDevice.read()

            //     console.log(test3);
            //     await connectedDevice.clear()
            // }          

        }
        catch (error) {
            console.error(error,'BluetoothContext.checkSerialOutput.Error')
            
        }
    }

    async function updatePairedDevices(){
        try {
            let processedNeuraDevices:ActivableBluetoothDevice[] =[] 
            let boundedDevices = await RNBluetoothClassic.getBondedDevices()
            let boundedNeuraDevices = boundedDevices.filter( item => {return item.name === 'ESP32'})

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
    function dataRead(event:any){
        console.log(event);
        
    }

    async function connectBluetooth(address:string){
        try {            
            
            let connectedDevice = await RNBluetoothClassic.connectToDevice(address,{
                secureSocket: false 
            })
            
            if(connectedDevice){
                const deviceCopy:ActivableBluetoothDevice = {...connectedDevice} as ActivableBluetoothDevice
                setSelectedDevice({
                    ...deviceCopy,
                    active:true
                }as ActivableBluetoothDevice)

                const onRecieveListener = connectedDevice.onDataReceived((data) => {
                    console.log('Dados recebidos:', data.data);
              
                    // Faça algo com os dados recebidos, por exemplo, atualize a interface do usuário
                  })

                setBtDataRecieveSubscription(onRecieveListener)
                setTimeout(()=>{
                    verifyCurrentConnection(deviceCopy.address)
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
                btDataRecieveSubscription!.remove()
                setBtDataRecieveSubscription(undefined)
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

    selectedDevice:BluetoothDevice|undefined
    setSelectedDevice:React.Dispatch<React.SetStateAction<BluetoothDevice|undefined>>
    showConnectionErrorModal:boolean
    setShowConnectionErrorModal:React.Dispatch<React.SetStateAction<boolean>>
    disconnect:()=>void
    openBluetoothSettings:()=>void
    initBluetooth:()=>void
    connectBluetooth:(address:string)=>void
}
