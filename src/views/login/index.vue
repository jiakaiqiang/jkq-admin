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
              <el-input  :prefix-icon="UserFilled" placeholder="请输入用户名称">

              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input :prefix-icon="Message" type="password" placeholder="请输入密码">

              </el-input>
            </el-form-item>
            <el-form-item class='button-option'>
              <el-button type="" class="button">注册</el-button>
              <el-button type="primary" class="button">登录</el-button>
            </el-form-item>
          </el-form>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {  Message,UserFilled } from '@element-plus/icons-vue';
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
      width: 51%;
      height: 59%
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

          justify-content: space-between;

          .button {
            width: 40%;
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