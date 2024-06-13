<template>
    <div class="page-form">
        <el-form
                ref="form"
                :rules="rules"
                :model="formData"
                :labelWidth="labelWidth"
                staus-icon
                :size="size"
                :disabled="disabled"
        >
            <template v-for="(item) in formItem">
                <!-- slot -->
                <template v-if="item.formType==='itemSlot'">
                    <slot :name="'form'-item.value"></slot>
                </template>
                <el-form-item v-else :key="item.value" :label="item.label" :prop="item.value">
                  
                    <!-- 组件 -->
                    <component :is="itemList[item.formType]" v-bind="item" v-model="formData[item.value]"
                               :selectList="listTypeInfo[item.list]" @handleEvent="handleEvent"></component>
                </el-form-item>
            </template>

        </el-form>
    </div>
</template>

<script lang="ts" setup>
    import itemInput from './item/input.vue';
    import itemSelect from './item/select.vue'
    import itemTextarea from './item/textarea.vue'
    import itemTimeSelect from './item/timeSelect.vue'
    import itemDateSelect from './item/dateSelect.vue'
    import itemInputNumber from './item/inputNumber.vue'
    import itemSlider from "./item/slider.vue"
    import  itemCheckBox from "./item/checkBox.vue"
    import  itemRadio from "./item/radio.vue"
    import {defineEmits,defineProps,defineModel} from  'vue'
    import {FormInstance} from 'element-plus'
    const itemList  = {
        itemInput,itemSelect,itemTextarea,itemTimeSelect,itemDateSelect,itemInputNumber,itemSlider,itemCheckBox,itemRadio
    }
   
    // const  formData =  defineModel({
    //     type: Object,
    //     default: () => {
    //         return {};
    //     },
    //
    // }
  
    const  form =  ref<FormInstance>()
    
    const  props =  defineProps({
       
            //表单绑定的数据
            formData: {
                type: Object,
                default: () => {
                    return {};
                },
            },
            listTypeInfo: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            labelWidth: {
                type: String,
                default: "130px"
            },
            disabled: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: 'small'
            },
            //表单item中的格式列表
            formItem: {
                type: Array,
                default: () => {
                    return [];
                },
            },
            //验证规则
            rules: {
                type: Object,
                default: () => {
                    return {};
                },
            },
    })
    const  emits =  defineEmits(['handleEvent','update-formRef'])
    watch(()=>props.formData,(newVal)=>{
        
        emits('update-formRef',form)

       
    
    },{
      immediate:true,
     
      once:true
    })
    function handleFormItem() {
                props.formItem.filter(item => !Object.prototype.hasOwnProperty.call(item, 'show') || (Object.prototype.hasOwnProperty.call(item, 'show') && item.show))
            }
            function handleEvent(event,data){
                emits('handleEvent',event,data)
            }

</script>
<style lang="scss" scoped>
    @import "@/globalcomponent/style/index.scss";
</style>
