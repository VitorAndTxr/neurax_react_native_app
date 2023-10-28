import { GrainViewModel } from "./GrainViewModel";

export interface ModuleViewModel {
    id: string;
    contentLevel: number;
    order: number;
    grain: GrainViewModel;
}
