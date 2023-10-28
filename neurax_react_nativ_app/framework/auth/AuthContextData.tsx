import { UserProfileEnum } from "../domain/enum/UserProfileEnum"
import ApplicationViewModel from "../domain/viewModel/token/ApplicationViewModel"
import AuthTokenViewModel from "../domain/viewModel/token/AuthTokenViewModel"
import ProfileViewModel from "../domain/viewModel/token/ProfileViewModel"

export interface AuthContextData {
    logout:()=> void
    isAuthenticating:boolean
    isAuthenticated:boolean
    userProfile:UserProfileEnum

    getDecodedToken:()=> AuthTokenViewModel |null
    getInstitutionId:()=> string
    getToken:()=>string|null
    setToken:(token:string)=> void

    setIsAuthenticating:React.Dispatch<React.SetStateAction<boolean>>
    userHasProfile:(profileCode: string) => boolean
    extractUserProfilesFromToken:(decodedToken: AuthTokenViewModel | null) => ProfileViewModel[]
}
