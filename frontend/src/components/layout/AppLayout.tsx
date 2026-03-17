import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { ErrorToast } from '@/components/common/ErrorToast'

// 앱 전체 레이아웃: 헤더 + 컨텐츠 + 푸터
export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ErrorToast />
    </div>
  )
}
