<template>
    <div class="item-checkbox">
        <el-checkbox-group v-model="checkList" @change="handleEvent">
            <el-checkbox  class="checkbox" v-for = "(item,index) in selectList"  :key="index" :label="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
    export default {
        name: "checkbox",
        props: {
            value: {
                type: Array,
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
            this.checkList = Array.isArray(this.value) ? this.value : []
        },
        methods:{
            handleEvent(data){
                this.$emit('handleEvent','changeCheck',data)
            }
        }
    }

</script>

<style>
    .item-checkbox {
        width: 320px;
    }

</style>
