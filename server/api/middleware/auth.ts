// server/api/middleware/auth.ts

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import type { PlanSlug } from '@shared/types'

export interface JWTPayload {
  userId: string
  empresaId: string
  plano: PlanSlug
}

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  const token = authHeader.slice(7)

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JWTPayload
    
    req.user = payload
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido' })
  }
}