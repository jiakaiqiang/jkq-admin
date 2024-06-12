import { defineStore } from "pinia"; 

export const useSystemStore = defineStore("system", {
    state:()=>{
        return {
            collapse:false, // 侧边栏是否折叠
            tabsList:[], // 标签页列表
            isFullScreen:false, // 是否全屏
            isLock:false, // 是否锁屏
            isRefresh:true, // 是否刷新
        }
    },
    getters:{
      tabsListData:(state)=>{
        if(state.tabsList.length===0){
            let tabListStr = localStorage.getItem('tabList')
            if(tabListStr){
              state.tabsList = JSON.parse(tabListStr)
            }
        }
          // 获取标签页列表
         
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
        changeTabsList(data:any){
            this.tabsList =  data
        },
        changeFullScreen(data:boolean){
            this.isFullScreen = data
        },
        changeLock(data:boolean){
            this.isLock = data

        },
        changeRefresh(data:boolean){
            this.isRefresh = data
        }
       
    }
})