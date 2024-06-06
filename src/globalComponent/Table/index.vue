<template>
  <div class="my-table">
      <el-table :data="data" @selection-change="selectChange" v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)" border style="width:100%" tooltip-effect="dark" max-height="maxheight">
          <!--check选择-->
          <el-table-column v-if="showCheck" type="selection"  fixed align="left">

          </el-table-column>
          <!--序号-->
          <el-table-column v-if="showIndex" type="index" label="序号" fixed align="left">

          </el-table-column>
          <template v-for="(item,index) in fieldList">

              <el-table-column  :type="item.type=='expand'?'expand':''" :key="index" :prop="item.name" :label="item.value" :min-width="item.minWidth?item.minWidth:'100px'">
                  <!--slot-->
                  <template v-slot="scope" >
                      <slot :name="'col-'+item.name" :row="scope.row" v-if="item.slot"></slot>
                      <span v-else >{{scope.row[item.name]}}</span>
                  </template>
              </el-table-column>
          </template>
          <!--操作-->
          <template v-if="handle.show">
              <el-table-column  :fixed="handle.fixed" :width="handle.width"  :label="handle.label">
                     <template v-slot="scope">
                         <template  v-for="(handleItem ,handleIndex) in handle.btList">
                         <slot  v-if="handleItem.slot" :name="'bt-'+handleItem.event" :data="{row:scope.row,data:handleItem}"></slot>
                         <el-button  :index="handleIndex" v-else :type="handleItem.type" :size="handleItem.size?handleItem.size:'small'"  :disabled="handleItem.disabled?handleItem.disabled:false" :icon="handleItem.icon"  @click="handleClick(handleItem.event,scope.row)" >

                         </el-button>
                     </template>

                 </template>
              </el-table-column>
          </template>
      </el-table>
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[20, 50, 70, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
  </div>

</template>

<script>
import {post,get} from "@/util/request.js"
console.log(post,get)
    export default {
        name: "MyTable",
        props: {
            //表格数据
            data: {
                type: Array,
                default: () => {
                    return []
                }
            },
            //表格中key用来优化表格 或者展开的时候用
            rowKey:{
              type:String,
              default:'id'
            },
            fieldList:{
                type:Array,
                default:()=>{
                    return []
                }
            },
            height:{
              type:Number,
              default:0
            },
            showCheck:{
               type:Boolean,
                default:false
            },
            showIndex:{
                type:Boolean,
                default:false
            },
            //自定义参数

            param:{
              type:Boolean,
              default:true
            },
            //请求方式
            requestType:{
              type:String,
                default:'post'
            },
            //表格的数据请求
            api: {
                type: String,
                default: ''
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
            query:{
              type:Object,
              default:()=>{
                  return {}
              }
            },
            //操作区域
            handle: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                pageNum: 1,
                loading:false,
                 maxheight:'',
                pageSize:20
            }
        },
        watch:{
          refresh(){
              this.api&&this.getTableDataList()
          }
        },
        created() {
            console.log(this.fieldList,this.data)
           this.maxheight=this.getTableHeight()
        },
        methods:{
              getTableHeight(){
                //获取浏览器可视区域的高度
                  return document.body.clientHeight-this.height
              },
            handleSizeChange(pageSize){
                  console.log(pageSize)
                this.pageSize=pageSize
                this.getTableDataList()

            },
            handleCurrentChange(currentPage){
                  this.pageNum=currentPage
                 //获取数据
                this.getTableDataList()

            },
            handleClick(event,data){
                console.log('ww',event)
                this.$emit('handleClick',event,data)
            },

            selectChange(selection){
                this.$emit('handleEvent','select',selection)
            },
            handleParams(){
                  let obj={}
                  //遍历query
                 for (const [key,value] of Object.entries(this.query)){
                     if(!['Time'].includes(key)){
                       ///查询的条件是多选的值得时候 key队形的value是个数组
                         if(Array.isArray(value)){
                              obj[key]=JSON.stringify(value)
                         }else{
                             obj[key]=value
                         }
                     }
                 }
                 //查条件
                 return {...this.pageNum,...this.pageSize,...obj}

            },
            ///数据的获取
            getTableDataList(){
                  let params={}
              let that=this
                if(that.param){
                    //自定义的请求参数
                    params=that.handleParams()
                }else{
                    params={params:JSON.stringify(that.handleParams())}
                }
                console.log(params)
                //发送请求获取数据
                if(this.requestType=='post'){
                    post(this.api,params).then(res=>{
                        //页码总数
                        this.total=res.total
                        ///请求的数据抛出
                        this.$emit('update:data',res.result)

                    })
                }else{
                     get(this.api,params).then(res=>{
                         //页码总数
                         this.total=res.total
                         this.$emit('update:data',res.result)
                     })
                }

            }

        }
    }
</script>

<style scoped lang="scss">
    @import "@/commons/style/index.scss";

</style>
