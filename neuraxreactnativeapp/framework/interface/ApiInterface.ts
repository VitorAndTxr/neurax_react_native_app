import axios, { AxiosRequestConfig } from "axios";
import TokenService from "../auth/TokenService";

const tokenService = TokenService.getInstance()

const ApiInterface = axios.create({
  baseURL: "https://neuroestimulator-api.azurewebsites.net/api/v1",
  headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      "Content-Type": "application/json",
      "accept": "/"
  }
})

ApiInterface.interceptors.request.use(
  async function (config):Promise<AxiosRequestConfig> {
    try {      
      var config =  await tokenService.refreshToken()
      .then(():AxiosRequestConfig => { 
        let token = tokenService.getToken()
        
        if(token === null|| token === undefined){
          tokenService.removeToken()
        }
        config = {
            ...config,
            headers:{
                "Authorization": "Bearer " + token
            }
        }
        return config
      })
      return config

    } catch (error) {
      console.error("API Interface Error:",error);
      return config
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

ApiInterface.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error: any) {
    if (error.response.status === 401) {
        console.error("ApiInterface:","Não autorizado");
        tokenService.removeToken()
    }
    if (error.response.status === 403) {
        console.error("ApiInterface:","Acesso não permitido");
    }
    if (error.response.status === 404) {
        console.error("ApiInterface:","Houve um erro, favor tentar novamente mais tarde");
    }
    return error;
  }
);

export default ApiInterface;


