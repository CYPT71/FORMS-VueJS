<template>
  <div class="question-input__wrapper">
    <InputField
      :inputType="question.type ?? 'text'"
      :label="question.label"
      :value="question.answer"
      :fileID="question.id"
      @input="handleInput"
    />
    <p v-if="error" class="question-input__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import InputField from '@/components/InputField/index.vue'
import type { QuestionInput } from '@/types';

const props = defineProps<QuestionInput>()

const emit = defineEmits(['update:answer'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:answer', target?.value ?? "")
}
</script>
