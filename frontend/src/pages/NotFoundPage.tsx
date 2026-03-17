// NotFoundPage.tsx: 404 페이지
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark px-4">
      <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">
        sentiment_dissatisfied
      </span>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">404</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">페이지를 찾을 수 없습니다</p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
      >
        홈으로 이동
      </Link>
    </div>
  )
}
