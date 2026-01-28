import { ReactNode } from 'react'

interface HeaderProps {
  title: string
  onBack?: () => void
  rightContent?: ReactNode
  subtitle?: string
}

export function Header({ title, onBack, rightContent, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 safe-top">
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
