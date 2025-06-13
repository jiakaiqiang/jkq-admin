<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="logo">Your Logo</div>
        <h1 class="title">Sign in to Your Account</h1>
      </div>

      <form class="login-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username or email address</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            class="form-control"
            autocomplete="username"
          >
        </div>

        <div class="form-group">
          <div class="password-header">
            <label for="password">Password</label>
            <a href="#" class="forgot-password">Forgot password?</a>
          </div>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="form-control"
            autocomplete="current-password"
          >
        </div>

        <button
          type="submit"
          class="login-btn"
          :disabled="!form.username || !form.password"
        >
          Sign in
        </button>
      </form>

      <div class="create-account">
        <span>New here? </span>
        <a href="#">Create an account</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const form = reactive({
  username: '',
  password: ''
})

const handleSubmit = () => {
  // 处理登录逻辑
  console.log('Form submitted:', form)
}
</script>

<style scoped lang="scss">
.login-container {
  min-height: 100vh;
  background-color: #0d1117;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;

  .login-card {
    background: #fff;
    padding: 24px;
    border-radius: 8px;
    width: 100%;
    max-width: 340px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

    .login-header {
      text-align: center;
      margin-bottom: 24px;

      .logo {
        font-size: 24px;
        font-weight: 600;
        color: #24292f;
        margin-bottom: 8px;
      }

      .title {
        font-size: 20px;
        color: #24292f;
        margin: 8px 0;
      }
    }

    .login-form {
      .form-group {
        margin-bottom: 16px;

        label {
          display: block;
          font-size: 14px;
          color: #24292f;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .password-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .forgot-password {
          font-size: 12px;
          color: #0969da;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }

        .form-control {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d0d7de;
          border-radius: 6px;
          font-size: 14px;
          line-height: 20px;
          transition: border-color 0.2s;

          &:focus {
            outline: none;
            border-color: #0969da;
            box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.3);
          }
        }
      }

      .login-btn {
        width: 100%;
        background-color: #2da44e;
        color: white;
        padding: 10px 16px;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        margin-top: 16px;
        transition: background-color 0.2s;

        &:hover {
          background-color: #2c974b;
        }

        &:disabled {
          background-color: #94d3a2;
          cursor: not-allowed;
        }
      }
    }

    .create-account {
      text-align: center;
      margin-top: 24px;
      font-size: 14px;
      color: #24292f;

      a {
        color: #0969da;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
