<template>
   <el-container   class="side-menu">
    <el-menu
    ref='menuRef'
        active-text-color="black"
        background-color="white"
      
       
        :collapse="collapse"
        :collapse-transition="false"
        :default-active="defaultActive"
        text-color="black"
       :router="true"
      >
      <template v-for="item in staticRouter.filter(item=>item.isMenu==true)" :key="item.path">
       <MenuItem :item="item"></MenuItem>

      </template>
      
       
        
      </el-menu>
    </el-container>
</template>

<script lang='ts' setup>
import MenuItem from './menu-item.vue';
import {computed,watchEffect,ref} from 'vue'
import {staticRouter} from '@/router/staticRouter';
import {useSystemStore} from '@/store/modules/system.ts'
//刷新后动态的设置激活的路由地址
let $route =  getCurrentInstance()?.appContext.config.globalProperties.$route;
let  menuRef =  ref(null)
// let defaultActive =  computed(()=>{
//   return $route.path
// })
let  defaultActive =  ref($route.path)

import {storeToRefs} from 'pinia'
  watchEffect( ()=>{
    
 defaultActive.value  = $route.path
 
})

const systemStore = useSystemStore()
 
const {collapse} = storeToRefs(systemStore)




</script>

<style scoped lang='scss' >

.side-menu{
  border-top:1px solid #e6e6e6;
  flex:1;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid #e6e6e6;
}
::v-deep .el-menu-item.is-active{
  background:#409eff;
  color:#fff
}



/* Your styles here */
</style>