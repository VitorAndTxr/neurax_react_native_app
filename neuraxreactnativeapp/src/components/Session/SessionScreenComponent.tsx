import React from 'react';
import { useSessionContext } from '../../context/SessionContext';
import { SessionStateEnum } from '../../domain/enum/SessionStateEnum';
import { LoginTextLabel } from '../BaseViewStyles';
import { SessionWristMeasurementComponent } from './SessionWristMeasurementComponent';

export function SessionScreenComponent() {
  const { sessionState } = useSessionContext();

  switch (sessionState) {
    case SessionStateEnum.SendPhoto:
      return (
        <>
        </>
      );
    case SessionStateEnum.MeasureWrist:
      return (
        <SessionWristMeasurementComponent/>
      );
    case SessionStateEnum.ConfiguringStimulus:
      return (
        <ConfiguringStimulusComponent/>
      );
  }
  return (
    <>
    </>
  );
}



function ConfiguringStimulusComponent(){
  return(
    <LoginTextLabel>
      Configurando Estimulo
    </LoginTextLabel>
  )
}



