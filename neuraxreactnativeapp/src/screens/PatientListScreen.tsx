import {
  BaseViewStyles, LoggedViewStyles
} from './BaseViewStyles';
import { PatientListComponent } from '../components/PatientList/PatientListComponent';
import { BluetoothScreenHeaderComponent } from '../components/BluetoothSetup/BluetoothScreenHeaderComponent';

export function PatientListScreen() {
  return (<BaseViewStyles>
    <LoggedViewStyles style={{ flex: 1}}>
      <PatientListComponent/>
    </LoggedViewStyles>
  </BaseViewStyles>);
}
