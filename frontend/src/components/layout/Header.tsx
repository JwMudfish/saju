import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { useSajuStore } from '@/stores/sajuStore'

interface NavItem {
  to: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { to: '/report', label: '리포트' },
  { to: '/chat', label: '상담' },
]

// 앱 상단 헤더 (리포트/채팅 페이지에서 사용)
export function Header() {
  const location = useLocation()
  const { result } = useSajuStore()

  // 리포트/채팅 페이지에서만 네비게이션 표시
  const showNav = result !== null

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
        {/* 로고 */}
        <Link
          to="/"
          className="flex items-center gap-2 text-primary font-bold text-lg shrink-0"
        >
          <span className="material-symbols-outlined text-2xl">auto_awesome</span>
          <span className="hidden sm:inline">사주 AI</span>
        </Link>

        {/* 네비게이션 */}
        {showNav && (
          <nav className="flex items-center gap-1 ml-auto mr-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={[
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        )}

        {/* 테마 토글 */}
        <div className={showNav ? '' : 'ml-auto'}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
