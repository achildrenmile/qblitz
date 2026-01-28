import { texte, formatProzent } from '../../data/texte'
import Header from '../common/Header'
import Card from '../common/Card'
import Button from '../common/Button'

interface QuizErgebnisProps {
  richtig: number
  gesamt: number
  onBack: () => void
  onNochmal: () => void
}

export function QuizErgebnis({
  richtig,
  gesamt,
  onBack,
  onNochmal,
}: QuizErgebnisProps) {
  const prozent = Math.round((richtig / gesamt) * 100)
  const istGut = prozent >= 70
  const istPerfekt = prozent === 100

  return (
    <div className="min-h-screen flex flex-col safe-bottom">
      <Header title={texte.quiz.ergebnis} onBack={onBack} />

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Result icon */}
        <div className="text-7xl mb-4 animate-bounce-in">
          {istPerfekt ? '🏆' : istGut ? '🎉' : '📚'}
        </div>

        {/* Score */}
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-white mb-2">
            {richtig}/{gesamt}
          </div>
          <div
            className={`text-2xl font-semibold ${
              istGut ? 'text-green-400' : 'text-yellow-400'
            }`}
          >
            {formatProzent(richtig, gesamt)}
          </div>
        </div>

        {/* Stats card */}
        <Card variant="glass" className="w-full max-w-sm mb-8">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">{richtig}</div>
              <div className="text-sm text-slate-400">{texte.common.richtig}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">
                {gesamt - richtig}
              </div>
              <div className="text-sm text-slate-400">{texte.common.falsch}</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
              style={{ width: `${prozent}%` }}
            />
          </div>
        </Card>

        {/* Message */}
        <p className="text-slate-400 text-center mb-8 max-w-xs">
          {istPerfekt
            ? 'Perfekt! Du hast alle Fragen richtig beantwortet!'
            : istGut
            ? 'Gut gemacht! Weiter so!'
            : 'Übung macht den Meister. Versuche es nochmal!'}
        </p>

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

export default QuizErgebnis
