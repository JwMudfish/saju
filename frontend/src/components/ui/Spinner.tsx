// Spinner.tsx: 로딩 인디케이터 컴포넌트
import { cn } from '@/lib/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

const sizeClasses = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
}

export function Spinner({ size = 'md', color, className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="로딩 중"
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        className,
      )}
      style={color ? { color } : undefined}
    />
  )
}
