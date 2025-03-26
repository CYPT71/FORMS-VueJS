<template>
  <div class="modal__overlay" @click.self="$emit('close')">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineEmits(['close'])
</script>
