import { Frage } from '../../types'

interface QuizFrageProps {
  frage: Frage
  gewaehlteAntwort: string | null
  zeigeErgebnis: boolean
  onAntwort: (antwort: string) => void
}

export function QuizFrage({
  frage,
  gewaehlteAntwort,
  zeigeErgebnis,
  onAntwort,
}: QuizFrageProps) {
  const getButtonClass = (antwort: string) => {
    const baseClass =
      'w-full p-4 rounded-xl text-left font-medium transition-all duration-200 border-2'

    if (!zeigeErgebnis) {
      return `${baseClass} bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary-500 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white`
    }

    const istGewaehlt = antwort === gewaehlteAntwort
    const istRichtig = antwort === frage.richtigeAntwort

    if (istRichtig) {
      return `${baseClass} bg-green-50 dark:bg-green-900/50 border-green-500 text-slate-900 dark:text-white`
    }

    if (istGewaehlt && !istRichtig) {
      return `${baseClass} bg-red-50 dark:bg-red-900/50 border-red-500 text-slate-900 dark:text-white animate-shake`
    }

    return `${baseClass} bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500`
  }

  return (
    <div className="flex flex-col h-full">
      {/* Question */}
      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white leading-relaxed">
          {frage.frageText}
        </h2>
      </div>

      {/* Answer options */}
      <div className="space-y-3">
        {frage.alleAntworten.map((antwort, index) => (
          <button
            key={index}
            onClick={() => onAntwort(antwort)}
            disabled={zeigeErgebnis}
            className={getButtonClass(antwort)}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-700 dark:text-white">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{antwort}</span>
              {zeigeErgebnis && antwort === frage.richtigeAntwort && (
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {zeigeErgebnis &&
                antwort === gewaehlteAntwort &&
                antwort !== frage.richtigeAntwort && (
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
            </div>
          </button>
        ))}
      </div>

      {/* Feedback */}
      {zeigeErgebnis && (
        <div className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 animate-slide-up">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
            {frage.qgruppe.code}
          </div>
          <div className="text-slate-900 dark:text-white font-medium">{frage.qgruppe.bedeutung}</div>
          {frage.qgruppe.eselsbruecke && (
            <div className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
              💡 {frage.qgruppe.eselsbruecke}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default QuizFrage
