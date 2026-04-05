// App.tsx: React Router 기반 라우터 설정
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { LandingPage } from '@/pages/LandingPage'
import { OnboardingPage } from '@/pages/OnboardingPage'
import { ReportPage } from '@/pages/ReportPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AppLayout 없이 렌더링하는 페이지 */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* AppLayout을 감싸는 페이지 */}
        <Route element={<AppLayout />}>
          <Route path="/report" element={<ReportPage />} />
        </Route>

        {/* 404 처리 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
