// shared/types/lead.ts

export type LeadPrioridade = 'hot' | 'warm' | 'cold' | 'new'
export type LeadStatus = 'novo' | 'em_contato' | 'negociando' | 'fechado' | 'perdido'
export type LeadOrigem = 'whatsapp' | 'instagram' | 'site' | 'indicacao' | 'outro'

export interface Lead {
  id: string
  empresaId: string
  
  nome: string
  telefone: string
  email?: string
  empresa?: string
  
  origem: LeadOrigem
  status: LeadStatus
  
  score: number
  prioridade: LeadPrioridade
  motivoScore?: string
  sugestaoResposta?: string
  
  valorEstimado?: number
  
  ultimaMensagem?: string
  tempoSemResposta?: number
  
  criadoEm: string
  atualizadoEm: string
  ultimoContatoEm?: string
}

export interface LeadAlerta {
  id: string
  leadId: string
  tipo: 'responder_agora' | 'esfriando' | 'oportunidade' | 'risco_perda'
  mensagem: string
  urgencia: 'alta' | 'media' | 'baixa'
  lido: boolean
  criadoEm: string
}

export interface LeadStats {
  total: number
  novos: number
  emContato: number
  negociando: number
  fechados: number
  perdidos: number
  valorPipeline: number
}