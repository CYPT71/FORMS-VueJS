<template>
  <ModalContent>
    <ModalClose @close="$emit('close')" />
    <slot />
  </ModalContent>
</template>

<script setup lang="ts">
import ModalContent from './ModalContent.vue'
import ModalClose from './ModalClose.vue'

defineEmits(['close'])
</script>
