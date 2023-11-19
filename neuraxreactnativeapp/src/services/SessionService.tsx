import { AxiosResponse } from "axios";
import ApiResponse from "../../framework/domain/api/ApiResponse";
import ApiInterface from "../../framework/interface/ApiInterface";
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

    public async SendSessionPhoto(formData: FormData): Promise<ApiResponse<boolean> | undefined> {
        try {
            let endpoint = `/Session/UploadPhotos`;
            let response: AxiosResponse<ApiResponse<boolean>> = await ApiInterface.postForm(endpoint, formData);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}