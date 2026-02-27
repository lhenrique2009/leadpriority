// shared/types/plan.ts

export type PlanSlug = 'basico' | 'pro' | 'avancado'

export interface PlanRecursos {
  priorizacao: boolean
  score: boolean
  sugestoes: boolean
  alertas: boolean
  relatorios: 'nenhum' | 'basico' | 'completo'
  api: boolean
  canais: number | 'ilimitado'
}

export interface Plan {
  id: string
  slug: PlanSlug
  nome: string
  preco: number
  limiteLeads: number
  recursos: PlanRecursos
}

export const PLANS: Record<PlanSlug, Plan> = {
  basico: {
    id: 'plan_basico',
    slug: 'basico',
    nome: 'Básico',
    preco: 197,
    limiteLeads: 200,
    recursos: {
      priorizacao: true,
      score: true,
      sugestoes: false,
      alertas: false,
      relatorios: 'nenhum',
      api: false,
      canais: 2,
    },
  },
  pro: {
    id: 'plan_pro',
    slug: 'pro',
    nome: 'Pro',
    preco: 397,
    limiteLeads: 1000,
    recursos: {
      priorizacao: true,
      score: true,
      sugestoes: true,
      alertas: true,
      relatorios: 'basico',
      api: false,
      canais: 'ilimitado',
    },
  },
  avancado: {
    id: 'plan_avancado',
    slug: 'avancado',
    nome: 'Avançado',
    preco: 697,
    limiteLeads: Infinity,
    recursos: {
      priorizacao: true,
      score: true,
      sugestoes: true,
      alertas: true,
      relatorios: 'completo',
      api: true,
      canais: 'ilimitado',
    },
  },
}

// Helper para verificar recurso
export function temRecurso(
  plano: PlanSlug,
  recurso: keyof PlanRecursos
): boolean {
  const plan = PLANS[plano]
  const valor = plan.recursos[recurso]
  
  if (typeof valor === 'boolean') return valor
  if (recurso === 'relatorios') return valor !== 'nenhum'
  return true
}