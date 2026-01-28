// Points calculation utilities

// Base points for different modes
export const BASIS_PUNKTE = {
  quiz: 10,
  blitz: 15,
  lernen: 5,
  pruefung: 20,
  gegensaetze: 12,
}

// Combo multipliers for Blitz mode
export const COMBO_MULTIPLIKATOR = [
  1.0,  // 0 combo
  1.0,  // 1 combo
  1.2,  // 2 combo
  1.5,  // 3 combo
  2.0,  // 4 combo
  2.5,  // 5+ combo
]

// Calculate points for a correct answer in Blitz mode
export const berechneBlitzPunkte = (combo: number, restZeit: number, maxZeit: number): number => {
  const basisPunkte = BASIS_PUNKTE.blitz

  // Combo multiplier (cap at 5)
  const comboIndex = Math.min(combo, COMBO_MULTIPLIKATOR.length - 1)
  const comboMultiplikator = COMBO_MULTIPLIKATOR[comboIndex]

  // Time bonus (up to 50% extra for quick answers)
  const zeitAnteil = restZeit / maxZeit
  const zeitBonus = 1 + (zeitAnteil * 0.5)

  return Math.round(basisPunkte * comboMultiplikator * zeitBonus)
}

// Calculate points for a correct quiz answer
export const berechneQuizPunkte = (
  schwierigkeit: 'leicht' | 'mittel' | 'schwer' = 'mittel'
): number => {
  const multiplikator = {
    leicht: 0.8,
    mittel: 1.0,
    schwer: 1.5,
  }
  return Math.round(BASIS_PUNKTE.quiz * multiplikator[schwierigkeit])
}

// Calculate points for a correct learning card
export const berechneLernPunkte = (level: number): number => {
  // Higher level cards give fewer points (they're easier now)
  const multiplikator = Math.max(0.5, 1 - level * 0.1)
  return Math.round(BASIS_PUNKTE.lernen * multiplikator)
}

// Calculate bonus points for perfect quiz round
export const berechnePerfekterRundeBonus = (anzahlFragen: number): number => {
  return anzahlFragen * 5
}

// Calculate exam score
export const berechnePruefungsErgebnis = (
  richtig: number,
  gesamt: number
): { punkte: number; bestanden: boolean; prozent: number } => {
  const prozent = Math.round((richtig / gesamt) * 100)
  const bestanden = prozent >= 70
  const punkte = richtig * BASIS_PUNKTE.pruefung + (bestanden ? 100 : 0)

  return { punkte, bestanden, prozent }
}

// Format points display with optional animation hint
export const formatPunkte = (punkte: number): string => {
  return punkte.toLocaleString('de-DE')
}

// Calculate streak bonus
export const berechneStreakBonus = (streak: number): number => {
  if (streak < 3) return 0
  if (streak < 7) return 10
  if (streak < 14) return 25
  if (streak < 30) return 50
  return 100
}
