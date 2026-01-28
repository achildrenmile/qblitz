import { useState, useMemo, useCallback, useEffect } from 'react'
import { QGruppe, Frage } from '../../types'
import { texte } from '../../data/texte'
import { getPruefungsrelevant } from '../../data/qgruppen'
import useSpielstand from '../../hooks/useSpielstand'
import Header from '../common/Header'
import Button from '../common/Button'
import Card from '../common/Card'
import ProgressBar from '../common/ProgressBar'

interface PruefungsModusProps {
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

// Generate exam question (no hints)
function erstellePruefungsFrage(qgruppe: QGruppe, alleQGruppen: QGruppe[]): Frage {
  const typ = Math.random() > 0.5 ? 'code_zu_bedeutung' : 'bedeutung_zu_code'

  let frageText: string
  let richtigeAntwort: string
  let falscheAntworten: string[]

  if (typ === 'code_zu_bedeutung') {
    frageText = `Was bedeutet ${qgruppe.code}?`
    richtigeAntwort = qgruppe.bedeutung
    const andere = alleQGruppen.filter(q => q.code !== qgruppe.code)
    falscheAntworten = shuffleArray(andere).slice(0, 3).map(q => q.bedeutung)
  } else {
    frageText = `Welcher Code bedeutet: "${qgruppe.bedeutung}"?`
    richtigeAntwort = qgruppe.code
    const andere = alleQGruppen.filter(q => q.code !== qgruppe.code)
    falscheAntworten = shuffleArray(andere).slice(0, 3).map(q => q.code)
  }

  return {
    qgruppe,
    typ: typ as 'code_zu_bedeutung' | 'bedeutung_zu_code',
    frageText,
    richtigeAntwort,
    falscheAntworten,
    alleAntworten: shuffleArray([richtigeAntwort, ...falscheAntworten]),
  }
}

const PRUEFUNGS_FRAGEN = 20

export function PruefungsModus({ onBack }: PruefungsModusProps) {
  const { recordFrage, recordPruefungBestanden, addPunkte, pruefeStreak } = useSpielstand()

  const [gestartet, setGestartet] = useState(false)
  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0)
  const [antworten, setAntworten] = useState<boolean[]>([])
  const [gewaehlteAntwort, setGewaehlteAntwort] = useState<string | null>(null)
  const [fertig, setFertig] = useState(false)

  // Update streak on mount
  useEffect(() => {
    pruefeStreak()
  }, [pruefeStreak])

  // Get exam-relevant Q-groups
  const pruefungsQGruppen = useMemo(() => getPruefungsrelevant(), [])

  // Generate exam questions
  const fragen = useMemo(() => {
    const shuffled = shuffleArray(pruefungsQGruppen).slice(0, PRUEFUNGS_FRAGEN)
    return shuffled.map(q => erstellePruefungsFrage(q, pruefungsQGruppen))
  }, [pruefungsQGruppen])

  const aktuelleFrage = fragen[aktuelleFrageIndex]

  const handleAntwort = useCallback(
    (antwort: string) => {
      if (gewaehlteAntwort !== null) return

      const richtig = antwort === aktuelleFrage.richtigeAntwort
      setGewaehlteAntwort(antwort)
      setAntworten(prev => [...prev, richtig])
      recordFrage(richtig)

      // Move to next question after delay (shorter for exam, no hints shown)
      setTimeout(() => {
        if (aktuelleFrageIndex < fragen.length - 1) {
          setAktuelleFrageIndex(prev => prev + 1)
          setGewaehlteAntwort(null)
        } else {
          setFertig(true)
          const alleAntworten = [...antworten, richtig]
          const richtigeAntworten = alleAntworten.filter(a => a).length
          const prozent = (richtigeAntworten / alleAntworten.length) * 100

          if (prozent >= 70) {
            recordPruefungBestanden()
            addPunkte(richtigeAntworten * 20 + 100) // Bonus for passing
          } else {
            addPunkte(richtigeAntworten * 10)
          }
        }
      }, 1000)
    },
    [
      gewaehlteAntwort,
      aktuelleFrage,
      aktuelleFrageIndex,
      fragen.length,
      recordFrage,
      recordPruefungBestanden,
      addPunkte,
      antworten,
    ]
  )

  const richtigeAntworten = antworten.filter(a => a).length
  const prozent = fertig ? Math.round((richtigeAntworten / fragen.length) * 100) : 0
  const bestanden = prozent >= 70

  // Start screen
  if (!gestartet) {
    return (
      <div className="min-h-screen flex flex-col safe-bottom">
        <Header title={texte.pruefung.titel} onBack={onBack} />

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="text-7xl mb-6">🎓</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            {texte.pruefung.titel}
          </h2>

          <Card variant="glass" className="w-full max-w-sm mb-8">
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-primary-400">•</span>
                {PRUEFUNGS_FRAGEN} Fragen
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-400">•</span>
                Nur prüfungsrelevante Q-Gruppen
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-400">•</span>
                Keine Hilfen oder Eselsbrücken
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-400">•</span>
                {texte.pruefung.mindestens}
              </li>
            </ul>
          </Card>

          <Button variant="primary" onClick={() => setGestartet(true)}>
            {texte.pruefung.starten}
          </Button>
        </div>
      </div>
    )
  }

  // Result screen
  if (fertig) {
    return (
      <div className="min-h-screen flex flex-col safe-bottom">
        <Header title={texte.pruefung.ergebnis} onBack={onBack} />

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="text-7xl mb-4 animate-bounce-in">
            {bestanden ? '🎓' : '📚'}
          </div>

          <h2
            className={`text-3xl font-bold mb-2 ${
              bestanden ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {bestanden ? texte.pruefung.bestanden : texte.pruefung.nichtBestanden}
          </h2>

          <div className="text-5xl font-bold text-white mb-2">
            {richtigeAntworten}/{fragen.length}
          </div>
          <div className={`text-2xl ${bestanden ? 'text-green-400' : 'text-red-400'}`}>
            {prozent}%
          </div>

          <Card variant="glass" className="w-full max-w-sm mt-8 mb-8">
            <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  bestanden ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${prozent}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-slate-400">
              <span>0%</span>
              <span className="text-yellow-500">70%</span>
              <span>100%</span>
            </div>
          </Card>

          <p className="text-slate-400 text-center mb-8">
            {bestanden
              ? 'Herzlichen Glückwunsch! Du hast die Prüfung bestanden!'
              : 'Nicht aufgeben! Übe weiter und versuche es erneut.'}
          </p>

          <div className="w-full max-w-sm space-y-3">
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                setGestartet(false)
                setAktuelleFrageIndex(0)
                setAntworten([])
                setGewaehlteAntwort(null)
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

  // Question screen (no hints shown)
  const getButtonClass = (antwort: string) => {
    const baseClass =
      'w-full p-4 rounded-xl text-left font-medium transition-all duration-200 border-2'

    if (gewaehlteAntwort === null) {
      return `${baseClass} bg-slate-800 border-slate-700 hover:border-primary-500 hover:bg-slate-700 text-white`
    }

    const istGewaehlt = antwort === gewaehlteAntwort
    const istRichtig = antwort === aktuelleFrage.richtigeAntwort

    if (istRichtig) {
      return `${baseClass} bg-green-900/50 border-green-500 text-white`
    }

    if (istGewaehlt && !istRichtig) {
      return `${baseClass} bg-red-900/50 border-red-500 text-white`
    }

    return `${baseClass} bg-slate-800/50 border-slate-700 text-slate-500`
  }

  return (
    <div className="min-h-screen flex flex-col safe-bottom">
      <Header
        title={texte.pruefung.titel}
        subtitle={`Frage ${aktuelleFrageIndex + 1} von ${fragen.length}`}
      />

      {/* Progress */}
      <div className="px-4 py-2">
        <ProgressBar
          value={aktuelleFrageIndex + 1}
          max={fragen.length}
          color="primary"
        />
      </div>

      <div className="flex-1 px-4 py-4">
        {/* Question */}
        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold text-white leading-relaxed">
            {aktuelleFrage.frageText}
          </h2>
        </div>

        {/* Options - no feedback shown beyond correct/incorrect */}
        <div className="space-y-3">
          {aktuelleFrage.alleAntworten.map((antwort, index) => (
            <button
              key={index}
              onClick={() => handleAntwort(antwort)}
              disabled={gewaehlteAntwort !== null}
              className={getButtonClass(antwort)}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{antwort}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PruefungsModus
