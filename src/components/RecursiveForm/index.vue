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
import { useImageUploader } from "@/consummables/Images"

const questions = reactive<Question[]>(mockQuestions)
const errors = reactive<Record<string, string>>({})

const {
  handleFileUpload,
  webpBlob,
  error: uploadError,
  uploadStatus,
  imagePreview,
  uploadToApi,
} = useImageUploader({ apiEndpoint: '/api/upload' })

// 🔍 Recherche récursive d'une question
const findQuestion = (list: Question[], id: string): Question | null => {
  for (const q of list) {
    if (q.id === id) return q
    if (q.children) {
      const found = findQuestion(q.children, id)
      if (found) return found
    }
  }
  return null
}

// 🧠 Mise à jour d'une réponse
const updateAnswer = async (id: string, value: string | Question[] | Event) => {
  const question = findQuestion(questions, id)
  if (!question) return

  if (Array.isArray(value)) {
    question.children = value
  } else if (question.type === "file" && value instanceof Event) {
    await handleFileUpload(value)
    if (webpBlob.value) {
      question.answer = "uploaded" // valeur arbitraire, à adapter si besoin
    }
  } else {
    question.answer = value as string
  }

  validateQuestion(question)
}

// 🔎 Validation d'une seule question (et récursivement ses enfants)
const validateQuestion = (q: Question): boolean => {
  const isEmpty = (val?: string) => !val || val.trim() === ''
  const hasChildren = Array.isArray(q.children) && q.children.length > 0
  const childrenValid = hasChildren ? q.children!.every(validateQuestion) : true

  const isCurrentValid = (!isEmpty(q.answer) || hasChildren) && childrenValid

  if (!isCurrentValid) {
    errors[q.id] = 'Ce champ est requis.'
    return false
  } else {
    delete errors[q.id]
    return true
  }
}

// ✅ Validation complète du formulaire
const validateAll = (list: Question[]): boolean => {
  return list.every(validateQuestion)
}

// 📤 Soumission du formulaire
const submit = () => {
  const isValid = validateAll(questions)
  console.log(questions);
  alert(isValid ? 'Formulaire validé !' : 'Des erreurs sont présentes.')
}
</script>

