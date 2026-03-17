// Button.tsx: 공유 버튼 컴포넌트 (cva 기반 변형 관리)
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Spinner } from './Spinner'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary/90 shadow-md active:scale-95',
        secondary:
          'border-2 border-primary/20 bg-transparent text-primary hover:bg-primary/5 shadow-sm',
        ghost:
          'bg-transparent text-primary hover:bg-primary/10 shadow-sm',
        danger:
          'bg-red-600 text-white hover:bg-red-700 shadow-md active:scale-95',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-5 text-sm',
        lg: 'h-14 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled ?? isLoading}
        {...props}
      >
        {isLoading && <Spinner size="sm" />}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { buttonVariants }
