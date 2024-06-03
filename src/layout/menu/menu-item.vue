<template>
  <div>
    <el-menu-item :index="item.path" v-if="!item.children||item.isShowChidren===false">
      <el-icon><setting /></el-icon>
     <span>{{item.meta.title}}</span>
   </el-menu-item>
   <el-sub-menu :index="item.path" v-else>
     <template #title>
      <el-icon><setting /></el-icon>
       <span>{{item.meta.title}}</span>
     </template>
    <template v-for="subItem in item.children" :key="subItem.path">
        <MenuItem :item="subItem"></MenuItem>
    </template>
   
     </el-sub-menu>
  </div>
</template>

<script lang='ts' setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { defineProps } from 'vue'
import {customRouteRecordRaw} from '@/globalType/router.ts'
defineProps<{
  item: {
    type: customRouteRecordRaw,
    required: true
  }
}>()
</script>

<style scoped lang='scss' >
/* Your styles here */
</style>