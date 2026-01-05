<template>
    <div class="item-checkbox">
        <el-radio-group v-model="checkList" @change="handleEvent">
            <el-radio  class="checkbox" v-for = "(item,index) in selectList"  :key="index" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// 定义 props
const props = defineProps({
  value: {
    type: [String, Number],
    default: ''
  },
  selectList: {
    type: Array,
    default: () => []
  }
})

// 定义 emit
const emit = defineEmits(['update:value', 'handleEvent'])

// 响应式数据
const checkList = ref(props.value)

// 监听 checkList 变化并同步到父组件
watch(checkList, (val) => {
  emit('update:value', val)
})

// 处理 change 事件
const handleEvent = (data) => {
  emit('handleEvent', 'changeRadio', data)
}
</script>

<style>
    .item-checkbox {
        width: 320px;
    }

</style>
