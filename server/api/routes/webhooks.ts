// server/api/routes/webhooks.ts

import { Router } from 'express'
import { processWhatsAppMessage } from '../../services/whatsapp/processor'

const router = Router()

// POST /api/webhooks/zapi
router.post('/zapi', async (req, res) => {
  try {
    // Verificação de segurança (opcional)
    const secret = req.headers['x-webhook-secret']
    if (
      process.env.ZAPI_WEBHOOK_SECRET &&
      secret !== process.env.ZAPI_WEBHOOK_SECRET
    ) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const resultado = await processWhatsAppMessage(req.body)
    res.json(resultado)
  } catch (error) {
    console.error('Erro no webhook:', error)
    res.status(500).json({ error: 'Erro interno' })
  }
})

export default router