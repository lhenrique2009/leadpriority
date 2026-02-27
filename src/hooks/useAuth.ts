// src/hooks/useAuth.ts

import { create } from 'zustand'
import { api } from '../services/api'
import type { User } from '@shared/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, senha: string) => Promise<void>
  cadastro: (dados: {
    nome: string
    email: string
    senha: string
    empresaNome: string
    plano?: string
  }) => Promise<void>
  logout: () => void
  checkAuth: () => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email, senha) => {
    const { user } = await api.login(email, senha)
    set({ user, isAuthenticated: true })
  },

  cadastro: async (dados) => {
    const { user } = await api.cadastro(dados)
    set({ user, isAuthenticated: true })
  },

  logout: () => {
    api.logout()
    set({ user: null, isAuthenticated: false })
  },

  checkAuth: () => {
    const token = localStorage.getItem('token')
    if (token) {
      // Aqui você pode validar o token ou buscar dados do usuário
      set({ isLoading: false })
    } else {
      set({ isLoading: false, isAuthenticated: false })
    }
  },
}))