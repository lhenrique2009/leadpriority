// src/lib/ai/client.ts
import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { AI_PROVIDERS, AI_ROUTING } from './config'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

type Feature = keyof typeof AI_ROUTING

export async function callAI(feature: Feature, prompt: string): Promise<string> {
  const routing = AI_ROUTING[feature]
  const [provider, model] = routing.split(':') as ['openai' | 'anthropic', string]

  if (provider === 'openai') {
    const modelName = AI_PROVIDERS.openai[model as keyof typeof AI_PROVIDERS.openai]
    
    const response = await openai.chat.completions.create({
      model: modelName,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    })
    
    return response.choices[0]?.message?.content || ''
  }

  if (provider === 'anthropic') {
    const modelName = AI_PROVIDERS.anthropic[model as keyof typeof AI_PROVIDERS.anthropic]
    
    const response = await anthropic.messages.create({
      model: modelName,
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    })
    
    const textBlock = response.content.find(block => block.type === 'text')
    return textBlock?.text || ''
  }

  throw new Error(`Provider desconhecido: ${provider}`)
}

// Para tarefas que precisam de JSON (sempre OpenAI)
export async function callAIJSON<T>(
  feature: Feature,
  prompt: string
): Promise<T> {
  const response = await openai.chat.completions.create({
    model: AI_PROVIDERS.openai.nano,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 300,
    response_format: { type: 'json_object' },
  })

  const content = response.choices[0]?.message?.content || '{}'
  return JSON.parse(content) as T
}