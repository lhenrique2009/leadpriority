// server/db/schema.ts

import { 
  pgTable, 
  text, 
  integer, 
  boolean, 
  timestamp, 
  real, 
  pgEnum 
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Enums
export const planoEnum = pgEnum('plano', ['basico', 'pro', 'avancado'])
export const planoStatusEnum = pgEnum('plano_status', ['ativo', 'trial', 'cancelado', 'inadimplente'])
export const leadPrioridadeEnum = pgEnum('lead_prioridade', ['hot', 'warm', 'cold', 'new'])
export const leadStatusEnum = pgEnum('lead_status', ['novo', 'em_contato', 'negociando', 'fechado', 'perdido'])
export const leadOrigemEnum = pgEnum('lead_origem', ['whatsapp', 'instagram', 'site', 'indicacao', 'outro'])
export const alertaTipoEnum = pgEnum('alerta_tipo', ['responder_agora', 'esfriando', 'oportunidade', 'risco_perda'])
export const alertaUrgenciaEnum = pgEnum('alerta_urgencia', ['alta', 'media', 'baixa'])

// Empresas
export const empresas = pgTable('empresas', {
  id: text('id').primaryKey(),
  nome: text('nome').notNull(),
  
  plano: planoEnum('plano').notNull().default('basico'),
  planoStatus: planoStatusEnum('plano_status').notNull().default('trial'),
  trialAte: timestamp('trial_ate'),
  
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  
  leadsUsados: integer('leads_usados').notNull().default(0),
  
  whatsappConectado: boolean('whatsapp_conectado').notNull().default(false),
  whatsappInstancia: text('whatsapp_instancia'),
  whatsappToken: text('whatsapp_token'),
  
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
  atualizadoEm: timestamp('atualizado_em').notNull().defaultNow(),
})

// Usuários
export const usuarios = pgTable('usuarios', {
  id: text('id').primaryKey(),
  empresaId: text('empresa_id').notNull().references(() => empresas.id, { onDelete: 'cascade' }),
  
  email: text('email').notNull().unique(),
  senha: text('senha').notNull(),
  nome: text('nome').notNull(),
  
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
  ultimoLoginEm: timestamp('ultimo_login_em'),
})

// Leads
export const leads = pgTable('leads', {
  id: text('id').primaryKey(),
  empresaId: text('empresa_id').notNull().references(() => empresas.id, { onDelete: 'cascade' }),
  
  nome: text('nome').notNull(),
  telefone: text('telefone').notNull(),
  email: text('email'),
  empresa: text('empresa'),
  
  origem: leadOrigemEnum('origem').notNull().default('whatsapp'),
  status: leadStatusEnum('status').notNull().default('novo'),
  
  score: integer('score').notNull().default(50),
  prioridade: leadPrioridadeEnum('prioridade').notNull().default('new'),
  motivoScore: text('motivo_score'),
  sugestaoResposta: text('sugestao_resposta'),
  
  valorEstimado: real('valor_estimado'),
  
  ultimaMensagem: text('ultima_mensagem'),
  tempoSemResposta: integer('tempo_sem_resposta'),
  
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
  atualizadoEm: timestamp('atualizado_em').notNull().defaultNow(),
  ultimoContatoEm: timestamp('ultimo_contato_em'),
})

// Mensagens
export const mensagens = pgTable('mensagens', {
  id: text('id').primaryKey(),
  leadId: text('lead_id').notNull().references(() => leads.id, { onDelete: 'cascade' }),
  empresaId: text('empresa_id').notNull().references(() => empresas.id, { onDelete: 'cascade' }),
  
  conteudo: text('conteudo').notNull(),
  direcao: text('direcao').notNull(), // 'entrada' | 'saida'
  origem: text('origem').notNull(),
  
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
})

// Alertas
export const alertas = pgTable('alertas', {
  id: text('id').primaryKey(),
  leadId: text('lead_id').notNull().references(() => leads.id, { onDelete: 'cascade' }),
  empresaId: text('empresa_id').notNull().references(() => empresas.id, { onDelete: 'cascade' }),
  
  tipo: alertaTipoEnum('tipo').notNull(),
  mensagem: text('mensagem').notNull(),
  urgencia: alertaUrgenciaEnum('urgencia').notNull(),
  
  lido: boolean('lido').notNull().default(false),
  
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
})

// Relações
export const empresasRelations = relations(empresas, ({ many }) => ({
  usuarios: many(usuarios),
  leads: many(leads),
  alertas: many(alertas),
}))

export const usuariosRelations = relations(usuarios, ({ one }) => ({
  empresa: one(empresas, {
    fields: [usuarios.empresaId],
    references: [empresas.id],
  }),
}))

export const leadsRelations = relations(leads, ({ one, many }) => ({
  empresa: one(empresas, {
    fields: [leads.empresaId],
    references: [empresas.id],
  }),
  mensagens: many(mensagens),
  alertas: many(alertas),
}))

export const mensagensRelations = relations(mensagens, ({ one }) => ({
  lead: one(leads, {
    fields: [mensagens.leadId],
    references: [leads.id],
  }),
}))

export const alertasRelations = relations(alertas, ({ one }) => ({
  lead: one(leads, {
    fields: [alertas.leadId],
    references: [leads.id],
  }),
}))