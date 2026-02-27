// src/lib/ai/services/response-suggester.ts
import { callAI } from '../client'

export async function suggestResponse(lead: {
  nome: string
  mensagem: string
  historico?: string
}): Promise<string> {
  
  const prompt = `Você é um vendedor experiente brasileiro.
Escreva uma resposta para este cliente.

REGRAS:
- Máximo 3 frases
- Tom natural, como se fosse WhatsApp
- Não seja formal demais
- Inclua uma pergunta para continuar a conversa
- Se detectar objeção, trate com empatia

CLIENTE: ${lead.nome}
MENSAGEM: "${lead.mensagem}"
${lead.historico ? `HISTÓRICO: ${lead.historico}` : ''}

Responda apenas com o texto da mensagem:`

  // Usa Claude para texto natural
  return callAI('sugestoes', prompt)
}