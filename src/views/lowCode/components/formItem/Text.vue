<template>
    <div>
        <el-input v-bind="props" v-model="props.value"></el-input>
    </div>
</template>

<script lang='ts' setup>
import { defineProps, toRefs } from 'vue'
const propsData = defineProps(['data'])
const { props } = toRefs(propsData.data)
</script>

<style scoped lang='scss'>
/* Your styles here */
</style>