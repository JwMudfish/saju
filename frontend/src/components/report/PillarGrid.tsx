// PillarGrid.tsx: 사주 4기둥 그리드 (레퍼런스 디자인 기반 - aspect-square 셀)
import { CHEONGAN_OHANG, JIJI_OHANG, PILLAR_LABELS, OHANG_STYLES } from '@/lib/constants'
import type { SajuResult } from '@/services/types'

interface PillarGridProps {
  pillars: SajuResult
}

// 기둥 정보 타입
interface PillarInfo {
  key: 'year' | 'month' | 'day' | 'hour'
  label: string
  gan: string
  ji: string
}

// 천간/지지 오행 키 조회 (매핑에 없으면 '토' 기본값)
function getGanOhang(gan: string): keyof typeof OHANG_STYLES {
  const result = CHEONGAN_OHANG[gan]
  return (result as keyof typeof OHANG_STYLES) ?? '토'
}

function getJiOhang(ji: string): keyof typeof OHANG_STYLES {
  const result = JIJI_OHANG[ji]
  return (result as keyof typeof OHANG_STYLES) ?? '토'
}

// 오행 한자 label (짧은 형식)
function getOhangShortLabel(ohang: keyof typeof OHANG_STYLES): string {
  const map: Record<keyof typeof OHANG_STYLES, string> = {
    목: '목',
    화: '화',
    토: '토',
    금: '금',
    수: '수',
  }
  return map[ohang] ?? '토'
}

// 단일 셀 컴포넌트
interface PillarCellProps {
  char: string
  ohang: keyof typeof OHANG_STYLES
  isDayPillarGan?: boolean // 일간 표시 (accent-gold 링)
}

function PillarCell({ char, ohang, isDayPillarGan = false }: PillarCellProps) {
  const style = OHANG_STYLES[ohang]
  const shortLabel = getOhangShortLabel(ohang)

  return (
    <div
      className={[
        style.bg,
        style.text,
        style.border,
        'aspect-square rounded-lg flex flex-col items-center justify-center p-2 border',
        isDayPillarGan ? 'ring-2 ring-accent-gold ring-offset-2' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="text-2xl font-bold">{char}</span>
      <span className="text-[10px] mt-1 opacity-70">{shortLabel}</span>
    </div>
  )
}

export function PillarGrid({ pillars }: PillarGridProps) {
  const pillarList: PillarInfo[] = [
    {
      key: 'hour',
      label: PILLAR_LABELS.hour,
      gan: pillars.hour_pillar?.gan ?? '',
      ji: pillars.hour_pillar?.ji ?? '',
    },
    {
      key: 'day',
      label: PILLAR_LABELS.day,
      gan: pillars.day_pillar.gan,
      ji: pillars.day_pillar.ji,
    },
    {
      key: 'month',
      label: PILLAR_LABELS.month,
      gan: pillars.month_pillar.gan,
      ji: pillars.month_pillar.ji,
    },
    {
      key: 'year',
      label: PILLAR_LABELS.year,
      gan: pillars.year_pillar.gan,
      ji: pillars.year_pillar.ji,
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* 헤더 행 */}
      {pillarList.map((pillar) => (
        <div
          key={`header-${pillar.key}`}
          className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest"
        >
          {pillar.label}
        </div>
      ))}

      {/* 천간 행 */}
      {pillarList.map((pillar) => {
        const isEmpty = pillar.key === 'hour' && pillars.hour_pillar === null

        if (isEmpty) {
          return (
            <div
              key={`gan-${pillar.key}`}
              className="aspect-square rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <span className="text-xs text-slate-400">-</span>
            </div>
          )
        }

        return (
          <PillarCell
            key={`gan-${pillar.key}`}
            char={pillar.gan}
            ohang={getGanOhang(pillar.gan)}
            isDayPillarGan={pillar.key === 'day'}
          />
        )
      })}

      {/* 지지 행 */}
      {pillarList.map((pillar) => {
        const isEmpty = pillar.key === 'hour' && pillars.hour_pillar === null

        if (isEmpty) {
          return (
            <div
              key={`ji-${pillar.key}`}
              className="aspect-square rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <span className="text-xs text-slate-400">-</span>
            </div>
          )
        }

        return (
          <PillarCell
            key={`ji-${pillar.key}`}
            char={pillar.ji}
            ohang={getJiOhang(pillar.ji)}
          />
        )
      })}
    </div>
  )
}
