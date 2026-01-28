import { useState, useMemo, useCallback, useEffect } from 'react'
import { texte } from '../../data/texte'
import { getGegensatzPaare, getByCode } from '../../data/qgruppen'
import useSpielstand from '../../hooks/useSpielstand'
import Header from '../common/Header'
import Card from '../common/Card'
import Button from '../common/Button'
import ProgressBar from '../common/ProgressBar'

interface GegensaetzeTrainerProps {
  onBack: () => void
}

interface GegensatzFrage {
  code: string
  bedeutung: string
  richtigerGegensatz: string
  richtigeBedeutung: string
  falscheOptionen: { code: string; bedeutung: string }[]
  alleOptionen: { code: string; bedeutung: string }[]
  thema: string
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

// Get theme for a pair
function getThema(code1: string, code2: string): string {
  const themen: Record<string, string> = {
    'QRM-QRN': 'Störungsarten',
    'QRO-QRP': 'Sendeleistung',
    'QRS-QRQ': 'Gebegeschwindigkeit',
  }
  const key = [code1, code2].sort().join('-')
  return themen[key] || 'Gegensätze'
}

export function GegensaetzeTrainer({ onBack }: GegensaetzeTrainerProps) {
  const { recordFrage, addPunkte, pruefeStreak } = useSpielstand()

  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0)
  const [richtig, setRichtig] = useState(0)
  const [gewaehlteAntwort, setGewaehlteAntwort] = useState<string | null>(null)
  const [zeigeErgebnis, setZeigeErgebnis] = useState(false)
  const [fertig, setFertig] = useState(false)

  // Update streak on mount
  useEffect(() => {
    pruefeStreak()
  }, [pruefeStreak])

  // Get opposite pairs and create questions
  const fragen = useMemo(() => {
    const paare = getGegensatzPaare()
    const questions: GegensatzFrage[] = []

    // Create questions from pairs (both directions)
    paare.forEach(({ code1, code2 }) => {
      const q1 = getByCode(code1)
      const q2 = getByCode(code2)
      if (!q1 || !q2) return

      const thema = getThema(code1, code2)

      // Get wrong options from other pairs
      const andereQGruppen = paare
        .filter(p => p.code1 !== code1 && p.code2 !== code1)
        .flatMap(p => [
          { code: p.code1, bedeutung: getByCode(p.code1)?.bedeutung || '' },
          { code: p.code2, bedeutung: getByCode(p.code2)?.bedeutung || '' },
        ])
        .filter(o => o.bedeutung)

      const falscheOptionen = shuffleArray(andereQGruppen).slice(0, 2)

      // Question 1: code1 -> code2
      questions.push({
        code: code1,
        bedeutung: q1.bedeutung,
        richtigerGegensatz: code2,
        richtigeBedeutung: q2.bedeutung,
        falscheOptionen,
        alleOptionen: shuffleArray([
          { code: code2, bedeutung: q2.bedeutung },
          ...falscheOptionen,
        ]),
        thema,
      })

      // Question 2: code2 -> code1
      questions.push({
        code: code2,
        bedeutung: q2.bedeutung,
        richtigerGegensatz: code1,
        richtigeBedeutung: q1.bedeutung,
        falscheOptionen,
        alleOptionen: shuffleArray([
          { code: code1, bedeutung: q1.bedeutung },
          ...falscheOptionen,
        ]),
        thema,
      })
    })

    return shuffleArray(questions)
  }, [])

  const aktuelleFrage = fragen[aktuelleFrageIndex]

  const handleAntwort = useCallback(
    (code: string) => {
      if (gewaehlteAntwort !== null) return

      const istRichtig = code === aktuelleFrage.richtigerGegensatz
      setGewaehlteAntwort(code)
      setZeigeErgebnis(true)
      recordFrage(istRichtig)

      if (istRichtig) {
        setRichtig(prev => prev + 1)
        addPunkte(12)
      }

      // Move to next question after delay
      setTimeout(() => {
        if (aktuelleFrageIndex < fragen.length - 1) {
          setAktuelleFrageIndex(prev => prev + 1)
          setGewaehlteAntwort(null)
          setZeigeErgebnis(false)
        } else {
          setFertig(true)
        }
      }, 1500)
    },
    [gewaehlteAntwort, aktuelleFrage, aktuelleFrageIndex, fragen.length, recordFrage, addPunkte]
  )

  // Result screen
  if (fertig) {
    const prozent = Math.round((richtig / fragen.length) * 100)

    return (
      <div className="min-h-screen flex flex-col safe-bottom">
        <Header title={texte.gegensaetze.titel} onBack={onBack} />

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="text-7xl mb-4 animate-bounce-in">🔄</div>

          <div className="text-5xl font-bold text-white mb-2">
            {richtig}/{fragen.length}
          </div>
          <div className="text-2xl text-slate-400 mb-8">{prozent}%</div>

          <Card variant="glass" className="w-full max-w-sm mb-8">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">{richtig}</div>
                <div className="text-sm text-slate-400">{texte.common.richtig}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {fragen.length - richtig}
                </div>
                <div className="text-sm text-slate-400">{texte.common.falsch}</div>
              </div>
            </div>
          </Card>

          <div className="w-full max-w-sm space-y-3">
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                setAktuelleFrageIndex(0)
                setRichtig(0)
                setGewaehlteAntwort(null)
                setZeigeErgebnis(false)
                setFertig(false)
              }}
            >
              {texte.nav.nochmal}
            </Button>
            <Button variant="secondary" fullWidth onClick={onBack}>
              {texte.nav.zurueck}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Question screen
  const getButtonClass = (code: string) => {
    const baseClass =
      'w-full p-4 rounded-xl text-left font-medium transition-all duration-200 border-2'

    if (!zeigeErgebnis) {
      return `${baseClass} bg-slate-800 border-slate-700 hover:border-primary-500 hover:bg-slate-700 text-white`
    }

    const istGewaehlt = code === gewaehlteAntwort
    const istRichtig = code === aktuelleFrage.richtigerGegensatz

    if (istRichtig) {
      return `${baseClass} bg-green-900/50 border-green-500 text-white`
    }

    if (istGewaehlt && !istRichtig) {
      return `${baseClass} bg-red-900/50 border-red-500 text-white animate-shake`
    }

    return `${baseClass} bg-slate-800/50 border-slate-700 text-slate-500`
  }

  return (
    <div className="min-h-screen flex flex-col safe-bottom">
      <Header
        title={texte.gegensaetze.titel}
        onBack={onBack}
        subtitle={`${aktuelleFrageIndex + 1} / ${fragen.length}`}
      />

      {/* Progress */}
      <div className="px-4 py-2">
        <ProgressBar value={aktuelleFrageIndex + 1} max={fragen.length} />
      </div>

      <div className="flex-1 px-4 py-4">
        {/* Theme badge */}
        <div className="text-center mb-2">
          <span className="text-xs px-3 py-1 bg-pink-900/50 text-pink-400 rounded-full">
            {aktuelleFrage.thema}
          </span>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <div className="text-slate-400 mb-2">
            {texte.gegensaetze.welchesIstGegenteil}
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            {aktuelleFrage.code}
          </div>
          <div className="text-slate-400">{aktuelleFrage.bedeutung}</div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {aktuelleFrage.alleOptionen.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAntwort(option.code)}
              disabled={zeigeErgebnis}
              className={getButtonClass(option.code)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-lg">{option.code}</div>
                  <div className="text-sm text-slate-400">{option.bedeutung}</div>
                </div>
                {zeigeErgebnis && option.code === aktuelleFrage.richtigerGegensatz && (
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {zeigeErgebnis && gewaehlteAntwort === aktuelleFrage.richtigerGegensatz && (
          <div className="mt-6 text-center text-green-400 font-semibold animate-slide-up">
            {texte.gegensaetze.super} 🎉
          </div>
        )}
      </div>
    </div>
  )
}

export default GegensaetzeTrainer
