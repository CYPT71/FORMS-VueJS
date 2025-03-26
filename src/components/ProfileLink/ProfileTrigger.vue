<template>
  <button class="profile-link__anchor" @click="$emit('open')">
    <img :src="imgLink" alt="Photo de Profil" class="profile-link__img" />
    <div class="profile-link__text">Mon espace</div>
  </button>
</template>

<script setup lang="ts">
import type { Profile } from '@/types';

defineProps<Profile>()

defineEmits(['open'])
</script>
