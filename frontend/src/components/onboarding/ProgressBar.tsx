import { ONBOARDING_TOTAL_STEPS } from '@/lib/constants'

interface ProgressBarProps {
  currentStep: number
}

// 온보딩 상단 단계 진행 바
export function ProgressBar({ currentStep }: ProgressBarProps) {
  const percent = Math.round((currentStep / ONBOARDING_TOTAL_STEPS) * 100)

  return (
    <div
      className="w-full"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="분석 진행률"
    >
      <div className="flex justify-between text-xs text-gray-400 mb-1.5">
        <span>{currentStep} / {ONBOARDING_TOTAL_STEPS} 단계</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
