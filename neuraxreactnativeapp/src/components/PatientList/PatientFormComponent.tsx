import { View, ScrollView, SafeAreaView, Text, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { H3, LoginTextLabel, PrimaryButton, RegularButtonText, PrimaryGreenButton, PrimaryRedButton, StyledTextInput, LoginButton } from '../BaseViewStyles';
import { PatientFormPropertyEnum, useTherapistContext } from '../../context/TherapistContext';
import { useStackNavigatorContext } from '../../routes/StackNavigatorProvider';
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-date-picker'
import { useState } from 'react';

export function PatientFormComponent() {
  const {onChangeStringsPatientForm, patientForm, onChangeDateBirthPatientForm, onSavePatient, isLoading, isEditing, setIsEditing} = useTherapistContext();

  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(new Date());
  
  const { push, pop } = useStackNavigatorContext()
  
  return (
    <View style={{
        justifyContent: 'center',
        flexDirection: 'col',
        marginTop:'300px',
    }}>
    <H3>{isEditing ? 'Editar': 'Novo'} Paciente</H3>

    <CustomTextLabel>
        Login
    </CustomTextLabel>
    <CustomStyledTextInput
        editable
        value = {patientForm.login}
        onChangeText={(value: string)=>onChangeStringsPatientForm(value, PatientFormPropertyEnum.LOGIN)}
    />
    <CustomTextLabel>
        Nome completo
    </CustomTextLabel>
    <CustomStyledTextInput
        editable
        value = {patientForm.name}
        onChangeText={(value: string)=>onChangeStringsPatientForm(value, PatientFormPropertyEnum.NAME)}
    />
    <CustomTextLabel>
        Data de Nascimento
    </CustomTextLabel>
    <Pressable onPress={() => setOpen(true)}>
        <CustomStyledTextInput
            editable={false}
            value = {patientForm.birthDate?.toLocaleDateString()}
        />
    </Pressable>
    <DatePicker
        modal
        open={open}
        date={patientForm.birthDate == undefined ? new Date() : patientForm.birthDate } 
        onConfirm={(date) => {
          setOpen(false);
          onChangeDateBirthPatientForm(date);
        }}
        onCancel={() => {
            setOpen(false)
        }}
        mode='date'/>

    <CustomTextLabel>
        E-mail
    </CustomTextLabel>
    <CustomStyledTextInput
        editable
        value = {patientForm.email}
        onChangeText={(value: string)=>onChangeStringsPatientForm(value, PatientFormPropertyEnum.EMAIL)}
    />
    <CustomTextLabel>
        Telefone
    </CustomTextLabel>
    <CustomStyledTextInput
        editable
        value = {patientForm.phone}
        onChangeText={(value: string)=>onChangeStringsPatientForm(value, PatientFormPropertyEnum.PHONE)}
    />
    <CustomTextLabel>
        Nome do responsável
    </CustomTextLabel>
    <CustomStyledTextInput
        editable
        value = {patientForm.caretakerName}
        onChangeText={(value: string)=>onChangeStringsPatientForm(value, PatientFormPropertyEnum.CARETAKER_NAME)}
    />
    <CustomTextLabel>
        Telefone do responsável
    </CustomTextLabel>
    <CustomStyledTextInput
        editable
        value = {patientForm.caretakerPhone}
        onChangeText={(value: string)=>onChangeStringsPatientForm(value, PatientFormPropertyEnum.CARETAKER_PHONE)}
    />
                
    <View style={{
            paddingTop:5,
            paddingBottom:20,
    }}>
      <SafeAreaView>
        <ScrollView>

              <View style={{flex: 1, justifyContent:'space-between', flexDirection: 'row'}}>

              <CustomPrimaryRedButton
                            activeOpacity={1}
                            onPress={()=>{pop(), setIsEditing(false)}}>
                            <RegularButtonText  style={{fontSize:20}}>
                                Cancelar
                            </RegularButtonText>
                        </CustomPrimaryRedButton>
                        <CustomPrimaryGreenButton
                            activeOpacity={1}
                            onPress={()=>{onSavePatient()}}>
                            <RegularButtonText  style={{fontSize:20}}>
                                {isEditing ? 'Salvar': 'Criar'}
                            </RegularButtonText>
                        </CustomPrimaryGreenButton>

                </View>
                <Spinner
                    visible={isLoading}
                    textContent={isEditing ? 'Salvando...': 'Criando...'}
                    color='#08415C'
                    overlayColor='#C6EAFA'
                    textStyle={{ color: '#08415C' }}
                    size={"large"}
                    
                />
        </ScrollView>
      </SafeAreaView>

    </View>
  </View>);
}

const CardStyle = styled.TouchableOpacity`
    background-color:#D3EBF5;
    elevation:10;
    flex:1;
    margin:10px 0px;
    border-radius:10px;
    padding: 15px; 
`;


export const CustomPrimaryGreenButton = styled(PrimaryGreenButton)`
    margin-top:5px;
    padding: 15px 39px ;
`
export const CustomPrimaryRedButton = styled(PrimaryRedButton)`
    margin-top:5px;
    padding: 15px;
`


export const CustomStyledTextInput = styled(StyledTextInput)`
    border-radius: 10px;
    background: #FFF;
    elevation:10;
    margin-bottom:5px;
    margin-top:5px;
    color: #000;

    font-size:18px;
    padding:12px;
`
export const CustomTextLabel = styled(LoginTextLabel)`
font-size:15px;
`
