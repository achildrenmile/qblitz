import { useState } from 'react'
import { texte } from '../../data/texte'

interface HelpProps {
  onClose: () => void
}

interface HelpStep {
  icon: string
  title: string
  text: string
}

export function Help({ onClose }: HelpProps) {
  const [step, setStep] = useState(0)

  const steps: HelpStep[] = [
    {
      icon: '👋',
      title: texte.hilfe.willkommenTitel,
      text: texte.hilfe.willkommenText,
    },
    {
      icon: '📚',
      title: texte.hilfe.lernenTitel,
      text: texte.hilfe.lernenText,
    },
    {
      icon: '🧠',
      title: texte.hilfe.spacedRepTitel,
      text: texte.hilfe.spacedRepText,
    },
    {
      icon: '❓',
      title: texte.hilfe.quizTitel,
      text: texte.hilfe.quizText,
    },
    {
      icon: '⚡',
      title: texte.hilfe.blitzTitel,
      text: texte.hilfe.blitzText,
    },
    {
      icon: '🎓',
      title: texte.hilfe.pruefungTitel,
      text: texte.hilfe.pruefungText,
    },
    {
      icon: '🔄',
      title: texte.hilfe.gegensaetzeTitel,
      text: texte.hilfe.gegensaetzeTitel2,
    },
    {
      icon: '📖',
      title: texte.hilfe.nachschlagewerkTitel,
      text: texte.hilfe.nachschlagewerkText,
    },
    {
      icon: '🏆',
      title: texte.hilfe.punkteTitel,
      text: texte.hilfe.punkteText,
    },
    {
      icon: '💡',
      title: texte.hilfe.tippsTitel,
      text: texte.hilfe.tippsText,
    },
  ]

  const isFirst = step === 0
  const isLast = step === steps.length - 1
  const currentStep = steps[step]

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">{texte.hilfe.titel}</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="text-center mb-4">
            <span className="text-5xl">{currentStep.icon}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-3">
            {currentStep.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-center leading-relaxed">
            {currentStep.text}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 px-6 pb-4">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === step
                  ? 'bg-primary-600 w-6'
                  : i < step
                  ? 'bg-primary-400'
                  : 'bg-slate-300 dark:bg-slate-600'
              }`}
              aria-label={`${texte.hilfe.schritt} ${i + 1}`}
            />
          ))}
        </div>

        {/* Step indicator */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 pb-2">
          {texte.hilfe.schritt} {step + 1} {texte.hilfe.von} {steps.length}
        </div>

        {/* Navigation */}
        <div className="px-6 pb-6 flex gap-3">
          {!isFirst && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex-1 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl font-medium transition-colors"
            >
              {texte.hilfe.zurueck}
            </button>
          )}
          {isLast ? (
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
            >
              {texte.hilfe.verstanden}
            </button>
          ) : (
            <button
              onClick={() => setStep(s => s + 1)}
              className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
            >
              {texte.hilfe.weiter}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Help
