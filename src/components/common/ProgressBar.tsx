interface ProgressBarProps {
  value: number // 0-100
  max?: number
  color?: 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  label?: string
  animated?: boolean
}

const colorClasses = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-400',
  success: 'bg-gradient-to-r from-green-500 to-green-400',
  warning: 'bg-gradient-to-r from-yellow-500 to-yellow-400',
  danger: 'bg-gradient-to-r from-red-500 to-red-400',
}

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

export function ProgressBar({
  value,
  max = 100,
  color = 'primary',
  size = 'md',
  showLabel = false,
  label,
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>}
          {showLabel && (
            <span className="text-sm text-slate-500 dark:text-slate-400">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`
            ${colorClasses[color]}
            ${sizeClasses[size]}
            ${animated ? 'transition-all duration-300 ease-out' : ''}
            rounded-full
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
