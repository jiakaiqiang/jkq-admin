
import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig
} from 'axios'

import RequestConfig from '@/RequestConfig/index'

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

//创建实例
export class Axios {
    instance:AxiosInstance
    constructor(config:AxiosRequestConfig){
        this.instance = axios.create(config)
        this.instance.interceptors.request.use((config:customAxiosRequestConfig)=>{
            //获取用户的数据
            
            const userStore = useUserStore();


        return config
        },(error: AxiosError) => {
            return Promise.reject(error);
          })
    }
   

//响应拦截器


//请求取消
}



