// LandingPage.tsx: 랜딩 페이지 - 레퍼런스 디자인 기반 재구현
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Menu, X } from 'lucide-react'

// 기능 카드 데이터
const FEATURES = [
  {
    icon: 'calendar_today',
    title: '정확한 만세력 기반',
    desc: '검증된 천문 데이터를 바탕으로 정밀한 만세력을 산출합니다. 분 단위의 정확도로 당신의 기운을 포착합니다.',
    accent: false,
  },
  {
    icon: 'psychology',
    title: '대화형 AI 해석',
    desc: '어려운 한자와 복잡한 사주 용어 대신, 누구나 이해하기 쉬운 친절한 대화 형식으로 풀어서 설명해 드립니다.',
    accent: true,
  },
  {
    icon: 'lightbulb',
    title: '맞춤형 조언',
    desc: '단순한 운세 풀이를 넘어 현재 당신이 처한 상황에 꼭 필요한 실질적인 삶의 방향성과 지침을 제안합니다.',
    accent: false,
  },
]

export function LandingPage() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const NAV_ITEMS = ['홈', '기능', '이용 방법', '가격']

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* 네비게이션 헤더 */}
      <header className="flex items-center justify-between border-b border-primary/10 px-6 py-4 lg:px-40 relative">
        {/* 로고 */}
        <div className="flex items-center gap-3 text-primary">
          <div className="size-8 flex items-center justify-center bg-primary text-white rounded-lg">
            <span className="material-symbols-outlined text-xl">auto_awesome</span>
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">
            Saju Coach
          </h2>
        </div>
        {/* 네비게이션 + CTA */}
        <div className="flex flex-1 justify-end items-center gap-8">
          <nav className="hidden md:flex items-center gap-9">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href="#"
                className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/onboarding')}
            className="hidden md:flex min-w-[100px]"
          >
            <span className="truncate">시작하기</span>
          </Button>
          {/* 모바일 햄버거 메뉴 버튼 */}
          <button
            type="button"
            className="flex md:hidden size-10 items-center justify-center rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* 모바일 드롭다운 메뉴 */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-primary/10 shadow-lg md:hidden">
            <nav className="flex flex-col px-6 py-4 gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false)
                  navigate('/onboarding')
                }}
                className="w-full mt-2"
              >
                시작하기
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex flex-col flex-1">
        {/* 히어로 섹션 */}
        <section className="px-6 lg:px-40 py-12 lg:py-24">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
            {/* 왼쪽: 텍스트 */}
            <div className="flex flex-col gap-8 flex-1">
              <div className="flex flex-col gap-4">
                {/* 뱃지 */}
                <span className="inline-flex items-center gap-2 text-accent-gold font-semibold text-sm uppercase tracking-widest">
                  <span className="h-px w-8 bg-accent-gold" />
                  AI 운명 분석
                </span>
                <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight lg:text-6xl">
                  <div>나를 잘 이해하는</div>
                  AI 사주 코치
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-relaxed max-w-[600px]">
                  생년월일과 태어난 시간만 입력하면, AI가 당신의 사주를 분석하고 지금 필요한 한마디를 건냅니다.
                </p>
              </div>
              {/* CTA 버튼 */}
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/onboarding')}
                  className="min-w-[180px] shadow-lg shadow-primary/20 hover:scale-[1.02]"
                >
                  <span className="truncate">지금 바로 사주 보기</span>
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="min-w-[180px]"
                >
                  <span className="truncate">어떻게 작동하나요?</span>
                </Button>
              </div>
            </div>

            {/* 오른쪽: 미리보기 카드 */}
            <div className="flex-1 w-full relative">
              <div className="aspect-square w-full max-w-[500px] mx-auto rounded-3xl bg-gradient-to-br from-primary/10 to-accent-gold/10 flex items-center justify-center overflow-hidden border border-primary/5 shadow-2xl relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <div className="relative z-10 p-8 w-full h-full flex items-center justify-center">
                  <div className="w-full aspect-video rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-xl border border-white/20 p-6 flex flex-col gap-4">
                    {/* 맥 스타일 도트 */}
                    <div className="flex gap-2">
                      <div className="size-3 rounded-full bg-red-400" />
                      <div className="size-3 rounded-full bg-yellow-400" />
                      <div className="size-3 rounded-full bg-green-400" />
                    </div>
                    <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="mt-auto h-12 w-full bg-primary/10 rounded-lg flex items-center px-4 text-primary font-bold text-sm">
                      AI가 당신의 대운을 분석 중입니다...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 기능 소개 섹션 */}
        <section className="px-6 lg:px-40 py-20 bg-white/50 dark:bg-slate-900/50">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 text-center items-center">
              <h2 className="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight lg:text-4xl">
                Saju Coach의 핵심 기능
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base font-normal max-w-[720px]">
                데이터 기반의 정확한 분석으로 당신의 운명을 코칭합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col gap-6 rounded-2xl border border-primary/10 bg-white dark:bg-slate-800 p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div
                    className={[
                      'size-14 rounded-xl flex items-center justify-center',
                      feature.accent
                        ? 'bg-accent-gold/10 text-accent-gold'
                        : 'bg-primary/5 text-primary',
                    ].join(' ')}
                  >
                    <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 최종 CTA 섹션 */}
        <section className="px-6 lg:px-40 py-24 text-center">
          <div className="max-w-3xl mx-auto flex flex-col gap-8 items-center rounded-3xl bg-primary px-8 py-16 text-white shadow-2xl relative overflow-hidden">
            {/* 배경 장식 */}
            <div className="absolute -top-24 -left-24 size-64 bg-accent-gold/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 size-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col gap-4">
              <h2 className="text-3xl lg:text-4xl font-black leading-tight">
                지금 바로 당신의 운명을 확인해보세요
              </h2>
              <p className="text-white/80 text-lg">
                회원가입 없이 첫 분석은 무료로 제공됩니다.
              </p>
            </div>
            <div className="relative z-10">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate('/onboarding')}
                className="min-w-[200px] bg-white text-primary hover:bg-slate-100 shadow-xl font-black px-10"
              >
                <span className="truncate">분석 시작하기</span>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="flex flex-col gap-10 px-6 lg:px-40 py-16 bg-slate-50 dark:bg-background-dark border-t border-primary/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 text-primary">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold">Saju Coach</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['이용약관', '개인정보처리방침', '고객지원'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-slate-500 dark:text-slate-400 text-sm hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-slate-400 dark:text-slate-500 text-sm">
            © 2024 Saju Coach. 모든 권리 보유.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="size-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-base">share</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
