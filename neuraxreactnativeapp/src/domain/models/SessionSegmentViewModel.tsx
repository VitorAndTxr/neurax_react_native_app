import { SessionSegmentStatusEnum } from "../enum/SessionSegmentStatusEnum";

export interface SessionSegmentViewModel {
    intensity: number;
    difficulty: number;
    status: SessionSegmentStatusEnum;
}

