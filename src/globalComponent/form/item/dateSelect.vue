<template>
<div class='form-date'>
    <el-date-picker v-model="dateValue" v-bind="$attrs" @change="handleEvent">
  </el-date-picker>
</div>

</template>

<script>
export default {
  name: "itemDateSelect",
  props: {
    value: {
      type: [String,Date,Array],
      default: "",
    },
  },
  data() {
    return {
      dateValue: "",
    };
  },
  watch: {
      dateValue(val){
          this.$emit('update:value',val)
      }
  },
  created() {
    this.dateValue = this.value;
  },
    methods:{
      handleEvent(data){
          this.$emit('handleEvent','changeDate',data)
      }
    }
};
</script>

<style>
.form-date{
  width: 130px;
}
</style>
