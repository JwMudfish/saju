import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SajuRequest, SajuFullResult } from '@/services/types'

interface SajuState {
  // 온보딩 폼 데이터
  request: SajuRequest | null
  // 사주 분석 결과 전체
  result: SajuFullResult | null
  // 로딩/에러 상태
  isLoading: boolean
  error: string | null
  // localStorage 복원 완료 여부
  _hydrated: boolean

  // 액션
  setRequest: (request: SajuRequest) => void
  setResult: (result: SajuFullResult) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
  setHydrated: () => void
}

export const useSajuStore = create<SajuState>()(
  persist(
    (set) => ({
      request: null,
      result: null,
      isLoading: false,
      error: null,
      _hydrated: false,

      setRequest: (request) => set({ request }),
      setResult: (result) => set({ result, error: null }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error, isLoading: false }),
      reset: () => set({ request: null, result: null, isLoading: false, error: null }),
      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: 'saju-store',
      // 결과는 세션 종료 후에도 유지
      partialize: (state) => ({
        request: state.request,
        result: state.result,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
      },
    },
  ),
)
