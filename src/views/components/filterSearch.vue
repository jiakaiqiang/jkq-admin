<template>
  <div class="search-container">
    <Search :fieldList="searchFieldList" :listTypeInfo="listTypeInfo"  :searchData="searchData" :treeParam="treeParam" ></Search>

  </div>
</template>

<script lang='ts' setup>
import {ref,reactive} from  'vue';
import Search  from '@/globalComponent/Search/index.vue';
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
</script>

<style scoped lang='scss' >
.search-container{
  background:var(--el-bg-color-page);
  height: 100%;
  width:100%
}
/* Your styles here */
</style>