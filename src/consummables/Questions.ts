// src/stores/useQuestionsStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Question } from '@/types'
import { mockQuestions } from '@/mocks/questions'

export const useQuestionsStore = defineStore('questions', () => {
  const questions = ref<Question[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const hasFetched = ref(false)

  const cacheKey = 'cached-questions'

  // 🧠 LocalStorage
  const saveToCache = () => {
    localStorage.setItem(cacheKey, JSON.stringify(questions.value))
  }

  const loadFromCache = (): Question[] | null => {
    try {
      const raw = localStorage.getItem(cacheKey)
      return raw ? JSON.parse(raw) as Question[] : null
    } catch {
      return null
    }
  }

  // 🔄 Fetch all avec cache
  const fetchAll = async () => {
    if (hasFetched.value) return
    loading.value = true
    error.value = null

    try {
      const cached = loadFromCache()
      if (cached) {
        questions.value = cached
      } else {
        await new Promise(r => setTimeout(r, 300)) // latence simulée
        questions.value = mockQuestions
        saveToCache()
      }
      hasFetched.value = true
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue lors du chargement.'
    } finally {
      loading.value = false
    }
  }

  // ➕ Create
  const create = (q: Question) => {
    questions.value.push(q)
    saveToCache()
  }

  // ✏️ Update
  const update = (id: string, updates: Partial<Question>) => {
    const index = questions.value.findIndex(q => q.id === id)
    if (index !== -1) {
      questions.value[index] = { ...questions.value[index], ...updates }
      saveToCache()
    }
  }

  // ❌ Delete
  const remove = (id: string) => {
    questions.value = questions.value.filter(q => q.id !== id)
    saveToCache()
  }

  // 🔁 Reset cache
  const resetCache = () => {
    localStorage.removeItem(cacheKey)
    hasFetched.value = false
  }

  return {
    questions,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
    resetCache,
  }
})
