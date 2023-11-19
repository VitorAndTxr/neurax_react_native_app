import {
  BaseViewStyles, LoggedViewStyles
} from '../components/BaseViewStyles';
import React from 'react';
import { SessionDetailsComponent } from '../components/Session/SessionDetailsComponent';

export function SessionDetailsScreen() {
return (
<BaseViewStyles>
  <LoggedViewStyles style={{ flex: 1}}>
      <SessionDetailsComponent/>
  </LoggedViewStyles>
</BaseViewStyles>);
}

