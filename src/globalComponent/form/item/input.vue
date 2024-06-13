<template>
  <div class="form-input">
    <el-input   v-model="inputValue"  size="small" @change="handleEvent('changeInput')"></el-input>
  </div>
</template>

<script lang='ts' setup>


import {defineEmits,defineModel} from 'vue';
const inputValue = defineModel<string>()
const emits=defineEmits(['handleEvent']);


const handleEvent=(type:String)=>{
  emits('handleEvent',type)
}


</script>
<style>


</style>
