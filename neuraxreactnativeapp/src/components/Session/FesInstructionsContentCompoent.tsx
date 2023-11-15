import React from 'react';
import { H2, InputLabel, ModalContent, PrimaryButton, RegularButtonText } from '../BaseViewStyles';
import { View } from 'react-native';


export function FesInstructionsContentCompoent() {
  return (
    <ModalContent style={{ maxHeight: 500 }}>
      <H2 style={{
        marginBottom: 20
      }}>
        Iniciar Estímulo
      </H2>
      <InputLabel>
        {`\u2022`} O paciente deve estar com o pulso em posição de repouso antes de iniciar o estimulo.
      </InputLabel>
      <InputLabel>
        {`\u2022`} Após clicar em iniciar ele deve tentar fazer a extensão do pulso nos próximos 30 segundos.
      </InputLabel>
      <InputLabel>
        {`\u2022`} Caso não seja detectada a tentativa de movimento, reduza a dificuldade.
      </InputLabel>
      <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
        <PrimaryButton activeOpacity={1} onPress={() => { }}>
          <RegularButtonText style={{ fontSize: 20 }}>
            Iniciar Estímulo
          </RegularButtonText>
        </PrimaryButton>
      </View>
    </ModalContent>
  );
}
