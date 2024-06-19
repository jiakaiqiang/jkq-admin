<template>
<div class='form-date'>
   
  <el-date-picker
        v-model="dateValue"
        type="date"
        placeholder="请选择"
       
      @change="handleEvent"
      />
      
      
</div>

</template>
<script lang="ts" setup>
  

import { ref,defineProps,defineEmits,watch,defineModel } from 'vue';


const emit = defineEmits(['handleEvent'])
let dateValue= defineModel()

const handleEvent = (val:any)=>{
  emit('handleEvent','changeDate',val)
}

</script>

<style>
.form-date{
  width: 130px;
}
</style>
