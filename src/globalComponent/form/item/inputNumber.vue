<template>
    <div class="input-number">
        <el-input-number v-bind="$attrs" v-model="inputNumberValue"></el-input-number>
    </div>
</template>

<script>
    export default {
        name: "inputNumber",
        props:{
            value:{
                type:String,
                default:""
            }
        },
        data(){
            return {
                inputNumberValue:""
            }
        },
        created() {
            this.inputNumberValue=this.value

        }
    }
</script>

<style>
.input-number{
    width: 130px;
}
</style>
