<template>
  <div class="input-component">
    <el-input 
      type="text"
      :value="value"
      :placeholder="placeholder"
      :style="inputStyle"
     
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, ref } from 'vue'

const props = defineProps<{
  value?: string
  placeholder?: string
  borderColor?: string
  borderRadius?: number
}>()

const emit = defineEmits<{
  input: [value: string]
}>()

const focused = ref(false)

const inputStyle = computed(() => {
  return {
    borderColor: focused.value ? '#409eff' : props.borderColor,
    borderRadius: `${props.borderRadius || 4}px`
  }
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('input', target.value)
}

const handleFocus = () => {
  focused.value = true
}

const handleBlur = () => {
  focused.value = false
}
</script>

<style scoped lang="scss">
.input-component {
  display: block;
  width: 100%;
  
  input {
    width: 100%;
    height: 100%;
    border: 1px solid #dcdfe6;
    padding: 0 12px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease;
    
    &:focus {
      outline: none;
    }
    
    &::placeholder {
      color: #c0c4cc;
    }
  }
}
</style>
