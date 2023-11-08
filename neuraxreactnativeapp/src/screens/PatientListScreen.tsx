import {
  BaseViewStyles, LoggedViewStyles
} from './BaseViewStyles';
import { PatientListComponent } from '../components/PatientList/PatientListComponent';
import { TherapistContextProvider } from '../context/TherapistContext';

export function PatientListScreen() {
  return (<BaseViewStyles>
    <LoggedViewStyles style={{ flex: 1}}>
      <TherapistContextProvider>
        <PatientListComponent/>
      </TherapistContextProvider>
    </LoggedViewStyles>
  </BaseViewStyles>);
}
