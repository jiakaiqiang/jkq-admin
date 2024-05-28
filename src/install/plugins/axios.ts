
import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig
} from 'axios'
import qs from 'qs';
import { useUserStore } from "@/store/modules/user";

import { AxiosCanceler } from "./helper/axiosCancel";
export interface customAxiosRequestConfig extends InternalAxiosRequestConfig {
    loading?: boolean,
    cancel?: boolean
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
            //const userStore = useUserStore();
            config.cancel&&axiosCanceler.addPending(config);
            
            if((config.method as string).toUpperCase()=='POST'||(config.method as string).toUpperCase()=='PUT'){
                config.headers['Content-Type']= 'application/x-www-form-urlencoded'
                config.data = qs.stringify(config.data);

            }


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
     request(config:any):Promise<AxiosResponse>{
        if(config.loading){
            //显示loading
            
        }

       return new Promise((resolve,reject)=>{
           this.instance.request(config).then((res)=>{
               resolve(res)
           }).catch((err)=>{
               reject(err)
           })
       })

    }
    get(url:string,data:any):Promise<AxiosResponse>{
        return this.request({url:url,data:data,method:'GET'})
    }
    post(url:string,data:any):Promise<AxiosResponse>{
        
        return this.request({url:url,data:data,method:'POST'})
    }
   


}



