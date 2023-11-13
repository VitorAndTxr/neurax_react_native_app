import { BaseViewStyles, LoggedViewStyles } from '../components/BaseViewStyles';
import React from 'react';
import { SessionScreenComponent } from '../components/Session/SessionScreenComponent';


export function SessionScreen() {
  return (
    <BaseViewStyles>
      <LoggedViewStyles style={{ flex: 1 }}>
        <SessionScreenComponent/>
      </LoggedViewStyles>
    </BaseViewStyles>);
}


