import { AxiosResponse } from "axios";
import { AccountApplicationViewModel, AuthorizationResponseViewModel } from "../domain/models/AccountApplicationViewModel";
import ApiPaginatedResponse from "../../framework/domain/api/ApiPaginatedResponse";
import ApiResponse from "../../framework/domain/api/ApiResponse";
import AccountInterface from "../../framework/interface/AccountInterface";



export default class AccountService {
    public async getApplications(): Promise<ApiPaginatedResponse<AccountApplicationViewModel> | undefined> {
        try {
            let endpoint = `/Application/GetApplicationsAvailableLogin`;
            let response: AxiosResponse<ApiPaginatedResponse<AccountApplicationViewModel>> = await AccountInterface.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    public async authorization(data: AuthorizationPayload): Promise<ApiResponse<AuthorizationResponseViewModel> | undefined> {
        try {
            let endpoint = `/Account/Authorization`;
            let response = await AccountInterface.post(endpoint, data);

            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export interface AuthorizationPayload {
    login: string;
    accessToken?: string;
    password?: string;
}
