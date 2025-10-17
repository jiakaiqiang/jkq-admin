<template>
  <div class="container-component">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  display?: string
}>()
</script>

<style scoped lang="scss">
.container-component {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 50px;
  
  &[style*="display: flex"] {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
  }
}
</style>
