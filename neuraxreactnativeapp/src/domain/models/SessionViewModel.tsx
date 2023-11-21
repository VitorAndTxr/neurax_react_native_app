import { SessionParametersViewModel } from "./SessionParametersViewModel";

export interface SessionViewModel {
  id: string;
  creationDate: Date;
  parameters:SessionParametersViewModel
  photos: PhotoViewModel[];
  segments: SegmentViewModel[];
  repetitions: number;
}

export interface PhotoViewModel{
  id: string;
  path: string;
}

export interface SegmentViewModel{
  intensity: number;
  difficulty: number;
  smgDetected: boolean | null;
  emergency: boolean | null;
}