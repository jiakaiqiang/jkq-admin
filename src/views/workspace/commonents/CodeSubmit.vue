<template>
  <div class="commit-container">
    <el-timeline >
        <template v-for="item in commitList" :key="item.id"> 
            <el-timeline-item :timestamp="item.date" placement="top">
      <el-card>
        <h4>{{item.content }}</h4>
        <p>{{item.username }} committed {{ item.date  }}</p>
      </el-card>
    </el-timeline-item>
        </template>
   
    
  </el-timeline>
    <!-- Your code here -->
  </div>
</template>

<script lang='ts' setup>
import {reactive} from 'vue'
type commitType = {
    id:number,
 
    date:string,
    content:string,
    username:string
}
const commitList = reactive<commitType[]>([
    {
        id:1,
       
        date:'2024-05-31',
        content:'初始化模板',
        username:'Tom'
    },
    {
        id:2,
     
        date:'2024-05-31',
        content:'路由组件的封装',
        username:'Tom'
    },
    {
        id:3,
        date:'2024-05-31',
        content:'登录接口调试和登录页面的开发',
        username:'Tom'
    },
    {
        id:4,
        date:'2024-05-31',
        content:'添加路由权限控制',
        username:'Tom'
    },
    
  
   
    
])
</script>

<style scoped lang='scss' >
/* Your styles here */
.commit-container{
    padding:20px;
}
</style>