<template>
  <div class="info-box__container" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { InfoContainer } from '@/types';

defineProps<InfoContainer>()
</script>
