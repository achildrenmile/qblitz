import { useState, useMemo, useEffect } from 'react'
import { texte } from '../../data/texte'
import { getByCode } from '../../data/qgruppen'
import useLernfortschritt from '../../hooks/useLernfortschritt'
import useSpielstand from '../../hooks/useSpielstand'
import useEinstellungen from '../../hooks/useEinstellungen'
import Header from '../common/Header'
import Card from '../common/Card'
import Button from '../common/Button'
import ProgressBar from '../common/ProgressBar'
import Karteikarte from './Karteikarte'

interface LernModusProps {
  onBack: () => void
}

export function LernModus({ onBack }: LernModusProps) {
  const { faelligeKarten, neueKarten, heuteGeschafft, antwortVerarbeiten, getStatus } =
    useLernfortschritt()
  const { pruefeStreak, addPunkte } = useSpielstand()
  const { einstellungen } = useEinstellungen()

  const [aktuelleKarteIndex, setAktuelleKarteIndex] = useState(0)
  const [zeigeFeedback, setZeigeFeedback] = useState<'richtig' | 'falsch' | null>(null)

  // Update streak on mount
  useEffect(() => {
    pruefeStreak()
  }, [pruefeStreak])

  // Get cards to learn (due cards first, then new cards)
  const kartenZuLernen = useMemo(() => {
    const maxNeue = Math.max(0, einstellungen.tagesZiel - heuteGeschafft)
    const neueZuNehmen = neueKarten.slice(0, Math.min(5, maxNeue))
    return [...faelligeKarten, ...neueZuNehmen]
  }, [faelligeKarten, neueKarten, einstellungen.tagesZiel, heuteGeschafft])

  const aktuellerCode = kartenZuLernen[aktuelleKarteIndex]
  const aktuelleQGruppe = aktuellerCode ? getByCode(aktuellerCode) : null
  const aktuellerStatus = aktuellerCode ? getStatus(aktuellerCode) : null

  const handleAntwort = (richtig: boolean) => {
    if (!aktuellerCode) return

    setZeigeFeedback(richtig ? 'richtig' : 'falsch')
    antwortVerarbeiten(aktuellerCode, richtig)

    if (richtig) {
      addPunkte(5)
    }

    // Move to next card after brief feedback
    setTimeout(() => {
      setZeigeFeedback(null)
      if (aktuelleKarteIndex < kartenZuLernen.length - 1) {
        setAktuelleKarteIndex(prev => prev + 1)
      } else {
        // Re-check for any remaining cards
        setAktuelleKarteIndex(0)
      }
    }, 500)
  }

  // Done for today
  const fertig = kartenZuLernen.length === 0

  return (
    <div className="min-h-screen flex flex-col safe-bottom">
      <Header
        title={texte.lernen.titel}
        onBack={onBack}
        subtitle={
          fertig
            ? undefined
            : `${aktuelleKarteIndex + 1} / ${kartenZuLernen.length}`
        }
      />

      {/* Progress */}
      <div className="px-4 py-2">
        <ProgressBar
          value={heuteGeschafft}
          max={einstellungen.tagesZiel}
          label={`${texte.lernen.heute}: ${heuteGeschafft}/${einstellungen.tagesZiel}`}
          color={heuteGeschafft >= einstellungen.tagesZiel ? 'success' : 'primary'}
        />
      </div>

      <div className="flex-1 flex flex-col px-4 py-4">
        {fertig ? (
          // All done for today
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {texte.lernen.fertig}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              {faelligeKarten.length === 0 && neueKarten.length === 0
                ? 'Alle Q-Gruppen gelernt!'
                : `Komm später wieder für mehr Übung.`}
            </p>

            {/* Stats */}
            <Card variant="glass" className="w-full max-w-sm">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {faelligeKarten.length}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{texte.lernen.faellig}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {neueKarten.length}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{texte.lernen.neueKarten}</div>
                </div>
              </div>
            </Card>

            <Button variant="primary" onClick={onBack} className="mt-8">
              {texte.nav.zurueck}
            </Button>
          </div>
        ) : aktuelleQGruppe ? (
          // Show card
          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <Karteikarte
                qgruppe={aktuelleQGruppe}
                status={aktuellerStatus!}
                feedback={zeigeFeedback}
              />
            </div>

            {/* Answer buttons */}
            <div className="flex gap-3 mt-4">
              <Button
                variant="danger"
                fullWidth
                onClick={() => handleAntwort(false)}
                disabled={zeigeFeedback !== null}
              >
                {texte.lernen.wussteIchNicht}
              </Button>
              <Button
                variant="success"
                fullWidth
                onClick={() => handleAntwort(true)}
                disabled={zeigeFeedback !== null}
              >
                {texte.lernen.wussteIch}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default LernModus
