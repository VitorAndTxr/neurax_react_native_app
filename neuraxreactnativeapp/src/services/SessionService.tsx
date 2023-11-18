import { AxiosResponse } from "axios";
import { AccountApplicationViewModel, AuthorizationResponseViewModel } from "../domain/models/AccountApplicationViewModel";
import ApiPaginatedResponse from "../../framework/domain/api/ApiPaginatedResponse";
import ApiResponse from "../../framework/domain/api/ApiResponse";
import ApiInterface from "../../framework/interface/ApiInterface";
import { PatientListViewModel } from "../domain/models/ListViewModel";
import { PatientViewModel } from "../domain/models/PatientViewModel";
import { PatientFormBody } from "../context/TherapistContext";

export default class SessionService {
    public async getSessionsByPatientId(id: string): Promise<ApiResponse<PatientListViewModel[]> | undefined> {
        try {
            let endpoint = `/Therapist/GetPatients`;
            let response: AxiosResponse<ApiResponse<PatientListViewModel[]>> = await ApiInterface.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

}