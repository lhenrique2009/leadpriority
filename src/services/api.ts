// src/services/api.ts

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

class ApiClient {
  private token: string | null = null

  constructor() {
    this.token = localStorage.getItem('token')
  }

  setToken(token: string | null) {
    this.token = token
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error || 'Erro na requisição')
    }

    return response.json()
  }

  // Auth
  async login(email: string, senha: string) {
    const data = await this.request<{ token: string; user: any }>(
      '/api/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, senha }),
      }
    )
    this.setToken(data.token)
    return data
  }

  async cadastro(dados: {
    nome: string
    email: string
    senha: string
    empresaNome: string
    plano?: string
  }) {
    const data = await this.request<{ token: string; user: any }>(
      '/api/auth/cadastro',
      {
        method: 'POST',
        body: JSON.stringify(dados),
      }
    )
    this.setToken(data.token)
    return data
  }

  logout() {
    this.setToken(null)
  }

  // Leads
  async getLeads(limite?: number) {
    return this.request<{ leads: any[] }>(
      `/api/leads${limite ? `?limite=${limite}` : ''}`
    )
  }

  async getLead(id: string) {
    return this.request<{ lead: any }>(`/api/leads/${id}`)
  }

  async getLeadStats() {
    return this.request<{ stats: any }>('/api/leads/stats')
  }

  async getAlertas() {
    return this.request<{ alertas: any[] }>('/api/leads/alertas')
  }

  async getSugestao(leadId: string) {
    return this.request<{ sugestao: string }>(
      `/api/leads/${leadId}/sugestao`,
      { method: 'POST' }
    )
  }
}

export const api = new ApiClient()