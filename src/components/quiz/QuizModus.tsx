import { useState, useMemo, useCallback, useEffect } from 'react'
import { QGruppe, Frage, FrageTyp } from '../../types'
import { texte } from '../../data/texte'
import { qgruppen, getRandomQGruppen } from '../../data/qgruppen'
import useEinstellungen from '../../hooks/useEinstellungen'
import useSpielstand from '../../hooks/useSpielstand'
import Header from '../common/Header'
import ProgressBar from '../common/ProgressBar'
import QuizFrage from './QuizFrage'
import QuizErgebnis from './QuizErgebnis'

interface QuizModusProps {
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

// Generate a quiz question
function erstelleFrage(qgruppe: QGruppe, alleQGruppen: QGruppe[]): Frage {
  const typen: FrageTyp[] = ['code_zu_bedeutung', 'bedeutung_zu_code']
  const typ = typen[Math.floor(Math.random() * typen.length)]

  let frageText: string
  let richtigeAntwort: string
  let falscheAntworten: string[]

  if (typ === 'code_zu_bedeutung') {
    frageText = `Was bedeutet ${qgruppe.code}?`
    richtigeAntwort = qgruppe.bedeutung

    // Get 3 wrong answers from other Q-groups
    const andere = alleQGruppen.filter(q => q.code !== qgruppe.code)
    falscheAntworten = shuffleArray(andere)
      .slice(0, 3)
      .map(q => q.bedeutung)
  } else {
    frageText = `Welcher Code steht für: ${qgruppe.bedeutung}?`
    richtigeAntwort = qgruppe.code

    // Get 3 wrong answers from other Q-groups
    const andere = alleQGruppen.filter(q => q.code !== qgruppe.code)
    falscheAntworten = shuffleArray(andere)
      .slice(0, 3)
      .map(q => q.code)
  }

  const alleAntworten = shuffleArray([richtigeAntwort, ...falscheAntworten])

  return {
    qgruppe,
    typ,
    frageText,
    richtigeAntwort,
    falscheAntworten,
    alleAntworten,
  }
}

export function QuizModus({ onBack }: QuizModusProps) {
  const { einstellungen } = useEinstellungen()
  const { recordFrage, recordQuizAbgeschlossen, addPunkte, pruefeStreak, unlockErfolg } =
    useSpielstand()

  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0)
  const [antworten, setAntworten] = useState<boolean[]>([])
  const [fertig, setFertig] = useState(false)
  const [gewaehlteAntwort, setGewaehlteAntwort] = useState<string | null>(null)
  const [zeigeErgebnis, setZeigeErgebnis] = useState(false)

  // Update streak on mount
  useEffect(() => {
    pruefeStreak()
  }, [pruefeStreak])

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

  // Generate quiz questions
  const fragen = useMemo(() => {
    const ausgewaehlte = getRandomQGruppen(
      einstellungen.fragenProQuiz,
      q =>
        einstellungen.kategorien.includes(q.kategorie) &&
        (!einstellungen.nurPruefungsrelevant || q.pruefungsrelevant)
    )
    return ausgewaehlte.map(q => erstelleFrage(q, gefilterteQGruppen))
  }, [einstellungen.fragenProQuiz, einstellungen.kategorien, einstellungen.nurPruefungsrelevant, gefilterteQGruppen])

  const aktuelleFrage = fragen[aktuelleFrageIndex]

  const handleAntwort = useCallback(
    (antwort: string) => {
      if (gewaehlteAntwort !== null) return // Already answered

      const richtig = antwort === aktuelleFrage.richtigeAntwort
      setGewaehlteAntwort(antwort)
      setAntworten(prev => [...prev, richtig])
      recordFrage(richtig)

      if (richtig) {
        addPunkte(10)
      }

      // Move to next question after delay
      setTimeout(() => {
        if (aktuelleFrageIndex < fragen.length - 1) {
          setAktuelleFrageIndex(prev => prev + 1)
          setGewaehlteAntwort(null)
          setZeigeErgebnis(false)
        } else {
          // Quiz complete
          setFertig(true)
          recordQuizAbgeschlossen()

          // Check for perfect round
          const alleRichtig = [...antworten, richtig].every(a => a)
          if (alleRichtig) {
            unlockErfolg('perfekte_runde')
            addPunkte(fragen.length * 5) // Bonus points
          }
        }
      }, 1500)

      setZeigeErgebnis(true)
    },
    [
      gewaehlteAntwort,
      aktuelleFrage,
      aktuelleFrageIndex,
      fragen.length,
      recordFrage,
      recordQuizAbgeschlossen,
      addPunkte,
      antworten,
      unlockErfolg,
    ]
  )

  const richtigeAntworten = antworten.filter(a => a).length

  if (fertig) {
    return (
      <QuizErgebnis
        richtig={richtigeAntworten}
        gesamt={fragen.length}
        onBack={onBack}
        onNochmal={() => {
          setAktuelleFrageIndex(0)
          setAntworten([])
          setFertig(false)
          setGewaehlteAntwort(null)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col safe-bottom">
      <Header
        title={texte.quiz.titel}
        onBack={onBack}
        subtitle={`${texte.quiz.frage} ${aktuelleFrageIndex + 1} ${texte.quiz.von} ${fragen.length}`}
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
        <QuizFrage
          frage={aktuelleFrage}
          gewaehlteAntwort={gewaehlteAntwort}
          zeigeErgebnis={zeigeErgebnis}
          onAntwort={handleAntwort}
        />
      </div>
    </div>
  )
}

export default QuizModus
