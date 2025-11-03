<template>
  <div class="text-component" v-text="content">
 
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  content?: string
}>()
</script>

<style scoped lang="scss">
.text-component {
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
}
</style>
