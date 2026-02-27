// server/services/ai/scorer.ts

import { callOpenAIJSON } from './client'
import type { LeadPrioridade } from '@shared/types'

export interface ScoreResult {
  score: number
  prioridade: LeadPrioridade
  motivo: string
  urgencia: 'alta' | 'media' | 'baixa'
}

interface ScoreInput {
  nome: string
  mensagem: string
  origem: string
  tempoSemResposta?: number
  valorEstimado?: number
}

export async function scoreLead(input: ScoreInput): Promise<ScoreResult> {
  const prompt = `Você é um especialista em qualificação de leads B2B no Brasil.
Analise este lead e retorne APENAS um JSON válido.

LEAD:
- Nome: ${input.nome}
- Mensagem: "${input.mensagem}"
- Origem: ${input.origem}
- Sem resposta há: ${input.tempoSemResposta || 0} minutos
- Valor estimado: ${input.valorEstimado ? `R$ ${input.valorEstimado}` : 'não informado'}

RETORNE ESTE JSON:
{
  "score": <número de 0 a 100>,
  "prioridade": "<hot | warm | cold | new>",
  "motivo": "<frase curta explicando>",
  "urgencia": "<alta | media | baixa>"
}

REGRAS:
- 80-100 (hot): pediu preço, orçamento, quer comprar, tem urgência
- 60-79 (warm): interesse claro, perguntas específicas
- 40-59 (cold): interesse vago, curiosidade
- 0-39 (new): primeiro contato, não qualificado

URGÊNCIA:
- alta: score > 70 E sem resposta > 30min
- media: score 50-70 OU sem resposta > 1h
- baixa: outros casos`

  try {
    return await callOpenAIJSON<ScoreResult>(prompt, {
      model: 'nano',
      maxTokens: 150,
    })
  } catch (error) {
    console.error('Erro ao pontuar lead:', error)
    return {
      score: 50,
      prioridade: 'new',
      motivo: 'Análise automática indisponível',
      urgencia: 'baixa',
    }
  }
}