<template>
  <label :for="fileID" :class="[
      'input-field__label',
      { 'input-field__label--file': inputType === 'file' }
    ]">
    {{ label }}
    <input
    :id="fileID"
    :type="inputType"
    :placeholder="placeholder"
    :value="inputType === 'file' ? undefined : value"
    @change="handleChange"
    min="0"
    class="input-field__input"
    autofocus
  />
  </label>

</template>

<script setup lang="ts">
const emit = defineEmits(['input', 'change'])

import { computed } from 'vue'
import type { InputFieldInner } from "@/types"

const props = defineProps<InputFieldInner>()

// Gestion du changement
const handleChange = (event: Event) => {
  emit('change', event)
  const target = event.target as HTMLInputElement
  emit('input', props.inputType === 'file' ? target.files : target.value)
}
</script>
