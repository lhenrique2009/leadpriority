// server/services/ai/client.ts

import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
})

const anthropic = new Anthropic({ 
  apiKey: process.env.ANTHROPIC_API_KEY 
})

export const MODELS = {
  nano: 'gpt-4.1-nano',
  mini: 'gpt-4.1-mini',
  full: 'gpt-4.1',
  sonnet: 'claude-3-5-sonnet-20241022',
} as const

type OpenAIModel = 'nano' | 'mini' | 'full'

// OpenAI - para tarefas objetivas e JSON
export async function callOpenAI(
  prompt: string,
  options: {
    model?: OpenAIModel
    maxTokens?: number
    temperature?: number
    json?: boolean
  } = {}
): Promise<string> {
  const {
    model = 'nano',
    maxTokens = 200,
    temperature = 0.1,
    json = false,
  } = options

  const response = await openai.chat.completions.create({
    model: MODELS[model],
    messages: [{ role: 'user', content: prompt }],
    max_tokens: maxTokens,
    temperature,
    ...(json && { response_format: { type: 'json_object' } }),
  })

  return response.choices[0]?.message?.content || ''
}

// OpenAI com retorno JSON tipado
export async function callOpenAIJSON<T>(
  prompt: string,
  options: Omit<Parameters<typeof callOpenAI>[1], 'json'> = {}
): Promise<T> {
  const content = await callOpenAI(prompt, { ...options, json: true })
  return JSON.parse(content) as T
}

// Claude - para texto natural
export async function callClaude(
  prompt: string,
  options: {
    maxTokens?: number
    temperature?: number
  } = {}
): Promise<string> {
  const { maxTokens = 300, temperature = 0.7 } = options

  const response = await anthropic.messages.create({
    model: MODELS.sonnet,
    max_tokens: maxTokens,
    messages: [{ role: 'user', content: prompt }],
  })

  const textBlock = response.content.find(block => block.type === 'text')
  return textBlock?.text || ''
}