import { useState } from 'react'
import { texte } from '../data/texte'
import { QKategorie } from '../types'
import useEinstellungen from '../hooks/useEinstellungen'
import useSpielstand from '../hooks/useSpielstand'
import Header from './common/Header'
import Card from './common/Card'
import Button from './common/Button'
import Modal from './common/Modal'

interface EinstellungenProps {
  onBack: () => void
}

const alleKategorien: { key: QKategorie; label: string }[] = [
  { key: 'standort', label: texte.kategorien.standort },
  { key: 'frequenz', label: texte.kategorien.frequenz },
  { key: 'signal', label: texte.kategorien.signal },
  { key: 'stoerung', label: texte.kategorien.stoerung },
  { key: 'technisch', label: texte.kategorien.technisch },
  { key: 'nachricht', label: texte.kategorien.nachricht },
  { key: 'zeit', label: texte.kategorien.zeit },
  { key: 'verschiedenes', label: texte.kategorien.verschiedenes },
]

export function Einstellungen({ onBack }: EinstellungenProps) {
  const {
    einstellungen,
    setBlitzZeit,
    setFragenProQuiz,
    toggleKategorie,
    setNurPruefungsrelevant,
    setAnimationen,
    setSound,
    setTagesZiel,
  } = useEinstellungen()

  const { resetSpielstand } = useSpielstand()
  const [showResetModal, setShowResetModal] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  const handleReset = () => {
    resetSpielstand()
    setShowResetModal(false)
    setResetSuccess(true)
    setTimeout(() => setResetSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen pb-8 safe-bottom">
      <Header title={texte.einstellungen.titel} onBack={onBack} />

      <div className="px-4 py-4 space-y-4">
        {/* Blitz time */}
        <Card>
          <h3 className="font-semibold text-white mb-3">
            {texte.einstellungen.blitzZeit}
          </h3>
          <div className="flex gap-2">
            {[30, 60, 90, 120].map(zeit => (
              <button
                key={zeit}
                onClick={() => setBlitzZeit(zeit)}
                className={`
                  flex-1 py-2 rounded-lg font-medium transition-colors
                  ${
                    einstellungen.blitzZeit === zeit
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }
                `}
              >
                {zeit}s
              </button>
            ))}
          </div>
        </Card>

        {/* Questions per quiz */}
        <Card>
          <h3 className="font-semibold text-white mb-3">
            {texte.einstellungen.fragenProQuiz}
          </h3>
          <div className="flex gap-2">
            {[10, 15, 20, 25].map(anzahl => (
              <button
                key={anzahl}
                onClick={() => setFragenProQuiz(anzahl)}
                className={`
                  flex-1 py-2 rounded-lg font-medium transition-colors
                  ${
                    einstellungen.fragenProQuiz === anzahl
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }
                `}
              >
                {anzahl}
              </button>
            ))}
          </div>
        </Card>

        {/* Daily goal */}
        <Card>
          <h3 className="font-semibold text-white mb-3">
            {texte.einstellungen.tagesZiel}
          </h3>
          <div className="flex gap-2">
            {[10, 20, 30, 50].map(anzahl => (
              <button
                key={anzahl}
                onClick={() => setTagesZiel(anzahl)}
                className={`
                  flex-1 py-2 rounded-lg font-medium transition-colors
                  ${
                    einstellungen.tagesZiel === anzahl
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }
                `}
              >
                {anzahl}
              </button>
            ))}
          </div>
        </Card>

        {/* Categories */}
        <Card>
          <h3 className="font-semibold text-white mb-3">
            {texte.einstellungen.kategorien}
          </h3>
          <div className="flex flex-wrap gap-2">
            {alleKategorien.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => toggleKategorie(key)}
                className={`
                  px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                  ${
                    einstellungen.kategorien.includes(key)
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </Card>

        {/* Toggles */}
        <Card>
          <div className="space-y-4">
            {/* Exam relevant only */}
            <div className="flex items-center justify-between">
              <span className="text-white">
                {texte.einstellungen.nurPruefungsrelevant}
              </span>
              <button
                onClick={() =>
                  setNurPruefungsrelevant(!einstellungen.nurPruefungsrelevant)
                }
                className={`
                  w-12 h-6 rounded-full transition-colors relative
                  ${einstellungen.nurPruefungsrelevant ? 'bg-primary-600' : 'bg-slate-600'}
                `}
              >
                <div
                  className={`
                    absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                    ${einstellungen.nurPruefungsrelevant ? 'translate-x-7' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* Animations */}
            <div className="flex items-center justify-between">
              <span className="text-white">{texte.einstellungen.animationen}</span>
              <button
                onClick={() => setAnimationen(!einstellungen.animationen)}
                className={`
                  w-12 h-6 rounded-full transition-colors relative
                  ${einstellungen.animationen ? 'bg-primary-600' : 'bg-slate-600'}
                `}
              >
                <div
                  className={`
                    absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                    ${einstellungen.animationen ? 'translate-x-7' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* Sound */}
            <div className="flex items-center justify-between">
              <span className="text-white">{texte.einstellungen.sound}</span>
              <button
                onClick={() => setSound(!einstellungen.sound)}
                className={`
                  w-12 h-6 rounded-full transition-colors relative
                  ${einstellungen.sound ? 'bg-primary-600' : 'bg-slate-600'}
                `}
              >
                <div
                  className={`
                    absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                    ${einstellungen.sound ? 'translate-x-7' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          </div>
        </Card>

        {/* Reset data */}
        <Card variant="glass">
          <Button
            variant="danger"
            fullWidth
            onClick={() => setShowResetModal(true)}
          >
            {texte.einstellungen.datenZuruecksetzen}
          </Button>
        </Card>

        {/* Success message */}
        {resetSuccess && (
          <div className="fixed bottom-4 left-4 right-4 bg-green-600 text-white py-3 px-4 rounded-xl text-center animate-slide-up">
            {texte.einstellungen.zurueckgesetzt}
          </div>
        )}
      </div>

      {/* Reset confirmation modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title={texte.einstellungen.datenZuruecksetzen}
      >
        <p className="text-slate-300 mb-6">
          {texte.einstellungen.wirklichZuruecksetzen}
        </p>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setShowResetModal(false)}
          >
            {texte.einstellungen.abbrechen}
          </Button>
          <Button variant="danger" fullWidth onClick={handleReset}>
            {texte.einstellungen.bestaetigen}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Einstellungen
