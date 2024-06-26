<template>
    <div class="code-component-container">
        <el-divider content-position="left">基础组件库</el-divider>
        <div class="code-component">
            <div v-for="item in commonentsData" :key="item.id" draggable="true" @dragstart="drag($event, item)">
                <i :class="`iconfont ${item.icon}`"> </i>
                <span class="text">{{ item.name }}</span>
            </div>
        </div>

        <el-divider content-position="left">布局组件库</el-divider>
        <div class="code-component">
            <div v-for="item in layOutData" :key="item.id">
                <i :class="`iconfont ${item.icon}`"> </i>
            </div>
        </div>
        <el-divider content-position="left">图表组件库</el-divider>
        <div class="code-component">
            <div v-for="item in commonentsData" :key="item.id">
                <i :class="`iconfont ${item.icon}`"> </i>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { defineEmits } from 'vue'
const emits = defineEmits(['dragstart'])


import { commonentsData, layOutData } from './data/component.ts'

const drag = (e, data) => {
    console.log('-wefwe')
    e.dataTransfer.setData('data', JSON.stringify(data))
    emits('dragstart', JSON.stringify(data), e);
}

console.log(commonentsData)
</script>



<style scoped lang='scss'>
.code-component-container {
    padding: 20px 10px 10px 10px;

    .code-component {
        display: flex;
        flex-wrap: wrap;

        div {

            width: 42%;
            margin: 10px;
            height: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1px solid #ccc;

            border-radius: 5px;
            background-color: #f5f5f5;
            cursor: pointer;
            justify-content: center;

            .text {
                font-size: 12px;
            }

            i {
                font-size: 20px;
            }
        }
    }
}


/* Your styles here */
</style>