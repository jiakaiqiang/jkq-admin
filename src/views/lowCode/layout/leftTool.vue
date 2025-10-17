<template>
    <div class="left-tools">
       <div class="tool-item" :class="{'active': active === 'component'}" @click="active = 'component'">
        <el-icon size="20"><Memo /></el-icon>
       </div>
       <div class="tool-item" :class="{'active': active === 'list'}" @click="active = 'list'">
        <el-icon size="20"><List /></el-icon>
       </div>
       <div class="tool-item" :class="{'active': active === 'setting'}" @click="active = 'setting'">
        <el-icon size="20"><Setting /></el-icon>
       </div>
    </div>
</template>
<script setup lang="ts">
import { Memo, List, Setting } from '@element-plus/icons-vue'
let  active = ref('component')
let emit = defineEmits(['change-active'])
watch(()=>active.value, (val) => { 
  emit('change-active', val)
})

</script>
<style scoped lang="scss">
.left-tools {
  display: flex;
  flex-direction: column;
  padding: 10px;
  .active{
    color:#409eff
  }
  .tool-item{
    cursor: pointer;
    &:hover{
      background: #f5f7fa;
    }
  }
}
</style>