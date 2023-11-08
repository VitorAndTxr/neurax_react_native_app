import {
  BaseViewStyles, LoggedViewStyles
} from './BaseViewStyles';
import { PatientListComponent } from '../components/PatientList/PatientListComponent';
import { BluetoothScreenHeaderComponent } from '../components/BluetoothSetup/BluetoothScreenHeaderComponent';
import { PatientListScreenContextProvider } from '../context/PatientListScreenContext';

export function PatientListScreen() {
  return (<BaseViewStyles>
    <LoggedViewStyles style={{ flex: 1}}>
      <PatientListScreenContextProvider>
        <PatientListComponent/>
      </PatientListScreenContextProvider>
    </LoggedViewStyles>
  </BaseViewStyles>);
}
