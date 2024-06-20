
import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig
} from 'axios'
import qs from 'qs';
// import { useUserStore } from "@/store/modules/user";
import { ElMessage } from 'element-plus'
import { AxiosCanceler } from "./helper/axiosCancel";
import { NO_TOKEN_URL } from "@/config/index.ts"
import { useSystemStore } from '@/store/modules/system';

export interface customAxiosRequestConfig extends InternalAxiosRequestConfig {
    loading?: boolean,
    cancel?: boolean,
    isLoading?: boolean,
}


const axiosCanceler = new AxiosCanceler();
//创建实例
export class Axios {
    instance: AxiosInstance
    constructor(config: AxiosRequestConfig) {

        this.instance = axios.create(config)
        this.instance.interceptors.request.use((config: customAxiosRequestConfig) => {
            const useSystemdata = useSystemStore()
            !config.isLoading && useSystemdata.changeLoading(true)
            //获取用户的数据
            //获取用户的缓存数据token
            //const userStore = useUserStore();
            config.cancel && axiosCanceler.addPending(config);

            if ((config.method as string).toUpperCase() == 'POST' || (config.method as string).toUpperCase() == 'PUT') {
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
                config.data = qs.stringify(config.data);

            }
            if (!NO_TOKEN_URL.includes(config.url as string)) {
                config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
            }


            return config;
        }, (error: AxiosError) => {
            return Promise.reject(error);
        })

        //相应拦截器
        this.instance.interceptors.response.use((response: AxiosResponse & { config: customAxiosRequestConfig }) => {
            const useSystemdata = useSystemStore()
            !config.isLoading && useSystemdata.changeLoading(false)

            const { data, config } = response;

            return data
        }, (error: AxiosError) => {
            const response = error.response as object
            const status = response.status
            console.log(status, '-wefwfe000')
            ElMessage({
                type: 'error',
                message: status == 401 ? '登录已过期' : status == 500 ? '服务器内部错误' : response.data.message
            })



            return Promise.reject(error);
        })
    }
    request(config: any): Promise<AxiosResponse> {
        if (config.loading) {
            //显示loading

        }

        return new Promise((resolve, reject) => {
            this.instance.request(config).then((res) => {

                resolve(res)
            }).catch((err) => {
                console.log(err, '-wefwfe000')
                reject(err)
            })
        })

    }
    get(url: string, data: any): Promise<AxiosResponse> {
        return this.request({ url: url, data: data, method: 'GET' })
    }
    post(url: string, data: any): Promise<AxiosResponse> {

        return this.request({ url: url, data: data, method: 'POST' })
    }



}



