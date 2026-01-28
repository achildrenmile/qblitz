import { texte, formatProzent } from '../../data/texte'
import Header from '../common/Header'
import Card from '../common/Card'
import Button from '../common/Button'

interface BlitzErgebnisProps {
  punkte: number
  richtig: number
  gesamt: number
  maxCombo: number
  istNeuerRekord: boolean
  highscore: number
  onBack: () => void
  onNochmal: () => void
}

export function BlitzErgebnis({
  punkte,
  richtig,
  gesamt,
  maxCombo,
  istNeuerRekord,
  highscore,
  onBack,
  onNochmal,
}: BlitzErgebnisProps) {
  return (
    <div className="min-h-screen flex flex-col safe-bottom">
      <Header title={texte.blitz.zeitAbgelaufen} onBack={onBack} />

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* New record celebration */}
        {istNeuerRekord && (
          <div className="text-center mb-4 animate-bounce-in">
            <span className="text-4xl">🎉</span>
            <div className="text-funk-gold font-bold text-lg mt-1">
              {texte.blitz.neuerRekord}
            </div>
          </div>
        )}

        {/* Score */}
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-slate-900 dark:text-white mb-1">{punkte}</div>
          <div className="text-slate-500 dark:text-slate-400">{texte.blitz.punkte}</div>
        </div>

        {/* Stats */}
        <Card variant="glass" className="w-full max-w-sm mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{gesamt}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Fragen</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">
                {formatProzent(richtig, gesamt)}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Genauigkeit</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-funk-gold flex items-center justify-center gap-1">
                {maxCombo}
                <span className="text-base">🔥</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Max Combo</div>
            </div>
          </div>

          {/* Highscore */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
              {texte.blitz.highscore}
            </div>
            <div className="text-xl font-bold text-funk-gold">{highscore}</div>
          </div>
        </Card>

        {/* Buttons */}
        <div className="w-full max-w-sm space-y-3">
          <Button variant="primary" fullWidth onClick={onNochmal}>
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

export default BlitzErgebnis
