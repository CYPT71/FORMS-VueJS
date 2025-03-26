<template>
  <teleport to="body">
    <ModalOverlay v-if="isOpen" @close="closeModal">
      <ModalBody @close="closeModal" @click.stop>
        <slot />
      </ModalBody>
    </ModalOverlay>
  </teleport>
</template>

<script setup lang="ts">
import ModalOverlay from './ModalOverlay.vue'
import ModalBody from './ModalBody.vue'
import { onMounted, onUnmounted } from 'vue';
import type { BaseModal } from "@/types"

defineProps<BaseModal>()
const emit = defineEmits(['close'])

const handleKeydown = (event: KeyboardEvent) => {
  event.preventDefault()
  if (event.key === 'Escape') {
    closeModal()
  }
}


const closeModal = () => {
  emit('close')
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
