<template>
  <div>
    <!-- Your code here -->
    <Table v-model:data ="tableData"  :refresh='refresh' :fieldList='fieldList' :handle="handle"> </Table>
  </div>
</template>

<script lang='ts' setup>

import Table from '@/globalComponent/Table/index.vue'
import { ref,reactive } from 'vue'
type  fieldList  = {
  type?:boolean,
  name:string,
  value:string,
  minWidth?:number,
 slot?:string
}
type btList={
  label:string,
  icon:string,
event:string,
slot?:boolean,

type:string,
size?:string,
disabled?:boolean


}

type handleType = {
  show:boolean,
  fixed:string,
  width:number,
  label:string,
  btList:Array<btList>
}
const tableData = reactive([
  {
    name: '张三',
    age: 18,
    gender: '男'
  },
  {
    name: '李四',
    age: 20,
    gender: '女'
  },
  {
    name: '王五',
    age: 22,
    gender: '男'
  }
])
const  refresh  =  Math.random()
  const    fieldList:Array<fieldList> = [{name:"name",value:"姓名"},{name:"age",value:"年龄"},{name:"gender",value:"性别"}]
  const  handle:handleType = {
 show:true,
  fixed:'right',
  width:200,
  label:'操作',
  btList:[
    {
      label:'编辑',
      event:'edit',
      slot:false,
      type:'primary',
      size:'small',
      icon:"Edit",
      disabled:false
    },
    {
      label:'删除',
     
      event:'delete',
      slot:false,
      type:'danger',
         icon:"Delete",
      size:'small',
      disabled:false
    }
  ]
 
  }

</script>

<style scoped lang='scss' >
/* Your styles here */
</style>