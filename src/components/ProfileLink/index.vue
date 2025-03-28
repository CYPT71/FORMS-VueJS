<template>
  <div id="profile">
    <ProfileAnchor @click="open = true">
      <ProfileImage :src="imgLink" />
    </ProfileAnchor>
  </div>
  <BaseModal :isOpen="open" @close="open = false" v-if="open">
      <div class="profile-link__modal-content">
        <h2>Profil utilisateur</h2>
        <p>Nom : {{ userStore.currentUser?.name }}</p>
        <p>Email : {{  userStore.currentUser?.email }}</p>
        <!-- autres infos, slots, etc. -->
      </div>
    </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Profile } from '@/types'
import { useUsers } from '@/consummables/Users';

defineProps<Profile>()

const open = ref(false)
const userStore = useUsers()

</script>
