// src/hooks/useLeads.ts

import { useState, useEffect } from 'react'
import { api } from '../services/api'
import type { Lead, LeadStats, LeadAlerta } from '@shared/types'

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLeads = async () => {
    try {
      setIsLoading(true)
      const { leads } = await api.getLeads()
      setLeads(leads)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar leads')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  return { leads, isLoading, error, refetch: fetchLeads }
}

export function useLeadStats() {
  const [stats, setStats] = useState<LeadStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api.getLeadStats()
      .then(({ stats }) => setStats(stats))
      .finally(() => setIsLoading(false))
  }, [])

  return { stats, isLoading }
}

export function useAlertas() {
  const [alertas, setAlertas] = useState<LeadAlerta[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api.getAlertas()
      .then(({ alertas }) => setAlertas(alertas))
      .finally(() => setIsLoading(false))
  }, [])

  return { alertas, isLoading }
}