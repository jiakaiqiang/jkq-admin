<template>
  <div @click="refresh">
 
    <el-icon><Refresh /></el-icon>
    <!-- Your code here -->
  </div>
</template>

<script lang='ts' setup>
 import {Refresh} from "@element-plus/icons-vue";
import {useSystemStore} from "@/store/modules/system"

const systemStore = useSystemStore()
const refresh = () => {
  systemStore.changeRefresh(false)
  window.location.reload()
}


</script>

<style scoped lang='scss' >
/* Your styles here */
</style>