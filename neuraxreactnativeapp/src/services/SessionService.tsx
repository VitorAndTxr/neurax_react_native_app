import { AxiosResponse } from "axios";
import ApiResponse from "../../framework/domain/api/ApiResponse";
import ApiInterface from "../../framework/interface/ApiInterface";
import { SessionViewModel } from "../domain/models/SessionParametersViewModel";
import { SessionSegmentViewModel } from "../domain/models/SessionSegmentViewModel";

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

    public async addSessionSegment(payload: AddSessionSegmentPayload): Promise<ApiResponse<SessionSegmentViewModel> | undefined> {
        try {
            let endpoint = `/Session/AddSegment`;
            let response: AxiosResponse<ApiResponse<SessionSegmentViewModel>> = await ApiInterface.post(endpoint, payload);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    public async finishSession(payload: FinishSessionPayload): Promise<ApiResponse<boolean> | undefined> {
        try {
            let endpoint = `/Session/Finish`;
            let response: AxiosResponse<ApiResponse<boolean>> = await ApiInterface.post(endpoint, payload);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}


interface AddSessionSegmentPayload{
    sessionId:string,
    difficulty:number,
    intensity:number
}

interface FinishSessionPayload{
    sessionId:string,
    wristAmplitudeMeasurement:number
}

