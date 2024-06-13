<template>
  <div class="form-time-picker">
   <el-time-picker  v-model="inputValue" @change="handleEvent"></el-time-picker>
  
  </div>
</template>

<script lang="ts" setup>
import {watch,defineProps,ref,defineEmits,defineModel} from 'vue'
let  inputValue  =  defineModel()
const emit = defineEmits(['handleEvent'])
const handleEvent=(data:any)=>{
  emit('handleEvent','timeSelect',data)
}
</script>
<style>
.form-time-picker{
  width: 130px;
}
</style>

