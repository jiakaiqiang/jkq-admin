//系统主题颜色
export const DEFAULT_PRIMARY:string =  '#009688'

export const LOGIN_URL:String = '/login/index'
export const SYSTEM_NAME:String = '综合管理平台'

// 路由白名单地址（本地存在的路由 staticRouter.ts 中）
export const ROUTER_WHITE_LIST: string[] = ["/500"];

//请求前缀
export const REQUEST_PREFIX:string = '/api'

//不需要token的请求
export const NO_TOKEN_URL:string[] = ['/auth','/auth/captchaImage','https://api.oioweb.cn/api/weather/GetWeather']
//默认登录成功后的地址
export const Default_Login_Success_Redirect:string = '/workspace/index'

