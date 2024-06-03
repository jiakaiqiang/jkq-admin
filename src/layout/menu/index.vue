<template>
  <div>
    <el-container   class="side-menu">
    <el-menu
        active-text-color="black"
        background-color="white"
      
       
        :collapse="collapse"
        :collapse-transition="false"
        :default-active="$route.path"
        text-color="black"
       :router="true"
      >
      <template v-for="item in staticRouter.filter(item=>item.isMenu==true)" :key="item.path">
       <MenuItem :item="item"></MenuItem>

      </template>
      
       
        
      </el-menu>
    </el-container>
  </div>
</template>

<script lang='ts' setup>
import MenuItem from './menu-item.vue';
import {staticRouter} from '@/router/staticRouter';
import {useSystemStore} from '@/store/modules/system.ts'

import {storeToRefs} from 'pinia'

const systemStore = useSystemStore()
 
const {collapse} = storeToRefs(systemStore)

//刷新后动态的设置激活的路由地址
let $route =  getCurrentInstance()?.appContext.config.globalProperties.$route;


</script>

<style scoped lang='scss' >

.side-menu{
  border-top:1px solid #e6e6e6;
  height:calc(100vh - 60px);
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid #e6e6e6;
}



/* Your styles here */
</style>