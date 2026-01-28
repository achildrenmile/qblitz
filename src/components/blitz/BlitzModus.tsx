import { useState, useCallback, useMemo, useEffect } from 'react'
import { QGruppe } from '../../types'
import { texte } from '../../data/texte'
import { qgruppen } from '../../data/qgruppen'
import { berechneBlitzPunkte } from '../../utils/punkte'
import useEinstellungen from '../../hooks/useEinstellungen'
import useSpielstand from '../../hooks/useSpielstand'
import useTimer from '../../hooks/useTimer'
import Header from '../common/Header'
import Timer from '../common/Timer'
import BlitzFrage from './BlitzFrage'
import BlitzErgebnis from './BlitzErgebnis'

interface BlitzModusProps {
  onBack: () => void
}

// Shuffle array helper
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

type GameState = 'bereit' | 'laeuft' | 'fertig'

export function BlitzModus({ onBack }: BlitzModusProps) {
  const { einstellungen } = useEinstellungen()
  const { spielstand, recordFrage, recordBlitzErgebnis, addPunkte, pruefeStreak } =
    useSpielstand()

  const [gameState, setGameState] = useState<GameState>('bereit')
  const [punkte, setPunkte] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [richtig, setRichtig] = useState(0)
  const [gesamt, setGesamt] = useState(0)
  const [aktuelleQGruppe, setAktuelleQGruppe] = useState<QGruppe | null>(null)
  const [optionen, setOptionen] = useState<string[]>([])
  const [feedback, setFeedback] = useState<'richtig' | 'falsch' | null>(null)

  // Update streak on mount
  useEffect(() => {
    pruefeStreak()
  }, [pruefeStreak])

  // Timer
  const handleZeitAbgelaufen = useCallback(() => {
    setGameState('fertig')
    recordBlitzErgebnis(punkte)
  }, [punkte, recordBlitzErgebnis])

  const { zeit, starten, zuruecksetzen } = useTimer(
    einstellungen.blitzZeit,
    handleZeitAbgelaufen,
    true
  )

  // Filter Q-groups based on settings
  const gefilterteQGruppen = useMemo(() => {
    let filtered = qgruppen.filter(q =>
      einstellungen.kategorien.includes(q.kategorie)
    )
    if (einstellungen.nurPruefungsrelevant) {
      filtered = filtered.filter(q => q.pruefungsrelevant)
    }
    return filtered
  }, [einstellungen.kategorien, einstellungen.nurPruefungsrelevant])

  // Generate next question
  const naechsteFrage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * gefilterteQGruppen.length)
    const qgruppe = gefilterteQGruppen[randomIndex]

    // Generate wrong options
    const andere = gefilterteQGruppen.filter(q => q.code !== qgruppe.code)
    const falsche = shuffleArray(andere).slice(0, 3).map(q => q.bedeutung)
    const alleOptionen = shuffleArray([qgruppe.bedeutung, ...falsche])

    setAktuelleQGruppe(qgruppe)
    setOptionen(alleOptionen)
    setFeedback(null)
  }, [gefilterteQGruppen])

  // Start game
  const startGame = useCallback(() => {
    setPunkte(0)
    setCombo(0)
    setMaxCombo(0)
    setRichtig(0)
    setGesamt(0)
    zuruecksetzen(einstellungen.blitzZeit)
    setGameState('laeuft')
    starten()
    naechsteFrage()
  }, [zuruecksetzen, einstellungen.blitzZeit, starten, naechsteFrage])

  // Handle answer
  const handleAntwort = useCallback(
    (antwort: string) => {
      if (feedback !== null || !aktuelleQGruppe) return

      const istRichtig = antwort === aktuelleQGruppe.bedeutung
      setFeedback(istRichtig ? 'richtig' : 'falsch')
      setGesamt(prev => prev + 1)
      recordFrage(istRichtig)

      if (istRichtig) {
        const neuePunkte = berechneBlitzPunkte(combo, zeit, einstellungen.blitzZeit)
        setPunkte(prev => prev + neuePunkte)
        setCombo(prev => {
          const newCombo = prev + 1
          setMaxCombo(max => Math.max(max, newCombo))
          return newCombo
        })
        setRichtig(prev => prev + 1)
      } else {
        setCombo(0)
      }

      // Next question after brief delay
      setTimeout(() => {
        naechsteFrage()
      }, 300)
    },
    [feedback, aktuelleQGruppe, combo, zeit, einstellungen.blitzZeit, recordFrage, naechsteFrage]
  )

  // Finish game
  useEffect(() => {
    if (gameState === 'fertig') {
      recordBlitzErgebnis(punkte)
      addPunkte(punkte)
    }
  }, [gameState, punkte, recordBlitzErgebnis, addPunkte])

  const istNeuerRekord = punkte > spielstand.blitzHoechstpunkte

  if (gameState === 'bereit') {
    return (
      <div className="min-h-screen flex flex-col safe-bottom">
        <Header title={texte.blitz.titel} onBack={onBack} />

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="text-8xl mb-6">⚡</div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {texte.blitz.bereit}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 text-center">
            {einstellungen.blitzZeit} {texte.einstellungen.sekunden}
            <br />
            Beantworte so viele Fragen wie möglich!
          </p>

          {spielstand.blitzHoechstpunkte > 0 && (
            <div className="mb-8 text-center">
              <div className="text-sm text-slate-500">{texte.blitz.highscore}</div>
              <div className="text-2xl font-bold text-funk-gold">
                {spielstand.blitzHoechstpunkte}
              </div>
            </div>
          )}

          <button
            onClick={startGame}
            className="w-48 h-48 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600
                       flex items-center justify-center text-2xl font-bold text-white
                       shadow-lg shadow-orange-900/50 transform transition-transform
                       active:scale-95 hover:scale-105"
          >
            {texte.blitz.start}
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'fertig') {
    return (
      <BlitzErgebnis
        punkte={punkte}
        richtig={richtig}
        gesamt={gesamt}
        maxCombo={maxCombo}
        istNeuerRekord={istNeuerRekord}
        highscore={Math.max(spielstand.blitzHoechstpunkte, punkte)}
        onBack={onBack}
        onNochmal={startGame}
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col safe-bottom">
      {/* Timer bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{punkte}</div>
          <Timer zeit={zeit} maxZeit={einstellungen.blitzZeit} size="md" />
          {combo > 1 && (
            <div className="flex items-center gap-1 text-funk-gold font-bold animate-pulse">
              🔥 x{combo}
            </div>
          )}
        </div>
        <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-1000 ease-linear"
            style={{ width: `${(zeit / einstellungen.blitzZeit) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 px-4 py-4">
        {aktuelleQGruppe && (
          <BlitzFrage
            qgruppe={aktuelleQGruppe}
            optionen={optionen}
            feedback={feedback}
            onAntwort={handleAntwort}
          />
        )}
      </div>
    </div>
  )
}

export default BlitzModus
