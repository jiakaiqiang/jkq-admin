<template>
  <div>
    <Form :formData="formData.data" :formRef='formRef' @update-formRef="handleFormRef" :list="formInfoList" :rules="formData.rules" :formItem="formData.list" :labelWidth="'100px'" :labelPosition="'left'" :size="'small'"></Form>
    <!-- Your code here -->
    <el-button type="primary" @click="submitForm">提交验证</el-button>
   
  </div>
</template>

<script lang='ts' setup>
import {FormInstance} from 'element-plus'

import Form from '@/globalComponent/form/index.vue';
const formRef =  ref(null)
type formDataType = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
};
type formListType= {
    name:string,
    required?:boolean,
    label:string,
    value:string,
    placeholder?:string,
    
    formType:string,
    list?:string
}
type formType = {
    data:formDataType,
    rules:any,
    labelWidth:string,
    labelPosition:string,
    size:string,
    list:Array<formListType>
};
type formInfoList ={
  [key: string] : Array<any>
}
let formInfoList = reactive<formInfoList>({})

const  formData =  reactive<formType>({
 data:{
  name:'',
  email:'',
  password:'',
  confirmPassword:''
 },
 list:[
  {label:"姓名",name:"name",formType:"itemInput",value:"name",placeholder:"请输入姓名"},
  {label:"邮箱",name:"email",formType:"itemInput",value:"email",placeholder:"请输入邮箱"},
  {label:"密码",name:"password",formType:"itemInput",value:"password",placeholder:"请输入密码"},
  {label:"确认密码",name:"confirmPassword",formType:"itemInput",value:"confirmPassword",placeholder:"请再次输入密码"},
 ],
 rules:{
  name:[
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  email:[
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },   
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  password:[
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
  ],
  confirmPassword:
    [
      { required: true, message: '请再次输入密码', trigger: 'blur' },
      { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
    ]
 },
 labelWidth:'80px',
 labelPosition:'left',
 size:'default',
 
});
const handleFormRef=(val:FormInstance)=>{

  formRef.value = val
  console.log(formRef.value.value,'--------')
}

const  submitForm=()=>{
  console.log(formRef.value.value)

  formRef.value.value.validate((valid:boolean)=>{
    if(valid){
      console.log('验证通过');
    }else{
      console.log('验证失败');
    }
  })
}
</script>

<style scoped lang='scss' >
/* Your styles here */
</style>