<template>
  <img :src="imgLink" alt="Photo de Profil" class="profile-link__img" />
</template>

<script setup lang="ts">
import type { Profile } from '@/types';

defineProps<Profile>()
</script>
