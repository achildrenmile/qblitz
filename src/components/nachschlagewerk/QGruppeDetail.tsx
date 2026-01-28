import { QGruppe } from '../../types'
import { texte } from '../../data/texte'
import { kategorieLabels, getByCode } from '../../data/qgruppen'
import useLernfortschritt from '../../hooks/useLernfortschritt'
import { getLevelName } from '../../utils/spacedRepetition'
import Header from '../common/Header'
import Card from '../common/Card'
import { LevelDots } from '../common/LevelIndicator'

interface QGruppeDetailProps {
  qgruppe: QGruppe
  onBack: () => void
}

export function QGruppeDetail({ qgruppe, onBack }: QGruppeDetailProps) {
  const { getStatus } = useLernfortschritt()
  const status = getStatus(qgruppe.code)

  // Get opposite Q-group if exists
  const gegensatz = qgruppe.gegensatz ? getByCode(qgruppe.gegensatz) : null

  return (
    <div className="min-h-screen pb-8 safe-bottom">
      <Header title={qgruppe.code} onBack={onBack} />

      <div className="px-4 py-4 space-y-4">
        {/* Main card */}
        <Card variant="glass" padding="lg">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-white mb-2">{qgruppe.code}</div>
            <div className="text-xl text-primary-400">{qgruppe.bedeutung}</div>
          </div>

          {/* Badges */}
          <div className="flex justify-center gap-2 mb-6">
            <span className="text-xs px-3 py-1 bg-slate-700 text-slate-300 rounded-full">
              {kategorieLabels[qgruppe.kategorie]}
            </span>
            {qgruppe.pruefungsrelevant && (
              <span className="text-xs px-3 py-1 bg-green-900/50 text-green-400 rounded-full">
                Prüfungsrelevant
              </span>
            )}
          </div>

          {/* Level indicator */}
          <div className="flex justify-center items-center gap-3 mb-6">
            <LevelDots level={status.level} />
            <span className="text-sm text-slate-400">
              Level {status.level} - {getLevelName(status.level)}
            </span>
          </div>
        </Card>

        {/* Question form */}
        <Card>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
            {texte.nachschlagewerk.alsFrage}
          </h3>
          <p className="text-white text-lg">{qgruppe.frage}</p>
        </Card>

        {/* Answer form */}
        <Card>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
            {texte.nachschlagewerk.alsAntwort}
          </h3>
          <p className="text-white text-lg">{qgruppe.antwort}</p>
        </Card>

        {/* Mnemonic */}
        {qgruppe.eselsbruecke && (
          <Card variant="glass">
            <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-2">
              {texte.lernen.eselsbruecke}
            </h3>
            <p className="text-white">{qgruppe.eselsbruecke}</p>
          </Card>
        )}

        {/* Example */}
        {qgruppe.beispiel && (
          <Card variant="glass">
            <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">
              {texte.lernen.beispiel}
            </h3>
            <p className="text-white">{qgruppe.beispiel}</p>
          </Card>
        )}

        {/* Opposite */}
        {gegensatz && (
          <Card variant="glass">
            <h3 className="text-sm font-semibold text-pink-400 uppercase tracking-wider mb-2">
              Gegensatz
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-white">{gegensatz.code}</span>
                <span className="text-slate-400 ml-3">{gegensatz.bedeutung}</span>
              </div>
              <div className="text-3xl">🔄</div>
            </div>
          </Card>
        )}

        {/* Statistics */}
        {(status.richtigGesamt > 0 || status.falschGesamt > 0) && (
          <Card>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Deine Statistik
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {status.richtigGesamt}
                </div>
                <div className="text-xs text-slate-500">Richtig</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {status.falschGesamt}
                </div>
                <div className="text-xs text-slate-500">Falsch</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {status.richtigGesamt + status.falschGesamt > 0
                    ? Math.round(
                        (status.richtigGesamt /
                          (status.richtigGesamt + status.falschGesamt)) *
                          100
                      )
                    : 0}
                  %
                </div>
                <div className="text-xs text-slate-500">Genauigkeit</div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

export default QGruppeDetail
