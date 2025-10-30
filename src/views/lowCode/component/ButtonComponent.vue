<template>
  <div class="button-component">
    <el-button 
      :class="buttonClass"
      :style="buttonStyle"
      @click="handleClick"
    >
      {{ text }}
    </el-button>
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
  borderRadius?: number,
  onClick?: () => void
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
  try {
    // 确保onClick存在且是字符串类型或函数类型
    console.log(props.onClick, 'onClick code')
    
    if (props.onClick) {
      // 检查onClick是否为数组且有第一个元素
      const clickHandler = Array.isArray(props.onClick) ? props.onClick[0] : props.onClick;
      
      if (typeof clickHandler === 'function') {
        // 如果是函数类型，直接调用
        clickHandler()
      } else if (typeof clickHandler === 'string') {
        // 如果是字符串类型，创建一个安全的函数执行环境
        try {
          // 使用立即执行函数表达式包装，避免函数声明需要名称的问题
          new Function(`(${clickHandler})()`)()
        } catch (execError) {
          console.error('Error executing onClick code:', execError)
          // 尝试直接执行，兼容非函数形式的代码
          try {
            new Function(clickHandler)()
          } catch (fallbackError) {
            console.error('Fallback execution also failed:', fallbackError)
          }
        }
      }
    }
    
    console.log('Button clicked')
  } catch (error) {
    console.error('Error executing click event:', error)
  }
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
