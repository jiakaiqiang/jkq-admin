<template>
  <div class="select-component">
    <select 
      :value="value"
      :style="selectStyle"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, ref } from 'vue'

const props = defineProps<{
  value?: string
  placeholder?: string
  options?: Array<{ label: string; value: string }>
  borderColor?: string
  borderRadius?: number
}>()

const emit = defineEmits<{
  change: [value: string]
}>()

const focused = ref(false)

const selectStyle = computed(() => {
  return {
    borderColor: focused.value ? '#409eff' : props.borderColor,
    borderRadius: `${props.borderRadius || 4}px`
  }
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('change', target.value)
}

const handleFocus = () => {
  focused.value = true
}

const handleBlur = () => {
  focused.value = false
}
</script>

<style scoped lang="scss">
.select-component {
  display: block;
  width: 100%;
  
  select {
    width: 100%;
    height: 100%;
    border: 1px solid #dcdfe6;
    padding: 0 12px;
    font-size: 14px;
    outline: none;
    background: #fff;
    cursor: pointer;
    transition: border-color 0.3s ease;
    
    &:focus {
      outline: none;
    }
    
    option {
      padding: 8px 12px;
    }
  }
}
</style>
