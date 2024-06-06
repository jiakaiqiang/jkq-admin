<template>
  <div class="form-textarea">
    <el-input  v-bind="$attrs" type='textarea' v-model="textValue"></el-input>
  </div>
</template>

<script>
export default {
name:'itemtextarea',
data(){
return {
  textValue:''
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
  this.$emit('update:value',value)
}
},
created(){
 this.textValue=this.value
},
methods:{
  none(){
    return false
  }
}
}
</script>
<style>
.form-textarea{
  width: 130px;
}
.el-form > .el-input ,.el-input--small{
        width: 130px;
}
</style>