<template>
  <div class="icon-container">
    <div class="title">图标选择器 🍓🍇🍈🍉</div>
    <el-input
      v-model="iconValue"
      placeholder="请选择"
     
      
    >
      <template #append>
        <el-button :icon="Search"  @click="handleSelectIconButton" />
      </template>
     
    </el-input>
    <el-dialog
    v-model="dialogVisible"
    title="图标"
    width="70%"
    
  >
  <el-scrollbar style="">
    <div v-for="item in ElementPlusIconsVue" :key="item" class="icon-item" style="margin:10px;cursor: pointer;display: flex;flex-direction: column;align-items: center;justify-content: center;"  @click="handleSelectIcon(item)" >
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
import { ref} from "vue";
let iconValue =  ref<string>('')
let  dialogVisible =  ref<boolean>(false)

const  handleSelectIconButton = ()=>{
  dialogVisible.value = true
} 

const handleSelectIcon = (item:any)=>{
  iconValue.value = item.name
  dialogVisible.value  =  false
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
  background:var(--el-bg-color-page);
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .el-input {
    width: 300px;
  }
}
.icon-item{
  &:hover{
    .title{
      font-size:28px !important
    }
 
 
  }
}
/* Your styles here */
</style>