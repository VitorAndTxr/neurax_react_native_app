import React, { useState } from 'react';
import { useSessionContext } from '../../context/SessionContext';
import { H2, InputLabel, InstructionText, LoginTextLabel,  ModalContainer,  ModalContent,  OverLapCard, PrimaryGreenButton, PrimaryRedButton, RegularButtonText } from '../BaseViewStyles';
import { Modal, View } from 'react-native';
import Slider from "react-native-a11y-slider";
import { Divider } from '@rneui/base';
import { ConfirmExitSessionModal } from './ConfirmExitSessionModal';
import { CustomPrimaryGreenButton, CustomPrimaryRedButton } from '../PatientList/DeletePatientModal';

export function ConfiguringStimulusComponent() {

  const [difficulty, setDifficulty] = useState(1);
  const [intensity, setIntensity] = useState(1);
  const { repetitions } = useSessionContext();

  return (
    <>
      <H2 style={{
        marginBottom: 5
      }}>
        Teste de mobilidade
      </H2>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <InstructionText style={{ marginBottom: 10 }}>
          Você esta iniciando a <InputLabel>{repetitions.length === 0 ? ("primeira repetição") : (repetitions.length + "ª repetição")}</InputLabel>
        </InstructionText>
        <InstructionText style={{ marginBottom: 10 }}>
          {`\u2023`} <InputLabel>Dificuldade</InputLabel> é a sensibilidade do gatilho
        </InstructionText>
        <InstructionText style={{ marginBottom: 10 }}>
          {`\u2023`} <InputLabel>Intensidade</InputLabel> é proporcional a sensação de desconforto do estímulo
        </InstructionText>
        <OverLapCard>
          <InputLabel style={{ marginVertical: 10 }}>
            Dificuldade:
          </InputLabel>
          <View style={{ flexDirection: 'row', width: 300, height: 'auto', justifyContent: 'center', alignItems: 'center', paddingBottom: 15 }}>
            <InputLabel>
              1
            </InputLabel>
            <Slider
              min={1}
              max={10}
              increment={1}
              labelStyle={{}}
              style={{ width: 250 }}
              values={[difficulty]}
              labelTextStyle={{
                color: '#08415C',
                fontSize: 15
              }}
              onChange={(value: number[]) => setDifficulty(value[0])} />
            <InputLabel>
              10
            </InputLabel>
          </View>
          <Divider style={{ marginVertical: 5 }} />

          <InputLabel style={{ marginVertical: 10 }}>
            Intensidade:
          </InputLabel>
          <View style={{ flexDirection: 'row', width: 300, height: 'auto', justifyContent: 'center', alignItems: 'center', paddingBottom: 15 }}>
            <InputLabel>
              1
            </InputLabel>
            <Slider
              min={1}
              max={10}
              increment={1}
              labelStyle={{}}
              style={{ width: 250 }}
              values={[intensity]}
              labelTextStyle={{
                color: '#08415C',
                fontSize: 15
              }}
              onChange={(value: number[]) => setIntensity(value[0])} />
            <InputLabel>
              10
            </InputLabel>
          </View>
        </OverLapCard>
        <PrimaryGreenButton
          onPress={() => { }}
          style={{ marginVertical: 20 }}
        >
          <RegularButtonText>
            Iniciar repetição
          </RegularButtonText>
        </PrimaryGreenButton>
        <PrimaryRedButton
          onPress={() => { }}
        >
          <RegularButtonText>
            Finalizar sessão
          </RegularButtonText>
        </PrimaryRedButton>
      </View>
      <StimulatingModal/>
      <ConfirmExitSessionModal/>
    </>
  );
}

export function StimulatingModal(){
  
  const [modalState, setModalState] = useState(StimulatingModalState.Instructions);
  
  return (
    <Modal transparent={true} visible={true} animationType="slide">
      <ModalContainer>
      {

      }
      </ModalContainer>
    </Modal>
  );
};

enum StimulatingModalState{
  Instructions,
  WaitingTrigger,
  Stimulating
}

export function StimulatingModalContent(modalState:StimulatingModalState){
 switch (modalState) {
  case StimulatingModalState.Instructions:
    return(
      <FesInstructionsContentCompoent/>
    )
  case StimulatingModalState.WaitingTrigger:
    return(
      <WaitingTriggerContentCompoent/>

    )
  case StimulatingModalState.Stimulating:
    return(
      <FesStimulationContentCompoent/>
    )
 }
}

export function FesInstructionsContentCompoent(){
  return(
    <ModalContent style={{ maxHeight: 250 }}>
      <H2 style={{
        marginBottom: 20
      }}>
        Iniciar Estímulo
      </H2>
      <InputLabel>
      {`\u2022`}O paciente deve estar com o pulso em posição de repouso antes de iniciar o estimulo. 
      </InputLabel>
      <InputLabel>
      {`\u2022`}Após clicar em iniciar ele deve tentar fazer a extensão do pulso nos próximos 30 segundos.
      </InputLabel>
      <InputLabel>
      {`\u2022`}Caso não seja detectada a tentativa de movimento, reduza a dificuldade.
      </InputLabel>
      <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>

        <CustomPrimaryGreenButton activeOpacity={1} onPress={() => { }}>
          <RegularButtonText style={{ fontSize: 20 }}>
            Cancelar
          </RegularButtonText>
        </CustomPrimaryGreenButton>
        <CustomPrimaryRedButton activeOpacity={1}>
          <RegularButtonText style={{ fontSize: 20 }} onPress={() => { }}>
            Finalizar
          </RegularButtonText>
        </CustomPrimaryRedButton>
      </View>
    </ModalContent>
  )
}

export function WaitingTriggerContentCompoent(){
  return(
    <ModalContent style={{ maxHeight: 250 }}>
      <H2 style={{
        marginBottom: 20
      }}>
        Iniciar Estímulo
      </H2>
      <InputLabel>
      {`\u2022`}O paciente deve estar com o pulso em posição de repouso antes de iniciar o estimulo. 
      </InputLabel>
      <InputLabel>
      {`\u2022`}Após clicar em iniciar ele deve tentar fazer a extensão do pulso nos próximos 30 segundos.
      </InputLabel>
      <InputLabel>
      {`\u2022`}Caso não seja detectada a tentativa de movimento, reduza a dificuldade.
      </InputLabel>
      <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>

        <CustomPrimaryGreenButton activeOpacity={1} onPress={() => { }}>
          <RegularButtonText style={{ fontSize: 20 }}>
            Cancelar
          </RegularButtonText>
        </CustomPrimaryGreenButton>
        <CustomPrimaryRedButton activeOpacity={1}>
          <RegularButtonText style={{ fontSize: 20 }} onPress={() => { }}>
            Finalizar
          </RegularButtonText>
        </CustomPrimaryRedButton>
      </View>
    </ModalContent>
  )
}

export function FesStimulationContentCompoent(){
  return(
    <ModalContent style={{ maxHeight: 250 }}>
      <H2 style={{
        marginBottom: 20
      }}>
        Iniciar Estímulo
      </H2>
      <InputLabel>
      {`\u2022`}O paciente deve estar com o pulso em posição de repouso antes de iniciar o estimulo. 
      </InputLabel>
      <InputLabel>
      {`\u2022`}Após clicar em iniciar ele deve tentar fazer a extensão do pulso nos próximos 30 segundos.
      </InputLabel>
      <InputLabel>
      {`\u2022`}Caso não seja detectada a tentativa de movimento, reduza a dificuldade.
      </InputLabel>
      <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>

        <CustomPrimaryGreenButton activeOpacity={1} onPress={() => { }}>
          <RegularButtonText style={{ fontSize: 20 }}>
            Cancelar
          </RegularButtonText>
        </CustomPrimaryGreenButton>
        <CustomPrimaryRedButton activeOpacity={1}>
          <RegularButtonText style={{ fontSize: 20 }} onPress={() => { }}>
            Finalizar
          </RegularButtonText>
        </CustomPrimaryRedButton>
      </View>
    </ModalContent>
  )
}


