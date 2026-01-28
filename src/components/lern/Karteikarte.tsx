import { useState } from 'react'
import { QGruppe, LernStatus } from '../../types'
import { texte } from '../../data/texte'
import { getLevelName } from '../../utils/spacedRepetition'
import { LevelDots } from '../common/LevelIndicator'

interface KarteikarteProps {
  qgruppe: QGruppe
  status: LernStatus
  feedback: 'richtig' | 'falsch' | null
}

export function Karteikarte({ qgruppe, status, feedback }: KarteikarteProps) {
  const [umgedreht, setUmgedreht] = useState(false)

  const handleClick = () => {
    setUmgedreht(!umgedreht)
  }

  const feedbackClass =
    feedback === 'richtig'
      ? 'ring-4 ring-green-500'
      : feedback === 'falsch'
      ? 'ring-4 ring-red-500 animate-shake'
      : ''

  return (
    <div
      className="card-flip w-full max-w-sm cursor-pointer"
      onClick={handleClick}
      style={{ height: '400px' }}
    >
      <div
        className={`card-flip-inner relative w-full h-full ${
          umgedreht ? 'flipped' : ''
        }`}
      >
        {/* Front - Q-Code */}
        <div
          className={`
            card-front absolute inset-0
            bg-gradient-to-br from-slate-800 to-slate-900
            border border-slate-700 rounded-3xl
            flex flex-col items-center justify-center p-6
            shadow-xl
            ${feedbackClass}
          `}
        >
          <div className="absolute top-4 left-4">
            <LevelDots level={status.level} />
          </div>

          <div className="absolute top-4 right-4">
            <span className="text-xs text-slate-500">
              {texte.level[status.level as keyof typeof texte.level] || getLevelName(status.level)}
            </span>
          </div>

          <div className="text-7xl font-bold text-white mb-4 tracking-wide">
            {qgruppe.code}
          </div>

          <div className="text-slate-400 text-sm text-center">
            {texte.lernen.karteAntippen}
          </div>

          {/* Category badge */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <span className="text-xs px-2 py-1 bg-slate-700 rounded-full text-slate-400">
              {texte.kategorien[qgruppe.kategorie as keyof typeof texte.kategorien]}
            </span>
            {qgruppe.pruefungsrelevant && (
              <span className="text-xs px-2 py-1 bg-green-900/50 text-green-400 rounded-full">
                Prüfung
              </span>
            )}
          </div>
        </div>

        {/* Back - Meaning */}
        <div
          className={`
            card-back absolute inset-0
            bg-gradient-to-br from-primary-900 to-slate-900
            border border-primary-800 rounded-3xl
            flex flex-col p-6
            shadow-xl overflow-y-auto
            ${feedbackClass}
          `}
        >
          {/* Code header */}
          <div className="text-center mb-4">
            <span className="text-3xl font-bold text-white">{qgruppe.code}</span>
          </div>

          {/* Meaning */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="text-xs text-primary-400 uppercase tracking-wide mb-1">
                {texte.nachschlagewerk.bedeutung}
              </div>
              <div className="text-xl font-semibold text-white">
                {qgruppe.bedeutung}
              </div>
            </div>

            <div>
              <div className="text-xs text-primary-400 uppercase tracking-wide mb-1">
                {texte.nachschlagewerk.alsFrage}
              </div>
              <div className="text-slate-300">{qgruppe.frage}</div>
            </div>

            <div>
              <div className="text-xs text-primary-400 uppercase tracking-wide mb-1">
                {texte.nachschlagewerk.alsAntwort}
              </div>
              <div className="text-slate-300">{qgruppe.antwort}</div>
            </div>

            {/* Mnemonic */}
            {qgruppe.eselsbruecke && (
              <div className="mt-4 p-3 bg-slate-800/50 rounded-xl">
                <div className="text-xs text-yellow-400 uppercase tracking-wide mb-1">
                  {texte.lernen.eselsbruecke}
                </div>
                <div className="text-slate-300 text-sm">{qgruppe.eselsbruecke}</div>
              </div>
            )}

            {/* Example */}
            {qgruppe.beispiel && (
              <div className="p-3 bg-slate-800/50 rounded-xl">
                <div className="text-xs text-blue-400 uppercase tracking-wide mb-1">
                  {texte.lernen.beispiel}
                </div>
                <div className="text-slate-300 text-sm">{qgruppe.beispiel}</div>
              </div>
            )}
          </div>

          {/* Tap hint */}
          <div className="text-center mt-4 text-slate-500 text-xs">
            {texte.lernen.karteAntippen}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Karteikarte
