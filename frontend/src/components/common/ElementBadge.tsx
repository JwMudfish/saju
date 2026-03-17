import { OHANG_STYLES } from '@/lib/constants'

type OhangKey = keyof typeof OHANG_STYLES

interface ElementBadgeProps {
  element: OhangKey
  char?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'soft' | 'solid'
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base font-semibold',
}

// 오행 뱃지 컴포넌트: 천간/지지 문자에 오행 색상 적용
export function ElementBadge({ element, char, size = 'md', variant = 'soft' }: ElementBadgeProps) {
  const style = OHANG_STYLES[element]
  const sizeClass = sizeClasses[size]

  const bgColor = variant === 'solid' ? style.hex : style.bgHex
  const textColor = variant === 'solid' ? style.bgHex : style.hex

  return (
    <div
      className={`inline-flex items-center justify-center rounded-lg font-medium ${sizeClass}`}
      style={{ backgroundColor: bgColor, color: textColor }}
      aria-label={`${char ?? ''} (${style.label})`}
    >
      {char ?? style.label}
    </div>
  )
}
