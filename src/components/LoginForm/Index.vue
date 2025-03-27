<template>
  <header id="headerLogin">
    <slot name="header" />
  </header>

  <div id="login">
    <div class="login__box">
      <h1 class="login__title">Espace Fournisseur</h1>

      <input
        input-type="email"
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
import { user } from '@/mocks/user';

const email = ref('');
const password = ref('');
const passwordType = ref<'password' | 'text'>('password');

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    let dummy = 0;
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      dummy |= (a.charCodeAt(i % a.length) ^ b.charCodeAt(i % b.length));
    }
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

const emit = defineEmits<{
  (e: 'isConnected', isConnected: boolean): void
  (e: 'error', message: string): void
}>();

const validateLogin = () => {
  const emailMatch = timingSafeEqual(email.value, user.email);
  const passwordMatch = timingSafeEqual(password.value, user.password);
  const isConnected = emailMatch && passwordMatch;

  emit('isConnected', isConnected);
  if (!isConnected) {
    emit('error', 'Invalid credentials');
  }
};

</script>
