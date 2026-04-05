import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SajuRequest, SajuFullResult, InterpretResult } from '@/services/types'
import { fetchInterpretation } from '@/services/sajuApi'
import type { ApiError } from '@/services/types'

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
  // GPT-4o 해석 로딩/에러 상태 (결과는 result.interpretation에 저장)
  isInterpreting: boolean
  interpretError: string | null

  // 액션
  setRequest: (request: SajuRequest) => void
  setResult: (result: SajuFullResult) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
  setHydrated: () => void
  // GPT-4o 해석 요청 액션
  requestInterpretation: (userContext?: string) => Promise<void>
}

export const useSajuStore = create<SajuState>()(
  persist(
    (set, get) => ({
      request: null,
      result: null,
      isLoading: false,
      error: null,
      _hydrated: false,
      isInterpreting: false,
      interpretError: null,

      setRequest: (request) => set({ request }),
      setResult: (result) => set({ result, error: null }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error, isLoading: false }),
      reset: () =>
        set({
          request: null,
          result: null,
          isLoading: false,
          error: null,
          isInterpreting: false,
          interpretError: null,
        }),
      setHydrated: () => set({ _hydrated: true }),

      requestInterpretation: async (userContext?: string) => {
        const { result } = get()
        if (!result) return

        // 재요청 시 이전 결과 초기화 — 에러/로딩 상태가 이전 결과에 가려지지 않도록
        set({
          isInterpreting: true,
          interpretError: null,
          result: { ...result, interpretation: undefined },
        })
        try {
          const interpretResult: InterpretResult = await fetchInterpretation({
            saju_result: result.pillars,
            user_context: userContext,
            birth_year: result.request.year,
            birth_month: result.request.month,
            birth_day: result.request.day,
            gender: result.request.gender,
          })
          // 해석 결과를 SajuFullResult.interpretation에 저장 (캐싱)
          set({
            result: { ...get().result!, interpretation: interpretResult },
            isInterpreting: false,
          })
        } catch (err: unknown) {
          const apiErr = err as ApiError
          set({
            interpretError: apiErr?.detail ?? '해석 요청 중 오류가 발생했습니다.',
            isInterpreting: false,
          })
        }
      },
    }),
    {
      name: 'saju-store',
      // 결과(해석 포함)는 세션 종료 후에도 유지
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
