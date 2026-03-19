// JijangganSection.tsx: 지장간 섹션 (4기둥의 지장간 표시)
import { CHEONGAN_OHANG, OHANG_STYLES } from '@/lib/constants'
import type { HiddenStem } from '@/services/types'

interface JijangganSectionProps {
  jijanggan: Record<string, HiddenStem> | null
}

// 천간 글자의 오행 스타일 조회
function getStemStyle(stem: string) {
  const ohang = CHEONGAN_OHANG[stem] ?? '토'
  return OHANG_STYLES[ohang as keyof typeof OHANG_STYLES]
}

// 지장간 단일 줄기 셀
interface StemCellProps {
  stem: string
  label: string
}

function StemCell({ stem, label }: StemCellProps) {
  const style = getStemStyle(stem)
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] text-slate-400 w-5 shrink-0">{label}</span>
      <span
        className={[
          style.bg,
          style.text,
          'inline-flex items-center justify-center w-8 h-8 rounded-md text-sm font-bold border',
          style.border,
        ].join(' ')}
      >
        {stem}
      </span>
    </div>
  )
}

// 4기둥 순서 (시주/일주/월주/연주)
const PILLAR_ORDER = ['hour', 'day', 'month', 'year'] as const
const PILLAR_LABELS: Record<string, string> = {
  hour: '시주',
  day: '일주',
  month: '월주',
  year: '연주',
}

export function JijangganSection({ jijanggan }: JijangganSectionProps) {
  if (!jijanggan) return null

  return (
    <div>
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">지장간</h3>
      <div className="grid grid-cols-4 gap-3">
        {PILLAR_ORDER.map((pillarKey) => {
          const stems = jijanggan[pillarKey]
          return (
            <div key={pillarKey} className="space-y-1.5">
              <p className="text-[10px] font-bold text-slate-400 text-center">
                {PILLAR_LABELS[pillarKey]}
              </p>
              {stems ? (
                <div className="bg-white dark:bg-slate-800 rounded-lg p-2 border border-slate-100 dark:border-slate-700 space-y-1">
                  <StemCell stem={stems.initial} label="여기" />
                  {stems.middle !== null && (
                    <StemCell stem={stems.middle} label="중기" />
                  )}
                  <StemCell stem={stems.main} label="정기" />
                </div>
              ) : (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2 border border-slate-100 dark:border-slate-700 flex items-center justify-center h-20">
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
