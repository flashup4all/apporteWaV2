
import axios from "axios";
import { environment } from '../environments/index.js';
import { user_token } from "../constant";
import { get_token } from "../localstore";


export const axiosInstance = axios.create({
  baseURL: environment.host,
  timeout: 1000,
});

axiosInstance.interceptors.request.use(function (config) {
	
	//const token = JSON.parse(this.local.get_store('atkn')) || null;
  const token = get_token() 
    config.headers.Authorization = `Bearer ${token}`; 
    config.headers = { ...config.headers };
    // you can also do other modification in config
    // console.log(config)
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

axiosInstance.interceptors.response.use(function (response) {
    if(response.status === 401) {
        // your failure logic
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
