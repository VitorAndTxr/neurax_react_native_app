import React from 'react';
import { H2, InputLabel, InstructionText, ModalContent, PrimaryButton, RegularButtonText } from '../BaseViewStyles';
import { View } from 'react-native';


export function FesInstructionsContentCompoent() {
  return (
    <ModalContent style={{ maxHeight: 420 }}>
      <H2 style={{
        marginBottom: 20
      }}>
        Iniciar Estímulo
      </H2>
      <InstructionText>
        {`\u2022`} O paciente deve estar com o pulso em posição de repouso antes de iniciar o estimulo.
      </InstructionText>
      <InstructionText>
        {`\u2022`} Após clicar em iniciar ele deve tentar fazer a extensão do pulso nos próximos 30 segundos.
      </InstructionText>
      <InstructionText>
        {`\u2022`} Caso não seja detectada a tentativa de movimento, reduza a dificuldade.
      </InstructionText>
      <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', marginTop:50 }}>
        <PrimaryButton activeOpacity={1} onPress={() => { }}>
          <RegularButtonText style={{ fontSize: 20 }}>
            Iniciar Estímulo
          </RegularButtonText>
        </PrimaryButton>
      </View>
    </ModalContent>
  );
}
