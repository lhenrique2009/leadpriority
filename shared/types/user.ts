// shared/types/user.ts

import type { PlanSlug } from './plan'

export interface User {
  id: string
  email: string
  nome: string
  empresaId: string
  empresaNome: string
  plano: PlanSlug
  planoStatus: 'ativo' | 'trial' | 'cancelado'
  trialAte?: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginRequest {
  email: string
  senha: string
}

export interface CadastroRequest {
  nome: string
  email: string
  senha: string
  empresaNome: string
  plano?: PlanSlug
}