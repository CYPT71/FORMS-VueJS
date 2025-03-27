<template>
  <div class="recursive-form__container">
    <QuestionBlock
      v-for="question in questions"
      :key="question.id"
      :question="question"
      :errors="errors"
      @update:answer="updateAnswer"
    />
    <button @click="submit">Soumettre</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { Question } from '@/types'
import { mockQuestions } from '@/mocks/questions'

const questions = reactive<Question[]>(JSON.parse(JSON.stringify(mockQuestions)))
const errors = reactive<Record<string, string>>({})

// 🔍 Trouve une question par ID dans l'arbre
const findQuestion = (list: Question[], id: string): Question | undefined => {
  for (const q of list) {
    if (q.id === id) return q
    if (q.children) {
      const found = findQuestion(q.children, id)
      if (found) return found
    }
  }
  return undefined
}

// ✅ Mise à jour de la réponse
const updateAnswer = (id: string, value: string | Question[]) => {
  const q = findQuestion(questions, id)
  if (q) {
    if (Array.isArray(value)) {
      q.children = value
    } else {
      q.answer = value
    }

    validateQuestion(q)
  }
}

// 🔎 Validation récursive d’une seule question
const validateQuestion = (q: Question): boolean => {
  let valid = true

  const isEmpty = (val?: string) =>
    !val || (typeof val === 'string' && val.trim() === '')

  const hasValidChildren = (children?: Question[]) =>
    children?.every(validateQuestion)

  if (isEmpty(q.answer)) {
    if (!q.children || q.children.length === 0 || !hasValidChildren(q.children)) {
      errors[q.id] = 'Ce champ est requis.'
      valid = false
    } else {
      delete errors[q.id]
    }
  } else {
    delete errors[q.id]
  }

  return valid
}

// 🔁 Validation complète du formulaire
const validateAll = (list: Question[]): boolean => {
  let valid = true
  for (const q of list) {
    if (!validateQuestion(q)) {
      valid = false
    }
  }
  return valid
}

// 📤 Soumission du formulaire
const submit = () => {
  const isValid = validateAll(questions)
  if (isValid) {
    alert('Formulaire validé !')
  } else {
    alert('Des erreurs sont présentes.')
  }
}
</script>

