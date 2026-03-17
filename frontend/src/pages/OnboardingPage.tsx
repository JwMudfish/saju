// OnboardingPage.tsx: 3단계 온보딩 위자드 - 레퍼런스 디자인 기반 재구현
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepBirthInfo } from '@/components/onboarding/StepBirthInfo'
import { ErrorToast } from '@/components/common/ErrorToast'
import { useSajuApi } from '@/hooks/useSajuApi'
import { useSajuStore } from '@/stores/sajuStore'
import { GENDER_OPTIONS, ONBOARDING_TOTAL_STEPS } from '@/lib/constants'
import type { BirthInfoFields } from '@/lib/validators'
import type { SajuRequest } from '@/services/types'

// ─── Step 2: 성별 + 이름 입력 ─────────────────────────────────

interface StepGenderNameData {
  gender: 'male' | 'female'
  name: string
}

interface StepGenderNameProps {
  onNext: (data: StepGenderNameData) => void
  onBack: () => void
  defaultValues?: Partial<StepGenderNameData>
}

function StepGenderName({ onNext, onBack, defaultValues }: StepGenderNameProps) {
  const [gender, setGender] = useState<'male' | 'female'>(defaultValues?.gender ?? 'male')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onNext({ gender, name: '' })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1 className="text-primary text-3xl font-bold leading-tight tracking-tight mb-2">
        성별을 선택해 주세요
      </h1>
      <p className="text-primary/60 text-base mb-8">사주 분석에 성별이 활용됩니다</p>

      {/* 성별 라디오 버튼 */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {GENDER_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={[
              'flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all duration-200',
              gender === opt.value
                ? 'border-primary bg-white shadow-sm'
                : 'border-primary/20 bg-white/50 hover:border-primary/40',
            ].join(' ')}
          >
            <input
              type="radio"
              name="gender"
              value={opt.value}
              checked={gender === opt.value}
              onChange={() => setGender(opt.value as 'male' | 'female')}
              className="sr-only"
            />
            <span
              className={[
                'material-symbols-outlined text-4xl',
                gender === opt.value ? 'text-primary' : 'text-primary/40',
              ].join(' ')}
            >
              {opt.value === 'male' ? 'male' : 'female'}
            </span>
            <span
              className={[
                'text-base font-semibold',
                gender === opt.value ? 'text-primary' : 'text-primary/50',
              ].join(' ')}
            >
              {opt.label}
            </span>
          </label>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-4 text-white font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          다음 <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full py-3 text-primary/60 text-sm font-medium hover:text-primary transition-colors"
        >
          이전으로
        </button>
      </div>
    </form>
  )
}

// ─── Step 3: 입력 내용 확인 ────────────────────────────────────

interface StepConfirmProps {
  birthInfo: BirthInfoFields
  gender: 'male' | 'female'
  onBack: () => void
  onConfirm: () => void
  isLoading: boolean
}

function StepConfirm({ birthInfo, gender, onBack, onConfirm, isLoading }: StepConfirmProps) {
  const rows: { label: string; value: string }[] = [
    {
      label: '생년월일',
      value: `${birthInfo.year}년 ${birthInfo.month}월 ${birthInfo.day}일`,
    },
    {
      label: '달력',
      value: birthInfo.isLunar
        ? `음력${birthInfo.isLeapMonth ? ' (윤달)' : ''}`
        : '양력',
    },
    {
      label: '태어난 시간',
      value: birthInfo.hour === '' ? '시간 모름' : `${birthInfo.hour}시`,
    },
    {
      label: '성별',
      value: gender === 'male' ? '남성' : '여성',
    },
  ]

  return (
    <div>
      <h1 className="text-primary text-3xl font-bold leading-tight tracking-tight mb-2">
        입력한 정보를 확인해 주세요
      </h1>
      <p className="text-primary/60 text-base mb-8">정보가 맞으면 분석하기를 눌러주세요</p>

      {/* 입력 내용 요약 */}
      <div className="rounded-lg border border-primary/10 bg-white mb-8 overflow-hidden">
        {rows.map(({ label, value }, idx) => (
          <div
            key={label}
            className={[
              'flex justify-between items-center px-5 py-4',
              idx < rows.length - 1 ? 'border-b border-primary/5' : '',
            ].join(' ')}
          >
            <span className="text-sm text-primary/50 font-medium">{label}</span>
            <span className="text-sm font-semibold text-slate-800">{value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-4 text-white font-bold text-lg hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-lg shadow-primary/20"
        >
          {isLoading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              분석 중...
            </>
          ) : (
            <>
              분석하기
              <span className="material-symbols-outlined">auto_awesome</span>
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="w-full py-3 text-primary/60 text-sm font-medium hover:text-primary disabled:opacity-50 transition-colors"
        >
          이전으로
        </button>
      </div>
    </div>
  )
}

// ─── OnboardingPage 메인 ──────────────────────────────────────

export function OnboardingPage() {
  const navigate = useNavigate()
  const { analyzeSaju } = useSajuApi()
  const { isLoading, setError } = useSajuStore()

  const [step, setStep] = useState(1)
  const [birthInfo, setBirthInfo] = useState<BirthInfoFields | null>(null)
  const [gender, setGender] = useState<'male' | 'female'>('male')

  // 진행률 계산
  const progressPercent = Math.round((step / ONBOARDING_TOTAL_STEPS) * 100)

  // Step 1 완료
  function handleBirthInfoNext(data: BirthInfoFields) {
    setBirthInfo(data)
    setStep(2)
  }

  // Step 2 완료
  function handleGenderNext(data: { gender: 'male' | 'female'; name: string }) {
    setGender(data.gender)
    setStep(3)
  }

  // Step 3 - 분석하기
  async function handleConfirm() {
    if (!birthInfo) return

    const request: SajuRequest = {
      year: birthInfo.year as number,
      month: birthInfo.month as number,
      day: birthInfo.day as number,
      hour: birthInfo.hour === '' ? undefined : (birthInfo.hour as number),
      gender,
      is_lunar: birthInfo.isLunar,
      is_leap_month: birthInfo.isLeapMonth,
    }

    try {
      await analyzeSaju(request)
      navigate('/report')
    } catch {
      setError('사주 분석에 실패했습니다. 다시 시도해 주세요.')
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      {/* 헤더 */}
      <header className="flex items-center justify-between border-b border-primary/10 px-6 md:px-40 py-4">
        <div className="flex items-center gap-3 text-primary">
          <div className="size-6 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-primary">temple_buddhist</span>
          </div>
          <h2 className="text-primary text-xl font-bold leading-tight tracking-tight">Saju Coach</h2>
        </div>
        <div className="hidden md:block">
          <span className="text-sm font-medium text-primary/70">개인 맞춤형 운세 가이드</span>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <div className="px-4 md:px-40 flex flex-1 justify-center py-8">
        <div className="flex flex-col max-w-[560px] w-full flex-1">
          {/* 진행 바 */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex gap-6 justify-between items-end">
              <p className="text-primary text-base font-semibold leading-normal">
                {step}단계 / {ONBOARDING_TOTAL_STEPS}단계
              </p>
              <p className="text-primary/60 text-sm font-medium leading-normal">
                {progressPercent}% 완료
              </p>
            </div>
            <div className="rounded-full bg-primary/10 h-2 w-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-primary/70 text-sm font-medium leading-normal">
              {step === 1 && '기본 생년월일 정보'}
              {step === 2 && '성별 정보'}
              {step === 3 && '최종 확인'}
            </p>
          </div>

          {/* 단계별 폼 */}
          {step === 1 && (
            <StepBirthInfo
              onNext={handleBirthInfoNext}
              defaultValues={
                birthInfo
                  ? {
                      year: birthInfo.year,
                      month: birthInfo.month,
                      day: birthInfo.day,
                      hour: birthInfo.hour,
                      isLunar: birthInfo.isLunar,
                      isLeapMonth: birthInfo.isLeapMonth,
                    }
                  : undefined
              }
            />
          )}

          {step === 2 && (
            <StepGenderName
              onNext={handleGenderNext}
              onBack={() => setStep(1)}
              defaultValues={{ gender }}
            />
          )}

          {step === 3 && birthInfo && (
            <StepConfirm
              birthInfo={birthInfo}
              gender={gender}
              onBack={() => setStep(2)}
              onConfirm={() => void handleConfirm()}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>

      {/* 장식 푸터 */}
      <footer className="mt-auto py-8 text-center text-primary/30 text-xs">
        © 2024 Saju Coach. 별들이 전하는 지혜.
      </footer>

      {/* 에러 토스트 */}
      <ErrorToast />
    </div>
  )
}
