import { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'glass' | 'solid'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

const variantClasses = {
  default: 'bg-slate-800 border border-slate-700',
  glass: 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50',
  solid: 'bg-slate-800',
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${hover ? 'hover:bg-slate-700/50 cursor-pointer transition-colors' : ''}
        rounded-2xl
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
