// ErrorMessage.tsx: 에러 메시지 컴포넌트 (errorType별 한국어 메시지 매핑)
import { cn } from '@/lib/utils'
import { Button } from './Button'

type ErrorType = 'network' | 'server' | 'timeout'

interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
  errorType?: ErrorType
  className?: string
}

const ERROR_MESSAGES: Record<ErrorType, string> = {
  network: '네트워크 연결을 확인해 주세요. 인터넷이 연결되어 있는지 확인 후 다시 시도해 주세요.',
  server: '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  timeout: '요청 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.',
}

export function ErrorMessage({ message, onRetry, errorType, className }: ErrorMessageProps) {
  const displayMessage = message ?? (errorType ? ERROR_MESSAGES[errorType] : '오류가 발생했습니다.')

  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col gap-3 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-red-500 flex-shrink-0 mt-0.5">error</span>
        <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed">{displayMessage}</p>
      </div>
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          className="self-start border-red-300 text-red-600 hover:bg-red-100 dark:border-red-700 dark:text-red-400"
        >
          다시 시도
        </Button>
      )}
    </div>
  )
}
