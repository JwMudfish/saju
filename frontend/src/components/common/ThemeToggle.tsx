import { useTheme } from '@/hooks/useTheme'

// 다크모드 토글 버튼
export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      <span className="material-symbols-outlined text-xl">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  )
}
