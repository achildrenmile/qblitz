import { LernStatus, SR_INTERVALLE } from '../types'

// Calculate next review date based on level
export const berechneNaechsteWiederholung = (level: number): number => {
  const tage = SR_INTERVALLE[Math.min(level, SR_INTERVALLE.length - 1)]
  return Date.now() + tage * 24 * 60 * 60 * 1000
}

// Calculate new level after answer
export const berechneNeuesLevel = (currentLevel: number, richtig: boolean): number => {
  if (richtig) {
    return Math.min(currentLevel + 1, 5)
  } else {
    return Math.max(currentLevel - 2, 0)
  }
}

// Process an answer and return updated status
export const verarbeiteAntwort = (
  currentStatus: LernStatus,
  richtig: boolean
): LernStatus => {
  const neuesLevel = berechneNeuesLevel(currentStatus.level, richtig)

  return {
    ...currentStatus,
    level: neuesLevel,
    naechsteWiederholung: richtig
      ? berechneNaechsteWiederholung(neuesLevel)
      : Date.now(), // Wrong answers repeat immediately
    richtigInFolge: richtig ? currentStatus.richtigInFolge + 1 : 0,
    falschGesamt: currentStatus.falschGesamt + (richtig ? 0 : 1),
    richtigGesamt: currentStatus.richtigGesamt + (richtig ? 1 : 0),
    letzteAntwort: Date.now(),
  }
}

// Check if a card is due for review
export const istFaellig = (status: LernStatus): boolean => {
  return status.naechsteWiederholung <= Date.now()
}

// Get time until next review in human-readable format
export const zeitBisWiederholung = (status: LernStatus): string => {
  const diff = status.naechsteWiederholung - Date.now()

  if (diff <= 0) {
    return 'Jetzt'
  }

  const minuten = Math.floor(diff / (1000 * 60))
  const stunden = Math.floor(diff / (1000 * 60 * 60))
  const tage = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (tage > 0) {
    return `${tage} ${tage === 1 ? 'Tag' : 'Tage'}`
  } else if (stunden > 0) {
    return `${stunden} ${stunden === 1 ? 'Stunde' : 'Stunden'}`
  } else {
    return `${minuten} ${minuten === 1 ? 'Minute' : 'Minuten'}`
  }
}

// Get level color for UI
export const getLevelFarbe = (level: number): string => {
  const farben = [
    'bg-slate-500', // 0 - Neu
    'bg-red-500',   // 1 - Anfänger
    'bg-orange-500', // 2 - Fortgeschritten
    'bg-yellow-500', // 3 - Geübt
    'bg-lime-500',  // 4 - Sicher
    'bg-green-500', // 5 - Gemeistert
  ]
  return farben[Math.min(level, farben.length - 1)]
}

// Get level name for UI
export const getLevelName = (level: number): string => {
  const namen = [
    'Neu',
    'Anfänger',
    'Fortgeschritten',
    'Geübt',
    'Sicher',
    'Gemeistert',
  ]
  return namen[Math.min(level, namen.length - 1)]
}
