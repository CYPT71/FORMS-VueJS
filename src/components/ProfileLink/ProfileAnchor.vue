<template>
  <button class="profile-link__anchor" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineEmits(['click'])
</script>
