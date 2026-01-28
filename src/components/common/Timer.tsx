import { useMemo } from 'react'

interface TimerProps {
  zeit: number // in seconds
  maxZeit?: number
  size?: 'sm' | 'md' | 'lg'
  showBar?: boolean
  warning?: number // seconds threshold for warning color
  danger?: number // seconds threshold for danger color
}

const sizeClasses = {
  sm: 'text-xl',
  md: 'text-3xl',
  lg: 'text-5xl',
}

export function Timer({
  zeit,
  maxZeit,
  size = 'md',
  showBar = false,
  warning = 10,
  danger = 5,
}: TimerProps) {
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(zeit / 60)
    const seconds = zeit % 60
    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
    return seconds.toString()
  }, [zeit])

  const colorClass = useMemo(() => {
    if (zeit <= danger) return 'text-red-500'
    if (zeit <= warning) return 'text-yellow-500'
    return 'text-slate-900 dark:text-white'
  }, [zeit, warning, danger])

  const animationClass = useMemo(() => {
    if (zeit <= danger) return 'animate-pulse'
    return ''
  }, [zeit, danger])

  const percentage = maxZeit ? (zeit / maxZeit) * 100 : 100

  const barColor = useMemo(() => {
    if (zeit <= danger) return 'bg-red-500'
    if (zeit <= warning) return 'bg-yellow-500'
    return 'bg-primary-500'
  }, [zeit, warning, danger])

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`
          ${sizeClasses[size]}
          ${colorClass}
          ${animationClass}
          font-bold font-mono tabular-nums
        `}
      >
        {formattedTime}
      </div>

      {showBar && maxZeit && (
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${barColor} transition-all duration-1000 ease-linear rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  )
}

export default Timer
