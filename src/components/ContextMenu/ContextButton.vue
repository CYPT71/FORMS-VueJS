<template>
  <button ref="buttonRef" @click="$emit('toggle')">
    <slot>Click Me</slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const buttonRef = ref<HTMLElement | null>(null)

defineExpose({ buttonRef })
defineEmits(['toggle'])
</script>
