import { useCallback } from 'react'
import { useSajuStore } from '@/stores/sajuStore'
import { fetchPillars, fetchIdentity } from '@/services/sajuApi'
import type { SajuRequest } from '@/services/types'
import type { ApiError } from '@/services/types'

export function useSajuApi() {
  const { setRequest, setResult, setLoading, setError } = useSajuStore()

  // 사주 전체 분석 실행 (팔자 계산 + 정체성/격국 병렬 요청)
  const analyzeSaju = useCallback(
    async (request: SajuRequest) => {
      setLoading(true)
      setError(null)
      setRequest(request)

      try {
        // 팔자 계산은 필수, 정체성 분석은 병렬로 실행하되 실패해도 진행
        const pillarsPromise = fetchPillars(request)
        const [identityResult] = await Promise.allSettled([fetchIdentity(request)])
        const pillars = await pillarsPromise

        setResult({
          request,
          pillars,
          identity: identityResult.status === 'fulfilled' ? identityResult.value : undefined,
        })
      } catch (err: unknown) {
        const apiError = err as ApiError
        setError(apiError.detail ?? '사주 분석 중 오류가 발생했습니다')
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setError, setRequest, setResult],
  )

  return { analyzeSaju }
}
