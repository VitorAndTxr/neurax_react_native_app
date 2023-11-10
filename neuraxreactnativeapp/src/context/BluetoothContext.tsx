import React, { useEffect, useState } from 'react';
import { ReactNode, createContext, useContext } from "react";
import { DeviceEventEmitter,    
    NativeModules,
    NativeAppEventEmitter,
    BackHandler, } from 'react-native';
import RNBluetoothClassic, { BluetoothDevice, BluetoothEventSubscription, BluetoothNativeDevice} from 'react-native-bluetooth-classic';

const BluetoothContext = createContext({} as BluetoothContextData);
interface BluetoothContextProviderProps {
    children: ReactNode;
}

type ActivableBluetoothDevice = BluetoothDevice&{active:boolean}



export function BluetoothContextProvider(props: BluetoothContextProviderProps) {
    const verifyConnectionDelayms = 10000
    const verifySerialDelayms = 1000
    const triggerUpTimems = 5000


    const [bluetoothOn, setBluetoothOn] = useState(false)
    const [reload, callReload] = useState(false)

    const [neuraDevices, setNeuraDevices] = useState<ActivableBluetoothDevice[]>([])
    const [selectedDevice, setSelectedDevice] = useState<BluetoothDevice>()
    const [btDataRecieveSubscription, setBtDataRecieveSubscription] = useState<BluetoothEventSubscription>()
    const [btDeviceDisconnectSubscription, setBtDeviceDisconnectSubscription] = useState<BluetoothEventSubscription>()



    const [showConnectionErrorModal, setShowConnectionErrorModal] = useState(false)
    const [showFesTestModal, setShowFesTestModal] = useState(false)
    const [showSEmgTestModal, setShowSEmgTestModal] = useState(false)
    const [triggerDettected, setTriggerDetected] = useState(false)
    const [fesParams, setFesParams] = useState<NeuraXBluetoothProtocolFEsStimuliBody>({
        [NeuraXBluetoothProtocolBodyPropertyEnum.AMPLITUDE]:            7,
        [NeuraXBluetoothProtocolBodyPropertyEnum.FREQUENCY]:            60,
        [NeuraXBluetoothProtocolBodyPropertyEnum.PULSE_WIDTH]:          300,
        [NeuraXBluetoothProtocolBodyPropertyEnum.DIFFICULTY]:           5,
        [NeuraXBluetoothProtocolBodyPropertyEnum.STIMULI_DURATION]:     2
    })


    

    function closeFesTestModal() {
        setShowFesTestModal(false)
    }


    useEffect(()=>{
        initBluetooth()
    },[])

    useEffect(()=>{
        if(triggerDettected){
            setTimeout(()=>{
                setTriggerDetected(false)
            }, triggerUpTimems)
        }
    },[triggerDettected])

    useEffect(()=>{

    },[selectedDevice])

    useEffect(()=>{
        const backAction = () => {
            closeFesTestModal(); // Close the modal
            return true; // Prevent default behavior (app exit)
        };
        
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => {
          backHandler.remove(); // Remove the event listener when the component unmounts
        };
    
    },[setShowFesTestModal])


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

    async function connectBluetooth(address:string){
        try {            
            
            let connectedDevice = await RNBluetoothClassic.connectToDevice(address,{
                secureSocket: false 
            })
            
            if(connectedDevice)
            {

                const deviceCopy:ActivableBluetoothDevice = {...connectedDevice} as ActivableBluetoothDevice
                

                setSelectedDevice({
                    ...deviceCopy,
                    active:true
                }as ActivableBluetoothDevice)

                const onRecieveListener = connectedDevice.onDataReceived((data) => {
                    console.log('Dados recebidos:', data.data);
              
                    // Faça algo com os dados recebidos, por exemplo, atualize a interface do usuário
                })
                const onDisconnectListener = RNBluetoothClassic.onDeviceDisconnected((deviceDisconectEvent:any)=>{
                    const deviceAddress = deviceCopy.address

                    if(deviceDisconectEvent.address === deviceAddress){
                        disconnect(deviceAddress)
                        setShowConnectionErrorModal(true)           
                    }

                })

                setBtDataRecieveSubscription(onRecieveListener)
                setBtDeviceDisconnectSubscription(onDisconnectListener)

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

    async function disconnect(address:string) {
        try {            
            let isConnected = await RNBluetoothClassic.isDeviceConnected(address)
            if(isConnected)(
                await RNBluetoothClassic.disconnectFromDevice(address)
            )

            if(btDataRecieveSubscription!==undefined){
                btDataRecieveSubscription.remove()
                setBtDataRecieveSubscription(undefined)
            
            }
            if(btDeviceDisconnectSubscription!==undefined){
                btDeviceDisconnectSubscription.remove()
                setBtDeviceDisconnectSubscription(undefined)
            }

            setSelectedDevice(undefined)
            

        } catch (error) {
            console.error(error,'BluetoothContext.disconnect.Error')
        }
        
    }

    function onChangeFesAmplitude(values:number[]):void{
        setFesParams(currentParams =>{                        
          return {
            ...currentParams,
            [NeuraXBluetoothProtocolBodyPropertyEnum.AMPLITUDE] :values[0]
          }
        })
      }
    
    function onChangeFesPulseWidth(values:number[]):void{
        setFesParams(currentParams =>{                        
            return {
            ...currentParams,
            [NeuraXBluetoothProtocolBodyPropertyEnum.PULSE_WIDTH] :values[0]
            }
        })
    }

    function onChangeFesFrequency(values:number[]):void{
        setFesParams(currentParams =>{                        
            return {
            ...currentParams,
            [NeuraXBluetoothProtocolBodyPropertyEnum.FREQUENCY] :values[0]
            }
        })
    }

    function onChangeFesStimuliDuration(values:number[]):void{
        setFesParams(currentParams =>{                        
            return {
            ...currentParams,
            [NeuraXBluetoothProtocolBodyPropertyEnum.STIMULI_DURATION] :values[0]
            }
        })
    }

    function onChangeSEmgDificulty(values:number[]):void{
        setFesParams(currentParams =>{                        
            return {
            ...currentParams,
            [NeuraXBluetoothProtocolBodyPropertyEnum.DIFFICULTY] :values[0]
            }
        })
    }

    function testFes():void{
        console.log(fesParams);
        
    }

    return (
        <>
            <BluetoothContext.Provider value={{
                bluetoothOn,
                neuraDevices,

                showConnectionErrorModal, setShowConnectionErrorModal,
                showFesTestModal, setShowFesTestModal,
                showSEmgTestModal, setShowSEmgTestModal,
                triggerDettected, setTriggerDetected,
                fesParams, setFesParams,

                selectedDevice,
                setSelectedDevice,

                connectBluetooth,
                initBluetooth,
                openBluetoothSettings,

                onChangeFesAmplitude,
                onChangeFesPulseWidth,
                onChangeFesFrequency,
                onChangeFesStimuliDuration,
                onChangeSEmgDificulty,
                testFes,

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

    triggerDettected:boolean
    setTriggerDetected:React.Dispatch<React.SetStateAction<boolean>>

    showFesTestModal:boolean
    setShowFesTestModal:React.Dispatch<React.SetStateAction<boolean>>

    showSEmgTestModal:boolean
    setShowSEmgTestModal:React.Dispatch<React.SetStateAction<boolean>>

    fesParams:NeuraXBluetoothProtocolFEsStimuliBody
    setFesParams:React.Dispatch<React.SetStateAction<NeuraXBluetoothProtocolFEsStimuliBody>>

    disconnect:(address:string)=>void
    openBluetoothSettings:()=>void
    initBluetooth:()=>void
    connectBluetooth:(address:string)=>void

    onChangeFesAmplitude:(values:number[])=>void
    onChangeFesPulseWidth:(values:number[])=>void
    onChangeFesFrequency:(values:number[])=>void
    onChangeFesStimuliDuration:(values:number[])=>void
    onChangeSEmgDificulty:(values:number[])=>void
    testFes:()=>void
}

enum NeuraXBluetoothProtocolFunctionEnum{
    ConnectionHandshake,
    GyroscopeReading,
    StartSession,
    StopSession,
    PauseSession,
    ResumeSession,
    SingleStimuli,
    FesParam,
    Status,
    ACK
}

enum NeuraXBluetoothProtocolMethodEnum{
    READ = 'r',
    WRITE = 'w',
    EXECUTE = 'x',
    ACK = 'a'
}

export enum NeuraXBluetoothProtocolBodyPropertyEnum{
    ANGLE = 'a',
    AMPLITUDE = 'a',
    FREQUENCY = 'f',
    PULSE_WIDTH = 'pw',
    DIFFICULTY = 'df',
    STIMULI_DURATION = 'pd',
    COOMPLETE_STIMULI_AMOUNT = 'csa',
    INTERRUPTED_STIMULI_AMOUNT = 'isa',
    TIME_OF_LAST_TRIGGER = 'tlt',
    SESSION_DURATION = 'sd',
    MAXIMUM_SESSION_DURATION = 'm',
}

enum NeuraXBluetoothProtocolBodyFieldEnum{
    CODE = 'cd',
    METHOD = 'mt',
    BODY =  'bd'
}

export type NeuraXBluetoothProtocolPayload = {
    [NeuraXBluetoothProtocolBodyFieldEnum.CODE]:number,
    [NeuraXBluetoothProtocolBodyFieldEnum.METHOD]:string,
    [NeuraXBluetoothProtocolBodyFieldEnum.BODY]:NeuraXBluetoothProtocolBody
}

export type NeuraXBluetoothProtocolBody = {
    [NeuraXBluetoothProtocolBodyPropertyEnum.AMPLITUDE]: number | undefined,
    [NeuraXBluetoothProtocolBodyPropertyEnum.FREQUENCY]: number | undefined,
    [NeuraXBluetoothProtocolBodyPropertyEnum.PULSE_WIDTH]: number | undefined,
    [NeuraXBluetoothProtocolBodyPropertyEnum.DIFFICULTY]: number | undefined,
    [NeuraXBluetoothProtocolBodyPropertyEnum.STIMULI_DURATION] :number | undefined,
    [NeuraXBluetoothProtocolBodyPropertyEnum.COOMPLETE_STIMULI_AMOUNT]: number | undefined,
    [NeuraXBluetoothProtocolBodyPropertyEnum.INTERRUPTED_STIMULI_AMOUNT]: number | undefined,
    [NeuraXBluetoothProtocolBodyPropertyEnum.TIME_OF_LAST_TRIGGER]: number | undefined,
    [NeuraXBluetoothProtocolBodyPropertyEnum.SESSION_DURATION]: number | undefined,
    [NeuraXBluetoothProtocolBodyPropertyEnum.MAXIMUM_SESSION_DURATION]:number | undefined,
}

export type NeuraXBluetoothProtocolFEsStimuliBody = {
    [NeuraXBluetoothProtocolBodyPropertyEnum.AMPLITUDE]: number | undefined,
    [NeuraXBluetoothProtocolBodyPropertyEnum.FREQUENCY]: number | undefined,
    [NeuraXBluetoothProtocolBodyPropertyEnum.PULSE_WIDTH]: number | undefined,
    [NeuraXBluetoothProtocolBodyPropertyEnum.DIFFICULTY]: number | undefined,
    [NeuraXBluetoothProtocolBodyPropertyEnum.STIMULI_DURATION] :number | undefined,
}