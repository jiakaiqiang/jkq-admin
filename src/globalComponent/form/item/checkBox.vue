<template>
    <div class="item-checkbox">
        <el-checkbox-group v-model="checkList" @change="handleEvent">
            <el-checkbox  class="checkbox" v-for = "(item,index) in selectList"  :key="index" :label="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script lang="ts" setup>

import {defineProps,defineEmits,ref} from 'vue'
const checkList = ref<any>([])
    const props = defineProps({
        value: {
            type: Array,
            default: () => {
                return []
            }
        },
        selectList: {
            type: Array,
            default: () => {
                return []
            }
        }
    })
  

    const emit = defineEmits(['update:value','handleEvent'])
    watch(checkList, (val) => {
        emit('update:value', val)
    })
    const handleEvent=(data:any)=>{
                emit('handleEvent','changeCheck',data)
            }

    checkList.value = Array.isArray(props.value) ? props.value : []
   
</script>

<style>
    .item-checkbox {
        width: 320px;
    }

</style>
