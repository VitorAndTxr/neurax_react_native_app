import React, { useEffect, useState } from 'react';
import { ReactNode, createContext, useContext } from "react";
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

    const [fesParams, setFesParams] = useState<NeuraXBluetoothProtocolFEsStimuliBody>({
        [NeuraXBluetoothProtocolBodyPropertyEnum.AMPLITUDE]:            7,
        [NeuraXBluetoothProtocolBodyPropertyEnum.FREQUENCY]:            60,
        [NeuraXBluetoothProtocolBodyPropertyEnum.PULSE_WIDTH]:          300,
        [NeuraXBluetoothProtocolBodyPropertyEnum.DIFFICULTY]:           5,
        [NeuraXBluetoothProtocolBodyPropertyEnum.STIMULI_DURATION]:     2
    })

    const [triggerDettected, setTriggerDetected] = useState(false)

    const [wristAmplitude, setWristAmplitude] = useState(0)


    const [showConnectionErrorModal, setShowConnectionErrorModal] = useState(false)
    const [showFesTestModal, setShowFesTestModal] = useState(false)
    const [showSEmgTestModal, setShowSEmgTestModal] = useState(false)
    const [showTestGyroscopeModal, setShowTestGyroscopeModal] = useState(false)



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

    function measureAmplitude(){
        let payload:NeuraXBluetoothProtocolPayload = {
            cd:NeuraXBluetoothProtocolFunctionEnum.GyroscopeReading,
            mt:NeuraXBluetoothProtocolMethodEnum.EXECUTE
        }
        console.log(payload);
        
        writeToBluetooth(JSON.stringify(payload))
    }

    async function FesStimulation(){
        let payload:NeuraXBluetoothProtocolPayload = {
            cd:NeuraXBluetoothProtocolFunctionEnum.FesParam,
            mt:NeuraXBluetoothProtocolMethodEnum.WRITE,
            bd:{
                a:fesParams.a,
                f:fesParams.f,
                pw:fesParams.pw,
                pd:fesParams.pd,
                df:5
            }
        }

        setTimeout(() => {
            
            writeToBluetooth(JSON.stringify(payload)).then(
                ()=>{
                    
                    let payload2:NeuraXBluetoothProtocolPayload = {
                        cd:NeuraXBluetoothProtocolFunctionEnum.SingleStimuli,
                        mt:NeuraXBluetoothProtocolMethodEnum.EXECUTE,
            
                    }
                    console.log(payload2);
                    
                    writeToBluetooth(JSON.stringify(payload2))
                }
            )
        }, 100);
        

    }

    async function writeToBluetooth(payload:string) {
        try {
            let response = await RNBluetoothClassic.writeToDevice(selectedDevice!.address, payload+'\0')
        } catch (error) {
            console.log(error,'BluetoothContext.writeToBluetooth.Error')
        }
    }

    async function updatePairedDevices(){
        try {
            let processedNeuraDevices:ActivableBluetoothDevice[] =[] 
            let boundedDevices = await RNBluetoothClassic.getBondedDevices()
            let boundedNeuraDevices = boundedDevices.filter( item => {return item.name === 'NeuroEstimulator'})

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

                const onRecieveListener = connectedDevice.onDataReceived((btEntry) => {
                    console.log('Dados recebidos:', btEntry.data);
                    decodeMessage(btEntry.data)
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

    function decodeMessage(message:string){
        let messageBody = JSON.parse(message) as NeuraXBluetoothProtocolPayload

        console.log(messageBody);
        

        switch(messageBody[NeuraXBluetoothProtocolBodyFieldEnum.CODE]){
            case NeuraXBluetoothProtocolFunctionEnum.GyroscopeReading:
                console.log("Giroscópio");
                setWristAmplitude(messageBody.bd!.a!)
                console.log(messageBody.bd!.a);

                break;
            case NeuraXBluetoothProtocolFunctionEnum.Status:
                console.log("Status");
                break;
            case NeuraXBluetoothProtocolFunctionEnum.Trigger:
                console.log("Trigger");
                break;
            default:
                break;

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


    function onChange(values:number[], property:NeuraXBluetoothProtocolBodyPropertyEnum):void{
        setFesParams(currentParams =>{                        
            return {
            ...currentParams,
            [property]:values[0]
            }
        })
    }

    function testFes():void{
        console.log(fesParams);
        FesStimulation()
        
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
                showTestGyroscopeModal,setShowTestGyroscopeModal,
                wristAmplitude, setWristAmplitude,

                selectedDevice,
                setSelectedDevice,
                FesStimulation,

                measureAmplitude,
                connectBluetooth,
                initBluetooth,
                openBluetoothSettings,

                onChange,
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

    showTestGyroscopeModal:boolean
    setShowTestGyroscopeModal:React.Dispatch<React.SetStateAction<boolean>>

    wristAmplitude:number
    setWristAmplitude:React.Dispatch<React.SetStateAction<number>>

    fesParams:NeuraXBluetoothProtocolFEsStimuliBody
    setFesParams:React.Dispatch<React.SetStateAction<NeuraXBluetoothProtocolFEsStimuliBody>>

    disconnect:(address:string) => void
    openBluetoothSettings:() => void
    initBluetooth:() => void
    measureAmplitude:() => void
    FesStimulation:() => void
    connectBluetooth:(address:string) => void

    onChange:(values:number[], property:NeuraXBluetoothProtocolBodyPropertyEnum) => void

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
    Trigger,
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
    [NeuraXBluetoothProtocolBodyFieldEnum.BODY]: NeuraXBluetoothProtocolBody|null
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