import { AxiosResponse } from "axios";
import ApiResponse from "../../framework/domain/api/ApiResponse";
import ApiInterface from "../../framework/interface/ApiInterface";
import { SessionSegmentViewModel } from "../domain/models/SessionSegmentViewModel";


export default class SegmentService {
    public async emergencyStop(sessionSegmentId: string): Promise<ApiResponse<SessionSegmentViewModel> | undefined> {
        try {
            let endpoint = `/Segment/${sessionSegmentId}/Emergency`;

            let response: AxiosResponse<ApiResponse<SessionSegmentViewModel>> = await ApiInterface.post(endpoint, null);

            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    public async smgDetected(sessionSegmentId: string): Promise<ApiResponse<SessionSegmentViewModel> | undefined> {
        try {
            console.log("sessionSegmentId");
            console.log(sessionSegmentId);


            let endpoint = `/Segment/${sessionSegmentId}/SmgDetected`;

            let response: AxiosResponse<ApiResponse<SessionSegmentViewModel>> = await ApiInterface.post(endpoint, null);
            console.log("SegmentDetected");
            console.log(response);

            
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

}
