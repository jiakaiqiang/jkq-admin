<template>
    <div class="my-tree" >
        <el-tree :data="treeData" :props="treeParamProps" :empty-text="emptyText" :node-key="nodeKey"
                 :default-expand-all="defaultExpandAll" :default-checked-keys="defaultCheckedkeys"
                 :default-expanded-keys="defaultExpandedKeys" :expand-on-click-node="expandOnClickNode"
                  :check-on-click-node="checkOnClickNode" :accordion="accordion"    :icon-class="iconClass"
                  :show-checkbox="showCheckBox"
                 :lazy="lazy"
                 :load="loadNode"
                 @node-click="nodeClick"
                 @check="check"
                 @node-contextmenu="nodeContextMenu"
                 @node-expand="nodeExpand"
                >
           <template v-slot="{data,node}" v-if="slotContent">
              <slot :data="data" :node="node"></slot>
           </template>
        </el-tree>
            <ul class="menu-class" ref="menu" v-if="menuList.length>0&&showMenu" :style="{top:menuStyle.top+'px',left:menuStyle.left+'px',position:'absolute'}">
                <li v-for="(item,index) in menuList" @click="menuListClick(item.event,item)" :key="index">{{item.label}}</li>
            </ul>
    </div>
</template>

<script>
    import {post,get} from '@/util/request.js'

    export default {
        name: "Jkqtree",
        props:{
            treeData:{
                type:Array,
                default:[]
            },
            /*是否自定义树内容 ，默认不可以自定义内容*/
            slotContent:{
              type:Boolean,
              default:false
            },
            /*是否懒加载(true的时候通过接口去请求数据,false则是通过外部传递过来的)*/
            lazy:{
                type:Boolean,
                default:false
            },
            api:{
              type:String,
              default:''
            },
            /*数据来源方式 1 外部2 内部请求*/
            dataType:{
              type:Number,
              default:1
            },
            treeParamProps:{
                type:Object,
                default:()=>{
                    return {
                        label:'label',
                        children:'children'
                    }
                }
            },
            iconClass:{
                type:String,
                default:''
            },
            accordion:{
                type:Boolean,
                default:false,
            },
            /*默认选中的*/
            defaultCheckedkeys:{
                type:Array,
                default:()=>{
                    return []
                }
            },
            showCheckBox:{
                type:Boolean,
                default:false
            },
            /*默认展开的节点*/
            defaultExpandedKeys:{
                type:Array,
                default:()=>{
                    return []
                }
            },
            /*点击节点进行选中*/
            checkOnClickNode:{
                type:Boolean,
                default:false
            },
            /*点击节点不展开子节点*/
            expandOnClickNode:{
                type:Boolean,
                default:false
            },
            /*默认展开的节点*/
            defaultExpandAll:{
                type:Boolean,
                default:false
            },
            /*树节点的唯一标识*/
            nodeKey:{
                type:String,
                default:'id'
            },
            emptyText:{
                type:String,
                default:'暂无数据'
            },
            /*获取右键的list*/
            menuList:{
                type:Array,
                default:()=>{
                    return []
                }
            }
        },
        data(){
            return {
                showMenu:false,
                menuStyle: {
                    top: 0,
                    left: 0
                },
                loading:true
            }
        },
        methods:{
            /*tree展开*/
            nodeClick(data,node){
                this.showMenu=false
                this.$emit('handleClick','nodeClick',data,node)
            },
            check(data,node){
                this.$emit('handleClick','check',data,node)
            },
            nodeExpand(data,node){
                this.$emit('handleEvent','nodeExpand',data,node)
            },
            nodeContextMenu(event,data,node){
                this.menuStyle.top=event.clientY
                this.menuStyle.left=event.clientX

                this.showMenu=true
                this.$emit('handleEvent','nodeContextMenu',event,data,node)

            },
            /*右侧菜单 点击*/
            menuListClick(event,data){
                this.$emit('handleClick',event,data)
                //菜单隐藏
                this.showMenu=false
            },
            /*懒加载的节点*/
            loadNode(node,reslove){
                if(this.dataType===2&&this.lazy&&this.api){
                    post(this.api,node.data.id).then(res=>{
                        res&&res.data&&reslove(res.data)
                    })

                }else{
                    throw new Error('参数传递不正确')
                }


            }

        }
    }
</script>

<style scoped lang="scss">
    .my-tree{
        .menu-class{
            margin:0px;
            padding:0;
            width: 100px;
            text-align:center;
            background-color: #fff1fa;
            list-style: none;
            border-radius: 3px;
            li{
                height:30px;
                line-height:30px;
                border-bottom:1px solid snow;
            }
        }
    }


</style>
