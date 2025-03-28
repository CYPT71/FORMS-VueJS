<template>
  <header id="headerLogin">
    <slot name="header" />
  </header>

  <div id="login">
    <div class="login__box">
      <h1 class="login__title">Espace Fournisseur</h1>

      <input
        type="email"
        label="Adresse e-mail"
        v-model="email"
      />

      <div class="login__password-wrapper">
        <PasswordField
          :input-type="passwordType"
          label="Mot de passe"
          v-model="password"
        />
        <!-- Ajout possible d’un toggle visibilité ici si nécessaire -->
      </div>

      <div class="login__forgot">Mot de passe oublié ?</div>

      <button class="login__button" @click="validateLogin">Se connecter</button>

      <div class="login__signup">
        Pas de compte ?
        <a href="#">Inscrivez-vous ici</a>
      </div>
    </div>
  </div>

  <footer id="loginFooter">
    <slot name="footer" />
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUsers } from '@/consummables/Users'

const email = ref('');
const password = ref('');
const passwordType = ref<'password' | 'text'>('password');

const userStore = useUsers()

// Initialisation du store (useMock = true pour le fallback local)
userStore.init({ useMock: true })

const emit = defineEmits<{
  (e: 'isConnected', isConnected: boolean): void
  (e: 'error', message: string): void
}>();

const validateLogin = async () => {
  const success = await userStore.login({
    email: email.value,
    password: password.value,
  });

  emit('isConnected', success);

  if (!success && userStore.error) {
    emit('error', userStore.error);
  }
};
</script>

