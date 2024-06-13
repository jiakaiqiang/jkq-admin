<template>
    <div class="item-checkbox">
        <el-checkbox-group v-model="checkList" @change="handleEvent">
            <el-checkbox  class="checkbox" v-for = "(item,index) in selectList"  :key="index" :label="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script lang="ts" setup>

import {defineProps,defineEmits,defineModel} from 'vue'
let  checkList =defineModel()

    const props = defineProps({
      
        selectList: {
            type: Array,
            default: () => {
                return []
            }
        }
    })
  

    const emit = defineEmits(['handleEvent'])
    
    const handleEvent=(data:any)=>{
                emit('handleEvent','changeCheck',data)
            }

    
   
</script>

<style>
    .item-checkbox {
        width: 320px;
    }

</style>
