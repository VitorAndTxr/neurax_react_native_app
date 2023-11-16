import { AxiosResponse } from "axios";
import { AccountApplicationViewModel, AuthorizationResponseViewModel } from "../domain/models/AccountApplicationViewModel";
import ApiPaginatedResponse from "../../framework/domain/api/ApiPaginatedResponse";
import ApiResponse from "../../framework/domain/api/ApiResponse";
import ApiInterface from "../../framework/interface/ApiInterface";
import { PatientListViewModel } from "../domain/models/PatientListViewModel";
import { PatientViewModel } from "../domain/models/PatientViewModel";
import { PatientFormBody } from "../context/TherapistContext";

export default class PatientService {
    public async getPatients(): Promise<ApiResponse<PatientListViewModel[]> | undefined> {
        try {
            let endpoint = `/Therapist/GetPatients`;
            let response: AxiosResponse<ApiResponse<PatientListViewModel[]>> = await ApiInterface.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    public async getPatientById(id: string): Promise<ApiResponse<PatientViewModel> | undefined> {
        try {
            let endpoint = `/Patient/${id}`;
            let response: AxiosResponse<ApiResponse<PatientViewModel>> = await ApiInterface.get(endpoint);
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

    public async setPatientParameters(payload: any): Promise<ApiResponse<PatientViewModel> | undefined> {
        try {
            console.log(payload);
            
            let endpoint = `/Patient/Parameters`;
            let response: AxiosResponse<ApiResponse<PatientViewModel>> = await ApiInterface.post(endpoint, payload);
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

    public async SendSessionPhoto(formData: FormData): Promise<ApiResponse<boolean> | undefined> {
        try {
            let endpoint = `/Session/UploadPhotos`;
            let response: AxiosResponse<ApiResponse<boolean>> = await ApiInterface.postForm(endpoint, formData);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    public async CreateSession(formData: FormData): Promise<ApiResponse<boolean> | undefined> {
        try {
            let endpoint = `/Patient/CreateSession`;
            let response: AxiosResponse<ApiResponse<boolean>> = await ApiInterface.postForm(endpoint, formData);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    public async getPatientIdByAccountId(id: string): Promise<ApiResponse<string> | undefined> {
        try {
            let endpoint = `/Patient/GetPatientId/${id}`;
            let response: AxiosResponse<ApiResponse<string>> = await ApiInterface.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    

    

}