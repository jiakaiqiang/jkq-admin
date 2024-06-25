<template>
    <div @drop="handleDragOver">
        渲染区
        <!-- Your code here -->
    </div>
</template>

<script lang='ts' setup>

const dragenter = (event: { dataTransfer: { dropEffect: string } }) => {
    console.log('wefwfw')
    event.dataTransfer.dropEffect = 'move'
}
const dragover = (event: { dataTransfer: { dropEffect: string } }) => {
    event.dataTransfer.dropEffect = 'none'
}
const handleDragOver = (event: { preventDefault: () => any }) => event.preventDefault();
const drop = (event: { dataTransfer: { getData: (arg0: string) => any; }; }) => {
    const data = event.dataTransfer.getData('text/plain')
    // 处理拖拽元素的数据
    console.log(data)
}
</script>

<style scoped lang='scss'>
/* Your styles here */
</style>