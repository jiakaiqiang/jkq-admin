<template>
  <div class="button-component">
    <button 
      :class="buttonClass"
      :style="buttonStyle"
      @click="handleClick"
    >
      {{ text }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  text?: string
  type?: string
  size?: string
  backgroundColor?: string
  borderColor?: string
  borderRadius?: number
}>()

const buttonClass = computed(() => {
  return [
    'el-button',
    `el-button--${props.type || 'primary'}`,
    `el-button--${props.size || 'medium'}`
  ]
})

const buttonStyle = computed(() => {
  return {
    backgroundColor: props.backgroundColor,
    borderColor: props.borderColor,
    borderRadius: `${props.borderRadius || 4}px`
  }
})

const handleClick = () => {
  // 可以在这里处理点击事件
  console.log('Button clicked')
}
</script>

<style scoped lang="scss">
.button-component {
  display: inline-block;
  
  button {
    cursor: pointer;
    border: 1px solid;
    transition: all 0.3s ease;
    
    &:hover {
      opacity: 0.8;
    }
    
    &:active {
      transform: translateY(1px);
    }
  }
}
</style>
