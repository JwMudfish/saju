// SibiUnsungSection.tsx: 십이운성 섹션 (4기둥의 십이운성 표시)
import type { SibiUnsungItem } from '@/services/types'

interface SibiUnsungSectionProps {
  sibiunsung: SibiUnsungItem[] | null
}

// 십이운성 강도 분류
type StageStrength = 'wang' | 'pyeong' | 'soi'

const STAGE_STRENGTH_MAP: Record<string, StageStrength> = {
  // 왕성 (왕)
  장생: 'wang',
  건록: 'wang',
  제왕: 'wang',
  // 보통 (평)
  목욕: 'pyeong',
  관대: 'pyeong',
  태: 'pyeong',
  양: 'pyeong',
  // 쇠약 (쇠)
  쇠: 'soi',
  병: 'soi',
  사: 'soi',
  묘: 'soi',
  절: 'soi',
}

const STRENGTH_BADGE: Record<StageStrength, { label: string; className: string }> = {
  wang: { label: '왕', className: 'bg-green-100 text-green-700 border-green-200' },
  pyeong: { label: '평', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  soi: { label: '쇠', className: 'bg-red-100 text-red-700 border-red-200' },
}

function getStrengthBadge(stage: string) {
  const strength = STAGE_STRENGTH_MAP[stage] ?? 'pyeong'
  return STRENGTH_BADGE[strength]
}

// 4기둥 순서
const PILLAR_ORDER = ['hour', 'day', 'month', 'year'] as const
const PILLAR_LABELS: Record<string, string> = {
  hour: '시주',
  day: '일주',
  month: '월주',
  year: '연주',
}

export function SibiUnsungSection({ sibiunsung }: SibiUnsungSectionProps) {
  if (!sibiunsung) return null

  // pillar key -> item 매핑
  const itemByPillar = sibiunsung.reduce<Record<string, SibiUnsungItem>>((acc, item) => {
    acc[item.pillar] = item
    return acc
  }, {})

  return (
    <div>
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">십이운성</h3>
      <div className="grid grid-cols-4 gap-3">
        {PILLAR_ORDER.map((pillarKey) => {
          const item = itemByPillar[pillarKey]
          return (
            <div key={pillarKey} className="text-center">
              <p className="text-[10px] font-bold text-slate-400 mb-1.5">
                {PILLAR_LABELS[pillarKey]}
              </p>
              {item ? (
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-100 dark:border-slate-700 space-y-1.5">
                  <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                    {item.stage}
                  </p>
                  {(() => {
                    const badge = getStrengthBadge(item.stage)
                    return (
                      <span
                        className={[
                          badge.className,
                          'inline-block text-[10px] font-bold px-1.5 py-0.5 rounded border',
                        ].join(' ')}
                      >
                        {badge.label}
                      </span>
                    )
                  })()}
                </div>
              ) : (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 border border-slate-100 dark:border-slate-700 flex items-center justify-center h-16">
                  <span className="text-xs text-slate-400">-</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
