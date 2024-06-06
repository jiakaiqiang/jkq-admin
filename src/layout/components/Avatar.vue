<template>
   <el-dropdown trigger="click">
    <div class="avatar">
      <img src="@/assets/images/avatar.gif" alt="avatar" />
    </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleShowVisble">密码修改</el-dropdown-item>
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
         
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- vue 3 中取消了.sync 的语法糖 取而代之的是通过属性和方法的方式去进行数据的更新 -->
  <Dialog :visible='visible' @update-value='visible = $event' title="密码修改"  :btList="btList">
  <Form :form-ref="formRef" @update-formRef="formRef = $event" :formItem="formItem" style="width:400px;margin:0 auto"></Form>
  </Dialog>

</template>

<script lang='ts' setup>
import { ref} from  'vue'
import Dialog from '@/globalComponent/Dialog/index.vue'
import Form from "@/globalComponent/form/index.vue"

let  visible  =  ref(false)
let  formRef  =  ref(null)
let handleShowVisble=()=>{
  visible.value=true
  
}
let logout=()=>{
 localStorage.clear()
  location.reload()
}

//创建操作
let btList =  ref([
  {
    type:'primary',
   
    event:"save",
    label:"保存"
  }
])
//表单数据样式
let formItem =  ref([
  {
    label:'原密码',
    value:'oldPassword',
    formType:"itemInput",
    placeholder:'请输入原密码',

    rules:[
      {
        required:true,
        message:'请输入原密码',
        trigger:'blur'
      }
    ]
  },
  {
    label:'新密码',
    value:'newPassword',
   formType:"itemInput",
    placeholder:'请输入新密码',
    rules:[
      {
        required:true,
        message:'请输入新密码',
        trigger:'blur'
      }
    ]
  },
  {
    label:'确认密码',
    prop:'confirmPassword',
    formType:"itemInput",
    placeholder:'请输入确认密码',
    rules:[
      {
        required:true,
        message:'请输入确认密码',
        trigger:'blur'
      }
    ]
  }
])
</script>

<style scoped lang='scss' >
/* Your styles here */
.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>