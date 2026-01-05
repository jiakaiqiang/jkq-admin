<template>
    <div :class="['my-dialog',props.customClass?props.customClass:'']" >
        <el-dialog
                :model-value="visible"
                :width="props.width"
                :fullscreen="props.fullscreen"
                :top="props.top"
                modal
                
                :custom-class="props.customClass"
                :close-on-click-moda="props.closeOnclickModal"
                :close-on-press-escape="props.closeOnPressEscape"
                :show-close="false"
                :before-close="handleClose">
            <!--title-->
            <div slot="header" class="dialog-title">
                <div> {{props.title}}</div>
<el-icon @click="handleClose" class="close-icon"><CloseBold /></el-icon>
             
            </div>
            <!--存放dialog的内容-->
            <div>
                <slot></slot>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button v-for="(item,index) in props.btList" :type="item.type" :size="item.size ? item.size:''" :key='index'
                   @click="handleClick(item.event)">{{item.label}}</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script lang='ts' setup >
import {CloseBold} from '@element-plus/icons-vue'

let visible =  defineModel<boolean>({
    default:false
})
    const props = defineProps({
        // visible: {
        //     type: Boolean,
        //     default: false
        // },
        title: {
            type: String,
            default: ""
        },
        customClass: {
            type: String,
            default: ""
        },
        width: {
            type: String,
            default: "800px"
        },
        fullscreen: {
            type: Boolean,
            default: false
        },
        showClose: {
            type: Boolean,
            default: true
        },
        closeOnclickModal: {
            type: Boolean,
            default: true
        },
        closeOnPressEscape: {
            type: Boolean,
            default: true
        },
        top:{
            type: String,
            default: "30px"
        },
        btList: {
            type: Array<any>,
            default: () => {
                return []
            }
        }
    })
    
    const emit = defineEmits(['update-value','handleClick'])
    const handleClose = () :void=> {
        emit('update-value', false)
       
    }
    const handleClick = (event: string):void => {
        emit('handleClick', event)
    }

 

</script>

<style scoped lang="scss">
::v-deep .el-dialog__header{
    padding:0px;
}
    .my-dialog{
    
     
        .el-dialog__header{
            padding: 0px 16px 10px 0px;
        }
        .dialog-title{
            height:50px;
            width: 100%;
           
            line-height: 50px;
           
            font-size:20px;
           
            display: flex;
            justify-content: space-between;
            align-items: center;
            .close-icon{

                cursor: pointer;
            }

        }
        .dialog-footer{

            display: flex;
            justify-content: flex-end;
            .el-button{
                margin-left: 10px;
            }
        }
       
    }

</style>
