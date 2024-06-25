<template>
    <div >
        渲染区
        <!-- Your code here -->
        <div v-for="item in props.dataList" > 
            <component :is="item.commonent" :key="item.key" :data="item"></component>
        </div>
    </div>
</template>

<script lang='ts' setup>
import {defineProps,ref,watch} from 'vue'
import Image from './formItem/Image.vue'
const props =  defineProps(['dataList','key'])




 


</script>

<style scoped lang='scss'>
/* Your styles here */
</style>