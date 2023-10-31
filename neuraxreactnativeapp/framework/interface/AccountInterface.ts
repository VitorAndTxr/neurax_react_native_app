import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const AccountInterface = axios.create({
    baseURL: "https://neuroestimulator-api.azurewebsites.net/api/v1"
})

 async function getToken():Promise<string>{
    let token = await AsyncStorage.getItem('neuraXTokenAuthentication')
    return `Bearer ${token}`
}

AccountInterface.interceptors.request.use(async function (config:InternalAxiosRequestConfig) {
    let token = await getToken()
    
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
            AsyncStorage.removeItem('neuraXTokenAuthentication')
        }
        if (error.response.status === 404) {
            console.error("Houve um erro, favor tentar novamente mais tarde")
        }
        return error
    });

export default AccountInterface;

