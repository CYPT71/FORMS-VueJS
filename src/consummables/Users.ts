// src/stores/useUserStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { user as mockUser } from '@/mocks/users'

interface User {
  name: string
  email: string
  password?: string
}

interface LoginPayload {
  email: string
  password: string
}

interface StoreOptions {
  useMock?: boolean
  baseUrl?: string
}

export const useUsers = defineStore('user', () => {
  // 🔧 Config
  const useMock = ref(true)
  const baseUrl = ref('/api/auth')

  // 🔐 Auth state
  const currentUser = ref<User | null>(null)
  const authToken = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ✅ Computed
  const isAuthenticated = computed(() => currentUser.value !== null)

  // ⚙️ Initialisation personnalisée
  const init = ({ useMock: mock = true, baseUrl: url = '/api/auth' }: StoreOptions = {}) => {
    useMock.value = mock
    baseUrl.value = url
  }

  // 🔐 Login
  const login = async ({ email, password }: LoginPayload): Promise<boolean> => {
    error.value = null
    loading.value = true

    if (useMock.value) {
      await new Promise((r) => setTimeout(r, 300)) // simule le réseau
      if (email === mockUser.email && password === mockUser.password) {
        currentUser.value = { name: mockUser.name, email: mockUser.email }
        loading.value = false
        return true
      } else {
        error.value = 'Identifiants incorrects.'
        loading.value = false
        return false
      }
    }

    try {
      const res = await fetch(`${baseUrl.value}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) throw new Error('Échec de la connexion.')

      const data = await res.json()
      currentUser.value = data.user
      authToken.value = data.token
      loading.value = false
      return true
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
      loading.value = false
      return false
    }
  }

  // 🔎 Récupération utilisateur (API)
  const getUser = async () => {
    if (useMock.value) return currentUser.value
    if (!authToken.value) return null

    try {
      const res = await fetch(`${baseUrl.value}/me`, {
        headers: {
          Authorization: `Bearer ${authToken.value}`,
        },
      })

      if (!res.ok) throw new Error('Utilisateur non authentifié.')

      const data = await res.json()
      currentUser.value = data.user
      return data.user
    } catch (err) {
      logout()
      return null
    }
  }

  // 🚪 Déconnexion
  const logout = () => {
    currentUser.value = null
    authToken.value = null
  }

  return {
    currentUser,
    authToken,
    isAuthenticated,
    error,
    loading,
    init,
    login,
    logout,
    getUser,
  }
})
