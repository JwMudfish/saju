// ReportPage.tsx: 사주 분석 결과 페이지 (레퍼런스 디자인 기반 - 2컬럼 레이아웃)
import { useState, useRef } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useSajuStore } from '@/stores/sajuStore'
import { useChatStore } from '@/stores/chatStore'
import { sendChatMessage } from '@/services/sajuApi'
import { PillarGrid } from '@/components/report/PillarGrid'
import { OhangBar } from '@/components/report/OhangBar'
import { Button } from '@/components/ui/Button'
import type { ChatMessage } from '@/services/types'

export function ReportPage() {
  const navigate = useNavigate()
  const { result, _hydrated, reset: resetStore } = useSajuStore()
  const { addMessage } = useChatStore()
  const [quickInput, setQuickInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

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

  // 리포트에서 바로 AI에게 질문 전송
  async function handleQuickAsk(text?: string) {
    const question = (text ?? quickInput).trim()
    if (!question || isSending) return

    setQuickInput('')
    setIsSending(true)

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: question,
      timestamp: Date.now(),
    }
    addMessage(userMessage)

    try {
      const response = await sendChatMessage({
        message: question,
        session_id: '',
        context: { saju_result: result },
      })
      const aiMessage: ChatMessage = {
        id: `${Date.now()}-ai`,
        role: 'assistant',
        content: response.message,
        timestamp: Date.now(),
      }
      addMessage(aiMessage)
      navigate('/chat')
    } catch {
      navigate('/chat')
    } finally {
      setIsSending(false)
    }
  }

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

  const yearIcons = ['rocket_launch', 'payments', 'favorite']
  const yearAccents = [false, true, false]

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
              <button
                type="button"
                onClick={() => navigate('/chat')}
                className="hover:text-primary transition-colors"
              >
                상담
              </button>
            </nav>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/chat')}
            >
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>AI 깊은 상담 시작하기</span>
            </Button>
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
            {/* 왼쪽 컬럼: 만세력 + 성향 요약 + 3년 흐름 */}
            <div className="lg:col-span-8 space-y-8">
              {/* 만세력 섹션 */}
              <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-primary/10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-accent-gold">calendar_month</span>
                  <h2 className="text-xl font-bold">내 만세력</h2>
                </div>
                <PillarGrid pillars={pillars} />
              </section>

              {/* 성향 요약 섹션 */}
              <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-primary/10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-accent-gold">psychology</span>
                  <h2 className="text-xl font-bold">인생 성향 요약</h2>
                </div>

                {identity?.ilgan_content || identity?.gyouk_content ? (
                  <div className="space-y-6">
                    {/* 일간 카드 */}
                    {identity.ilgan_content && (
                      <div>
                        {/* 헤더: 격국 뱃지 + 일간 타이틀 */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {identity.gyouk_name && (
                            <span className="px-3 py-1 bg-accent-gold/10 text-accent-gold rounded-full text-xs font-bold border border-accent-gold/20">
                              {identity.gyouk_name}
                            </span>
                          )}
                          {!!identity.ilgan_content['ilganDesciption'] && (
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold border border-primary/20">
                              {String(identity.ilgan_content['ilganDesciption'])}
                            </span>
                          )}
                        </div>
                        {/* 해시태그 */}
                        {!!identity.ilgan_content['subtitle'] && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {String(identity.ilgan_content['subtitle'])
                              .split('/')
                              .map((tag) => tag.trim())
                              .filter(Boolean)
                              .map((tag) => (
                                <span key={tag} className="text-xs text-primary/70 font-medium">
                                  {tag}
                                </span>
                              ))}
                          </div>
                        )}
                        {/* 본문 */}
                        {!!identity.ilgan_content['contents'] && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                            {String(identity.ilgan_content['contents'])}
                          </p>
                        )}
                      </div>
                    )}

                    {/* 격국 카드 */}
                    {identity.gyouk_content && (
                      <div className="pt-4 border-t border-primary/5">
                        {!!identity.gyouk_content['titleDescription'] && (
                          <p className="text-base font-bold text-slate-800 dark:text-slate-200 mb-2">
                            {String(identity.gyouk_content['titleDescription'])}
                          </p>
                        )}
                        {/* 긍정 태그 */}
                        {!!identity.gyouk_content['tagZoryun'] && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {String(identity.gyouk_content['tagZoryun'])
                              .split('#')
                              .map((t) => t.trim())
                              .filter(Boolean)
                              .map((t) => (
                                <span key={t} className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-800">
                                  #{t}
                                </span>
                              ))}
                          </div>
                        )}
                        {!!identity.gyouk_content['contents'] && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                            {String(identity.gyouk_content['contents'])}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8 text-slate-400">
                    <span className="material-symbols-outlined text-4xl mb-2">psychology</span>
                    <p className="text-sm">AI 상담을 통해 더 자세한 분석을 받아보세요</p>
                  </div>
                )}
              </section>

              {/* 3년 흐름 섹션 */}
              {sewunYears.length > 0 && (
                <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-primary/10">
                  <div className="flex items-center gap-2 mb-8">
                    <span className="material-symbols-outlined text-accent-gold">timeline</span>
                    <h2 className="text-xl font-bold">최근 3년 흐름</h2>
                  </div>

                  <div className="relative flex flex-col md:flex-row justify-between gap-8 md:before:content-[''] md:before:block md:before:absolute md:before:top-6 md:before:left-0 md:before:w-full md:before:h-0.5 md:before:bg-primary/10 md:before:-z-0">
                    {sewunYears.map((sewun, idx) => {
                      const isAccent = yearAccents[idx] ?? false
                      return (
                        <div
                          key={sewun.year}
                          className={[
                            'relative z-10 flex-1 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm',
                            isAccent
                              ? 'border border-accent-gold/20 ring-1 ring-accent-gold/30'
                              : 'border border-primary/5',
                          ].join(' ')}
                        >
                          <div
                            className={[
                              'size-12 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0',
                              isAccent
                                ? 'bg-accent-gold/10 text-accent-gold'
                                : 'bg-primary/10 text-primary',
                            ].join(' ')}
                          >
                            <span className="material-symbols-outlined">
                              {yearIcons[idx] ?? 'star'}
                            </span>
                          </div>
                          <h3 className="font-bold text-lg mb-1">
                            {sewun.year} ({sewun.ganji.gan}
                            {sewun.ganji.ji}년)
                          </h3>
                          <p
                            className={[
                              'text-xs font-bold mb-2',
                              isAccent ? 'text-accent-gold' : 'text-primary',
                            ].join(' ')}
                          >
                            {sewun.year === currentYear ? '올해' : sewun.year > currentYear ? '내년' : '작년'}
                          </p>
                          {sewun.description && (
                            <p className="text-sm text-slate-500">{sewun.description}</p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}
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
                    .slice(0, 3)
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

              {/* 바로 AI 상담 버튼 */}
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/chat')}
                className="w-full"
              >
                <span className="material-symbols-outlined">auto_awesome</span>
                AI와 깊은 상담 시작하기
              </Button>

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

        {/* 하단 AI 질문 영역 */}
        <footer className="mt-auto bg-white dark:bg-slate-900 border-t border-primary/10 p-6">
          <div className="max-w-[800px] mx-auto space-y-4">
            {/* 프리셋 질문 칩 */}
            <div className="flex flex-wrap gap-2 justify-center mb-2">
              {[
                '올해 연애운은 어떤가요?',
                '금전운을 높이는 개운법',
                '주의해야 할 달은 언제인가요?',
                '나와 잘 맞는 사주는?',
              ].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => void handleQuickAsk(q)}
                  disabled={isSending}
                  className="px-4 py-1.5 bg-background-light dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium hover:border-primary transition-colors disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            <h3 className="text-center font-bold text-primary mb-2">AI에게 물어보기</h3>

            {/* 입력창 */}
            <div className="relative group">
              <input
                ref={inputRef}
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') void handleQuickAsk()
                }}
                placeholder="사주에 대해 궁금한 점을 더 물어보세요..."
                disabled={isSending}
                className="w-full bg-background-light dark:bg-slate-800 border-none rounded-xl py-4 pl-6 pr-14 focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 transition-all shadow-inner disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => void handleQuickAsk()}
                disabled={!quickInput.trim() || isSending}
                className="absolute right-3 top-1/2 -translate-y-1/2 size-10 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-40"
                aria-label="전송"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>

            <p className="text-center text-[10px] text-slate-400">
              AI 코치는 전통적인 사주 원칙과 일반적인 데이터를 바탕으로 통찰력을 제공합니다. 참고
              및 엔터테인먼트 용도로만 사용하십시오.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
