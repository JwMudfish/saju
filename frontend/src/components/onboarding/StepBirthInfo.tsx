// StepBirthInfo.tsx: 온보딩 Step 1 - 생년월일 + 태어난 시간 입력 (레퍼런스 디자인 기반)
import { useState } from 'react'
import { HOUR_OPTIONS } from '@/lib/constants'
import { validateBirthInfo } from '@/lib/validators'
import type { BirthInfoFields } from '@/lib/validators'

interface StepBirthInfoProps {
  onNext: (data: BirthInfoFields) => void
  defaultValues?: Partial<BirthInfoFields>
}

export function StepBirthInfo({ onNext, defaultValues }: StepBirthInfoProps) {
  const [fields, setFields] = useState<BirthInfoFields>({
    year: defaultValues?.year ?? '',
    month: defaultValues?.month ?? '',
    day: defaultValues?.day ?? '',
    hour: defaultValues?.hour ?? '',
    isLunar: defaultValues?.isLunar ?? false,
    isLeapMonth: defaultValues?.isLeapMonth ?? false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleCalendarTypeChange(isLunar: boolean) {
    setFields((prev) => ({ ...prev, isLunar, isLeapMonth: false }))
  }

  function handleNumberInput(field: 'year' | 'month' | 'day', value: string) {
    const num = value === '' ? '' : parseInt(value, 10)
    setFields((prev) => ({ ...prev, [field]: isNaN(num as number) ? '' : num }))
    // 에러 즉시 제거
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  function handleHourChange(value: string) {
    setFields((prev) => ({ ...prev, hour: value === '' ? '' : parseInt(value, 10) }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { valid, errors: validationErrors } = validateBirthInfo(fields)
    if (!valid) {
      setErrors(validationErrors)
      return
    }
    onNext(fields)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1 className="text-primary text-3xl font-bold leading-tight tracking-tight mb-2">
        생년월일을 알려주세요
      </h1>
      <p className="text-primary/60 text-base mb-8">정확한 사주 분석을 위해 필요합니다</p>

      {/* 양력/음력 선택 */}
      <div className="mb-6">
        <p className="text-xs font-bold text-primary/50 uppercase tracking-wider mb-3">달력 종류</p>
        <div className="inline-flex rounded-lg overflow-hidden border-2 border-primary/20">
          {[
            { label: '양력', value: false },
            { label: '음력', value: true },
          ].map(({ label, value }) => (
            <button
              key={label}
              type="button"
              onClick={() => handleCalendarTypeChange(value)}
              className={[
                'px-8 py-2.5 text-sm font-bold transition-colors',
                fields.isLunar === value
                  ? 'bg-primary text-white'
                  : 'bg-white text-primary/50 hover:bg-primary/5',
              ].join(' ')}
              aria-pressed={fields.isLunar === value}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 연도 입력 */}
      <div className="mb-4">
        <label
          htmlFor="birth-year"
          className="block text-xs font-bold text-primary/50 uppercase tracking-wider mb-2"
        >
          연도
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/40 text-xl pointer-events-none">
            calendar_today
          </span>
          <input
            id="birth-year"
            type="number"
            inputMode="numeric"
            placeholder="1990"
            value={fields.year === '' ? '' : String(fields.year)}
            onChange={(e) => handleNumberInput('year', e.target.value)}
            className={[
              'w-full pl-12 pr-4 py-4 rounded-xl border-2 text-base bg-white dark:bg-slate-900 dark:text-white transition-colors focus:outline-none',
              errors.year
                ? 'border-red-400 focus:border-red-400'
                : 'border-primary/20 focus:border-primary',
            ].join(' ')}
            aria-invalid={!!errors.year}
            aria-describedby={errors.year ? 'error-year' : undefined}
          />
        </div>
        {errors.year && (
          <p id="error-year" className="mt-1.5 text-xs text-red-500 font-medium">
            {errors.year}
          </p>
        )}
      </div>

      {/* 월/일 입력 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { field: 'month' as const, label: '월', placeholder: '8' },
          { field: 'day' as const, label: '일', placeholder: '15' },
        ].map(({ field, label, placeholder }) => (
          <div key={field}>
            <label
              htmlFor={`birth-${field}`}
              className="block text-xs font-bold text-primary/50 uppercase tracking-wider mb-2"
            >
              {label}
            </label>
            <input
              id={`birth-${field}`}
              type="number"
              inputMode="numeric"
              placeholder={placeholder}
              value={fields[field] === '' ? '' : String(fields[field])}
              onChange={(e) => handleNumberInput(field, e.target.value)}
              className={[
                'w-full px-4 py-4 rounded-xl border-2 text-base bg-white dark:bg-slate-900 dark:text-white transition-colors focus:outline-none',
                errors[field]
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-primary/20 focus:border-primary',
              ].join(' ')}
              aria-invalid={!!errors[field]}
              aria-describedby={errors[field] ? `error-${field}` : undefined}
            />
            {errors[field] && (
              <p id={`error-${field}`} className="mt-1.5 text-xs text-red-500 font-medium">
                {errors[field]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* 음력 윤달 체크박스 */}
      {fields.isLunar && (
        <label className="flex items-center gap-2.5 mb-5 cursor-pointer">
          <input
            type="checkbox"
            checked={fields.isLeapMonth}
            onChange={(e) => setFields((prev) => ({ ...prev, isLeapMonth: e.target.checked }))}
            className="rounded border-primary/30 text-primary focus:ring-primary w-4 h-4"
          />
          <span className="text-sm text-primary/70 font-medium">윤달(閏月)</span>
        </label>
      )}

      {/* 태어난 시간 선택 */}
      <div className="mb-10">
        <label
          htmlFor="birth-hour"
          className="block text-xs font-bold text-primary/50 uppercase tracking-wider mb-2"
        >
          태어난 시간 (선택)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/40 text-xl pointer-events-none">
            schedule
          </span>
          <select
            id="birth-hour"
            value={fields.hour === '' ? '' : String(fields.hour)}
            onChange={(e) => handleHourChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-primary/20 bg-white dark:bg-slate-900 dark:text-white text-base focus:outline-none focus:border-primary appearance-none"
          >
            {HOUR_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/40 text-xl pointer-events-none">
            expand_more
          </span>
        </div>
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-4 text-white font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
      >
        다음 <span className="material-symbols-outlined">arrow_forward</span>
      </button>
    </form>
  )
}
