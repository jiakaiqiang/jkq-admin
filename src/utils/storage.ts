import Cookies from 'js-cookie';
//localStorage
export const getLocaltionStorage = (type:string) => {
    return  localStorage.getItem(type)
}
export const setLocaltionStorage = (type:string,value:string) => {
    return  localStorage.setItem(type,value)
}
export const removeLocaltionStorage = (type:string) => {
  localStorage.remove(type)   
}
export const clearLocaltionStorage = () => {
 localStorage.clear()   
}
//sessionStorage
export const getSessionStorage = (type:string) => {
    return  sessionStorage.getItem(type)
}
export const setSessionStorage = (type:string,value:string) => {
    return  sessionStorage.setItem(type,value)
}
export const removeSessionStorage = (type:string) => {
    sessionStorage.remove(type)
}
export const clearSessionStorage = () => {
    sessionStorage.clear()
}
//获取token   13250049  13170025



const TokenKey = 'Admin-Token';

export function getToken() {
	return Cookies.get(TokenKey);
}

export function setToken(token:string) {
	return Cookies.set(TokenKey, token);
}

export function removeToken() {
	return Cookies.remove(TokenKey);
}