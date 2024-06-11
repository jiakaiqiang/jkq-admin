<template>
  <div class="icon-container">
    <div class="title">图标选择器 🍓🍇🍈🍉</div>
    <el-input
      v-model="iconValue"
      placeholder="请选择"
     
      
    >
      <template #append>
        <el-button :icon="Search"  @click="handleSelectIcon" />
      </template>
     
    </el-input>
    <el-dialog
    v-model="dialogVisible"
    title="图标"
    width="70%"
    
  >
  <el-scrollbar style="">
    <div v-for="item in ElementPlusIconsVue" :key="item"  style="margin:10px;cursor: pointer;display: flex;flex-direction: column;align-items: center;justify-content: center;"  >
       <el-icon :size="20" :color="'#606266'" >
        <component :is="item" />
      </el-icon>
      <span>{{item.name}}</span>
     
    </div>

  </el-scrollbar>
    
    
  </el-dialog>
    <!-- Your code here -->
  </div>
</template>

<script lang='ts' setup>
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {Search} from "@element-plus/icons-vue";
import { ref } from "vue";
let iconValue =  ref<string>('')
let dialogVisible =  ref<boolean>(false)
const handleSelectIcon  = () => {
  dialogVisible.value = true
}


</script>

<style scoped lang='scss' >
:deep .el-scrollbar__view{
  max-height:500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.icon-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .el-input {
    width: 300px;
  }
}
/* Your styles here */
</style>