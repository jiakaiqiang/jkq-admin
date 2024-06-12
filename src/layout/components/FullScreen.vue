<template>
  <div @click="handleFullScreen">
    <!-- Your code here -->
    <el-icon><FullScreen /></el-icon>
  </div>
</template>

<script lang='ts' setup>
import {FullScreen} from '@element-plus/icons-vue'
import { useSystemStore } from '@/store/modules/system';
let systemStore =  useSystemStore();
let handleFullScreen = () => {
    if(systemStore.isFullScreen){
        document.exitFullscreen()
    }else{
        document.documentElement.requestFullscreen();
    }
  // Your code here
  systemStore.changeFullScreen(!systemStore.isFullScreen);
}
</script>

<style scoped lang='scss' >

/* Your styles here */
</style>