// 앱 하단 푸터
export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-400 dark:text-gray-600">
          © {new Date().getFullYear()} 사주 AI. All rights reserved.
        </p>
        <p className="text-xs text-gray-300 dark:text-gray-700 mt-1">
          본 서비스의 사주 분석 결과는 참고용이며, 실제 운명을 결정하지 않습니다.
        </p>
      </div>
    </footer>
  )
}
