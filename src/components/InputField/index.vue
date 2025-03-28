<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import type { InputField } from '@/types'

defineProps<InputField>()

const fileSelected = ref(false)

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  fileSelected.value = !!input.files?.length
}

</script>

<template>
  <BaseInput
    :type="inputType"
    :placeholder="placeholder"
    :label="label"
    @change="handleFileChange"
  />
</template>
