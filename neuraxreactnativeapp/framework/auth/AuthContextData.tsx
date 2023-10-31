import { UserProfileEnum } from "../domain/enum/UserProfileEnum"
import ApplicationViewModel from "../domain/viewModel/token/ApplicationViewModel"
import AuthTokenViewModel from "../domain/viewModel/token/AuthTokenViewModel"
import ProfileViewModel from "../domain/viewModel/token/ProfileViewModel"

export interface AuthContextData {
    logout:()=> void
    isAuthenticating:boolean
    isAuthenticated:boolean
    userProfile:UserProfileEnum

    getDecodedToken:()=> Promise<AuthTokenViewModel |null>
    getInstitutionId:()=> Promise<string>
    getToken:()=>Promise<string|null>
    setToken:(token:string)=> Promise<void>

    setIsAuthenticating:React.Dispatch<React.SetStateAction<boolean>>
    userHasProfile:(profileCode: string) => Promise<boolean>
    extractUserProfilesFromToken:(decodedToken: AuthTokenViewModel | null) => ProfileViewModel[]
}
