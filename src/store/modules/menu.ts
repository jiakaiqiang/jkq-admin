import { defineStore } from "pinia";
export const  menuStore = defineStore({
    id: 'menu',
    state: () => ({
        menuList:[]
    }),
    getters:{
      
        getterMenu:state=>state.menuList,
       
      
    },
    actions:{
        //按钮的权限
        setMenu(menuList:any){
            console.log(menuList,'wewewewe')
            this.menuList = menuList
            localStorage.setItem('menuList',JSON.stringify(menuList))
        },
        //菜单的权限
        getMenu(){
            return JSON.parse(localStorage.getItem('menuList')||'[]')
        },
       
    }
})

