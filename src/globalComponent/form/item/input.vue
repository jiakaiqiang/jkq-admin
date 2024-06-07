<template>
  <div class="form-input">
    <el-input  v-bind="$attrs" v-model="inputValue"  size="small" @blur="handleEvent('blur')" @change="handleEvent('changeInput')"></el-input>
  </div>
</template>

<script lang='ts' setup>
type valueType = {
  value:string
}

import {defineEmits,defineProps,watch} from 'vue';
const emits=defineEmits(['update-value','handleEvent']);
const props=withDefaults(defineProps<valueType>(),{
  value:''
})
let inputValue =  ref('')

inputValue.value=props.value
watch(()=>inputValue.value,(newValue)=>{
  emits('update-value',newValue)
})

const handleEvent=(type:String)=>{
  emits('handleEvent',type)
}


</script>
<style>


</style>
