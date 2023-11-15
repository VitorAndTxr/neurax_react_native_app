import React from 'react';
import { useSessionContext } from '../../context/SessionContext';
import { SessionStateEnum } from '../../domain/enum/SessionStateEnum';
import { LoginTextLabel, PrimaryButton } from '../BaseViewStyles';
import { SessionWristMeasurementComponent } from './SessionWristMeasurementComponent';
import { ConfiguringStimulusComponent } from './ConfiguringStimulusComponent';


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
    default:
      return (
        <>
        </>
      );
  }
}




