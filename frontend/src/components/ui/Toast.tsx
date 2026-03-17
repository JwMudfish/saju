// Toast.tsx: 토스트 알림 컴포넌트 (@radix-ui/react-toast 기반)
import { useState, useCallback } from 'react'
import * as RadixToast from '@radix-ui/react-toast'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id: string
  message: string
  type: ToastType
  duration?: number
}

const TOAST_STYLES: Record<ToastType, string> = {
  success:
    'bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
  error:
    'bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300',
  info: 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
}

const TOAST_ICONS: Record<ToastType, string> = {
  success: 'check_circle',
  error: 'error',
  info: 'info',
}

// 전역 토스트 상태 관리를 위한 간단한 이벤트 시스템
type ToastListener = (toast: Omit<ToastItem, 'id'>) => void
const listeners: ToastListener[] = []

// eslint-disable-next-line react-refresh/only-export-components
export function showToast(toast: Omit<ToastItem, 'id'>) {
  listeners.forEach((listener) => listener(toast))
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const toast = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
    showToast({ message, type, duration })
  }, [])

  return { toast }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  // 리스너 등록
  useState(() => {
    const listener: ToastListener = (toast) => {
      const id = `${Date.now()}-${Math.random()}`
      setToasts((prev) => [...prev, { ...toast, id }])
    }
    listeners.push(listener)
    return () => {
      const idx = listeners.indexOf(listener)
      if (idx > -1) listeners.splice(idx, 1)
    }
  })

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <RadixToast.Provider swipeDirection="right">
      {children}
      {toasts.map((toast) => (
        <RadixToast.Root
          key={toast.id}
          duration={toast.duration ?? 3000}
          onOpenChange={(open) => {
            if (!open) removeToast(toast.id)
          }}
          className={cn(
            'flex items-start gap-3 rounded-xl border p-4 shadow-lg',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[swipe=end]:animate-out data-[state=closed]:fade-out-80',
            'data-[state=open]:slide-in-from-bottom-full',
            TOAST_STYLES[toast.type],
          )}
        >
          <span className="material-symbols-outlined text-lg flex-shrink-0">
            {TOAST_ICONS[toast.type]}
          </span>
          <RadixToast.Description className="flex-1 text-sm leading-relaxed">
            {toast.message}
          </RadixToast.Description>
          <RadixToast.Close
            aria-label="닫기"
            className="flex-shrink-0 rounded p-0.5 opacity-70 hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </RadixToast.Close>
        </RadixToast.Root>
      ))}
      <RadixToast.Viewport className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-6 sm:max-w-[420px]" />
    </RadixToast.Provider>
  )
}
