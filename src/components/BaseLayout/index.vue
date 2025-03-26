<template>
  <div class="layout-container">
    <header class="section" id="header">
      <button v-if="!showLeft" @click="showLeft = true">
        ➕
      </button>
      <slot name="header"/>
    </header>

    <div id="main-content">
      <!-- Colonne gauche avec bouton pour la masquer -->
      <section id="left-column" class="section" v-if="showLeft">
        <button @click="showLeft = false">
          ❌
        </button>
        <slot name="left"/>
      </section>

      <!-- Colonne droite toujours visible -->
      <section id="right-column" class="section">
           <!-- Bouton visible uniquement si la colonne gauche est masquée -->

        <slot name="right"/>
      </section>
    </div>

    <footer class="section" id="footer">
      <slot name="footer"/>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

// ✅ Valeur par défaut : colonne gauche visible
const showLeft = ref(true)
</script>
