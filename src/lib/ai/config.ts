// src/lib/ai/config.ts

export const AI_PROVIDERS = {
  openai: {
    nano: 'gpt-4.1-nano',
    mini: 'gpt-4.1-mini',
    full: 'gpt-4.1',
  },
  anthropic: {
    sonnet: 'claude-3-5-sonnet-20241022',
    haiku: 'claude-3-5-haiku-20241022',
  },
} as const

// Qual IA usar para cada funcionalidade
export const AI_ROUTING = {
  // Tarefas objetivas → GPT (mais barato, JSON perfeito)
  score: 'openai:nano',
  priorizacao: 'openai:nano',
  alertas: 'openai:nano',
  extracao: 'openai:nano',
  
  // Texto para humanos → Claude (mais natural)
  sugestoes: 'anthropic:sonnet',
  analiseObjecoes: 'anthropic:sonnet',
  relatorios: 'anthropic:sonnet',
} as const