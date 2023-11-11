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

}