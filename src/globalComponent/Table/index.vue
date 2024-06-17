<template>
    <Search :fieldList="props.filterFieldList" :listTypeInfo="props.listTypeInfo"  :searchData="props.searchData" :treeParam="props.treeParam"  ref="search" @handleEvent="handleEvent"></Search>
  <OperationList :optionList='props.optionList' v-if="props.optionList.length > 0" @handleClick="handleClick"> </OperationList>
  <div class="my-table">

    <el-table :data="data" @selection-change="selectChange" v-loading="loading" element-loading-text="拼命加载中" :header-cell-style="{backgroundColor:'var( --my-table-header-bg-color)',color:'#666'}"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" border
      style="width:100%" tooltip-effect="dark" :height="maxheight">
      <!--check选择-->
      <el-table-column v-if="showCheck" type="selection" fixed align="left"></el-table-column>
      <!--序号-->
      <el-table-column v-if="showIndex" type="index" label="序号" fixed align="left"></el-table-column>
      <template v-for="(item, index) in props.fieldList" :key="index">
        <el-table-column :type="item.type == 'expand' ? 'expand' : ''" :prop="item.name" :label="item.value"
          :min-width="item.minWidth ? item.minWidth : '100px'">
          <!--slot-->
          <template v-slot="scope">
            <slot :name="'col-' + item.name" :row="scope.row" v-if="item.slot"></slot>
            <span v-else>{{ scope.row[item.name] }}</span>
          </template>
        </el-table-column>
      </template>
      <!--操作-->
      <template v-if="handle.show">
        <el-table-column :fixed="handle.fixed" :width="handle.width" :label="handle.label">
          <template v-slot="scope">
            <template v-for="(handleItem) in handle.btList">
              <slot v-if="handleItem.slot" :name="'bt-' + handleItem.event" :data="{ row: scope.row, data: handleItem }">
              </slot>

              <el-button v-else :type="handleItem.type" :title="handleItem.label"
                :size="handleItem.size ? handleItem.size : 'small'"
                :disabled="handleItem.disabled ? handleItem.disabled : false" :icon="icons[handleItem.icon]"
                @click="handleClick(handleItem.event, scope.row)"></el-button>

            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
      :page-sizes="[20, 50, 70, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="props.total">


    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { getAllElementIcon } from '@/utils/index.ts'
import {
  ref,


   onMounted,
  defineEmits,
  defineProps
} from "vue";

import { useSystemStore } from '@/store/modules/system.ts'
import Search from '@/globalComponent/Search/index.vue'
import OperationList from  '@/globalComponent/operationList/index.vue'
import {optionType,fieldItemType} from "@/globalComponent/types"
let systemStore = useSystemStore()
let icons = getAllElementIcon()
type paramsType = {
  [key: string]: unknown;
};

const emits = defineEmits(["handleClick","handleEvent"]);
const props = defineProps({
  //搜索数据
  filterFieldList:{
   type:Array  as PropType<fieldItemType>,
   default:()=>{
    return []
   }
  },
  //树数据
  treeParam:{
        type:Object,
       default:()=>{
        return {
            data:[],
            checkBox:false,
            checkStrictly:false,
            defaultProps:{
                children:'children',
                label:'label'
            }
        }
       }
        

    },
  searchData:{
     type:Object,
     default:()=>{}
  },
//操作栏数据  
optionList:{
    type:Array as PropType<optionType>,
    default:()=>{
        return []
    }
},

  listTypeInfo:{
     type:Object,
     default:()=>{}
  },
  //表格数据
  data: {
    type: Array,
    default: () => {
      return [];
    }
  },
  //表格中key用来优化表格 或者展开的时候用
  rowKey: {
    type: String,
    default: "id"
  },
  fieldList: {
    type: Array,
    default: () => {
      return [];
    }
  },
  height: {
    type: Number,
    default: 0
  },
  showCheck: {
    type: Boolean,
    default: false
  },
  showIndex: {
    type: Boolean,
    default: false
  },
  //自定义参数

  param: {
    type: Boolean,
    default: true
  },
  //请求方式
  requestType: {
    type: String,
    default: "post"
  },
  //表格的数据请求
  api: {
    type: String,
    default: ""
  },
  //表格的刷新
  refresh: {
    type: Number,
    default: 1
  },

  total: {
    type: Number,
    default: 0
  },
  //请求参数
  query: {
    type: Object,
    default: () => {
      return {};
    }
  },
  //操作区域
  handle: {
    type: Object,
    default: () => {
      return {};
    }
  }
});

let pageNum = ref(1);
let pageSize = ref(20);
let loading = ref(false);
let maxheight = ref(50);

///数据的获取
let getTableDataList = () => {
  let params = {};

  if (props.param) {
    //自定义的请求参数
    params = handleParams();
  } else {
    params = { params: JSON.stringify(handleParams()) };
  }
  console.log(params);
  //发送请求获取数据
  if (props.requestType == "post") {
    post(props.api, params).then((res: any) => {
      //页码总数
      props.total = res.total;
      ///请求的数据抛出
      emits("update:data", res.result);
    });
  } else {
    get(props.api, params).then((res: any) => {
      //页码总数
      props.total = res.total;
      emits("update:data", res.result);
    });
  }
};
watchEffect(() => {
  if (props.refresh) {
    props.api && getTableDataList();
  }
});
let search = ref()
let searchHeight =  ref(0)
const getTableHeight = () => {

  
  //获取浏览器可视区域的高度 294
  return document.body.clientHeight - props.height - (systemStore.isShowICP ? 294 : 224)  - ( props.optionList.length>0 ?'50' :0 )

};
watchEffect(() => {

  maxheight.value = getTableHeight() - searchHeight.value
 
})
onMounted(()=>{
  searchHeight.value =  search.value.$el.offsetHeight
  maxheight.value = getTableHeight() - search.value.$el.offsetHeight
})


let handleSizeChange = (pageSize: number) => {
  pageSize.value = pageSize;
  getTableDataList();
};
let handleCurrentChange = (currentPage: number) => {
  pageNum.value = currentPage;
  //获取数据
  getTableDataList();
};
let handleClick = (event: string, data: unknown) => {
  emits("handleClick", event, data);
};

let selectChange = (selection: any) => {
  emits("handleEvent", "select", selection);
};
let handleParams = () => {
  let obj: paramsType = {};
  //遍历query
  for (const [key, value] of Object.entries(props.query)) {
    if (!["Time"].includes(key)) {
      ///查询的条件是多选的值得时候 key队形的value是个数组
      if (Array.isArray(value)) {
        obj[key] = JSON.stringify(value);
      } else {
        obj[key] = value;
      }
    }
  }
  //查条件
  return { pageNum,pageSize, ...obj };

  
}
const handleHeight=()=>{
  nextTick(()=>{
        maxheight.value = getTableHeight() - search.value.$el.offsetHeight
      })
}
const handleEvent = (e:string)=>{
   
     switch(e){
      case 'expand':
      handleHeight()
      break

     }
  }
</script>

<style scoped lang="scss">
/*table表格*/
.my-table {
  .el-pagination {
    justify-content: flex-end;
    margin-top: 16px;
  }
}
</style>
