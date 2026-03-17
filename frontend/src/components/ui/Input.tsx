// Input.tsx: 공유 입력 컴포넌트 (에러/비활성 상태 지원)
import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, helperText, disabled, id, ...props }, ref) => {
    const inputId = id ?? (props.name ? `input-${props.name}` : undefined)
    const helperId = helperText ?? error ? `${inputId}-helper` : undefined

    return (
      <div className="flex flex-col gap-1.5">
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={helperId}
          className={cn(
            'w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2',
            'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400',
            error
              ? 'border-red-500 focus:ring-red-500/30'
              : 'border-slate-200 dark:border-slate-700 focus:ring-primary/30 focus:border-primary',
            disabled && 'cursor-not-allowed opacity-50 bg-slate-50 dark:bg-slate-900',
            className,
          )}
          {...props}
        />
        {(error ?? helperText) && (
          <p
            id={helperId}
            className={cn(
              'text-xs',
              error ? 'text-red-500' : 'text-slate-500 dark:text-slate-400',
            )}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
