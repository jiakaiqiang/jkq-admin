<template>

  <div style="background:var(--el-bg-color-page);padding:20px">

    <Table v-model:data="tableData" :refresh='refresh'  :treeParam='treeParam' :searchData="searchData" :filterFieldList='searchFieldList' :fieldList='fieldList' :height="0" :listTypeInfo="listTypeInfo" :handle="handle"> </Table>
  </div>
</template>

<script lang='ts' setup>

import Table from '@/globalComponent/Table/index.vue'

import { ref, reactive } from 'vue'
type listTypeInfoType = {
  [key: string]: Array<{ label: string, value: string }>,
}
const listTypeInfo = reactive<listTypeInfoType>({
  genderList: [{
    label: '男',
    value: '男'
  }, {
    label: '女',
    value: '女'
  }]
})
//搜索
type fieldItemType = {
  label: string,
  value: string,
  isExpand?: boolean,
  type: string,
  list?: string,
  placeholder?: string,
  isShow?: boolean,

}
const searchData = reactive({
  name: '',
  age: '',
  gender: '',
  dept: ''
})
const searchFieldList: Array<fieldItemType> = [
  {
    label: '姓名',
    value: 'name',
    isExpand: false,
    type: 'input',
    placeholder: '请输入姓名',
    isShow: true,

  },
  {
    label: '年龄',
    value: 'age',
    isExpand: false,
    type: 'input',
    placeholder: '请输入年龄',
    isShow: true,

  },
  {
    label: '性别',
    value: 'gender',
    isExpand: false,
    type: 'select',
    list: 'genderList',
    placeholder: '请选择性别',
    isShow: true,
  },{
    label: '部门',
    value: 'dept',
    isExpand: false,
    type: 'selectTree',
  
    placeholder: '请选择部门',
    isShow: true,
   
  }]


//表格类型
type fieldList = {
  type?: boolean,
  name: string,
  value: string,
  minWidth?: number,
  slot?: string
}
type btList = {
  label: string,
  icon: string,
  event: string,
  slot?: boolean,

  type: string,
  size?: string,
  disabled?: boolean


}

type handleType = {
  show: boolean,
  fixed: string,
  width: number,
  label: string,
  btList: Array<btList>
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
const refresh = Math.random()
const fieldList: Array<fieldList> = [{ name: "name", value: "姓名" }, { name: "age", value: "年龄" }, { name: "gender", value: "性别" }]
const treeParam = reactive({
  data:[ {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      }],
    }],
  checkBox:true
})
const handle: handleType = {
  show: true,
  fixed: 'right',
  width: 200,
  label: '操作',
  btList: [
    {
      label: '编辑',
      event: 'edit',
      slot: false,
      type: 'primary',
      size: 'small',
      icon: "Edit",
      disabled: false
    },
    {
      label: '删除',

      event: 'delete',
      slot: false,
      type: 'danger',
      icon: "Delete",
      size: 'small',
      disabled: false
    }
  ]

}





</script>

<style scoped lang='scss'>
/* Your styles here */
</style>