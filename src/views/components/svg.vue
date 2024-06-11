<template>
  <div class="svg-container">
    <el-alert  title="SVG 图标目前使用 vite-plugin-svg-icons 插件完成，官方文档请查看 ：https://github.com/vbenjs/vite-plugin-svg-icons" type="warning" :closable="false" effect='dark' />
 
     <svgIcon name="xianxingdaoyu" />
      <svgIcon name="xianxingdiqiu" />
      <svgIcon name="xianxingditu" />
      <svgIcon name="xianxingfanchuan" />
      <svgIcon name="xianxingfeiji" />
      <svgIcon name="xianxinglvhangriji" />
      <svgIcon name="xianxingtianqiyubao" />
      <svgIcon name="xianxingxiangjipaizhao" />
      <svgIcon name="xianxingxiarilengyin" />
      <svgIcon name="xianxingyoulun" />
      <svgIcon name="xianxingxiarilengyin" />
      <el-descriptions title="插件使用 📚" :column="1" border>
      <el-descriptions-item label="name"> 图标的名称，svg 图标必须存储在 src/assets/icons 目录下 </el-descriptions-item>
      <el-descriptions-item label="prefix"> 图标的前缀，默认为 "icon" </el-descriptions-item>
      <el-descriptions-item label="iconStyle"> 图标的样式，默认样式为 { width: "100px", height: "100px" } </el-descriptions-item>
      <el-descriptions-item label="iconStyle"> vite-plugin-svg-icons 需要通过import 'virtual:svg-icons-register' 引入注册才能使用 </el-descriptions-item>
      <el-descriptions-item label="iconStyle"> vite-plugin-svg-icons 需要在vite.config.ts中配置  createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    }) </el-descriptions-item>
    </el-descriptions>
  </div>
  
</template>

<script lang='ts' setup>
import svgIcon from '@/globalComponent/SvgIcon/index.vue';


</script>

<style scoped lang='scss' >
.svg-container{

  box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    padding: 40px 100px 0;
    .el-alert{
      margin-bottom:10px
    }
    .el-descriptions{
      margin-top:30px
    }
}
/* Your styles here */
</style>