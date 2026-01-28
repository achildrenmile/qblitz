import { useCallback, useMemo } from 'react'
import { Spielstand, LernStatus, DEFAULT_SPIELSTAND } from '../types'
import { pruefeNeueErfolge, getErfolgById } from '../data/erfolge'
import useLocalStorage from './useLocalStorage'

const STORAGE_KEY = 'qblitz_spielstand'

export interface UseSpielstandReturn {
  spielstand: Spielstand
  updateSpielstand: (updates: Partial<Spielstand>) => void
  addPunkte: (punkte: number) => string[]
  updateLernstatus: (code: string, status: LernStatus) => void
  recordFrage: (richtig: boolean) => void
  recordBlitzErgebnis: (punkte: number) => void
  recordQuizAbgeschlossen: () => void
  recordPruefungBestanden: () => void
  pruefeStreak: () => void
  unlockErfolg: (erfolgId: string) => void
  resetSpielstand: () => void
}

export function useSpielstand(): UseSpielstandReturn {
  const [spielstand, setSpielstand, resetStorage] = useLocalStorage<Spielstand>(
    STORAGE_KEY,
    DEFAULT_SPIELSTAND
  )

  // Update spielstand with partial updates
  const updateSpielstand = useCallback(
    (updates: Partial<Spielstand>) => {
      setSpielstand(prev => ({ ...prev, ...updates }))
    },
    [setSpielstand]
  )

  // Add points and check for new achievements
  const addPunkte = useCallback(
    (punkte: number): string[] => {
      let neueErfolge: string[] = []

      setSpielstand(prev => {
        const updated = {
          ...prev,
          gesamtPunkte: prev.gesamtPunkte + punkte,
        }

        // Check for new achievements
        neueErfolge = pruefeNeueErfolge(updated)

        // Add achievement points
        let erfolgPunkte = 0
        neueErfolge.forEach(id => {
          const erfolg = getErfolgById(id)
          if (erfolg) {
            erfolgPunkte += erfolg.punkte
          }
        })

        return {
          ...updated,
          gesamtPunkte: updated.gesamtPunkte + erfolgPunkte,
          freigeschalteteErfolge: [...prev.freigeschalteteErfolge, ...neueErfolge],
        }
      })

      return neueErfolge
    },
    [setSpielstand]
  )

  // Update learn status for a specific Q-group
  const updateLernstatus = useCallback(
    (code: string, status: LernStatus) => {
      setSpielstand(prev => ({
        ...prev,
        lernstatus: {
          ...prev.lernstatus,
          [code]: status,
        },
      }))
    },
    [setSpielstand]
  )

  // Record a question result
  const recordFrage = useCallback(
    (richtig: boolean) => {
      setSpielstand(prev => {
        const updated = {
          ...prev,
          fragenGesamt: prev.fragenGesamt + 1,
          fragenRichtig: prev.fragenRichtig + (richtig ? 1 : 0),
        }

        // Check for new achievements
        const neueErfolge = pruefeNeueErfolge(updated)
        let erfolgPunkte = 0
        neueErfolge.forEach(id => {
          const erfolg = getErfolgById(id)
          if (erfolg) {
            erfolgPunkte += erfolg.punkte
          }
        })

        return {
          ...updated,
          gesamtPunkte: updated.gesamtPunkte + erfolgPunkte,
          freigeschalteteErfolge: [...prev.freigeschalteteErfolge, ...neueErfolge],
        }
      })
    },
    [setSpielstand]
  )

  // Record blitz mode result
  const recordBlitzErgebnis = useCallback(
    (punkte: number) => {
      setSpielstand(prev => ({
        ...prev,
        blitzHoechstpunkte: Math.max(prev.blitzHoechstpunkte, punkte),
      }))
    },
    [setSpielstand]
  )

  // Record quiz completion
  const recordQuizAbgeschlossen = useCallback(() => {
    setSpielstand(prev => {
      const updated = {
        ...prev,
        quizAbgeschlossen: prev.quizAbgeschlossen + 1,
      }

      const neueErfolge = pruefeNeueErfolge(updated)
      let erfolgPunkte = 0
      neueErfolge.forEach(id => {
        const erfolg = getErfolgById(id)
        if (erfolg) {
          erfolgPunkte += erfolg.punkte
        }
      })

      return {
        ...updated,
        gesamtPunkte: updated.gesamtPunkte + erfolgPunkte,
        freigeschalteteErfolge: [...prev.freigeschalteteErfolge, ...neueErfolge],
      }
    })
  }, [setSpielstand])

  // Record exam passed
  const recordPruefungBestanden = useCallback(() => {
    setSpielstand(prev => {
      const updated = {
        ...prev,
        pruefungenBestanden: prev.pruefungenBestanden + 1,
      }

      const neueErfolge = pruefeNeueErfolge(updated)
      let erfolgPunkte = 0
      neueErfolge.forEach(id => {
        const erfolg = getErfolgById(id)
        if (erfolg) {
          erfolgPunkte += erfolg.punkte
        }
      })

      return {
        ...updated,
        gesamtPunkte: updated.gesamtPunkte + erfolgPunkte,
        freigeschalteteErfolge: [...prev.freigeschalteteErfolge, ...neueErfolge],
      }
    })
  }, [setSpielstand])

  // Check and update daily streak
  const pruefeStreak = useCallback(() => {
    const heute = new Date().toISOString().split('T')[0]

    setSpielstand(prev => {
      if (prev.letzterTag === heute) {
        // Already practiced today
        return prev
      }

      const gestern = new Date()
      gestern.setDate(gestern.getDate() - 1)
      const gesternStr = gestern.toISOString().split('T')[0]

      let neuerStreak: number
      if (prev.letzterTag === gesternStr) {
        // Continued streak
        neuerStreak = prev.tagesStreak + 1
      } else {
        // Streak broken or first day
        neuerStreak = 1
      }

      const updated = {
        ...prev,
        letzterTag: heute,
        tagesStreak: neuerStreak,
        laengsterStreak: Math.max(prev.laengsterStreak, neuerStreak),
      }

      // Check for streak achievements
      const neueErfolge = pruefeNeueErfolge(updated)
      let erfolgPunkte = 0
      neueErfolge.forEach(id => {
        const erfolg = getErfolgById(id)
        if (erfolg) {
          erfolgPunkte += erfolg.punkte
        }
      })

      return {
        ...updated,
        gesamtPunkte: updated.gesamtPunkte + erfolgPunkte,
        freigeschalteteErfolge: [...prev.freigeschalteteErfolge, ...neueErfolge],
      }
    })
  }, [setSpielstand])

  // Manually unlock an achievement
  const unlockErfolg = useCallback(
    (erfolgId: string) => {
      setSpielstand(prev => {
        if (prev.freigeschalteteErfolge.includes(erfolgId)) {
          return prev
        }

        const erfolg = getErfolgById(erfolgId)
        const erfolgPunkte = erfolg?.punkte || 0

        return {
          ...prev,
          gesamtPunkte: prev.gesamtPunkte + erfolgPunkte,
          freigeschalteteErfolge: [...prev.freigeschalteteErfolge, erfolgId],
        }
      })
    },
    [setSpielstand]
  )

  // Reset all progress
  const resetSpielstand = useCallback(() => {
    resetStorage()
  }, [resetStorage])

  // Memoize the return object
  const returnValue = useMemo(
    () => ({
      spielstand,
      updateSpielstand,
      addPunkte,
      updateLernstatus,
      recordFrage,
      recordBlitzErgebnis,
      recordQuizAbgeschlossen,
      recordPruefungBestanden,
      pruefeStreak,
      unlockErfolg,
      resetSpielstand,
    }),
    [
      spielstand,
      updateSpielstand,
      addPunkte,
      updateLernstatus,
      recordFrage,
      recordBlitzErgebnis,
      recordQuizAbgeschlossen,
      recordPruefungBestanden,
      pruefeStreak,
      unlockErfolg,
      resetSpielstand,
    ]
  )

  return returnValue
}

export default useSpielstand
