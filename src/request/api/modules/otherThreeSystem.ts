// 获取天气的接口 https://api.oioweb.cn/api/weather/GetWeather

import axios from "axios"



export function getWeather() {
       return new Promise((resolve, reject) => {
              axios.get('https://api.oioweb.cn/api/weather/GetWeather').then(res=>{
                     resolve(res.data)
              })
       })
}

//获取古诗
export function getPoetry() {
       return new Promise((resolve, reject) => {
              axios.get('https://v1.jinrishici.com/all.json').then(res=>{
                     resolve(res.data)
              })
       })
}