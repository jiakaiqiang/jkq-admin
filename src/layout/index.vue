<template>
  <section style="display: flex;min-width: 600px">
    <aside class="aside"  :style="{ width: collapse ? '65px' : '210px' }">
        <logo :collapse="collapse"></logo>
        <Menu></Menu>
       
    </aside> 
    <main>
    
        <header>
            <Top></Top>
        </header>
        <Nav></Nav>
    <div class="container" id="container" v-if="systemStore.isRefresh">
     
       <div style="flex:1; padding:20px 20px 10px 20px ;  overflow-y: auto;">
        <router-view ></router-view>
        </div>
     <div v-if="systemStore.isShowICP" style="height:50px;background: var(--el-bg-color-page);text-align: center;padding-top: 20px;margin-top:10px;line-height: 20px;margin-bottom:10px"> 备案号:陕ICP备2024040409号-1</div>
    
    </div>
    </main>
   
   
  </section>
</template>

<script lang='ts' setup>
import { computed, onBeforeUnmount, ref } from 'vue';

import logo from './components/logo';
import Menu  from './menu/index.vue';
import Top  from './components/top.vue';
import Nav  from './components/nav.vue';
import { useDebounceFn } from "@vueuse/core";
import {useSystemStore} from '@/store/modules/system.ts'

import {storeToRefs} from 'pinia'

const systemStore = useSystemStore()

const collapse = computed(() => systemStore.collapse);

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth;

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
     background:var(--el-bg-color-page);
    height: 100vh;
    display: flex;
    flex-direction: column;
}
main{
    flex: 1;
    background:var(--main-bg-color-page);
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
}
header{
    height: 60px;
    background:var(--el-bg-color-page);
    line-height: 60px;
    padding-left: 20px;
    box-sizing: border-box;
    border-bottom:1px solid var(--el-border-color)
}
.container{
    flex: 1;
 

 
   
    display: flex;
    flex-direction: column;
    overflow-x:hidden;
    overflow-y:auto;
  
   
   
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* Your styles here */
</style>