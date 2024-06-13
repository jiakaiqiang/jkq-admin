<template>
  <div class="project-container">
    <el-descriptions
    title="项目依赖数据"
 
    :column="4"
    :size="size"
    border
  >
  <template v-slot:title>
    <div  class="title">
    项目依赖数据
  </div>
  </template>
 
    <el-descriptions-item :label="index" v-for="(item,index) in projectData ">{{item}}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang='ts' setup>
import data from '../../../package.json'
let projectData =  (data.dependencies as any) 

console.log(data,'-wewe')
</script>

<style scoped lang='scss' >
.project-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  .title {
    font-size: 24px;
    font-weight: 700;
    color: #333;
    margin-bottom: 20px;
  }
}

  .el-descriptions__body .el-descriptions__table .el-descriptions-item__cell {
    text-align: center;
  }
/* Your styles here */
</style>