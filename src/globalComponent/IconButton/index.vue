<template>
  <div>
   <el-button @click="handleClick" :title="props.title" :size="props.size" :type="props.type" :icon="props.icon" :circle="props.circle" :plain="props.plain" >{{title}}</el-button>
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
  },
  size:{
    type:String,
    default:'small'
  },
  type:{
    type:String,
    default:'primary'
  },
  icon:{
    type:String,
    default:''
  },
  circle:{
    type:Boolean,
    default:false
  },
  plain:{
    type:Boolean,
    default:false
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