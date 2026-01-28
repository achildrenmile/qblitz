import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  fullWidth?: boolean
  icon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-lg shadow-primary-900/30',
  secondary:
    'bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-white',
  success:
    'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white',
  danger:
    'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white',
  ghost:
    'bg-transparent hover:bg-slate-700/50 active:bg-slate-700 text-slate-300 hover:text-white',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-base',
  lg: 'py-4 px-8 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        font-semibold rounded-xl
        transition-all duration-200 transform active:scale-95
        flex items-center justify-center gap-2
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  )
}

export default Button
