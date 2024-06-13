<template>
  <div>
  

    <el-icon  style="font-size:18px;cursor: pointer;" @click="handleSetting"><Setting /></el-icon>
 
     <systemSet v-model="systemStore.isShowSetting"></systemSet>
  </div>
</template>
  
<script lang='ts' setup>
import systemSet from '@/components/systemSet/index.vue'
import {Setting} from '@element-plus/icons-vue'
import { useSystemStore } from '@/store/modules/system'
const systemStore = useSystemStore()

const  handleSetting = ()=>{
  systemStore.changeSetting()
}
// Your code here
</script>

<style scoped lang='scss' >
/* Your styles here */
</style>