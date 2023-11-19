import { AxiosResponse } from "axios";
import { AccountApplicationViewModel, AuthorizationResponseViewModel } from "../domain/models/AccountApplicationViewModel";
import ApiPaginatedResponse from "../../framework/domain/api/ApiPaginatedResponse";
import ApiResponse from "../../framework/domain/api/ApiResponse";
import ApiInterface from "../../framework/interface/ApiInterface";
import { PatientListViewModel } from "../domain/models/ListViewModel";
import { PatientViewModel } from "../domain/models/PatientViewModel";
import { SessionViewModel } from "../domain/models/SessionParametersViewModel";

export default class SessionService {
    public async getSessionsById(id: string): Promise<ApiResponse<SessionViewModel> | undefined> {
        try {
            let endpoint = `/Session/${id}`;
            let response: AxiosResponse<ApiResponse<SessionViewModel>> = await ApiInterface.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

}