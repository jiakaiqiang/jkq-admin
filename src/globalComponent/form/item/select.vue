<template>
  <div class='selectItem'>
        <el-select v-model="selectValue" v-bind="$attrs" @change="handleEvent('changeSelect')">
    <el-option
      v-for="(item,index) in selectList"
      :key="index"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </div>
</template>

<script lang='ts' setup>
import {defineEmits,defineModel,defineProps} from 'vue'
let  selectValue  =  defineModel()
const  emits =  defineEmits(['handleEvent'])
const  props =  defineProps({
  selectList:{
      type:Array,
      default:()=>{
          return []
      }
  }
})


 const handleEvent=(data)=>{
    emits('handleEvent','changeSelect',data)
  }
</script>
<style >
.selectItem{
  width: 130px;
}
</style>
