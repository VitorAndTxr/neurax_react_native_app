import { SessionSegmentStatusEnum } from "../enum/SessionSegmentStatusEnum";

export interface SessionSegmentViewModel {
    id:'';
    intensity: number;
    difficulty: number;
    status: SessionSegmentStatusEnum;
}

