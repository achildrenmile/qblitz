import { ReactNode } from 'react'
import useConfig from '../../hooks/useConfig'

interface HeaderProps {
  title: string
  onBack?: () => void
  rightContent?: ReactNode
  subtitle?: string
  showLogo?: boolean
}

export function Header({ title, onBack, rightContent, subtitle, showLogo = false }: HeaderProps) {
  const { config } = useConfig()
  const hasLogo = showLogo && config.parentSiteUrl && config.parentSiteLogo

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 safe-top">
      {/* Logo row - only shown on start screen */}
      {hasLogo && (
        <div className="flex justify-center py-2 border-b border-slate-100 dark:border-slate-800">
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

      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Back button or spacer */}
        <div className="w-10">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Zurück"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Center: Title */}
        <div className="flex-1 text-center">
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h1>
          {subtitle && (
            <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>

        {/* Right: Custom content or spacer */}
        <div className="w-10 flex justify-end">
          {rightContent}
        </div>
      </div>
    </header>
  )
}

export default Header
