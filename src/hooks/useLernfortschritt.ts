import { useCallback, useMemo } from 'react'
import { LernStatus, SR_INTERVALLE } from '../types'
import { qgruppen } from '../data/qgruppen'
import useSpielstand from './useSpielstand'

export interface UseLernfortschrittReturn {
  // Data
  lernstatus: Record<string, LernStatus>
  faelligeKarten: string[]
  neueKarten: string[]
  heuteGeschafft: number

  // Actions
  antwortVerarbeiten: (code: string, richtig: boolean) => void
  getStatus: (code: string) => LernStatus
  getNextLevel: (level: number, richtig: boolean) => number
  getNextInterval: (level: number) => number
}

const HEUTE_KEY = 'qblitz_heute_geschafft'

export function useLernfortschritt(): UseLernfortschrittReturn {
  const { spielstand, updateLernstatus } = useSpielstand()

  // Get today's date as string
  const heute = useMemo(() => {
    return new Date().toISOString().split('T')[0]
  }, [])

  // Get today's completed count
  const heuteGeschafft = useMemo(() => {
    try {
      const data = localStorage.getItem(HEUTE_KEY)
      if (data) {
        const { datum, anzahl } = JSON.parse(data)
        if (datum === heute) {
          return anzahl
        }
      }
    } catch {
      // Ignore
    }
    return 0
  }, [heute])

  // Update heute geschafft counter
  const incrementHeuteGeschafft = useCallback(() => {
    try {
      const data = localStorage.getItem(HEUTE_KEY)
      let anzahl = 1
      if (data) {
        const parsed = JSON.parse(data)
        if (parsed.datum === heute) {
          anzahl = parsed.anzahl + 1
        }
      }
      localStorage.setItem(HEUTE_KEY, JSON.stringify({ datum: heute, anzahl }))
    } catch {
      // Ignore
    }
  }, [heute])

  // Get status for a specific Q-group
  const getStatus = useCallback(
    (code: string): LernStatus => {
      const existing = spielstand.lernstatus[code]
      if (existing) {
        return existing
      }
      // Return default status for new cards
      return {
        code,
        level: 0,
        naechsteWiederholung: 0,
        richtigInFolge: 0,
        falschGesamt: 0,
        richtigGesamt: 0,
        letzteAntwort: 0,
      }
    },
    [spielstand.lernstatus]
  )

  // Calculate next level based on answer
  const getNextLevel = useCallback(
    (currentLevel: number, richtig: boolean): number => {
      if (richtig) {
        return Math.min(currentLevel + 1, 5)
      } else {
        return Math.max(currentLevel - 2, 0)
      }
    },
    []
  )

  // Get interval in milliseconds for a level
  const getNextInterval = useCallback((level: number): number => {
    const days = SR_INTERVALLE[Math.min(level, SR_INTERVALLE.length - 1)]
    return days * 24 * 60 * 60 * 1000
  }, [])

  // Get due cards (cards that need review)
  const faelligeKarten = useMemo(() => {
    const now = Date.now()
    return Object.entries(spielstand.lernstatus)
      .filter(([, status]) => status.naechsteWiederholung <= now)
      .sort((a, b) => a[1].naechsteWiederholung - b[1].naechsteWiederholung)
      .map(([code]) => code)
  }, [spielstand.lernstatus])

  // Get new cards (cards not yet in lernstatus)
  const neueKarten = useMemo(() => {
    const bekannteCodes = new Set(Object.keys(spielstand.lernstatus))
    return qgruppen
      .filter(q => !bekannteCodes.has(q.code))
      .map(q => q.code)
  }, [spielstand.lernstatus])

  // Process an answer
  const antwortVerarbeiten = useCallback(
    (code: string, richtig: boolean) => {
      const currentStatus = getStatus(code)
      const newLevel = getNextLevel(currentStatus.level, richtig)
      const now = Date.now()

      const newStatus: LernStatus = {
        code,
        level: newLevel,
        naechsteWiederholung: richtig
          ? now + getNextInterval(newLevel)
          : now, // Wrong answers repeat immediately
        richtigInFolge: richtig ? currentStatus.richtigInFolge + 1 : 0,
        falschGesamt: currentStatus.falschGesamt + (richtig ? 0 : 1),
        richtigGesamt: currentStatus.richtigGesamt + (richtig ? 1 : 0),
        letzteAntwort: now,
      }

      updateLernstatus(code, newStatus)
      incrementHeuteGeschafft()
    },
    [getStatus, getNextLevel, getNextInterval, updateLernstatus, incrementHeuteGeschafft]
  )

  return {
    lernstatus: spielstand.lernstatus,
    faelligeKarten,
    neueKarten,
    heuteGeschafft,
    antwortVerarbeiten,
    getStatus,
    getNextLevel,
    getNextInterval,
  }
}

export default useLernfortschritt
