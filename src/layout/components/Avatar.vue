<template>
   <el-dropdown trigger="click">
    <div class="avatar">
      <img src="@/assets/images/avatar.gif" alt="avatar" />
    </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>密码修改</el-dropdown-item>
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
         
        </el-dropdown-menu>
      </template>
    </el-dropdown>
</template>

<script lang='ts' setup>
let logout=()=>{
 localStorage.clear()
  location.reload()
}

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