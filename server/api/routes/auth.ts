// server/api/routes/auth.ts

import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { addDays } from 'date-fns'
import { db } from '../../db/client'
import { usuarios, empresas } from '../../db/schema'
import { eq } from 'drizzle-orm'

const router = Router()

// Schemas
const cadastroSchema = z.object({
  nome: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  empresaNome: z.string().min(2, 'Nome da empresa muito curto'),
  plano: z.enum(['basico', 'pro', 'avancado']).optional().default('basico'),
})

const loginSchema = z.object({
  email: z.string().email(),
  senha: z.string(),
})

// POST /api/auth/cadastro
router.post('/cadastro', async (req, res) => {
  try {
    const dados = cadastroSchema.parse(req.body)

    // Verifica email existente
    const existente = await db.query.usuarios.findFirst({
      where: eq(usuarios.email, dados.email),
    })

    if (existente) {
      return res.status(400).json({ error: 'Email já cadastrado' })
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10)
    const empresaId = nanoid()
    const usuarioId = nanoid()

    // Cria empresa
    await db.insert(empresas).values({
      id: empresaId,
      nome: dados.empresaNome,
      plano: dados.plano,
      planoStatus: 'trial',
      trialAte: addDays(new Date(), 14),
    })

    // Cria usuário
    await db.insert(usuarios).values({
      id: usuarioId,
      empresaId,
      email: dados.email,
      senha: senhaHash,
      nome: dados.nome,
    })

    // Gera token
    const token = jwt.sign(
      { userId: usuarioId, empresaId, plano: dados.plano },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      token,
      user: {
        id: usuarioId,
        nome: dados.nome,
        email: dados.email,
        empresaId,
        empresaNome: dados.empresaNome,
        plano: dados.plano,
        planoStatus: 'trial',
        trialAte: addDays(new Date(), 14).toISOString(),
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.errors 
      })
    }
    console.error('Erro no cadastro:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const dados = loginSchema.parse(req.body)

    const usuario = await db.query.usuarios.findFirst({
      where: eq(usuarios.email, dados.email),
      with: { empresa: true },
    })

    if (!usuario) {
      return res.status(401).json({ error: 'Email ou senha incorretos' })
    }

    const senhaCorreta = await bcrypt.compare(dados.senha, usuario.senha)

    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Email ou senha incorretos' })
    }

    // Atualiza último login
    await db.update(usuarios)
      .set({ ultimoLoginEm: new Date() })
      .where(eq(usuarios.id, usuario.id))

    const token = jwt.sign(
      {
        userId: usuario.id,
        empresaId: usuario.empresaId,
        plano: usuario.empresa.plano,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        empresaId: usuario.empresa.id,
        empresaNome: usuario.empresa.nome,
        plano: usuario.empresa.plano,
        planoStatus: usuario.empresa.planoStatus,
        trialAte: usuario.empresa.trialAte?.toISOString(),
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Dados inválidos' })
    }
    console.error('Erro no login:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

export default router