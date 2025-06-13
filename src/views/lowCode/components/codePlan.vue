<template>
    <div style="padding:10px">

        <!-- Your code here -->

        <div v-for="item in props.dataList" style="margin-bottom:5px"
            :class="[item.checked ? 'checked' : '', 'component-class']">
            <div v-if="item.checked" class="component-option">
                <el-icon :size="14" @click="handleDelete(item)">
                    <Delete />
                </el-icon>
                <el-icon :size="14" @click="handleCopy(item)">
                    <CopyDocument />
                </el-icon>
            </div>
            <component :is="item.commonent" :key="item.key" :data="item" @click="handleChecked(item)"></component>

        </div>
    </div>
</template>

<script lang='ts' setup>
import { v4 as uuidv4 } from "uuid";
import { defineProps, } from 'vue'

import { Delete, CopyDocument } from '@element-plus/icons-vue'
import Image from './formItem/Image.vue'
const props = defineProps(['dataList'])
if (props.dataList.length > 0) {
    console.log(props.dataList[0].events)
}

const handleChecked = (item: any) => {
    props.dataList.forEach((item: any) => {
        item.checked = false
    })
    item.checked = !item.checked
}

const handleCopy = (item: any) => {
    let index = props.dataList.findIndex((item: any) => item.key == item.key)
    props.dataList.splice(index + 1, 0, { ...item, key: uuidv4() })


}
const handleDelete = (item: any) => {
    let index = props.dataList.findIndex((item: any) => item.key == item.key)
    props.dataList.splice(index + 1, 1)
}







</script>

<style scoped lang='scss'>
.component-class {
    position: relative
}

.checked {
    border: 2px solid var(--el-color-primary);
    margin-top: 20px;
}

.component-option {
    position: absolute;
    right: -2px;
    top: -22px;
    width: 100px;
    height: 20px;
    background: var(--el-color-primary);

    cursor: pointer;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--el-text-color-primary);

    .el-icon {
        margin-right: 4px;
    }
}

/* Your styles here */
</style>