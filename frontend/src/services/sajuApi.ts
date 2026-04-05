import axios, { AxiosError } from 'axios'
import type {
  SajuRequest,
  SajuResult,
  IdentityResult,
  InterpretRequest,
  InterpretResult,
  ApiError,
} from './types'

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // AI 응답 대기시간 고려
})

// 요청 인터셉터: 공통 처리
apiClient.interceptors.request.use(
  (config) => config,
  (error: unknown) => Promise.reject(error),
)

// 응답 인터셉터: 에러 정규화
apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (error instanceof AxiosError) {
      // FastAPI 422 validation error: detail은 배열일 수 있음
      const rawDetail = (error.response?.data as { detail?: unknown })?.detail
      let detailMsg: string
      if (Array.isArray(rawDetail)) {
        // Pydantic validation errors → 첫 번째 메시지 추출
        const first = rawDetail[0] as { msg?: string; loc?: string[] }
        detailMsg = first?.msg ? `${first.loc?.slice(1).join('.') ?? ''}: ${first.msg}` : '입력값 오류'
      } else if (typeof rawDetail === 'string') {
        detailMsg = rawDetail
      } else {
        detailMsg = error.message ?? '알 수 없는 오류'
      }
      const apiError: ApiError = { detail: detailMsg, status_code: error.response?.status }
      return Promise.reject(apiError)
    }
    return Promise.reject({ detail: '알 수 없는 오류가 발생했습니다', status_code: 500 })
  },
)

// 프론트엔드 SajuRequest → 백엔드 SajuAPIRequest 필드명 변환
function toApiBody(request: SajuRequest) {
  return {
    birth_year: request.year,
    birth_month: request.month,
    birth_day: request.day,
    birth_hour: request.hour ?? null,
    gender: request.gender,
    is_lunar: request.is_lunar,
    is_leap_month: request.is_leap_month,
  }
}

// ─── API 함수 ─────────────────────────────────────────────────

// 사주 팔자 전체 계산 (사기둥 + 육신 + 오행 + 세운 등 통합)
export async function fetchPillars(request: SajuRequest): Promise<SajuResult> {
  const { data } = await apiClient.post<SajuResult>('/saju', toApiBody(request))
  return data
}

// 나의 정체성/격국
export async function fetchIdentity(request: SajuRequest): Promise<IdentityResult> {
  const { data } = await apiClient.post<IdentityResult>('/saju/identity', toApiBody(request))
  return data
}

// GPT-4o 명리학 해석 요청 (응답 10-30초 소요 가능)
export async function fetchInterpretation(request: InterpretRequest): Promise<InterpretResult> {
  const { data } = await apiClient.post<InterpretResult>('/saju/interpret', request, {
    timeout: 60000, // GPT-4o 응답 대기시간 60초
  })
  return data
}

// 헬스체크
export async function checkHealth(): Promise<boolean> {
  try {
    await apiClient.get('/health')
    return true
  } catch {
    return false
  }
}
