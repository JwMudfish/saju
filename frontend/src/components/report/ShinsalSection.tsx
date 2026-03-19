// ShinsalSection.tsx: 신살 섹션 (카드 리스트 형식)
import type { ShinsalItem } from '@/services/types'

interface ShinsalSectionProps {
  shinsal: ShinsalItem[] | null
}

export function ShinsalSection({ shinsal }: ShinsalSectionProps) {
  const isEmpty = !shinsal || shinsal.length === 0

  return (
    <div>
      {!isEmpty && (
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">신살</h3>
      )}
      {isEmpty ? (
        <div className="flex items-center justify-center py-6 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
          <p className="text-sm text-slate-400">이 사주에는 주요 신살이 없습니다</p>
        </div>
      ) : (
        <div className="space-y-2">
          {shinsal.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              data-testid="shinsal-card"
              className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-100 dark:border-slate-700"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">{item.name}</span>
                <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded">
                  {item.trigger_ji}
                </span>
              </div>
              {item.description && (
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
