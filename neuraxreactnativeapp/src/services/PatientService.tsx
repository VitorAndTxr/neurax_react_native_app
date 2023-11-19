import { AxiosResponse } from "axios";
import { AccountApplicationViewModel, AuthorizationResponseViewModel } from "../domain/models/AccountApplicationViewModel";
import ApiPaginatedResponse from "../../framework/domain/api/ApiPaginatedResponse";
import ApiResponse from "../../framework/domain/api/ApiResponse";
import ApiInterface from "../../framework/interface/ApiInterface";
import { SessionListViewModel } from "../domain/models/ListViewModel";
import { PatientViewModel } from "../domain/models/PatientViewModel";

export default class PatientService{
    public async getPatientById(id: string): Promise<ApiResponse<PatientViewModel> | undefined> {
        try {
            let endpoint = `/Patient/${id}`;
            let response: AxiosResponse<ApiResponse<PatientViewModel>> = await ApiInterface.get(endpoint);
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

    public async getSessionsByPatientId(id: string): Promise<ApiResponse<SessionListViewModel[]> | undefined> {
        try {
            let endpoint =  `/Patient/${id}/Sessions`;
            let response: AxiosResponse<ApiResponse<SessionListViewModel[]>> = await ApiInterface.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}