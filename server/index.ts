// server/index.ts

import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import authRoutes from './api/routes/auth'
import leadsRoutes from './api/routes/leads'
import webhooksRoutes from './api/routes/webhooks'

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors({
  origin: process.env.APP_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

// Rotas
app.use('/api/auth', authRoutes)
app.use('/api/leads', leadsRoutes)
app.use('/api/webhooks', webhooksRoutes)

// Health check
app.get('/health', (_, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

// 404
app.use((_, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
})

// Start
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`)
})