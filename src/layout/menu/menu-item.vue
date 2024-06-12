<template>
  <div>
    <el-menu-item :index="item.path" v-if="!item.children">
      <i :class="`iconfont ${item.icon}`"></i>
     <span style="margin-left: 10px">{{item.meta.title}}</span>
   </el-menu-item>
   <el-menu-item :index="item.path" v-else-if="item.children&&item.children.length==1" >
      <i :class="`iconfont ${item.children[0].icon}`"></i>
     <span style="margin-left: 10px">{{item.children[0].meta.title}}</span>
   </el-menu-item>
   
  
   <el-sub-menu :index="item.path" v-else>
     <template #title>
      <i :class="`iconfont ${item.icon}`"></i>
       <span style="margin-left: 10px">{{item.meta.title}}</span>
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