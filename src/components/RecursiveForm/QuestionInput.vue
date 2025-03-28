<template>
  <div class="question-input__wrapper">
    <InputField
      v-model="modelAnswer"
      :inputType="question.type ?? 'text'"
      :label="question.label"
      :id="question.id"
    />
    <p v-if="error" class="question-input__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { QuestionInput } from '@/types'

const props = defineProps<QuestionInput>()
const emit = defineEmits<{
  (e: 'update:answer', value: string): void
}>()

// Bind prop to model with computed getter/setter
const modelAnswer = computed({
  get: () => props.question.answer,
  set: (value) => emit('update:answer', value ?? "")
})
</script>
