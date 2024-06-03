import { defineStore } from "pinia"; 

export const useSystemStore = defineStore("system", {
    state:()=>{
        return {
            collapse:false, // 侧边栏是否折叠
        }
    },
    actions:{
        changeCollapse(){
            this.collapse = !this.collapse
        },
        setGlobalState(state:string,value:boolean){
            // 修改全局状态
            // 修改侧边栏折叠状态
            if(state === 'collapse'){
                this.collapse = value
            }
        }
    }
})