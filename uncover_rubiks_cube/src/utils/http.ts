import axios from "axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";

//use axios.create to create an instance of axios
const request = axios.create({
  // configure instance
  // base url for send request
  baseURL: "http://127.0.0.1:5001",
  //request timeout time is 30s
  timeout: 30000,
});

//request interceptor will detect the request and handle something before sending the request
request.interceptors.request.use((config) => {
  return config;
});
//response interceptor will handle something after receiving response 
request.interceptors.response.use(
  (res) => {
    //callback for successful response
    return res;
  },
  (error) => {
    //callback for failure response
    return Promise.reject(error);
  }
);
/**
 * return a promise with the result of response
 */
export const http = <T>(options: AxiosRequestConfig<any>) => {
  return new Promise<AxiosResponse<T>>((resolve, reject) => {
    request({
      ...options,
    }).then(
      (res) => {
        resolve(res);
      },
      (err) => {
        reject(err);
      }
    );
  });
};
