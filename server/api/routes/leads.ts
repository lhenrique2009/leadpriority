// server/api/routes/leads.ts

import { Router } from 'express'
import { db } from '../../db/client'
import { leads, alertas } from '../../db/schema'
import { eq, desc, and } from 'drizzle-orm'
import { authMiddleware } from '../middleware/auth'
import { suggestResponse } from '../../services/ai/suggester'
import { PLANS } from '@shared/types'

const router = Router()

router.use(authMiddleware)

// GET /api/leads
router.get('/', async (req, res) => {
  try {
    const { empresaId } = req.user!
    const limite = Number(req.query.limite) || 50

    const resultado = await db.query.leads.findMany({
      where: eq(leads.empresaId, empresaId),
      orderBy: [desc(leads.score), desc(leads.atualizadoEm)],
      limit: limite,
    })

    res.json({ leads: resultado })
  } catch (error) {
    console.error('Erro ao buscar leads:', error)
    res.status(500).json({ error: 'Erro interno' })
  }
})

// GET /api/leads/stats
router.get('/stats', async (req, res) => {
  try {
    const { empresaId } = req.user!

    const todosLeads = await db.query.leads.findMany({
      where: eq(leads.empresaId, empresaId),
    })

    const stats = {
      total: todosLeads.length,
      novos: todosLeads.filter(l => l.status === 'novo').length,
      emContato: todosLeads.filter(l => l.status === 'em_contato').length,
      negociando: todosLeads.filter(l => l.status === 'negociando').length,
      fechados: todosLeads.filter(l => l.status === 'fechado').length,
      perdidos: todosLeads.filter(l => l.status === 'perdido').length,
      valorPipeline: todosLeads
        .filter(l => l.status !== 'perdido' && l.status !== 'fechado')
        .reduce((sum, l) => sum + (l.valorEstimado || 0), 0),
    }

    res.json({ stats })
  } catch (error) {
    console.error('Erro ao buscar stats:', error)
    res.status(500).json({ error: 'Erro interno' })
  }
})

// GET /api/leads/alertas
router.get('/alertas', async (req, res) => {
  try {
    const { empresaId, plano } = req.user!

    // Alertas só para Pro+
    if (!PLANS[plano].recursos.alertas) {
      return res.json({ alertas: [] })
    }

    const resultado = await db.query.alertas.findMany({
      where: and(
        eq(alertas.empresaId, empresaId),
        eq(alertas.lido, false)
      ),
      orderBy: desc(alertas.criadoEm),
      limit: 20,
      with: { lead: true },
    })

    res.json({ alertas: resultado })
  } catch (error) {
    console.error('Erro ao buscar alertas:', error)
    res.status(500).json({ error: 'Erro interno' })
  }
})

// GET /api/leads/:id
router.get('/:id', async (req, res) => {
  try {
    const { empresaId } = req.user!
    const { id } = req.params

    const lead = await db.query.leads.findFirst({
      where: and(
        eq(leads.id, id),
        eq(leads.empresaId, empresaId)
      ),
      with: {
        mensagens: {
          orderBy: desc(leads.criadoEm),
          limit: 50,
        },
      },
    })

    if (!lead) {
      return res.status(404).json({ error: 'Lead não encontrado' })
    }

    res.json({ lead })
  } catch (error) {
    console.error('Erro ao buscar lead:', error)
    res.status(500).json({ error: 'Erro interno' })
  }
})

// POST /api/leads/:id/sugestao
router.post('/:id/sugestao', async (req, res) => {
  try {
    const { empresaId, plano } = req.user!
    const { id } = req.params

    const lead = await db.query.leads.findFirst({
      where: and(
        eq(leads.id, id),
        eq(leads.empresaId, empresaId)
      ),
    })

    if (!lead) {
      return res.status(404).json({ error: 'Lead não encontrado' })
    }

    const sugestao = await suggestResponse(
      {
        nome: lead.nome,
        mensagem: lead.ultimaMensagem || '',
      },
      plano
    )

    if (!sugestao) {
      return res.status(403).json({
        error: 'Sugestões não disponíveis no seu plano',
      })
    }

    // Salva sugestão
    await db.update(leads)
      .set({ sugestaoResposta: sugestao })
      .where(eq(leads.id, id))

    res.json({ sugestao })
  } catch (error) {
    console.error('Erro ao gerar sugestão:', error)
    res.status(500).json({ error: 'Erro interno' })
  }
})

export default router