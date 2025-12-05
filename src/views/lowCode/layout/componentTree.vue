<template>
   
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    components: {
        type: Array,
        default: () => []
    }
})
console.log(props.components)
</script>
<style lang="scss" scoped>

</style>