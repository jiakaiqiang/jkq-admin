import {Axios} from '@/install/plugins/axios';
import RequestConfig from '@/RequestConfig/index'
//默认配置
import {REQUEST_PREFIX} from "@/config/index"
const config = {
    baseURL: REQUEST_PREFIX || 'api/',
    timeout: RequestConfig.timeout as number,
    withCredentials: true
}
const instance=   new Axios(config)

export default instance;
