<template>
  <div>
    <el-drawer
    v-model="drawerValue"
    title="设置"
    direction="rtl"
    size="260px"
  >
  <el-form  label-width="100px" label-position='left'>
    <el-divider content-position="center">全局主题</el-divider>
    <el-form-item label="主题设置">
        <el-color-picker v-model="color" size="small" show-alpha  @change="colorChange"/>
    </el-form-item>
    <el-form-item label="暗黑模式">
        <el-switch
    v-model="theme"
    active-text="开"
    inactive-text="关"
   size="small"
    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
     @change="themeChange"
  />
    </el-form-item>
    <el-divider content-position="center">布局设置</el-divider>
    <el-divider content-position="center">全局主题</el-divider>
    <el-divider content-position="center">界面设置</el-divider>
    </el-form>
   
  </el-drawer>
  </div>
</template>

<script lang='ts' setup >
import {ref,defineModel} from 'vue';
let  drawerValue  =  defineModel<boolean>({
  default:false});

  let color = ref('#409eff');
  let theme = ref(false);
  const  colorChange =(e:string)=>{
 const el = document.documentElement
// const el = document.getElementById('xxx')

// 获取 css 变量
getComputedStyle(el).getPropertyValue(`--el-color-primary`)

// 设置 css 变量
el.style.setProperty('--el-color-primary', e)
  }

  const themeChange =(e:boolean)=>{
    if(e){
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }
</script>

<style scoped lang='scss' >
:deep .el-form-item__content{
    justify-content: flex-end;
}
/* Your styles here */
</style>