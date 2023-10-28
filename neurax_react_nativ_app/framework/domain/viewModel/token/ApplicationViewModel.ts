import ProfileViewModel from "./ProfileViewModel";

export default interface ApplicationViewModel {
    Id: string;
    Name: string;
    Code: string;
    RedirectDomain: string;
    Profiles: ProfileViewModel[];
}
