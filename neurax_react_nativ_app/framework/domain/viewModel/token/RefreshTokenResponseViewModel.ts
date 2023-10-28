import ApplicationViewModel from "./ApplicationViewModel";

export interface RefreshTokenResponseViewModel {
    token:          string;
    redirectDomain: string;
    applications:   ApplicationViewModel[];
}