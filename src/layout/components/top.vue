<template>
  <div style="display: flex;justify-content: space-between;align-items: center;padding-right:20px">
  
    <div class="top-container">
      <div class="colleaspace-icon" @click="handleCollapse">
        <span class="iconfont icon-zhedie"></span>
    </div>
        <el-breadcrumb :separator-icon="ArrowRight">
    <!-- <el-breadcrumb-item :to="{ path: '/' }">工作台</el-breadcrumb-item> -->
    <el-breadcrumb-item v-for ="item in routerList" :to="{ path: item.path }">{{item.meta.title}}</el-breadcrumb-item>
  
    
  </el-breadcrumb>
    </div>
    <div style="display: flex;align-items: center">
      <Refresh style="margin-right:20px"></Refresh>
      <FullScreen style="margin-right:20px;"></FullScreen>
      <Theme style="margin-right:20px"></Theme>
    
      <Avatar></Avatar>
   
    </div>
   
    <!-- Your code here -->
  </div>
</template>

<script lang='ts' setup name="Top">
import Theme from '@/layout/components/theme.vue';
import Avatar from '@/layout/components/Avatar.vue';
import Refresh from '@/layout/components/Refresh.vue';
import FullScreen from '@/layout/components/FullScreen.vue';
import {computed} from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import {useSystemStore} from '@/store/modules/system';
import {  useRoute} from 'vue-router';
const route = useRoute();
let systemStore =  useSystemStore();
function handleCollapse(){
    systemStore.changeCollapse()
}

let routerList =computed(()=>{
  
  return route.meta.title=='工作台' ? [{path:'/',meta:{title:'工作台'}}] : route.matched
})  

  
</script>

<style scoped lang='scss' >
.top-container{
    display:flex;
   // background:#fff;
    align-items: center;
   
    height: 100%;
 
    .colleaspace-icon{
        margin-right:30px;
    }
    .iconfont{
        font-size: 24px;
        cursor: pointer;
    }
}
/* Your styles here */
</style>