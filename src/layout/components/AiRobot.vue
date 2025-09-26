<template>
<el-icon @click="handleAI"> <Service /></el-icon>
</template>
<script setup  lang="ts">
import { Service } from '@element-plus/icons-vue'
import {useSystemStore} from  '@/store/modules/system.ts'
let systemStore = useSystemStore()


const handleAI  = ()=>{
    //抛出全局的ai 助手页面
    //修改ai 助手的全局狀態
    systemStore.changeAIShow(true)

}
</script>
<style scoped lang="scss">

</style>