import { defineStore } from 'pinia'

interface Question {
  id: string
  label: string
  answer?: string
  children?: Question[]
}

export const useProduct = defineStore('product', {
  state: () => ({
    questions: [] as Question[],
  }),

  actions: {
    setQuestions(payload: Question[]) {
      this.questions = payload
    },

    updateAnswer(id: string, value: string) {
      const q = this.findQuestion(this.questions, id)
      if (q) q.answer = value
    },

    findQuestion(list: Question[], id: string): Question | undefined {
      for (const q of list) {
        if (q.id === id) return q
        if (q.children) {
          const found = this.findQuestion(q.children, id)
          if (found) return found
        }
      }
    },
  },
})
