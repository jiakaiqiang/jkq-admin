<template>
  <div>
     <el-image :src="props.src" :style="style" :alt="props.alt" :title="props.title"></el-image>
  </div>
</template>

<script lang='ts' setup>
import {defineProps,toRefs} from 'vue'
const propsData = defineProps(['data'])
const {props,style} =  toRefs(propsData.data) //通过toResfs解构props和style使其仍然是响应式

</script>

<style scoped lang='scss' >

/* Your styles here */
</style>