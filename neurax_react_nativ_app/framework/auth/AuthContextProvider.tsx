import  React, { createContext, useContext, useEffect, useState } from "react";
import AuthTokenViewModel from "../domain/viewModel/token/AuthTokenViewModel";
import { AuthContextData } from "./AuthContextData";
import { AuthContextProviderProps } from "./AuthContextProviderProps";
import TokenService from './TokenService';
import { UserProfileEnum } from "../domain/enum/UserProfileEnum";

const tokenService = TokenService.getInstance();

const AuthContext: React.Context<AuthContextData>  = createContext({} as AuthContextData);

export function useAuthContext() {
  return useContext(AuthContext);
}

const  AuthContextProvider: React.FC<AuthContextProviderProps>  = ({ children, waitAuthentication }) =>{

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileEnum>(UserProfileEnum.Unlogged);



  const [decodedToken, setDecodedToken] = useState<AuthTokenViewModel>();


  useEffect(() => {
    loadAuthContext();
  }, []);
 
  async function loadAuthContext() {

    let token = tokenService.getDecodedToken();
    console.log(token);
    
    if (token !== null) {
      setDecodedToken(token)
      let isTherapist = userHasProfile('neura_therapist')

      console.log(isTherapist,'response');
  
      if(isTherapist){
        setUserProfile(UserProfileEnum.Theraphist)
      }else{
        setUserProfile(UserProfileEnum.Patient)
  
      }
    }
    //   let query = new URLSearchParams(window.location.search).get(String(process.env.REACT_APP_NAME_TOKEN));

    //   if (query !== null && query !== "") {

    //     tokenService.setToken(query);
    //     tokenService.refreshToken(true);

    //   } else if(waitAuthentication){
    //     window.location.href = process.env.REACT_APP_LOGIN_REDIRECT!;
    //   }else{
    //     setIsAuthenticating(false);

    //   }
    // }
    // else {
    //   tokenService.refreshToken().then(
    //     () => {
    //       setIsAuthenticating(false);
    //     }
    //   );
    // };
  }


  function getDecodedToken(): AuthTokenViewModel |null {
    return tokenService.getDecodedToken()
  }

  function getInstitutionId(): string {
    return tokenService.getInstitutionId()
  }

  function getToken(): string|null {
    return tokenService.getToken()
  }

  function setToken(token:string){
    tokenService.setToken(token)

    let isTherapist = userHasProfile('neura_therapist')

    console.log(isTherapist,'response');

    if(isTherapist){
      setUserProfile(UserProfileEnum.Theraphist)
    }else{
      setUserProfile(UserProfileEnum.Patient)

    }
  }

  function userHasProfile(profileCode: string) : boolean{
    return tokenService.userHasProfile(profileCode)
  }

  function logout() {
    tokenService.removeToken()
    setUserProfile(UserProfileEnum.Unlogged)

  }
  function extractUserProfilesFromToken(decodedToken: AuthTokenViewModel | null){
    return tokenService.extractUserProfilesFromToken(decodedToken);
  }
  return (
    <AuthContext.Provider
      value={{
        logout,
        userProfile,
        isAuthenticating,
        getDecodedToken,
        getInstitutionId,
        getToken,
        setToken,
        userHasProfile,
        extractUserProfilesFromToken,
        setIsAuthenticating,
        isAuthenticated
      }}
    >
      {(isAuthenticating&&waitAuthentication) ?
        (
          <>Loading...</>
        )
        :
        (
          children
        )}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext}


