<template>
  <button class="modal__close" @click="$emit('close')">✖</button>
</template>

<script setup lang="ts">
defineEmits(['close'])
</script>
