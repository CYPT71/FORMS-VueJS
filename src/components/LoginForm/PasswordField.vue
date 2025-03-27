<!-- components/atoms/PasswordField.vue -->
<template>
  <label :for="inputID">
    {{ label }}
    <div class="relative">
      <input :id="inputID" :type="showPassword ? 'text' : 'password'"  :value="modelValue" @input="onInput"
      class="login__input" v-bind="attrs" />
      <button type="button"  class="login__toggle" @click="toggle">
        {{ showPassword ? '🙈' : '👁️' }}
      </button>
    </div>
  </label>
</template>
  
<script setup lang="ts">
import { ref, useAttrs } from 'vue'

defineProps<{
  modelValue: string
  label: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const showPassword = ref(false)
const toggle = () => (showPassword.value = !showPassword.value)

const attrs = useAttrs()
const inputID = `pw-${Math.random().toString(36).slice(2)}`

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
  