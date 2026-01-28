import { useState, useMemo } from 'react'
import { QKategorie } from '../../types'
import { texte } from '../../data/texte'
import { qgruppen, kategorieLabels } from '../../data/qgruppen'
import Header from '../common/Header'
import Card from '../common/Card'
import QGruppeDetail from './QGruppeDetail'

interface NachschlagewerkProps {
  onBack: () => void
}

const alleKategorien: QKategorie[] = [
  'standort',
  'frequenz',
  'signal',
  'stoerung',
  'technisch',
  'nachricht',
  'zeit',
  'verschiedenes',
]

export function Nachschlagewerk({ onBack }: NachschlagewerkProps) {
  const [suchbegriff, setSuchbegriff] = useState('')
  const [ausgewaehlteKategorie, setAusgewaehlteKategorie] = useState<QKategorie | null>(
    null
  )
  const [nurPruefungsrelevant, setNurPruefungsrelevant] = useState(false)
  const [ausgewaehlterCode, setAusgewaehlterCode] = useState<string | null>(null)

  // Filter Q-groups
  const gefilterteQGruppen = useMemo(() => {
    let filtered = [...qgruppen]

    // Filter by search term
    if (suchbegriff) {
      const searchLower = suchbegriff.toLowerCase()
      filtered = filtered.filter(
        q =>
          q.code.toLowerCase().includes(searchLower) ||
          q.bedeutung.toLowerCase().includes(searchLower) ||
          q.frage.toLowerCase().includes(searchLower)
      )
    }

    // Filter by category
    if (ausgewaehlteKategorie) {
      filtered = filtered.filter(q => q.kategorie === ausgewaehlteKategorie)
    }

    // Filter by exam relevance
    if (nurPruefungsrelevant) {
      filtered = filtered.filter(q => q.pruefungsrelevant)
    }

    return filtered
  }, [suchbegriff, ausgewaehlteKategorie, nurPruefungsrelevant])

  // Group by category
  const gruppiertNachKategorie = useMemo(() => {
    const groups: Record<string, typeof qgruppen> = {}
    gefilterteQGruppen.forEach(q => {
      if (!groups[q.kategorie]) {
        groups[q.kategorie] = []
      }
      groups[q.kategorie].push(q)
    })
    return groups
  }, [gefilterteQGruppen])

  // Detail view
  if (ausgewaehlterCode) {
    const qgruppe = qgruppen.find(q => q.code === ausgewaehlterCode)
    if (qgruppe) {
      return (
        <QGruppeDetail
          qgruppe={qgruppe}
          onBack={() => setAusgewaehlterCode(null)}
        />
      )
    }
  }

  return (
    <div className="min-h-screen pb-8 safe-bottom">
      <Header title={texte.nachschlagewerk.titel} onBack={onBack} />

      <div className="px-4 py-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder={texte.nachschlagewerk.suchen}
            value={suchbegriff}
            onChange={e => setSuchbegriff(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pl-10
                       text-white placeholder-slate-500 focus:outline-none focus:border-primary-500"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {suchbegriff && (
            <button
              onClick={() => setSuchbegriff('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setAusgewaehlteKategorie(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              ausgewaehlteKategorie === null
                ? 'bg-primary-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {texte.nachschlagewerk.alleKategorien}
          </button>
          {alleKategorien.map(kat => (
            <button
              key={kat}
              onClick={() =>
                setAusgewaehlteKategorie(ausgewaehlteKategorie === kat ? null : kat)
              }
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                ausgewaehlteKategorie === kat
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {kategorieLabels[kat]}
            </button>
          ))}
        </div>

        {/* Exam relevant toggle */}
        <button
          onClick={() => setNurPruefungsrelevant(!nurPruefungsrelevant)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            nurPruefungsrelevant
              ? 'bg-green-900/50 text-green-400'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {nurPruefungsrelevant ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            )}
          </svg>
          {texte.nachschlagewerk.pruefungsrelevant}
        </button>

        {/* Results count */}
        <div className="text-sm text-slate-500">
          {gefilterteQGruppen.length} Q-Gruppen gefunden
        </div>

        {/* Q-Groups list */}
        {ausgewaehlteKategorie ? (
          // Show flat list when category is selected
          <div className="space-y-2">
            {gefilterteQGruppen.map(q => (
              <Card
                key={q.code}
                hover
                padding="sm"
                onClick={() => setAusgewaehlterCode(q.code)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-primary-400 w-14">
                      {q.code}
                    </span>
                    <span className="text-white">{q.bedeutung}</span>
                  </div>
                  {q.pruefungsrelevant && (
                    <span className="text-xs px-2 py-0.5 bg-green-900/50 text-green-400 rounded">
                      Prüfung
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          // Show grouped by category
          <div className="space-y-6">
            {Object.entries(gruppiertNachKategorie).map(([kategorie, items]) => (
              <div key={kategorie}>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {kategorieLabels[kategorie]} ({items.length})
                </h3>
                <div className="space-y-2">
                  {items.map(q => (
                    <Card
                      key={q.code}
                      hover
                      padding="sm"
                      onClick={() => setAusgewaehlterCode(q.code)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-bold text-primary-400 w-14">
                            {q.code}
                          </span>
                          <span className="text-white">{q.bedeutung}</span>
                        </div>
                        {q.pruefungsrelevant && (
                          <span className="text-xs px-2 py-0.5 bg-green-900/50 text-green-400 rounded">
                            Prüfung
                          </span>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {gefilterteQGruppen.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            Keine Q-Gruppen gefunden
          </div>
        )}
      </div>
    </div>
  )
}

export default Nachschlagewerk
