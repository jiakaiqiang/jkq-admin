<template>
    <div class="item-checkbox">
        <el-radio-group v-model="checkList" @change="handleEvent">
            <el-radio  class="checkbox" v-for = "(item,index) in selectList"  :key="index" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
    </div>
</template>

<script>
    export default {
        name: "raido",
        props: {
            value: {
                type: [String,Number],
                default: () => {
                    return []
                }
            },
            selectList: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            return {
                checkList: []
            }
        },
        watch: {
            checkList: {
                handler(val) {
                    this.$emit('update:value', val)
                },
                deep: true
            }
        },
        created() {
            this.checkList = this.value
        },
        methods:{
            handleEvent(data){
                this.$emit('handleEvent','changeRadio',data)
            }
        }
    }

</script>

<style>
    .item-checkbox {
        width: 320px;
    }

</style>
