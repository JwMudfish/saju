// PillarGrid.tsx: 사주 4기둥 그리드 (레퍼런스 디자인 기반 - aspect-square 셀)
import { CHEONGAN_OHANG, JIJI_OHANG, PILLAR_LABELS, OHANG_STYLES } from '@/lib/constants'
import type { SajuResult, YuksinItem } from '@/services/types'

interface PillarGridProps {
  pillars: SajuResult
  yuksinList?: YuksinItem[] | null
}

interface PillarInfo {
  key: 'year' | 'month' | 'day' | 'hour'
  label: string
  gan: string
  ji: string
}

// 십성 5범주 색상 매핑
// eslint-disable-next-line react-refresh/only-export-components
export const YUKSIN_CATEGORY_COLORS: Record<string, string> = {
  비견: 'text-slate-600 bg-slate-100',
  겁재: 'text-slate-600 bg-slate-100',
  식신: 'text-amber-700 bg-amber-100',
  상관: 'text-amber-700 bg-amber-100',
  편재: 'text-green-700 bg-green-100',
  정재: 'text-green-700 bg-green-100',
  편관: 'text-blue-700 bg-blue-100',
  정관: 'text-blue-700 bg-blue-100',
  편인: 'text-purple-700 bg-purple-100',
  정인: 'text-purple-700 bg-purple-100',
}

// 천간/지지 오행 키 조회 (매핑에 없으면 '토' 기본값)
function getGanOhang(gan: string): keyof typeof OHANG_STYLES {
  return (CHEONGAN_OHANG[gan] as keyof typeof OHANG_STYLES) ?? '토'
}

function getJiOhang(ji: string): keyof typeof OHANG_STYLES {
  return (JIJI_OHANG[ji] as keyof typeof OHANG_STYLES) ?? '토'
}

function getOhangShortLabel(ohang: keyof typeof OHANG_STYLES): string {
  return ohang
}

function findYuksin(yuksinList: YuksinItem[], target: string): string | null {
  return yuksinList.find((y) => y.target === target)?.yuksin ?? null
}

// 단일 천간/지지 셀
interface PillarCellProps {
  char: string
  ohang: keyof typeof OHANG_STYLES
  isDayPillarGan?: boolean
}

function PillarCell({ char, ohang, isDayPillarGan = false }: PillarCellProps) {
  const style = OHANG_STYLES[ohang]
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
      <span className="text-[10px] mt-1 opacity-70">{getOhangShortLabel(ohang)}</span>
    </div>
  )
}

// 비어있는 셀 (시주 없음)
function EmptyCell() {
  return (
    <div className="aspect-square rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <span className="text-xs text-slate-400">-</span>
    </div>
  )
}

// 십성 셀
interface YuksinCellProps {
  yuksin: string | null
  isDay?: boolean
}

function YuksinCell({ yuksin, isDay = false }: YuksinCellProps) {
  if (isDay) {
    return (
      <div className="aspect-square rounded-lg flex items-center justify-center bg-accent-gold/10 border border-accent-gold/30">
        <span className="text-xs font-bold text-accent-gold">[일간]</span>
      </div>
    )
  }
  if (!yuksin) {
    return (
      <div className="aspect-square rounded-lg flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <span className="text-xs text-slate-400">-</span>
      </div>
    )
  }
  const colorClass = YUKSIN_CATEGORY_COLORS[yuksin] ?? 'text-slate-600 bg-slate-100'
  return (
    <div className={[colorClass, 'aspect-square rounded-lg flex items-center justify-center border border-current/20'].join(' ')}>
      <span className="text-xs font-bold">{yuksin}</span>
    </div>
  )
}

// 천간/지지의 target명 매핑
const GAN_TARGET: Record<string, string> = {
  hour: '시간', day: '일간', month: '월간', year: '년간',
}
const JI_TARGET: Record<string, string> = {
  hour: '시지', day: '일지', month: '월지', year: '년지',
}

export function PillarGrid({ pillars, yuksinList }: PillarGridProps) {
  const pillarList: PillarInfo[] = [
    { key: 'hour', label: PILLAR_LABELS.hour, gan: pillars.hour_pillar?.gan ?? '', ji: pillars.hour_pillar?.ji ?? '' },
    { key: 'day',  label: PILLAR_LABELS.day,  gan: pillars.day_pillar.gan,           ji: pillars.day_pillar.ji           },
    { key: 'month',label: PILLAR_LABELS.month,gan: pillars.month_pillar.gan,         ji: pillars.month_pillar.ji         },
    { key: 'year', label: PILLAR_LABELS.year, gan: pillars.year_pillar.gan,          ji: pillars.year_pillar.ji          },
  ]

  const isHourEmpty = (key: string) => key === 'hour' && pillars.hour_pillar === null

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* 헤더 행 */}
      {pillarList.map((p) => (
        <div key={`header-${p.key}`} className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          {p.label}
        </div>
      ))}

      {/* 천간 행 */}
      {pillarList.map((p) =>
        isHourEmpty(p.key)
          ? <EmptyCell key={`gan-${p.key}`} />
          : <PillarCell key={`gan-${p.key}`} char={p.gan} ohang={getGanOhang(p.gan)} isDayPillarGan={p.key === 'day'} />
      )}

      {/* 지지 행 */}
      {pillarList.map((p) =>
        isHourEmpty(p.key)
          ? <EmptyCell key={`ji-${p.key}`} />
          : <PillarCell key={`ji-${p.key}`} char={p.ji} ohang={getJiOhang(p.ji)} />
      )}

      {/* 천간 십성 행 */}
      {yuksinList != null && pillarList.map((p) =>
        isHourEmpty(p.key)
          ? <EmptyCell key={`yuksin-gan-${p.key}`} />
          : <YuksinCell
              key={`yuksin-gan-${p.key}`}
              yuksin={p.key === 'day' ? null : findYuksin(yuksinList, GAN_TARGET[p.key])}
              isDay={p.key === 'day'}
            />
      )}

      {/* 지지 십성 행 */}
      {yuksinList != null && pillarList.map((p) =>
        isHourEmpty(p.key)
          ? <EmptyCell key={`yuksin-ji-${p.key}`} />
          : <YuksinCell key={`yuksin-ji-${p.key}`} yuksin={findYuksin(yuksinList, JI_TARGET[p.key])} />
      )}
    </div>
  )
}
