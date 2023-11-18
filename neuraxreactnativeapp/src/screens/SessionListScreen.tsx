import {
  BaseViewStyles, LoggedViewStyles
} from '../components/BaseViewStyles';
import { SessionListComponent } from '../components/Session/SessionListComponent';

export function SessionListScreen() {
  return (<BaseViewStyles>
    <LoggedViewStyles style={{ flex: 1}}>
        <SessionListComponent/>
    </LoggedViewStyles>
  </BaseViewStyles>);
}