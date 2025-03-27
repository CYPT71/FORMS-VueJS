<template>
  <BaseLayout>
    <template #header>
      <h1>BaseLayout Header </h1>
      <ProfileLink :imgLink="logo" />
    </template>
    <template #left>
      <p>Colonne de gauche</p>
      <ContextMenu :options="['option1', 'option2', 'option3']">
        <template #button>Click Me</template>
      </ContextMenu>
    </template>

    <template #right>
      <RecursiveForm/>
      <BaseModal v-if="modalOpen" :isOpen="modalOpen" @close="modalOpen = false">
        Contenu du modal
      </BaseModal>
      <button @click="modalOpen = true">Ouvrir le modal</button>
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.svg'

import { ref } from 'vue'
const modalOpen = ref(false)
</script>



<style lang="scss" src="@/assets/styles/main.scss"></style>
