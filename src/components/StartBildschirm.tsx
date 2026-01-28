import { useState } from 'react'
import { Screen } from '../App'
import { texte } from '../data/texte'
import useSpielstand from '../hooks/useSpielstand'
import useConfig from '../hooks/useConfig'
import Card from './common/Card'
import Help from './common/Help'

interface StartBildschirmProps {
  onNavigate: (screen: Screen) => void
}

interface ModeButtonProps {
  icon: string
  title: string
  description: string
  onClick: () => void
  color: string
}

function ModeButton({ icon, title, description, onClick, color }: ModeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 rounded-2xl
        bg-gradient-to-br ${color}
        text-left
        transform transition-all duration-200
        active:scale-98 hover:scale-[1.02]
        shadow-lg
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="font-bold text-white text-lg">{title}</h3>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </div>
    </button>
  )
}

export function StartBildschirm({ onNavigate }: StartBildschirmProps) {
  const { spielstand } = useSpielstand()
  const { config } = useConfig()
  const [showHelp, setShowHelp] = useState(false)

  const hasLogo = config.parentSiteUrl && config.parentSiteLogo

  return (
    <div className="min-h-screen pb-8 safe-bottom">
      {/* Parent site logo */}
      {hasLogo && (
        <div className="flex justify-center pt-4 pb-2">
          <a
            href={config.parentSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={config.parentSiteName || 'Back to main site'}
            className="block"
          >
            <img
              src={config.parentSiteLogo}
              alt={config.parentSiteName || 'Logo'}
              className="h-[80px] md:h-[150px] w-auto object-contain"
            />
          </a>
        </div>
      )}

      {/* Header */}
      <header className={`${hasLogo ? 'pt-2' : 'pt-8'} pb-6 px-4 text-center`}>
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-primary-600 rounded-2xl shadow-lg shadow-primary-900/50">
          <span className="text-3xl font-bold text-white">Q</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{texte.appName}</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{texte.appSubtitle}</p>
      </header>

      {/* Stats bar */}
      <div className="px-4 mb-6">
        <Card variant="glass" padding="sm">
          <div className="flex justify-around text-center">
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {spielstand.gesamtPunkte}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{texte.statistik.gesamtpunkte}</div>
            </div>
            <div className="w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1">
                {spielstand.tagesStreak}
                {spielstand.tagesStreak > 0 && <span className="text-orange-500">🔥</span>}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{texte.statistik.streak}</div>
            </div>
            <div className="w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {Math.round((spielstand.fragenRichtig / Math.max(spielstand.fragenGesamt, 1)) * 100)}%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{texte.statistik.genauigkeit}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Mode buttons */}
      <div className="px-4 space-y-3">
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Training
        </h2>

        <ModeButton
          icon="📚"
          title={texte.start.lernen}
          description={texte.start.lernenDesc}
          onClick={() => onNavigate('lernen')}
          color="from-blue-600 to-blue-700"
        />

        <ModeButton
          icon="❓"
          title={texte.start.quiz}
          description={texte.start.quizDesc}
          onClick={() => onNavigate('quiz')}
          color="from-purple-600 to-purple-700"
        />

        <ModeButton
          icon="⚡"
          title={texte.start.blitz}
          description={texte.start.blitzDesc}
          onClick={() => onNavigate('blitz')}
          color="from-yellow-600 to-orange-600"
        />

        <ModeButton
          icon="🎓"
          title={texte.start.pruefung}
          description={texte.start.pruefungDesc}
          onClick={() => onNavigate('pruefung')}
          color="from-green-600 to-green-700"
        />

        <ModeButton
          icon="🔄"
          title={texte.start.gegensaetze}
          description={texte.start.gegensaetzeDesc}
          onClick={() => onNavigate('gegensaetze')}
          color="from-pink-600 to-pink-700"
        />

        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-6 mb-2">
          Mehr
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('nachschlagewerk')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
          >
            <span className="text-2xl mb-2 block">📖</span>
            <h3 className="font-semibold text-slate-900 dark:text-white">{texte.start.nachschlagewerk}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{texte.start.nachschlagewerkDesc}</p>
          </button>

          <button
            onClick={() => onNavigate('statistik')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
          >
            <span className="text-2xl mb-2 block">📊</span>
            <h3 className="font-semibold text-slate-900 dark:text-white">{texte.statistik.titel}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{texte.start.statistikDesc}</p>
          </button>
        </div>

        {/* Settings and Help buttons */}
        <div className="flex gap-3 mt-4 mb-8">
          <button
            onClick={() => onNavigate('einstellungen')}
            className="flex-1 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {texte.start.einstellungen}
          </button>

          <button
            onClick={() => setShowHelp(true)}
            className="flex-1 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {texte.start.hilfe}
          </button>
        </div>
      </div>

      {/* Help modal */}
      {showHelp && <Help onClose={() => setShowHelp(false)} />}
    </div>
  )
}

export default StartBildschirm
