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
                    <slot :name="'form'-item.values"></slot>
                </template>
                <el-form-item v-else :key="item.value" :label="item.label" :prop="item.value">
                    <!-- 组件 -->
                    <component :is="item.formType" v-bind="item" :value="formData[item.value]" @update-value="(val)=>{formData[item.value]=val}"
                               :selectList="listTypeInfo[item.list]" @handleEvent="handleEvent"></component>
                </el-form-item>
            </template>

        </el-form>
    </div>
</template>

<script lang="ts" setup>
    import itemInput from './item/input';
    import itemSelect from './item/select.vue'
    import itemTextarea from './item/textarea.vue'
    import itemTimeSelect from './item/timeSelect.vue'
    import itemDateSelect from './item/dateSelect.vue'
    import itemInputNumber from './item/inputNumber'
    import itemSlider from "./item/slider"
    import  itemCheckBox from "./item/checkBox"
    import  itemRadio from "./item/radio"
    import {defineEmits,defineProps,c} from  'vue'
    const  props =  defineProps({
       formRef: {
                type: Object
            },
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
    watch(()=>props.data,()=>{
      emits('update-formRef', this.$refs.form)
    })
    function handleFormItem() {
                props.formItem.filter(item => !Object.prototype.hasOwnProperty.call(item, 'show') || (Object.prototype.hasOwnProperty.call(item, 'show') && item.show))
            }
            function handleEvent(event,data){
                $emit('handleEvent',event,data)
            }

</script>
<style lang="scss" scoped>
    @import "@/globalcomponent/style/index.scss";
</style>
