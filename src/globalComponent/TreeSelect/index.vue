<template>
  <div class="test-tree">
    <el-select v-model="treeDataLabel"  filterable ref="treeSelect" no-match-text='没有数据啦....' :expand-on-click-node='expandOnClikcNode' :default-expanded-keys='expandNode'>
      <el-option :value="optionValue" class="select-tree-class">
         <el-tree :data='treeData' :node-key='nodeKey' @node-click="nodeClick" @node-expand="nodeExpand" ref="tree">
         </el-tree>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import MyTree from "@/commons/tree/index";
export default {
  name: "treeSelect",
  components: {
    MyTree,
  },
  props: {
    valueSelect: {
      type: String|Number,
      default: "",
    },
    //树形数据
    treeData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    nodeKey:{
      type:String,
      default:'id'
    },
    //树的默认参数
    defaultProps: {
      type: Object,
      default: () => {
        return { label: "label", children: "chilren", id: "id" };
      },
    },
    //1代表传入的值，2代表api请求过来的数据
    dataType: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      optionValue: "",
      expandOnClikcNode:false,
      treeDataLabel:'',
      expandNode:[],
      treeId:[]
       
    };
  },
  watch:{
    valueSelect(val){
        console.log(val,'www')
        //进行数据的回显 并且扩展
       this.expandNode=val
    }
  },
  crated(){
    initTree()
  },
  methods: {
      handleEvent(){

      },
      handleClick(event,data){
          this.optionValue=data.id
       this.$emit('handleClick',event,data)
       this.$refs.treeSelect.blur()
      },
      initTree(){
       if(this.treeId.length>0){
           ///获取node节点
           this.$emit()
       }
      },
      nodeClick(data,node){
      this.treeDataLabel=data.label
      this.$emit('input',data.id)
       this.$emit('handleClick','nodeClick',data,node)
       this.$refs.treeSelect.blur()
      },
      nodeExpand(data,node){
        this.$emit('handleClick','nodeExpand',data,node)
      }
  },
};
</script>

<style lang='scss' >
.select-tree-class {
  height: 100% !important;
  line-height: 100%;
  padding: 0 !important;
  font-weight: 500 !important;
}
.selectOption {
  display: none !important;
}
</style>