<template>
  <div>
    <button :title="props.title" @click="handleClick">

    </button>
  </div>
</template>

<script lang='ts' setup>
/**
 * 1.文字
 * 2.图标
 * 3.图标带文字
 * 
 * 
*/
import {ref,defineProps,defineEmits} from 'vue'
const props = defineProps({
  title:{
    type:String,
    default:''
  }
  // Your props here
})
const emit = defineEmits(['click'])
const handleClick = () => {
  emit('click')
}
</script>

<style scoped lang='scss' >
/* Your styles here */
</style>