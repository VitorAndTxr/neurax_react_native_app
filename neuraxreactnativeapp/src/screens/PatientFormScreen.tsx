import React from 'react';
import {
    BaseViewStyles, LoggedViewStyles
  } from '../components/BaseViewStyles';
  import { PatientFormComponent } from '../components/PatientList/PatientFormComponent';
  
  export function PatientFormScreen() {
    return (
    <BaseViewStyles>
      <LoggedViewStyles style={{ flex: 1}}>
          <PatientFormComponent/>
      </LoggedViewStyles>
    </BaseViewStyles>);
  }
  