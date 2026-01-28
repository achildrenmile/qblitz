import { useCallback, useMemo } from 'react'
import { Einstellungen, QKategorie, DEFAULT_EINSTELLUNGEN } from '../types'
import useLocalStorage from './useLocalStorage'

const STORAGE_KEY = 'qblitz_einstellungen'

export interface UseEinstellungenReturn {
  einstellungen: Einstellungen
  updateEinstellungen: (updates: Partial<Einstellungen>) => void
  setBlitzZeit: (zeit: number) => void
  setFragenProQuiz: (anzahl: number) => void
  toggleKategorie: (kategorie: QKategorie) => void
  setKategorien: (kategorien: QKategorie[]) => void
  setNurPruefungsrelevant: (wert: boolean) => void
  setDunklerModus: (wert: boolean) => void
  setAnimationen: (wert: boolean) => void
  setSound: (wert: boolean) => void
  setTagesZiel: (anzahl: number) => void
  resetEinstellungen: () => void
}

export function useEinstellungen(): UseEinstellungenReturn {
  const [einstellungen, setEinstellungen, resetStorage] = useLocalStorage<Einstellungen>(
    STORAGE_KEY,
    DEFAULT_EINSTELLUNGEN
  )

  const updateEinstellungen = useCallback(
    (updates: Partial<Einstellungen>) => {
      setEinstellungen(prev => ({ ...prev, ...updates }))
    },
    [setEinstellungen]
  )

  const setBlitzZeit = useCallback(
    (zeit: number) => {
      updateEinstellungen({ blitzZeit: zeit })
    },
    [updateEinstellungen]
  )

  const setFragenProQuiz = useCallback(
    (anzahl: number) => {
      updateEinstellungen({ fragenProQuiz: anzahl })
    },
    [updateEinstellungen]
  )

  const toggleKategorie = useCallback(
    (kategorie: QKategorie) => {
      setEinstellungen(prev => {
        const istAktiv = prev.kategorien.includes(kategorie)
        if (istAktiv) {
          // Don't allow removing the last category
          if (prev.kategorien.length === 1) {
            return prev
          }
          return {
            ...prev,
            kategorien: prev.kategorien.filter(k => k !== kategorie),
          }
        } else {
          return {
            ...prev,
            kategorien: [...prev.kategorien, kategorie],
          }
        }
      })
    },
    [setEinstellungen]
  )

  const setKategorien = useCallback(
    (kategorien: QKategorie[]) => {
      if (kategorien.length === 0) return
      updateEinstellungen({ kategorien })
    },
    [updateEinstellungen]
  )

  const setNurPruefungsrelevant = useCallback(
    (wert: boolean) => {
      updateEinstellungen({ nurPruefungsrelevant: wert })
    },
    [updateEinstellungen]
  )

  const setDunklerModus = useCallback(
    (wert: boolean) => {
      updateEinstellungen({ dunklerModus: wert })
    },
    [updateEinstellungen]
  )

  const setAnimationen = useCallback(
    (wert: boolean) => {
      updateEinstellungen({ animationen: wert })
    },
    [updateEinstellungen]
  )

  const setSound = useCallback(
    (wert: boolean) => {
      updateEinstellungen({ sound: wert })
    },
    [updateEinstellungen]
  )

  const setTagesZiel = useCallback(
    (anzahl: number) => {
      updateEinstellungen({ tagesZiel: anzahl })
    },
    [updateEinstellungen]
  )

  const resetEinstellungen = useCallback(() => {
    resetStorage()
  }, [resetStorage])

  const returnValue = useMemo(
    () => ({
      einstellungen,
      updateEinstellungen,
      setBlitzZeit,
      setFragenProQuiz,
      toggleKategorie,
      setKategorien,
      setNurPruefungsrelevant,
      setDunklerModus,
      setAnimationen,
      setSound,
      setTagesZiel,
      resetEinstellungen,
    }),
    [
      einstellungen,
      updateEinstellungen,
      setBlitzZeit,
      setFragenProQuiz,
      toggleKategorie,
      setKategorien,
      setNurPruefungsrelevant,
      setDunklerModus,
      setAnimationen,
      setSound,
      setTagesZiel,
      resetEinstellungen,
    ]
  )

  return returnValue
}

export default useEinstellungen
