<template>
    <div class="lowCode-container">
        <div class="container-top">
            <codeTop @dragstart="dragstart"></codeTop>
        </div>
        <div class="container-main">
            <div class="container-left">
                <codeComponent @drop="drop"></codeComponent>
            </div>
            <div class="container-content" ref='dragRef'>

                <codePlan></codePlan>
            </div>
            <div class="container-right">
                <codeParams></codeParams>

            </div>

        </div>

    </div>



</template>

<script lang='ts' setup>
import { ref } from 'vue';
import codeComponent from './components/codeComponent.vue';
import codeParams from './components/codeParams.vue';
import codePlan from './components/codePlan.vue';
import codeTop from './components/codeTop.vue';
const dragRef = ref(null)
const dragstart = (data, e) => {
    console.log('www', dragRef.value)
    dragRef.value.addEventListener('drop', drop)
    dragRef.value.addEventListener('dragover', dragover)
    dragRef.value.addEventListener('dragenter', dragenter)



}
const dragenter = (event: { dataTransfer: { dropEffect: string } }) => {
    console.log('wefwfw')
    event.dataTransfer.dropEffect = 'move'
}
const dragover = (event: { dataTransfer: { dropEffect: string } }) => {
    //组织浏览器的默认行为
    event.preventDefault()
    console.log('wefwef----------')
    // event.dataTransfer.dropEffect = 'none'
}

const drop = (event: { dataTransfer: { getData: (arg0: string) => any; }; }) => {
    const data = event.dataTransfer.getData('text/plain')
    // 处理拖拽元素的数据
    console.log(data)
}

</script>

<style scoped lang='scss'>
.lowCode-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .container-top {
        height: 50px;
        background-color: var(--el-bg-color);
        margin-bottom: 4px;
    }

    .container-main {
        flex: 1;
        display: flex;

        .container-left {
            width: 280px;
            margin-right: 4px;
            background-color: var(--el-bg-color);
        }

        .container-content {
            flex: 1;
            background-color: var(--el-bg-color);
        }

        .container-right {
            width: 280px;
            margin-left: 4px;
            background-color: var(--el-bg-color);
        }
    }


}
</style>