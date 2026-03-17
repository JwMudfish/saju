import { useEffect } from 'react'
import { useSajuStore } from '@/stores/sajuStore'

// 에러 토스트 알림 컴포넌트
export function ErrorToast() {
  const { error, setError } = useSajuStore()

  useEffect(() => {
    if (!error) return
    const timer = setTimeout(() => setError(null), 5000)
    return () => clearTimeout(timer)
  }, [error, setError])

  if (!error) return null

  return (
    <div
      role="alert"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-red-600 text-white px-5 py-3 rounded-xl shadow-lg animate-in slide-in-from-bottom-4 max-w-sm w-full mx-4"
    >
      <span className="material-symbols-outlined text-lg">error</span>
      <p className="text-sm font-medium">{error}</p>
      <button
        type="button"
        onClick={() => setError(null)}
        className="ml-auto flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="닫기"
      >
        <span className="material-symbols-outlined text-base">close</span>
      </button>
    </div>
  )
}
