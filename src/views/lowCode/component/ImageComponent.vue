<template>
  <div class="image-component">
    <img 
      :src="src" 
      :alt="alt"
      :style="imageStyle"
      @error="handleError"
      @load="handleLoad"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'

const props = defineProps<{
  src?: string
  alt?: string
  objectFit?: string
}>()

const imageError = ref(false)
const imageLoaded = ref(false)

const imageStyle = computed(() => {
  return {
    objectFit: (props.objectFit as any) || 'cover',
    width: '100%',
    height: '100%'
  }
})

const handleError = () => {
  imageError.value = true
}

const handleLoad = () => {
  imageLoaded.value = true
}
</script>

<style scoped lang="scss">
.image-component {
  display: block;
  width: 100%;
  height: 100%;
  
  img {
    display: block;
    border-radius: inherit;
  }
}
</style>
