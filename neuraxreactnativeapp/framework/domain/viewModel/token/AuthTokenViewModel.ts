export default interface AuthTokenViewModel {
    profiles: string;
    aud: string;
    exp: number;
    iat: number;
    institutionId: string;
    iss: string;
    jti: string;
    login: string;
    name: string;
    sub: string;
  }
