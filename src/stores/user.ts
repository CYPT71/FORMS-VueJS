import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => ({
    name: 'Spock',
    email: 'spock@vulcan.star',
    isLoggedIn: false,
  }),

  getters: {
    displayName: (state) => `${state.name} <${state.email}>`,
  },

  actions: {
    login(name: string, email: string) {
      this.name = name
      this.email = email
      this.isLoggedIn = true
    },
    logout() {
      this.name = ''
      this.email = ''
      this.isLoggedIn = false
    },
  },
})
