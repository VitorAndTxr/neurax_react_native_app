import { jwtDecode } from 'jwt-decode'
import { AxiosResponse } from 'axios';
import AccountInterface from '../interface/AccountInterface';
import AuthTokenViewModel from '../domain/viewModel/token/AuthTokenViewModel';
import ApiResponse from '../domain/api/ApiResponse';
import { RefreshTokenResponseViewModel } from '../domain/viewModel/token/RefreshTokenResponseViewModel';
import ProfileViewModel from "../domain/viewModel/token/ProfileViewModel";
import AsyncStorage from '@react-native-async-storage/async-storage';


class TokenService {
    private static instance: TokenService;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): TokenService {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService();
        }

        return TokenService.instance;
    }

    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */

    setToken = (query: string) => {
        try {
            console.log("SetToken");
            
            AsyncStorage.setItem('neuraXTokenAuthentication', query)
            
        } catch (error) {
            console.error("error at TokenService.setToken():",error);
            
        }
        
    };

    getToken = async (): Promise<string|null> => {
        try {

            let token =  await AsyncStorage.getItem('neuraXTokenAuthentication')
            if(token !== undefined)
                return token
            
        } catch (error) {
            console.error("error at TokenService.getToken():",error);
        }
        return null
    };

    getDecodedToken = async (): Promise<AuthTokenViewModel|null> =>{
        try {

            let stringToken = await this.getToken()
            
            if(stringToken!== null){
                var token = jwtDecode<AuthTokenViewModel>(stringToken);

                return token;
            }
        } catch (error) {
            console.error("error at TokenService.getDecodedToken():",error);
        }
        return null
    }

    getInstitutionId = async(): Promise<string> => {
        try {
            let decodedToken = await this.getDecodedToken()
            if(decodedToken!== null)
                return decodedToken.institutionId;
        } catch (error) {
            console.error("error at TokenService.getInstitutionId():",error);
        }
        return ''
    }

    removeToken() {
        try {

            AsyncStorage.removeItem('neuraXTokenAuthentication')
            
        } catch (error) {
            console.error("error at TokenService.removeToken():",error);
        }
    }

    async refreshToken(firstAccess:boolean = false):Promise<void>{
        try {        

            if(firstAccess){
                
                let response = await AccountInterface.get("/Account/Authorization/RefreshToken") as AxiosResponse<ApiResponse<RefreshTokenResponseViewModel>>
                
                this.setToken(response.data.result.token)

                return 
            }

            let decodedToken = await this.getDecodedToken()
            if(decodedToken!== null){

                let remainingSeconds = decodedToken.exp - Date.now() / 1000;
    
                if((remainingSeconds < 0)){
                    this.removeToken()
                    return
                }else{
                    let profiles: ProfileViewModel[] = JSON.parse(decodedToken.profiles)
                    if(profiles.length == 0){
                        this.removeToken()
                        return    
                    }
                    let response = await AccountInterface.get("/Account/Authorization/RefreshToken") as AxiosResponse<ApiResponse<RefreshTokenResponseViewModel>>
                    this.setToken(response.data.result.token)
    
                }
            }else{
                console.log("TokenService.refreshToken(): There is no token to be refreshed");   
            }

        } catch (error) {
            console.error("error at TokenService.refreshToken():",error);   
        }
    }

     async userHasProfile(profileCode: string) : Promise<boolean>{

        let decodedToken = await this.getDecodedToken()
        
        if (!decodedToken || !decodedToken.profiles?.length) {
            return false;
        }
        
        let profiles = this.extractUserProfilesFromToken(decodedToken);
        
        if (!Array.isArray(profiles)) {    
            return false;
        }
    
        const userProfile = profiles.filter(profile => {
            return profile.Code === profileCode;
        });   
        
        return userProfile.length>0;
    }
    
    extractUserProfilesFromToken(decodedToken: AuthTokenViewModel | null): ProfileViewModel[]{   
        let profiles: ProfileViewModel[] = JSON.parse(decodedToken!.profiles);    
        
        return profiles;
    }
      
}


export default TokenService 


