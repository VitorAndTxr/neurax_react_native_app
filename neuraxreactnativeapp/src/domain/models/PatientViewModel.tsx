import { SessionParametersViewModel } from "./SessionParametersViewModel";

export interface PatientViewModel {
    id: string;
    login: string;
    name: string;
    birthDate: Date;
    email: string;
    phone: string;
    caretakerName: string;
    caretakerPhone: string;
    parameters:SessionParametersViewModel

}


