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

<script>
export default {
name:'fromSelect',
data(){
return {
    selectValue:''
}
},
props:{
  value:{
    type:String,
    default:""
  },
  selectList:{
      type:Array,
      default:()=>{
          return []
      }
  }
},
watch:{
//监听数据双项修改
selectValue(value){
    console.log(value,this.selectList,'ww')
  this.$emit('update:value',value)
},
},
created(){
this.selectValue=this.value
},
methods:{
  handleEvent(data){
    this.$emit('handleEvent','changeSelect',data)
  }
}
}

</script>
<style >
.selectItem{
  width: 130px;
}
</style>
