<template>
    <div style="display: flex;justify-content: flex-end;">
        <operationList :optionList="optionList"></operationList>
    </div>
</template>

<script lang='ts' setup>

import operationList from '@/globalComponent/operationList/index.vue'
import { ref, reactive } from 'vue';
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
</script>

<style scoped lang='scss'>
/* Your styles here */
</style>