import { defineStore } from "pinia"; 

export const useSystemStore = defineStore("system", {
    state:()=>{
        return {
            collapse:false, // 侧边栏是否折叠
            tabsList:[], // 标签页列表
        }
    },
    getters:{
      tabsListData:(state)=>{
          // 获取标签页列表
          let tabListStr = localStorage.getItem('tabList')
          if(tabListStr){
            state.tabsList = JSON.parse(tabListStr)
          }
          return state.tabsList
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
        },
       
    }
})