import { defineStore } from "pinia";
export const  useAuthStore = defineStore({
    id: 'geeker-auth',
    state: () => ({
        //按钮的权限
        authButtonList:[],
        //菜单的权限
        authMenuList:[],
        //当前页面的
        routerName:""
    }),
    getters:{
        //按钮的权限
        authButtonListData:state=>state.authButtonList,
        //菜单的权限
        authMenuListData:state=>state.authMenuList,
        //当前页面的
        routerNameData:state=>state.routerName,
        flatMenuListGet:state=>{
            return state.authMenuList.length>0?state.authMenuList.flat():[]
        }
    },
    actions:{
        //按钮的权限
        setAuthButtonList(authButtonList:any){
            this.authButtonList = authButtonList
        },
        //菜单的权限
        setAuthMenuList(authMenuList:any){
            this.authMenuList = authMenuList
        },
       
    }
})

