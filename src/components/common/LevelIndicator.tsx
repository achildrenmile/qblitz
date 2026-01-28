import { getLevelFarbe, getLevelName } from '../../utils/spacedRepetition'

interface LevelIndicatorProps {
  level: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-4 h-4 text-xs',
  md: 'w-6 h-6 text-sm',
  lg: 'w-8 h-8 text-base',
}

const dotSizeClasses = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
}

export function LevelIndicator({
  level,
  showLabel = false,
  size = 'md',
}: LevelIndicatorProps) {
  const levelName = getLevelName(level)
  const levelColor = getLevelFarbe(level)

  if (showLabel) {
    return (
      <div className="flex items-center gap-2">
        <div className={`${dotSizeClasses[size]} rounded-full ${levelColor}`} />
        <span className="text-sm text-slate-300">
          Level {level} - {levelName}
        </span>
      </div>
    )
  }

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${levelColor}
        rounded-full
        flex items-center justify-center
        font-bold text-white
      `}
      title={`Level ${level} - ${levelName}`}
    >
      {level}
    </div>
  )
}

// Level dots display (5 dots showing progress)
interface LevelDotsProps {
  level: number
  maxLevel?: number
}

export function LevelDots({ level, maxLevel = 5 }: LevelDotsProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: maxLevel + 1 }).map((_, i) => (
        <div
          key={i}
          className={`
            w-2 h-2 rounded-full transition-colors
            ${i <= level ? getLevelFarbe(i) : 'bg-slate-600'}
          `}
          title={`Level ${i} - ${getLevelName(i)}`}
        />
      ))}
    </div>
  )
}

export default LevelIndicator
