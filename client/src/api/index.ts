import axios, { AxiosRequestConfig } from "axios";
import { localStorageTypes } from "../Enums";
const baseURL = "http://localhost:5000";


const api = axios.create({
    baseURL
})

api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem(localStorageTypes.authorization);
    if (token) {
        config.headers = { ...config.headers, "Authorization": token };
    }
    return config;
})
export default api
