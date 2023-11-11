import {
    BaseViewStyles, LoggedViewStyles
  } from '../components/BaseViewStyles';
  import { PatientListComponent } from '../components/PatientList/PatientListComponent';
  import { TherapistContextProvider } from '../context/TherapistContext';
import { PatientDetailsComponent } from '../components/PatientList/PatientDetailsComponent';
  
  export function PatientDetailsScreen() {
    return (<BaseViewStyles>
      <LoggedViewStyles style={{ flex: 1}}>
          <PatientDetailsComponent/>
      </LoggedViewStyles>
    </BaseViewStyles>);
  }
  