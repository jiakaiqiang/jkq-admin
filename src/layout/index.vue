<template>
  <div style="display: flex;min-width: 600px">
    <aside class="aside"  :style="{ width: collapse ? '65px' : '210px' }">
        <logo :collapse="collapse"></logo>
        <Menu></Menu>
       
    </aside> 
    <main>
    
        <header>
            <Top></Top>
        </header>
    <div class="container">
        <router-view></router-view>
    </div>
    </main>
   
   
  </div>
</template>

<script lang='ts' setup>
import { computed, onBeforeUnmount, ref } from 'vue';

import logo from './components/logo';
import Menu  from './menu/index.vue';
import Top  from './components/top.vue';
import { useDebounceFn } from "@vueuse/core";
import {useSystemStore} from '@/store/modules/system.ts'

import {storeToRefs} from 'pinia'

const systemStore = useSystemStore()
const collapse = computed(() => systemStore.collapse);

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth;
  console.log('-wewe',collapse.value)
  if (!collapse.value && screenWidth.value < 1200) systemStore.setGlobalState("collapse", true);
  if (collapse.value&& screenWidth.value > 1200) systemStore.setGlobalState("collapse", false);
}, 100);
window.addEventListener("resize", listeningWindow, false);
onBeforeUnmount(() => {
  window.removeEventListener("resize", listeningWindow);
});

</script>

<style scoped lang='scss' >
.aside{
    width:210px;
    background: #f3efef;
    height: 100vh;
}
main{
    flex: 1;
    background: #f3efef;
    height: 100vh;
}
header{
    height: 60px;
    background: #fff;
    line-height: 60px;
    padding-left: 20px;
    box-sizing: border-box;
    border-bottom:1px solid #f3efef
}
.container{
    height:calc(100vh - 60px);
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
}

/* Your styles here */
</style>