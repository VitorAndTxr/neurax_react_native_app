import { AxiosResponse } from "axios";
import ApiResponse from "../../framework/domain/api/ApiResponse";
import ApiInterface from "../../framework/interface/ApiInterface";
import { PatientListViewModel } from "../domain/models/ListViewModel";
import { PatientViewModel } from "../domain/models/PatientViewModel";
import { PatientFormBody } from "../context/TherapistContext";
import { SessionViewModel } from "../domain/models/SessionParametersViewModel";


export default class TherapistService {
    public async getPatients(): Promise<ApiResponse<PatientListViewModel[]> | undefined> {
        try {
            let endpoint = `/Therapist/GetPatients`;
            let response: AxiosResponse<ApiResponse<PatientListViewModel[]>> = await ApiInterface.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    public async createPatient(payload: PatientFormBody): Promise<ApiResponse<PatientViewModel> | undefined> {
        try {
            let endpoint = `/Therapist/CreatePatient`;
            let response: AxiosResponse<ApiResponse<PatientViewModel>> = await ApiInterface.post(endpoint, payload);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    public async editPatient(payload: PatientFormBody): Promise<ApiResponse<PatientViewModel> | undefined> {
        try {
            let endpoint = `/Therapist/EditPatient`;
            let response: AxiosResponse<ApiResponse<PatientViewModel>> = await ApiInterface.put(endpoint, payload);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    public async deletePatient(id: string): Promise<ApiResponse<boolean> | undefined> {
        try {
            let endpoint = `/Therapist/DeletePatient/${id}`;
            let response: AxiosResponse<ApiResponse<boolean>> = await ApiInterface.delete(endpoint);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    public async allowPatientSessions(id: string): Promise<ApiResponse<PatientViewModel> | undefined> {
        try {
            let endpoint = `/Therapist/AllowPatientSessions/${id}`;
            let response: AxiosResponse<ApiResponse<PatientViewModel>> = await ApiInterface.patch(endpoint);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    public async disallowPatientSessions(id: string): Promise<ApiResponse<PatientViewModel> | undefined> {
        try {
            let endpoint = `/Therapist/DisallowPatientSessions/${id}`;
            let response: AxiosResponse<ApiResponse<PatientViewModel>> = await ApiInterface.patch(endpoint);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    public async createSession(payload: TherapistCreateSessionPayload): Promise<ApiResponse<SessionViewModel> | undefined> {
        try {
            let endpoint = `/Therapist/CreateSession/`;
            let data = JSON.stringify(payload)
            console.log(payload);


            let response: AxiosResponse<ApiResponse<SessionViewModel>> = await ApiInterface.post(endpoint, payload);
            console.log(response);

            return response.data;
        } catch (error) {
            console.log(error);
            
            console.error(error);
        }
    }
}

interface TherapistCreateSessionPayload{
    patientId:string,
    wristAmplitudeMeasurement:number
}
