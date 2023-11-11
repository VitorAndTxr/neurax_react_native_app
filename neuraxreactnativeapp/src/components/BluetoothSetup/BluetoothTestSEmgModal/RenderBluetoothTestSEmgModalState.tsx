import React from 'react';
import { InputLabel, RegularButtonText } from '../../BaseViewStyles';
import { View } from 'react-native';
import Slider from "react-native-a11y-slider";
import { BluetoothTestSEmgModalState } from './BluetoothTestSEmgModal';
import { NeuraXBluetoothProtocolBodyPropertyEnum, NeuraXBluetoothProtocolFEsStimuliBody } from '../../../context/BluetoothContext';

export function RenderBluetoothTestSEmgModalState(
  {
    modalState, 
    triggerDettected, 
    fesParams,
    onChangeSEmgDificulty
  }: RenderBluetoothTestSEmgModalStateProps) {

  switch (modalState) {
    case BluetoothTestSEmgModalState.selectDificulty:
      return (
        <View style={{ flexDirection: 'col', width: 330, justifyContent: 'center', alignItems: 'center' }}>
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

              labelTextStyle={{
                color: '#08415C',
                fontSize: 15
              }}
              style={{ width: 250 }}
              values={[(fesParams[NeuraXBluetoothProtocolBodyPropertyEnum.DIFFICULTY]!)]}
              onChange={onChangeSEmgDificulty}/>
            <InputLabel>
              10
            </InputLabel>
          </View>
        </View>
      );

    case BluetoothTestSEmgModalState.tryToDetect:
      return (
        <View style={{ flexDirection: 'col', width: 330, justifyContent: 'center', alignItems: 'center' }}>
          <InputLabel>
            Tente mover seu pulso
          </InputLabel>
          {
          triggerDettected?
            (
              <InputLabel>
                Movimento detectado
              </InputLabel>
            )
            :
            (

              <InputLabel>
                Tentando detectar...
              </InputLabel>
            )
            }
        </View>
      );
    default:
      return <></>;

  }

}
interface RenderBluetoothTestSEmgModalStateProps {
  modalState: BluetoothTestSEmgModalState;
  triggerDettected: boolean;
  onChangeSEmgDificulty:(values:number[])=>void
  fesParams:NeuraXBluetoothProtocolFEsStimuliBody
}
