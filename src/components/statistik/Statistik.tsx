import { useState, useMemo } from 'react'
import { texte } from '../../data/texte'
import { qgruppen } from '../../data/qgruppen'
import useSpielstand from '../../hooks/useSpielstand'
import { getLevelName, getLevelFarbe } from '../../utils/spacedRepetition'
import Header from '../common/Header'
import Card from '../common/Card'
import Erfolge from './Erfolge'

interface StatistikProps {
  onBack: () => void
}

type Tab = 'fortschritt' | 'erfolge'

export function Statistik({ onBack }: StatistikProps) {
  const { spielstand } = useSpielstand()
  const [activeTab, setActiveTab] = useState<Tab>('fortschritt')

  // Calculate level distribution
  const levelVerteilung = useMemo(() => {
    const distribution = [0, 0, 0, 0, 0, 0] // Levels 0-5

    Object.values(spielstand.lernstatus).forEach(status => {
      distribution[Math.min(status.level, 5)]++
    })

    // Add unseen cards as level 0
    const geseheneCodes = new Set(Object.keys(spielstand.lernstatus))
    const ungesehen = qgruppen.filter(q => !geseheneCodes.has(q.code)).length
    distribution[0] += ungesehen

    return distribution
  }, [spielstand.lernstatus])

  // Calculate mastery percentage
  const gemeistert = useMemo(() => {
    return Object.values(spielstand.lernstatus).filter(s => s.level >= 5).length
  }, [spielstand.lernstatus])

  const genauigkeit =
    spielstand.fragenGesamt > 0
      ? Math.round((spielstand.fragenRichtig / spielstand.fragenGesamt) * 100)
      : 0

  return (
    <div className="min-h-screen pb-8 safe-bottom">
      <Header title={texte.statistik.titel} onBack={onBack} />

      {/* Tab switcher */}
      <div className="px-4 py-3">
        <div className="flex gap-2 bg-slate-800 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('fortschritt')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'fortschritt'
                ? 'bg-primary-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {texte.statistik.fortschritt}
          </button>
          <button
            onClick={() => setActiveTab('erfolge')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'erfolge'
                ? 'bg-primary-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {texte.statistik.erfolge}
          </button>
        </div>
      </div>

      {activeTab === 'fortschritt' ? (
        <div className="px-4 space-y-4">
          {/* Main stats */}
          <Card variant="glass">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-800/50 rounded-xl">
                <div className="text-3xl font-bold text-funk-gold">
                  {spielstand.gesamtPunkte}
                </div>
                <div className="text-sm text-slate-400">
                  {texte.statistik.gesamtpunkte}
                </div>
              </div>
              <div className="text-center p-4 bg-slate-800/50 rounded-xl">
                <div className="text-3xl font-bold text-white flex items-center justify-center gap-1">
                  {spielstand.tagesStreak}
                  {spielstand.tagesStreak > 0 && (
                    <span className="text-orange-500">🔥</span>
                  )}
                </div>
                <div className="text-sm text-slate-400">{texte.statistik.streak}</div>
              </div>
            </div>
          </Card>

          {/* Detailed stats */}
          <Card>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">
                  {texte.statistik.laengsterStreak}
                </span>
                <span className="text-white font-semibold">
                  {spielstand.laengsterStreak} {texte.common.tage}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">
                  {texte.statistik.fragenBeantwortet}
                </span>
                <span className="text-white font-semibold">
                  {spielstand.fragenGesamt}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">{texte.statistik.genauigkeit}</span>
                <span
                  className={`font-semibold ${
                    genauigkeit >= 70 ? 'text-green-400' : 'text-yellow-400'
                  }`}
                >
                  {genauigkeit}%
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">{texte.statistik.blitzHighscore}</span>
                <span className="text-funk-gold font-semibold">
                  {spielstand.blitzHoechstpunkte}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">
                  {texte.statistik.quizAbgeschlossen}
                </span>
                <span className="text-white font-semibold">
                  {spielstand.quizAbgeschlossen}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">
                  {texte.statistik.pruefungenBestanden}
                </span>
                <span className="text-white font-semibold">
                  {spielstand.pruefungenBestanden}
                </span>
              </div>
            </div>
          </Card>

          {/* Learning progress */}
          <Card>
            <h3 className="font-semibold text-white mb-4">
              {texte.statistik.qGruppenGelernt}
            </h3>

            <div className="text-center mb-4">
              <span className="text-4xl font-bold text-white">
                {Object.keys(spielstand.lernstatus).length}
              </span>
              <span className="text-slate-400"> / {qgruppen.length}</span>
            </div>

            {/* Progress bar */}
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all"
                style={{
                  width: `${(Object.keys(spielstand.lernstatus).length / qgruppen.length) * 100}%`,
                }}
              />
            </div>

            {/* Mastered count */}
            <div className="text-center text-sm">
              <span className="text-green-400 font-semibold">{gemeistert}</span>
              <span className="text-slate-400"> gemeistert (Level 5)</span>
            </div>
          </Card>

          {/* Level distribution */}
          <Card>
            <h3 className="font-semibold text-white mb-4">
              {texte.statistik.levelVerteilung}
            </h3>

            <div className="space-y-2">
              {levelVerteilung.map((count, level) => (
                <div key={level} className="flex items-center gap-3">
                  <div className="w-24 text-sm text-slate-400">
                    {level}: {getLevelName(level)}
                  </div>
                  <div className="flex-1 h-4 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getLevelFarbe(level)} transition-all`}
                      style={{
                        width: `${(count / qgruppen.length) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="w-8 text-right text-sm text-slate-400">{count}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <Erfolge freigeschaltet={spielstand.freigeschalteteErfolge} />
      )}
    </div>
  )
}

export default Statistik
