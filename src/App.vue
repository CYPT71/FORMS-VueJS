<template>
  <LoginForm @error="handleError" @is-connected="handleIsConnected" v-if="!connected">
    <template #header>
      <h1>BaseLayout Header</h1>
    </template>
    <template #footer>
      <p>this is a footer</p>
    </template>
  </LoginForm>
  <BaseLayout project-title="BaseLayout Header" v-else>
    <template #header>
      <ProfileLink :imgLink="logo" />
      <button @click="handleLogout">Logout</button>
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
// @ts-ignore
import logo from '@/assets/logo.svg'

import { ref } from 'vue'
const modalOpen = ref(false)
const connected = ref<boolean>(false)

const handleIsConnected = (isConnected: boolean) => {
  connected.value = isConnected;
}

const handleLogout = () => {
  connected.value = false
}

const handleError = (err: string) => {
  alert(err);
}
</script>



<style lang="scss" src="@/assets/styles/main.scss"></style>
