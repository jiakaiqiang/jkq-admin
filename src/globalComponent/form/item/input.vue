<template>
  <div class="form-input">
    <el-input  v-bind="$attrs" v-model="inputValue"  size="small" @blur="handleEvent('blur')" @change="handleEvent('changeInput')"></el-input>
  </div>
</template>

<script lang='ts' setup>
import {defineEmits,defineProps} from 'vue'
const emits=defineEmits(['update-value','handleEvent'])
const props=defineProps({
  value:{
    type:String,
    default:""
  }
})
let inputValue =  ref('')

export default {
name:'inpust',
data(){
return {
  inputValue:''
}
},
props:{
  value:{
    type:String,
    default:""
  }
},
watch:{
//监听数据双项修改
inputValue(value){
  this.$emit('update-value',value)
}
},
created(){
 this.inputValue=this.value
},
methods:{
  handleEvent(event){
    this.$emit('handleEvent',event,this.inputValue)
  }
}
}
</script>
<style>


</style>
