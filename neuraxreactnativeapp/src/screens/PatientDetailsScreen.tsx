import {
    BaseViewStyles, LoggedViewStyles
  } from '../components/BaseViewStyles';
import { PatientDetailsComponent } from '../components/PatientList/PatientDetailsComponent';
import React from 'react';
  
  export function PatientDetailsScreen() {
    return (
    <BaseViewStyles>
      <LoggedViewStyles style={{ flex: 1}}>
          <PatientDetailsComponent/>
      </LoggedViewStyles>
    </BaseViewStyles>);
  }
  