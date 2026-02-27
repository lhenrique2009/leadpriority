// server/services/ai/suggester.ts

import { callClaude } from './client'
import { PLANS, type PlanSlug } from '@shared/types'

interface SuggestionInput {
  nome: string
  mensagem: string
  historico?: string
  contexto?: string
}

export async function suggestResponse(
  input: SuggestionInput,
  plano: PlanSlug
): Promise<string | null> {
  // Verifica se plano tem sugestões
  if (!PLANS[plano].recursos.sugestoes) {
    return null
  }

  const prompt = `Você é um vendedor experiente brasileiro.
Escreva UMA resposta para este cliente via WhatsApp.

REGRAS OBRIGATÓRIAS:
- Máximo 3 frases curtas
- Tom de WhatsApp, natural
- NÃO use "Prezado", "Cordialmente", etc
- Inclua UMA pergunta para continuar conversa
- Se tiver objeção, trate com empatia
- Máximo 1 emoji (opcional)

CLIENTE: ${input.nome}
MENSAGEM: "${input.mensagem}"
${input.historico ? `HISTÓRICO: ${input.historico}` : ''}
${input.contexto ? `CONTEXTO: ${input.contexto}` : ''}

Escreva APENAS a mensagem, sem aspas nem explicações:`

  try {
    return await callClaude(prompt, {
      maxTokens: 200,
      temperature: 0.7,
    })
  } catch (error) {
    console.error('Erro ao gerar sugestão:', error)
    return null
  }
}