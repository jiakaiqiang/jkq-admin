<template>
  <div class="form-container">
    <Form class="form" :formData="formData.data" :formRef='formRef' @update-formRef="handleFormRef" :list="typeInfoList" :rules="formData.rules" :formItem="formData.list" :labelWidth="'100px'" :labelPosition="'left'" :size="'small'"></Form>
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
    selectData: string,
    radioValue: string,
    checkboxValue: string,
    timeValue: string,
    silderValue: string,
    inputNumberValue: string
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
let typeInfoList = reactive<formInfoList>({})

const  formData =  reactive<formType>({
 data:{
  name:'',
  email:'',
  password:'',
  confirmPassword:'',
  selectData:'',
  radioValue:'',
  checkboxValue:'',
  timeValue:'',
  silderValue:'',
  inputNumberValue:''
 },
 
 list:[
  {label:"姓名",name:"name",formType:"itemInput",value:"name",placeholder:"请输入姓名"},
  {label:"邮箱",name:"email",formType:"itemInput",value:"email",placeholder:"请输入邮箱"},
  {label:"密码",name:"password",formType:"itemInput",value:"password",placeholder:"请输入密码"},
  {label:"确认密码",name:"confirmPassword",formType:"itemInput",value:"confirmPassword",placeholder:"请输入确认密码"},
  {label:"选择",name:"selectData",formType:"itemSelect",value:"selectData",list:"selectList",placeholder:"选择"},
  {label:"radio",name:"radioValue",formType:"itemRadio",value:"radioValue",placeholder:"",list:"radioList"},
  {label:"checkbox",name:"checkboxValue",formType:"itemCheckBox",value:"checkboxValue",placeholder:"",list:'checkboxList'},
  {label:"时间",name:"timeValue",formType:"itemTimeSelect",value:"timeValue",placeholder:"",},
  {label:"滑块",name:"silderValue",formType:"itemSlider",value:"silderValue",placeholder:"",},
  {label:"数字输入",name:"inputNumberValue",formType:"itemInputNumber",value:"inputNumberValue",placeholder:""},
  {label:"日期选择",name:"dateValue",formType:"itemDateSelect",value:"dateValue",placeholder:""},
  {label:"自定义",name:"customValue",formType:"itemSlot",value:"customValue",placeholder:""},
  
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
.form-container{
  width: 100%;
  height: 100%;
 
  padding:20px;

 
  .form{
   
   
    margin-bottom: 20px;
   

  }
  .el-button{
    margin-left: 100px;
  }
 
}
/* Your styles here */
</style>