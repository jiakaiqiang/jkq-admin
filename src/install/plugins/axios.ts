
import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig
} from 'axios'
import { useUserStore } from "@/store/modules/user";
import RequestConfig from '@/RequestConfig/index'
import { AxiosCanceler } from "./helper/axiosCancel";
export interface customAxiosRequestConfig extends InternalAxiosRequestConfig {
    loading?: boolean,
    cancel?: boolean
}

//默认配置
const config = {
    basicUrl: import.meta.env || '/',
    timeout: RequestConfig.timeout as number,
    withCredentials: true
}
const axiosCanceler = new AxiosCanceler();
//创建实例
export class Axios {
    instance:AxiosInstance
    constructor(config:AxiosRequestConfig){
        this.instance = axios.create(config)
        this.instance.interceptors.request.use((config:customAxiosRequestConfig)=>{
            //获取用户的数据
            //获取用户的缓存数据token
            const userStore = useUserStore();
            config.cancel&&axiosCanceler.addPending(config);


            return config;
        },(error: AxiosError) => {
            return Promise.reject(error);
        })

        //相应拦截器
        this.instance.interceptors.response.use((response: AxiosResponse & { config: customAxiosRequestConfig })=>{
            const { data, config } = response;

            return data 
        },(error: AxiosError) => {
            return Promise.reject(error);
        })
    }
   

//响应拦截器


//请求取消
}



