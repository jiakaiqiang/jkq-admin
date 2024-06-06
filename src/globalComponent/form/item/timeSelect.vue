<template>
  <div class="form-time-picker">
   <el-time-picker v-bind="$attrs" v-model="inputValue" @change="handleEvent"></el-time-picker>
  </div>
</template>

<script>
export default {
name:'inpust',
data(){
return {
  inputValue:''
}
},
props:{
  value:{
    type:[String,Date,Array],
    default:""
  }
},
watch:{
//监听数据双项修改
inputValue(value){
  this.$emit('update:value',value)
}
},
created(){
  console.log(this.value)
 this.inputValue=this.value
},
methods:{
   handleEvent(data){
       // console.log(event,data,'ww')
       this.$emit('handleEvent','changeTime',data)
   }
}
}
</script>
<style>
.form-time-picker{
  width: 130px;
}
</style>

