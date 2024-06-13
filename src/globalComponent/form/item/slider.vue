<template>
    <div class="item-slider">
        <el-slider  v-model="model" @change="handleEvent"></el-slider>
    </div>
</template>

<script lang="ts" setup>
import { ref,defineModel,defineEmits } from 'vue';

let  model  =  defineModel()

const emit = defineEmits(['handleEvent'])
const handleEvent = (value: number) => {
   
    emit('handleEvent','sliderData', value)
}



</script>

<style>
.item-slider{
    width: 320px;
}
</style>
