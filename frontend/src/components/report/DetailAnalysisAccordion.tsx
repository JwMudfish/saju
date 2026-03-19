// DetailAnalysisAccordion.tsx: 심화 분석 아코디언 (지장간/십이운성/신살)
import { useState } from 'react'
import type { HiddenStem, SibiUnsungItem, ShinsalItem, GanJi } from '@/services/types'
import { JijangganSection } from './JijangganSection'
import { SibiUnsungSection } from './SibiUnsungSection'
import { ShinsalSection } from './ShinsalSection'

interface DetailAnalysisAccordionProps {
  jijanggan: Record<string, HiddenStem> | null
  sibiunsung: SibiUnsungItem[] | null
  shinsal: ShinsalItem[] | null
  hour_pillar: GanJi | null
}

export function DetailAnalysisAccordion({
  jijanggan,
  sibiunsung,
  shinsal,
  hour_pillar: _hour_pillar, // eslint-disable-line @typescript-eslint/no-unused-vars
}: DetailAnalysisAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            {isOpen ? 'expand_less' : 'expand_more'}
          </span>
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {isOpen ? '심화 분석 접기' : '심화 분석 펼치기'}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 space-y-6 border-t border-primary/5">
          <JijangganSection jijanggan={jijanggan} />
          <SibiUnsungSection sibiunsung={sibiunsung} />
          <ShinsalSection shinsal={shinsal} />
        </div>
      )}
    </div>
  )
}
