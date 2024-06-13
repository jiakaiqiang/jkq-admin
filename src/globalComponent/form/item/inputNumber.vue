<template>
    <div class="input-number">
        <el-input-number v-model="inputNumberValue" @change="handleEvent"></el-input-number>
    </div>
</template>

<script lang="ts" setup>
import {defineModel,defineEmits} from 'vue';
let inputNumberValue =  defineModel()
let emits =  defineEmits(['handleEvent'])
const handleEvent = (data:number)=>{
    emits('handleEvent','inputNumber',data)
}
  
</script>

<style>
.input-number{
    width: 130px;
}
</style>
