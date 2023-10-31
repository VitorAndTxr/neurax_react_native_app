import ApplicationViewModel from "../../framework/domain/viewModel/token/ApplicationViewModel";


export interface AccountApplicationViewModel {
    id: string;
    name: string;
    code: string;
}


export interface AuthorizationResponseViewModel {
    token: string;
    redirectDomain: string;
    applications: ApplicationViewModel[];
}
