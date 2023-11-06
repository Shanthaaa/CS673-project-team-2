import axios from "axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";

// 1. 利用axios对象的方法create，去创建一个axios实例
const request = axios.create({
  // 配置对象
  baseURL: "http://127.0.0.1:5001", //基础路径，发送请求的时候，路径当中会出现api
  timeout: 30000, //请求超时的时间5s
});

// 请求拦截器：在发送请求之前，请求拦截器可以检测到，在请求发送之前处理一些事情
request.interceptors.request.use((config) => {
  // config: 是配置对象，该对象包含一个属性-->headers请求头
  return config;
});
// 响应拦截器：
request.interceptors.response.use(
  (res) => {
    // 成功的回调函数
    return res;
  },
  (error) => {
    // 失败的回调函数
    return Promise.reject(error);
  }
);

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
