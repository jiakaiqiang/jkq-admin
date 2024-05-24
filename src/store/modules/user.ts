import { defineStore } from "pinia";
//引入声明的数据类型
import { UserState } from "@/store/interface/index";

export const useUserStore = defineStore({
    id: 'app-user',
    state: (): UserState => {
        return  {token:''}
    },
    
})