<template>
    <div class="item-slider">
        <el-slider v-bind="$attrs" v-model="sliderValue"></el-slider>
    </div>
</template>

<script>
    export default {
        name: "itemSlider",
        props:{
            value:{
                type:Number,
                default:0
            }
        },
        data(){
            return {
                sliderValue:""
            }
        },
        created() {
            this.sliderValue=this.value

        }
    }
</script>

<style>
.item-slider{
    width: 320px;
}
</style>
