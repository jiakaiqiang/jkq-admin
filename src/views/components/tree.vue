<template>
  <div class="tree-container">
    <!-- Your code here -->
    <div class="tree-left">
      <Tree  :treeData="TreeData.data" :treeParamProps="defaultProps" />
     
    </div>
    <div class="tree-right">
      <Tree  :showCheckBox="true" :treeData="TreeData.data" :treeParamProps="defaultProps" />
     
    </div>
  </div>
</template>

<script lang='ts' setup>
import Tree from "@/globalComponent/Tree/index.vue";
import { ref , reactive} from "vue";
const defaultProps = {
  children: 'children',
  label: 'label',
}
let TreeData  = reactive({
   data:[
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  }]

})

</script>

<style  lang='scss' >
.tree-container{
  display: flex;
   height:100%;
   .tree-left,.tree-right{
    flex:1;
    height:100%;
   
    border-radius: 5px;
    padding:10px;
    box-sizing: border-box;
    overflow: auto;
   }
  .el-tree,.my-tree{
    height:100%;
  }
 
}
/* Your styles here */
</style>