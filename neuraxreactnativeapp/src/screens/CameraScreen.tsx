import React, { useEffect, useRef, useState } from 'react';
import { View, Text, PermissionsAndroid, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { H3, BaseViewStyles, BigButtonText, LoggedViewStyles, LoginButton, PrimaryButton, PrimaryGreenButton, PrimaryRedButton, RegularButtonText } from '../components/BaseViewStyles';
import { useStackNavigatorContext } from '../routes/StackNavigatorProvider';
import { Camera, useCameraDevice, useCameraDevices } from 'react-native-vision-camera';
import PatientService from '../services/PatientService';
import axios from 'axios';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import styled from 'styled-components/native';
import { usePatientContext } from '../context/PatientContext';

const patientService = new PatientService();

export function CameraScreen() {

  const {patientId} = usePatientContext();
  const [imageUri, setImageUri] = useState('');
  const [imagesUri, setImagesUri] = useState<string[]>([]);

  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera'
    ]
  })
  const camera = useRef<Camera>(null);

  async function takePicture(){
    const image = await camera.current?.takePhoto({
      qualityPrioritization: 'speed',
      flash: 'auto',
      enableShutterSound: false
    })

    if(image != null){
      setImageUri(`file://${image.path}`)
    }
  }

  async function savePicture(){
    //const cameraRollPath = await CameraRoll.save(`file://${image.path}`, {
    const cameraRollPath = await CameraRoll.save(imageUri, {
      type: 'photo',
    })

    setImageUri('');

    setImagesUri(currentList => {
      let list = [...currentList];
      list.push(cameraRollPath);
      return list;
    })
  }

  async function discardPicture(){
    setImageUri('');
  }

  async function moveFoward(){
    let formData = new FormData();

    [...imagesUri].forEach(uri => {
      formData.append('files', {
        uri: uri, // your file path string
        name: 'my_photo.jpg',
        type: 'image/jpg'
      })
    });
      
    //formData.append('file', base64Data)
    console.log(patientId);
    formData.append('patientId', patientId);
    
      await patientService.CreateSession(formData)
      .then((response)=>{
          if(response?.success){
              console.log(response.result)
          }
      })
      .catch((response)=>{

      })
  }
  /*onst uploadPhoto = async (uri: any) => {
    const formData = new FormData();
    formData.append('file', {
      uri: uri,
      type: 'image/jpeg', // or the MIME type of your image
      name: 'photo.jpg',
    });
    formData.append('sessionId', '877cbb43-409f-425d-a46f-5ad0c7154e8e');
  
    try {
      const response = await axios.post('https://neuroestimulator-api.azurewebsites.net/api/v1/Session/UploadPhotos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add any additional headers if required
        },
      });
  
      console.log('Upload success:', response.data);
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with error status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };*/
  

  return (
    
    <BaseViewStyles>
      <LoggedViewStyles style={{ flex: 1, flexDirection: 'col' }}>
        <View style={{
          justifyContent: 'center',
          flexDirection: 'col',
          marginTop:'300px',
        }}>
          <H3>Adicionar Foto</H3>
          <View style={{paddingTop:5, paddingBottom:20}}>
            <SafeAreaView style={{height:655}} >
              <ScrollView>
                {
                  imageUri === '' ?
                    (
                      <>
                        <View style={{ flexDirection: 'row', height: 500 }}>
                          <Camera
                            style={StyleSheet.absoluteFill}
                            device={device}
                            ref={camera}
                            isActive={true}
                            photo={true} />
                        </View>
                        <View style={{paddingTop:10, flex: 1, justifyContent:'center'}}>
                          <CustomPrimaryButton onPress={() => takePicture()}>
                            <RegularButtonText  style={{fontSize:20}}>
                              Fotografar
                            </RegularButtonText>
                          </CustomPrimaryButton>
                          {
                            imagesUri.length > 0 &&
                            <CustomPrimaryGreenButton activeOpacity={1} onPress={() => moveFoward()}>
                              <RegularButtonText  style={{fontSize:20}}>
                                Avançar
                              </RegularButtonText>
                            </CustomPrimaryGreenButton>
                          }
                          
                        </View>
                        <View style={{justifyContent:'space-between', paddingTop:10, flex: 1,flexDirection:'row',width:'100%',flexWrap: 'wrap', marginBottom:10}}>
                        {imagesUri.map((uri) => {
                          return (
                            <View key={uri} style={{  height:140, width: 130, margin:5 }}>
                              <Image style={StyleSheet.absoluteFill} source={{uri: uri}}></Image>
                            </View>
                          );
                        })}
                        </View>
                      </>
                    )
                    :
                    (
                      <>
                        <View style={{ flexDirection: 'row', height:500 }}>
                          <Image style={StyleSheet.absoluteFill} source={{uri: imageUri}}></Image>
                        </View>
                        <View style={{paddingTop:10, flex: 1, justifyContent:'center'}}>
                          <CustomPrimaryGreenButton onPress={() => savePicture()} activeOpacity={1}>
                            <RegularButtonText  style={{fontSize:20}}>
                              Guardar
                            </RegularButtonText>
                          </CustomPrimaryGreenButton>
                          <CustomPrimaryRedButton onPress={() => discardPicture()} activeOpacity={1}>
                            <RegularButtonText  style={{fontSize:20}}>
                              Descartar
                            </RegularButtonText>
                          </CustomPrimaryRedButton>
                        </View>
                      </>
                    )
                }
              </ScrollView>
            </SafeAreaView>
          </View>
        </View>
      </LoggedViewStyles>
    </BaseViewStyles>
  );
}

export const CustomPrimaryGreenButton = styled(PrimaryGreenButton)`
    margin-top:5px;
    padding: 15px 35px ;
`
export const CustomPrimaryRedButton = styled(PrimaryRedButton)`
    margin-top:5px;
    padding: 15px;
`

export const CustomPrimaryButton = styled(PrimaryButton)`
    margin-top:5px;
    padding: 15px;
`
