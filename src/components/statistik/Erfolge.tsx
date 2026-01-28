import { useMemo } from 'react'
import { texte } from '../../data/texte'
import { erfolge, getFreigeschalteteErfolge, getGesperrteErfolge } from '../../data/erfolge'
import Card from '../common/Card'

interface ErfolgeProps {
  freigeschaltet: string[]
}

export function Erfolge({ freigeschaltet }: ErfolgeProps) {
  const freigeschalteteErfolge = useMemo(
    () => getFreigeschalteteErfolge(freigeschaltet),
    [freigeschaltet]
  )

  const gesperrteErfolge = useMemo(
    () => getGesperrteErfolge(freigeschaltet),
    [freigeschaltet]
  )

  return (
    <div className="px-4 space-y-4">
      {/* Summary */}
      <Card variant="glass">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {freigeschalteteErfolge.length}
              <span className="text-slate-400 dark:text-slate-500 text-xl">
                {' '}
                / {erfolge.length}
              </span>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {texte.statistik.erfolge} {texte.statistik.freigeschaltet}
            </div>
          </div>
          <div className="text-4xl">🏆</div>
        </div>
      </Card>

      {/* Unlocked achievements */}
      {freigeschalteteErfolge.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            {texte.statistik.freigeschaltet} ({freigeschalteteErfolge.length})
          </h3>
          <div className="space-y-2">
            {freigeschalteteErfolge.map(erfolg => (
              <Card key={erfolg.id} variant="solid" padding="sm">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{erfolg.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-white">{erfolg.titel}</span>
                      {erfolg.selten && (
                        <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded">
                          {texte.statistik.selten}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{erfolg.beschreibung}</div>
                  </div>
                  {erfolg.punkte > 0 && (
                    <div className="text-right">
                      <div className="text-funk-gold font-bold">+{erfolg.punkte}</div>
                      <div className="text-xs text-slate-500">Punkte</div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Locked achievements */}
      {gesperrteErfolge.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            {texte.statistik.gesperrt} ({gesperrteErfolge.length})
          </h3>
          <div className="space-y-2">
            {gesperrteErfolge.map(erfolg => (
              <Card key={erfolg.id} variant="solid" padding="sm" className="opacity-60">
                <div className="flex items-center gap-3">
                  <div className="text-3xl grayscale">🔒</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-500 dark:text-slate-400">{erfolg.titel}</span>
                      {erfolg.selten && (
                        <span className="text-xs px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-500 rounded">
                          {texte.statistik.selten}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-slate-400 dark:text-slate-500">{erfolg.beschreibung}</div>
                  </div>
                  {erfolg.punkte > 0 && (
                    <div className="text-right text-slate-500">
                      <div className="font-bold">+{erfolg.punkte}</div>
                      <div className="text-xs">Punkte</div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Erfolge
