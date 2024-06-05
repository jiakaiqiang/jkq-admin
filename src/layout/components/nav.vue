<template>
  <div class="layout-nav">
    <el-tabs v-model="activeName"  closable  type="card" class="demo-tabs" @tab-click="handleClick"  @tab-remove="handleTabRemove">
      <template v-for="item in tabList" :key="item.path">
        <el-tab-pane :label="item.meta.title" :name="item.path"   ></el-tab-pane>
      </template>
  
   
   
  
  </el-tabs> 
         <el-dropdown trigger="click">
    <div class="avatar">
      <el-icon><ArrowDownBold /></el-icon>
    </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>密码修改</el-dropdown-item>
          <el-dropdown-item>个人信息</el-dropdown-item>
          
         
        </el-dropdown-menu>
      </template>
    </el-dropdown> 
      
  
  </div>
</template>

<script lang='ts' setup>
import { ref,computed } from 'vue'
import { TabsPaneContext,TabPaneName } from 'element-plus'
import { ArrowDownBold
  } from '@element-plus/icons-vue'
  import {useSystemStore} from '@/store/modules/system.ts'
const systemStore = useSystemStore()
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
let tabList = computed(()=>{
 
 return systemStore.tabsListData
})

const  handleTabRemove  =(name: TabPaneName)=>{
  console.log(name,'-wefwe')
  let list  =  localStorage.getItem('tabList')
  let tabList = JSON.parse(list)
  let index = tabList.findIndex(item=>item.path==name)
  tabList.splice(index,1)
  localStorage.setItem('tabList',JSON.stringify(tabList))
  systemStore.changeTabsList(tabList)
 

}

// let tabList = ref([])
// let tabListStr = localStorage.getItem('tabList')
//   if(tabListStr){
//     tabList = JSON.parse(tabListStr)
//   }

</script>

<style scoped lang='scss' >
::v-deep .el-tabs__header{
  margin:0;
  border:0 !important;
  .el-tabs__nav{
    border:0 !important;
  }
  .is-active{
  border-bottom: 2px solid #409eff !important;
}
.el-tabs__item{
  border:0 !important
}
}

.layout-nav{
  
    background:#fff;

  
 
    padding-left:20px;
    box-sizing: border-box;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    font-size: 14px;
    // border-bottom:1px solid #ecebeb;
   
    .demo-tabs{
      width:calc(100% - 44px)
    }
    .avatar{
      width:44px;
      line-height:42px;
      border-left:1px solid #ecebeb;
      border-right:1px solid #ecebeb;
      text-align: center;
    }
 
}
    
/* Your styles here */
</style>