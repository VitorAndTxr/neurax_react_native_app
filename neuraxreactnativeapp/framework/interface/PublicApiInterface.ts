import axios from "axios";

export const PublicApiInterface = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/api/v1",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "Content-Type": "application/json",
        "accept": "/"
    }
});
PublicApiInterface.interceptors.response.use(
    function (config) {
        return config;
    },
    function (error: any) {
        if (error.response.status === 401) {
            console.error("ApiInterface:", "Não autorizado");
        }
        if (error.response.status === 403) {
            console.error("ApiInterface:", "Acesso não permitido");
        }
        if (error.response.status === 404) {
            console.error("ApiInterface:", "Houve um erro, favor tentar novamente mais tarde");
        }
        return error;
    }
);
