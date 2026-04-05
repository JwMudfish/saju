import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { SajuResult, InterpretResult, SajuFullResult, SajuRequest } from '@/services/types'

// fetchInterpretation 모킹
vi.mock('@/services/sajuApi', () => ({
  fetchInterpretation: vi.fn(),
}))

// zustand persist 모킹 (localStorage 의존 제거)
vi.mock('zustand/middleware', () => ({
  persist: vi.fn((fn: (set: unknown, get: unknown) => unknown) => fn),
}))

const minimalSajuResult: SajuResult = {
  year_pillar: { gan: '甲', ji: '子' },
  month_pillar: { gan: '丙', ji: '寅' },
  day_pillar: { gan: '壬', ji: '午' },
  hour_pillar: { gan: '庚', ji: '戌' },
  deun: null,
  jijanggan: null,
  yuksin_list: null,
  ohang_ratio: null,
  sibiunsung: null,
  shinsal: null,
  sewun: null,
}

const minimalSajuRequest: SajuRequest = {
  year: 1990,
  month: 5,
  day: 15,
  gender: 'male',
  is_lunar: false,
  is_leap_month: false,
}

const mockFullResult: SajuFullResult = {
  request: minimalSajuRequest,
  pillars: minimalSajuResult,
}

const successInterpretResult: InterpretResult = {
  interpretation: '## 1단계: 사주 구조 진단\n\n일간 壬水는 겨울 물...',
  model: 'gpt-4o',
  is_fallback: false,
}

const fallbackInterpretResult: InterpretResult = {
  interpretation: 'OPENAI_API_KEY가 설정되지 않아 자동 해석을 제공할 수 없습니다.',
  model: 'gpt-4o',
  is_fallback: true,
}

describe('sajuStore - requestInterpretation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  it('result가 null이면 requestInterpretation이 아무 작업도 하지 않는다', async () => {
    const { fetchInterpretation } = await import('@/services/sajuApi')
    const { useSajuStore } = await import('@/stores/sajuStore')

    const store = useSajuStore.getState()
    store.reset()

    await store.requestInterpretation()

    expect(fetchInterpretation).not.toHaveBeenCalled()
  })

  it('requestInterpretation 성공 시 result.interpretation에 결과가 저장된다', async () => {
    const { fetchInterpretation } = await import('@/services/sajuApi')
    vi.mocked(fetchInterpretation).mockResolvedValue(successInterpretResult)

    const { useSajuStore } = await import('@/stores/sajuStore')

    const store = useSajuStore.getState()
    store.setResult(mockFullResult)

    await store.requestInterpretation()

    const updatedState = useSajuStore.getState()
    expect(updatedState.result?.interpretation).toEqual(successInterpretResult)
    expect(updatedState.isInterpreting).toBe(false)
    expect(updatedState.interpretError).toBeNull()
  })

  it('requestInterpretation 성공 시 is_fallback: true인 경우도 정상 저장된다', async () => {
    const { fetchInterpretation } = await import('@/services/sajuApi')
    vi.mocked(fetchInterpretation).mockResolvedValue(fallbackInterpretResult)

    const { useSajuStore } = await import('@/stores/sajuStore')

    const store = useSajuStore.getState()
    store.setResult(mockFullResult)

    await store.requestInterpretation()

    const updatedState = useSajuStore.getState()
    expect(updatedState.result?.interpretation?.is_fallback).toBe(true)
    expect(updatedState.isInterpreting).toBe(false)
  })

  it('requestInterpretation 실패 시 interpretError가 설정된다', async () => {
    const { fetchInterpretation } = await import('@/services/sajuApi')
    vi.mocked(fetchInterpretation).mockRejectedValue({
      detail: '서버 연결 오류가 발생했습니다.',
      status_code: 502,
    })

    const { useSajuStore } = await import('@/stores/sajuStore')

    const store = useSajuStore.getState()
    store.setResult(mockFullResult)

    await store.requestInterpretation()

    const updatedState = useSajuStore.getState()
    expect(updatedState.interpretError).toBe('서버 연결 오류가 발생했습니다.')
    expect(updatedState.isInterpreting).toBe(false)
    expect(updatedState.result?.interpretation).toBeUndefined()
  })

  it('requestInterpretation 실패 시 detail 없으면 기본 에러 메시지가 설정된다', async () => {
    const { fetchInterpretation } = await import('@/services/sajuApi')
    vi.mocked(fetchInterpretation).mockRejectedValue(new Error('Network Error'))

    const { useSajuStore } = await import('@/stores/sajuStore')

    const store = useSajuStore.getState()
    store.setResult(mockFullResult)

    await store.requestInterpretation()

    const updatedState = useSajuStore.getState()
    expect(updatedState.interpretError).toBe('해석 요청 중 오류가 발생했습니다.')
    expect(updatedState.isInterpreting).toBe(false)
  })

  it('requestInterpretation 호출 시 user_context가 fetchInterpretation에 전달된다', async () => {
    const { fetchInterpretation } = await import('@/services/sajuApi')
    vi.mocked(fetchInterpretation).mockResolvedValue(successInterpretResult)

    const { useSajuStore } = await import('@/stores/sajuStore')

    const store = useSajuStore.getState()
    store.setResult(mockFullResult)

    await store.requestInterpretation('올해 이직을 고민하고 있습니다.')

    expect(fetchInterpretation).toHaveBeenCalledWith({
      saju_result: minimalSajuResult,
      user_context: '올해 이직을 고민하고 있습니다.',
      birth_year: 1990,
      birth_month: 5,
      birth_day: 15,
      gender: 'male',
    })
  })
})
