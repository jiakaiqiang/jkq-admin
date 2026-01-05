<template>
  <div class="form-textarea">
    <el-input   type='textarea' v-model="textValue"></el-input>
  </div>
</template>

<script lang='ts' setup >
import { ref, watch } from 'vue'

const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:value'])

const textValue = ref(props.value)

watch(textValue, (newVal) => {
  emit('update:value', newVal)
})
</script>
<style>
.form-textarea{
  width: 130px;
}
.el-form > .el-input ,.el-input--small{
        width: 130px;
}
</style>