<template>
  <div class="login">
    <!-- Your code here -->
    <div class="login-main">
      <img src="/public/login.png" mode="scaleToFill" />
      <div class="form-container">
        <div class="title">
          欢迎登录
        </div>
        <div class="form-content">
          <el-form>
            <el-form-item>
              <el-input  v-model="formData.username" :prefix-icon="UserFilled" placeholder="请输入用户名称">

              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="formData.password" :prefix-icon="Message" type="password" placeholder="请输入密码" show-password>

              </el-input>
            </el-form-item>
            <el-form-item clas="capche-img">
              <el-input v-model="formData.code" style="width:300px;margin-right:10px"  >

              </el-input>
              <div v-html="codeUrl" width="100px" height="50px" @click="getImage()"> </div>
            </el-form-item>
            <el-form-item class='button-option'>
            
              <el-button type="primary" class="button" @click='login'>登录</el-button>
            </el-form-item>
          </el-form>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {  Message,UserFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'
let codeUrl =  ref('')
let formData = reactive({
  username: '',
  password: '',
  code: ''
})

const $request =  getCurrentInstance().appContext.config.globalProperties.$request
const $router =  getCurrentInstance().appContext.config.globalProperties.$router

//获取验证码
const getImage = ()=>{
  $request.get('/auth/captchaImage').then(res=>{
    console.log(res)
    if(res.success){
      codeUrl.value = res.data.img
      
    }
  })
}

getImage()
//获取菜单列表
const  getMenu=()=>{
  $request.post('/menu').then(res=>{
   if(res.success){
    //存储
     localStorage.setItem('menu',JSON.stringify(res.data))
   }
  })
}



const login = ()=>{
  $request.post('/auth',formData).then(res=>{
    if(res.success){
      localStorage.setItem('token',res.data.access_token)
      ElMessage({message:'登录成功',type:'success'})
      getMenu()
      $router.push('/workspace')
    }else{
      ElMessage({message:res.message,type:'error'})
      
    }



  })
}

</script>

<style scoped lang='scss'>
@import '@/styles/variables.scss';

/* Your styles here */
.login {

  height: 100vh;
  box-sizing: border-box;

  padding: 32px;
  background: #eee;

  .login-main {
    background: $main_Color;
    border-radius: 16px;
    height: calc(100vh - 64px);
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
      width: 800px;
      
    }

    .form-container {
      width: 420px;
      padding: 50px 40px 45px;
      background-color: $main_Color;
      border-radius: 10px;
      box-shadow: #0000001a 0 2px 10px 2px;

      .title {
        padding: 0 0 0 25px;
        margin: 0;
        font-size: 42px;
        font-weight: 700;
        color: #34495e;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 45px;
      }
      :deep .el-input{
       height:50px;
      }

      .button-option {
       :deep .el-form-item__content {
          display: flex;

         

          .button {
            width:100%;
            height:50px

          }
        }
      }

    }

  }


}


.form-container {
  // Add your styles for the form container here
}
</style>