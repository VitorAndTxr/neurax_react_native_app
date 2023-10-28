import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import SyncStorage from 'sync-storage';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AccountInterface = axios.create({
    baseURL: "https://neuroestimulator-api.azurewebsites.net/api/v1"
})

 function getToken():string{
    let token = SyncStorage.get('neuraXTokenAuthentication')
    return `Bearer ${token}`
}

AccountInterface.interceptors.request.use(function (config:InternalAxiosRequestConfig) {
    let token = getToken()
    
    config.headers.Authorization = token    
    return config
}, function (error) {
    return Promise.reject(error);
});

AccountInterface.interceptors.response.use(
    function (config) {
        return config
    },
    function (error: any) {   
        console.log(error.response);
             
        if (error.response.status === 401) {
            SyncStorage.remove('neuraXTokenAuthentication')
        }
        if (error.response.status === 404) {
            console.error("Houve um erro, favor tentar novamente mais tarde")
        }
        return error
    });

export default AccountInterface;

