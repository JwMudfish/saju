// ReportPage.tsx: 사주 분석 결과 페이지 (레퍼런스 디자인 기반 - 2컬럼 레이아웃)
import { useNavigate, Navigate } from 'react-router-dom'
import { useSajuStore } from '@/stores/sajuStore'
import { PillarGrid } from '@/components/report/PillarGrid'
import { OhangBar } from '@/components/report/OhangBar'
import { DetailAnalysisAccordion } from '@/components/report/DetailAnalysisAccordion'
import { InterpretSection } from '@/components/report/InterpretSection'
import { Button } from '@/components/ui/Button'

export function ReportPage() {
  const navigate = useNavigate()
  const { result, _hydrated, reset: resetStore, isInterpreting, interpretError, requestInterpretation } = useSajuStore()

  // localStorage 복원 전에는 렌더링 보류
  if (!_hydrated) return null

  // 결과가 없으면 온보딩으로 리다이렉트
  if (!result) {
    return <Navigate to="/onboarding" replace />
  }

  const { pillars, identity, request } = result

  // 생년월일 포맷
  const birthDateStr = `${request.year}.${String(request.month).padStart(2, '0')}.${String(request.day).padStart(2, '0')} (${request.is_lunar ? '음력' : '양력'})`
  const genderStr = request.gender === 'male' ? '남성' : '여성'

  // 오행 비율 데이터 (백엔드 필드명: mok/hwa/to/geum/su)
  const ohangRatio = pillars.ohang_ratio
  const ohangItems = ohangRatio
    ? [
        { label: '목(木)', value: ohangRatio.mok, colorClass: 'bg-[#2d5a27]', textColorClass: 'text-[#2d5a27]' },
        { label: '화(火)', value: ohangRatio.hwa, colorClass: 'bg-[#b71c1c]', textColorClass: 'text-[#b71c1c]' },
        { label: '토(土)', value: ohangRatio.to, colorClass: 'bg-[#795548]', textColorClass: 'text-[#795548]' },
        { label: '금(金)', value: ohangRatio.geum, colorClass: 'bg-[#455a64]', textColorClass: 'text-[#455a64]' },
        { label: '수(水)', value: ohangRatio.su, colorClass: 'bg-[#0d47a1]', textColorClass: 'text-[#0d47a1]' },
      ]
    : []

  // 세운 (3년 흐름) 데이터 - 최근 3년 (백엔드 필드명: sewun, 내부 ganji 중첩)
  const currentYear = new Date().getFullYear()
  const sewunYears = (pillars.sewun ?? [])
    .filter((s) => s.year >= currentYear - 1 && s.year <= currentYear + 1)
    .slice(0, 3)

  // sewun_summaries: interpretation이 없을 때는 빈 배열
  const yearSummaries = result.interpretation?.sewun_summaries ?? []

  const yearAccents = [false, true, false]

  // LLM 사주 요약
  const sajuSummary = result.interpretation?.saju_summary

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="max-w-[1200px] mx-auto min-h-screen flex flex-col">
        {/* 상단 네비게이션 */}
        <header className="flex items-center justify-between border-b border-primary/10 px-6 py-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">storm</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-primary">Saju Coach</h2>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <span className="text-primary border-b-2 border-primary pb-1 cursor-default">
                리포트
              </span>
            </nav>
            {/* 사용자 아바타 */}
            <div className="size-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-lg">person</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-8">
          {/* 페이지 타이틀 */}
          <div className="py-4 border-b border-primary/5">
            <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50">
              나의 사주 코치 리포트
            </h1>
            <p className="text-primary/70 mt-1 font-medium italic">
              당신의 운명을 비추는 개인 맞춤형 명리 분석 가이드
            </p>
          </div>

          {/* 2컬럼 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 왼쪽 컬럼: 만세력 + 사주 요약 + 3년 흐름 */}
            <div className="lg:col-span-8 space-y-8">
              {/* 만세력 섹션 */}
              <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-primary/10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-accent-gold">calendar_month</span>
                  <h2 className="text-xl font-bold">내 만세력</h2>
                </div>
                <PillarGrid pillars={pillars} yuksinList={pillars.yuksin_list} />
              </section>

              {/* 사주 요약 섹션 */}
              <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-primary/10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-accent-gold">psychology</span>
                  <h2 className="text-xl font-bold">사주 요약</h2>
                </div>

                {sajuSummary ? (
                  <div className="space-y-4">
                    {/* 핵심 키워드 칩 */}
                    {sajuSummary.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {sajuSummary.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="text-primary font-bold text-sm px-3 py-1.5 bg-primary/5 rounded-full border border-primary/15"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* 성향 요약 */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {sajuSummary.summary}
                    </p>
                  </div>
                ) : result.interpretation ? (
                  <div className="flex flex-col items-center py-8 text-slate-400">
                    <span className="material-symbols-outlined text-4xl mb-2">psychology</span>
                    <p className="text-sm">요약 정보를 불러올 수 없습니다</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8 text-slate-400 gap-2">
                    <span className="material-symbols-outlined text-4xl mb-2">auto_awesome</span>
                    <p className="text-sm text-center leading-relaxed">
                      아래 <span className="text-primary font-medium">명리 전문가 해석 받기</span>를 통해
                      <br />AI가 분석한 성향 요약을 확인하세요
                    </p>
                  </div>
                )}
              </section>

              {/* AI 명리 전문가 해석 섹션 */}
              <InterpretSection
                interpretation={result.interpretation}
                isInterpreting={isInterpreting}
                interpretError={interpretError}
                onRequestInterpretation={(ctx) => void requestInterpretation(ctx)}
              />

              {/* 3년 흐름 섹션 */}
              {sewunYears.length > 0 && (
                <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-primary/10">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-accent-gold">timeline</span>
                    <h2 className="text-xl font-bold">최근 3년 흐름</h2>
                  </div>

                  <div className="relative pl-5 space-y-3">
                    {/* 세로 타임라인 선 */}
                    <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-primary/10" />

                    {sewunYears.map((sewun, idx) => {
                      const isAccent = yearAccents[idx] ?? false
                      const yearlySummary = yearSummaries.find((s) => s.year === sewun.year)?.summary
                      const yearLabel =
                        sewun.year === currentYear
                          ? '올해'
                          : sewun.year > currentYear
                            ? '내년'
                            : '작년'
                      return (
                        <div key={sewun.year} className="relative">
                          {/* 타임라인 노드 */}
                          <div
                            className={[
                              'absolute -left-5 top-4 size-[10px] rounded-full border-2',
                              isAccent
                                ? 'bg-accent-gold border-accent-gold'
                                : 'bg-white dark:bg-slate-900 border-primary/30',
                            ].join(' ')}
                          />
                          {/* 카드 */}
                          <div
                            className={[
                              'rounded-lg p-4',
                              isAccent
                                ? 'bg-accent-gold/5 border border-accent-gold/20 ring-1 ring-accent-gold/20'
                                : 'bg-slate-50 dark:bg-slate-800/60 border border-primary/5',
                            ].join(' ')}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-base">
                                {sewun.year}년{' '}
                                <span className="text-slate-400 dark:text-slate-500 font-normal text-sm">
                                  {sewun.ganji.gan}{sewun.ganji.ji}년
                                </span>
                              </h3>
                              <span
                                className={[
                                  'text-xs font-bold px-2 py-0.5 rounded-full',
                                  isAccent
                                    ? 'bg-accent-gold/15 text-accent-gold'
                                    : 'bg-primary/10 text-primary',
                                ].join(' ')}
                              >
                                {yearLabel}
                              </span>
                            </div>
                            {yearlySummary ? (
                              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {yearlySummary}
                              </p>
                            ) : (
                              <p className="text-sm text-slate-400 italic">
                                해석을 받으면 이 해의 흐름을 분석해드립니다.
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}
              {/* 심화 분석 아코디언 (지장간/십이운성/신살) */}
              <DetailAnalysisAccordion
                jijanggan={pillars.jijanggan}
                sibiunsung={pillars.sibiunsung}
                shinsal={pillars.shinsal}
                hour_pillar={pillars.hour_pillar}
              />
            </div>

            {/* 오른쪽 컬럼: 집중 분석 + 사용자 정보 */}
            <div className="lg:col-span-4 space-y-8">
              {/* 집중 분석 (오행 비율) */}
              <section className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/20">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  <h2 className="text-xl font-bold text-primary">집중 분석</h2>
                </div>
                <div className="space-y-4">
                  {ohangItems
                    .filter((item) => item.value > 0)
                    .sort((a, b) => b.value - a.value)
                    .map((item) => (
                      <OhangBar
                        key={item.label}
                        label={item.label}
                        value={item.value}
                        colorClass={item.colorClass}
                        textColorClass={item.textColorClass}
                      />
                    ))}
                </div>
                <p className="text-xs text-primary/80 mt-4 leading-snug">
                  * 오행 비율을 기반으로 현재 강한 기운과 보완이 필요한 기운을 파악합니다.
                </p>
              </section>

              {/* 사용자 정보 카드 */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-primary/10">
                <div className="flex items-center gap-4 mb-6">
                  {/* 그라디언트 테두리 아바타 */}
                  <div className="size-14 rounded-full bg-gradient-to-br from-primary to-accent-gold p-0.5">
                    <div className="size-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl text-primary">
                        person
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">사주 분석 결과</h3>
                    <p className="text-xs text-primary font-bold">AI 명리 분석</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">생년월일</span>
                    <span className="font-medium">{birthDateStr}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">성별</span>
                    <span className="font-medium">{genderStr}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">일간</span>
                    <span className="font-medium text-accent-gold">
                      {pillars.day_pillar.gan}
                    </span>
                  </div>
                  {identity?.gyouk_name && (
                    <div className="flex justify-between text-sm py-2">
                      <span className="text-slate-400">격국</span>
                      <span className="font-medium text-primary">{identity.gyouk_name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 새로운 분석 시작 CTA */}
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  resetStore()
                  navigate('/input')
                }}
                className="w-full"
              >
                새로운 분석 시작
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
