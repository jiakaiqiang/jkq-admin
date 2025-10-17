<template>
  <div class="divider-component" :style="dividerStyle">
    <hr />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  backgroundColor?: string
}>()

const dividerStyle = computed(() => {
  return {
    backgroundColor: props.backgroundColor || '#e4e7ed'
  }
})
</script>

<style scoped lang="scss">
.divider-component {
  width: 100%;
  
  hr {
    border: none;
    height: 1px;
    background: inherit;
    margin: 0;
  }
}
</style>
