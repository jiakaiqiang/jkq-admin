<template>
  <el-container class="side-menu">
    <el-menu ref='menuRef'  :collapse="collapse"
      :collapse-transition="false" :default-active="defaultActive"  :router="true">
      <template v-for="item in menuData.filter(item => item.isMenu == true)" :key="item.path">
        <MenuItem :item="item">
        </MenuItem>
      </template>
    </el-menu>
  </el-container>
</template>

<script lang='ts' setup>
import MenuItem from './menu-item.vue';
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { staticRouter } from '@/router/staticRouter';
import { useSystemStore } from '@/store/modules/system.ts'
import {menuStore} from '@/store/modules/menu.ts'
//刷新后动态的设置激活的路由地址
const route = useRoute();
let menuRef = ref(null)
console.log(route)
let defaultActive = computed(() =>  route.path)


import { storeToRefs } from 'pinia'


const systemStore = useSystemStore()
const menuStoreData = menuStore()
console.log(menuStoreData.menuList,'menuStoreData')
const {menuList} = storeToRefs(menuStoreData)
const { collapse } = storeToRefs(systemStore)

const menuData = computed(() => {
  return [...menuStoreData.menuList,...staticRouter]
})


</script>

<style scoped lang='scss'>
.side-menu {
  border-top: 1px solid var(--el-border-color);
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid var(--el-border-color);
}

::v-deep .el-menu-item.is-active {
  background:var(--el-color-primary);
  color: var(--el-text-color-regular)
}



/* Your styles here */
</style>