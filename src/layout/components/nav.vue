<template>
  <div class="layout-nav">
    <el-tabs
      v-model="activeName"
      closable
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
      @tab-remove="handleTabRemove"
    >
      <template v-for="item in tabList" :key="item.path">
        <el-tab-pane :label="item.meta.title" :name="item.path"></el-tab-pane>
      </template>
    </el-tabs>
    <el-dropdown trigger="click">
      <div class="avatar">
        <el-icon>
          <ArrowDownBold />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleCloseTab('other')">关闭其他</el-dropdown-item>
          <el-dropdown-item @click="handleCloseTab('all')">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang='ts' setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { TabsPaneContext, TabPaneName } from "element-plus";
import { ArrowDownBold } from "@element-plus/icons-vue";
import { useSystemStore } from "@/store/modules/system.ts";
let $router = useRouter();

const systemStore = useSystemStore();
const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  $router.push(tab.props.name);
};
let tabList = computed(() => {
  return systemStore.tabsListData;
});

const handleTabRemove = (name: TabPaneName) => {
  let list = localStorage.getItem("tabList");
  let tabList = JSON.parse(list);
  let index = tabList.findIndex(item => item.path == name);
  tabList.splice(index, 1);
  localStorage.setItem("tabList", JSON.stringify(tabList));
  systemStore.changeTabsList(tabList);
  $router.push(tabList.length == 0 ? "/" : tabList[tabList.length - 1].path);
};

//关闭所有或者关闭其他
const handleCloseTab = (type: string) => {
  if (type == "all") {
    localStorage.removeItem("tabList");
    systemStore.changeTabsList([]);
    $router.push("/");
  } else {
    let list = JSON.parse(localStorage.getItem("tabList"));
    let tabList = list.filter(
      item => item.path == $router.currentRoute.value.path
    );
    localStorage.setItem("tabList", JSON.stringify(tabList));
    systemStore.changeTabsList(tabList);
  }
};
</script>

<style scoped lang='scss' >
::v-deep .el-tabs__header {
  margin: 0;
  border: 0 !important;
  .el-tabs__nav {
    border: 0 !important;
  }
  .is-active {
    border-bottom: 2px solid #409eff !important;
  }
  .el-tabs__item {
    border: 0 !important;
  }
}

.layout-nav {
  background: #fff;

  padding-left: 20px;
  box-sizing: border-box;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  font-size: 14px;
  // border-bottom:1px solid #ecebeb;

  .demo-tabs {
    width: calc(100% - 44px);
  }
  .avatar {
    width: 44px;
    line-height: 42px;
    border-left: 1px solid #ecebeb;
    border-right: 1px solid #ecebeb;
    text-align: center;
  }
}

/* Your styles here */
</style>