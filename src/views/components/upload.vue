<template>
  <div class="upload-class">
    <div class="upload-title">文件上传</div>
    <div class="basic-upload">
      <el-upload
          class="upload-demo"
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>

      </el-upload>
    </div>
    <div class="upload-title">
      大文件上传
    </div>
    <div class="big-upload">
      <el-upload
          ref="uploadRef"
          class="upload-demo"
          :action="bigUpload.action"
          :on-change="bigChange"
          :auto-upload="false"
      >
        <template #trigger>
          <el-button type="primary">select file</el-button>
        </template>
      </el-upload>
    </div>
    <el-button @click="uploadSubmit">大文件上传</el-button>
    <!-- Your code here -->
  </div>
</template>

<script lang='ts' setup>
import { UploadFilled } from '@element-plus/icons-vue'
const bigUpload =  reactive({
  action:"xxxx",
  file:''
})
const bigChange =  (file)=>{
  bigUpload.file  =file
}
// 进行大文件上传
const uploadSubmit = ()=>{

}
</script>

<style scoped lang='scss' >
@import "../../styles/variables.scss";
.upload-class{

  background:$main_Color;
  height:100%;
  .upload-title{
    font-size:18px;
    padding:8px;

  }
}
/* Your styles here */
</style>