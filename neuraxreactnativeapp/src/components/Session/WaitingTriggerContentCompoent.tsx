import React, { useEffect, useState } from 'react';
import { H2, InputLabel, LoginTextLabel, ModalContent, PrimaryButton, RegularButtonText } from '../BaseViewStyles';
import { View } from 'react-native';


export function WaitingTriggerContentCompoent() {

  const [counter, setCounter] = useState(10);

  useEffect(() => {
    setTimeout(() => setCounter(counter - 1), 1000);
  }, []);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  
  return (
    <ModalContent style={{ maxHeight: 250 }}>
      <H2 style={{
        marginBottom: 20
      }}>
        Tente mover o pulso
      </H2>
      <LoginTextLabel>        
        Levante as costas de sua mão o máximo que conseguir:
      </LoginTextLabel>
      <H2>
        {counter}
      </H2>
      <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
        <PrimaryButton activeOpacity={1} onPress={() => { }}>
          <RegularButtonText style={{ fontSize: 20 }}>
            Parada de Emergência
          </RegularButtonText>
        </PrimaryButton>
      </View>
    </ModalContent>
  );
}
