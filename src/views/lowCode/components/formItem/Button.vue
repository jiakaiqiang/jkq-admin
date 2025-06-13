<template>
    <div>
        <el-button v-bind="props" @click="handleClick">{{ name }}</el-button>
    </div>
</template>

<script lang='ts' setup>
import { defineProps, toRefs } from 'vue';
const propsData = defineProps(['data'])
const { props, name, events } = toRefs(propsData.data)
const handleClick = () => {

    console.log(events)

}
// Your code here

</script>s



<style scoped lang='scss'>
/* Your styles here */
</style>