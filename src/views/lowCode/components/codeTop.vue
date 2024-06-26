<template>
    <div style="display: flex;justify-content: flex-end;">
        <operationList :optionList="optionList" @handleClick="handleClick"></operationList>
    </div>
</template>

<script lang='ts' setup>

import operationList from '@/globalComponent/operationList/index.vue'
import { inject, reactive } from 'vue';
const optionList = reactive([{
    type: 'primary',
    size: 'mini',
    event: 'click',
    title: "提交",
    icon: 'Check'

}, {
    type: 'primary',
    size: 'mini',
    event: 'click',
    title: "保存",
    icon: 'Files'

},
{
    type: 'primary',
    size: 'mini',
    event: 'view',
    title: "预览",
    icon: 'View'

},
{
    type: 'primary',
    size: 'mini',
    event: 'click',
    title: "导出",
    icon: 'Upload'

}])
const injectData = inject('componentsListData')

const handleClick = (event: string) => {
    switch (event) {
        case 'click':
            console.log('click')
            break;
        case 'view':
            console.log('view', injectData)
            break;
        case 'export':
            console.log('export')
            break;
        default:
            console.log('default')
            break;
    }
}
</script>

<style scoped lang='scss'>
/* Your styles here */
</style>