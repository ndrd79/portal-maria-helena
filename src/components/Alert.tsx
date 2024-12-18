interface AlertProps {
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  className?: string
}

const alertStyles = {
  success: 'bg-green-100 border-green-400 text-green-700',
  error: 'bg-red-100 border-red-400 text-red-700',
  info: 'bg-blue-100 border-blue-400 text-blue-700',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
}

export function Alert({ type, message, className = '' }: AlertProps) {
  return (
    <div className={`${alertStyles[type]} border px-4 py-3 rounded relative ${className}`} role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  )
}
