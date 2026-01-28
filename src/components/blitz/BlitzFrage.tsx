import { QGruppe } from '../../types'

interface BlitzFrageProps {
  qgruppe: QGruppe
  optionen: string[]
  feedback: 'richtig' | 'falsch' | null
  onAntwort: (antwort: string) => void
}

export function BlitzFrage({
  qgruppe,
  optionen,
  feedback,
  onAntwort,
}: BlitzFrageProps) {
  const getButtonClass = (option: string) => {
    const baseClass =
      'w-full p-4 rounded-xl text-left font-medium transition-all duration-150 border-2'

    if (feedback === null) {
      return `${baseClass} bg-slate-800 border-slate-700 active:border-primary-500 active:bg-slate-700 text-white`
    }

    const istRichtig = option === qgruppe.bedeutung

    if (istRichtig && feedback === 'richtig') {
      return `${baseClass} bg-green-900/50 border-green-500 text-white scale-105`
    }

    if (istRichtig && feedback === 'falsch') {
      return `${baseClass} bg-green-900/50 border-green-500 text-white`
    }

    if (!istRichtig && feedback === 'falsch') {
      return `${baseClass} bg-slate-800/50 border-slate-700 text-slate-500`
    }

    return `${baseClass} bg-slate-800/50 border-slate-700 text-slate-500`
  }

  return (
    <div className="flex flex-col h-full">
      {/* Question - Q-Code */}
      <div className="text-center mb-8">
        <div
          className={`
            text-6xl font-bold text-white mb-2
            ${feedback === 'richtig' ? 'text-green-400' : ''}
            ${feedback === 'falsch' ? 'text-red-400 animate-shake' : ''}
          `}
        >
          {qgruppe.code}
        </div>
        <div className="text-slate-500 text-sm">Was bedeutet dieser Code?</div>
      </div>

      {/* Options */}
      <div className="flex-1 flex flex-col justify-center space-y-3">
        {optionen.map((option, index) => (
          <button
            key={index}
            onClick={() => onAntwort(option)}
            disabled={feedback !== null}
            className={getButtonClass(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BlitzFrage
