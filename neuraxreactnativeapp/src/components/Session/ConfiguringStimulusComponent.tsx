import React from 'react';
import { useSessionContext } from '../../context/SessionContext';
import { H2, InputLabel, InstructionText, LoginTextLabel,  OverLapCard, PrimaryGreenButton, PrimaryRedButton, RegularButtonText } from '../BaseViewStyles';
import { View } from 'react-native';
import Slider from "react-native-a11y-slider";
import { Divider } from '@rneui/base';
import { ConfirmExitSessionModal } from './ConfirmExitSessionModal';
import { StimulatingModal } from './StimulatingModal';

export function ConfiguringStimulusComponent() {

  const { 
    repetitions,
    difficulty,
    setDifficulty,
    intensity,
    setIntensity,
    showStimulationModal,
    addRepetition
  } = useSessionContext();

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
          onPress={() => {addRepetition() }}
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
      {
        showStimulationModal&&
        <StimulatingModal/>
      }
      <ConfirmExitSessionModal/>
    </>
  );
}


