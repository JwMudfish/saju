// OhangBar.tsx: 오행 비율 진행 바 컴포넌트 (ReportPage에서 추출)
import { cn } from '@/lib/utils'

export interface OhangBarProps {
  label: string
  value: number
  colorClass: string
  textColorClass: string
}

export function OhangBar({ label, value, colorClass, textColorClass }: OhangBarProps) {
  const percent = Math.round(value) // 백엔드가 이미 0-100 범위로 반환
  return (
    <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-lg border border-primary/10">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold">{label}</span>
        <span className={cn('text-xs font-bold', textColorClass)}>{percent}%</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full', colorClass)}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
