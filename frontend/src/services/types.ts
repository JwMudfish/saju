// 백엔드 Pydantic 모델과 1:1 대응하는 TypeScript 인터페이스

// ─── 요청 타입 ───────────────────────────────────────────────

export interface SajuRequest {
  year: number
  month: number
  day: number
  hour?: number // optional: 시간 모름인 경우 생략
  gender: 'male' | 'female'
  is_lunar: boolean
  is_leap_month: boolean
}

export interface ChatRequest {
  message: string
  session_id: string
  context?: Record<string, unknown>
}

// ─── 도메인 타입 ─────────────────────────────────────────────

export interface GanJi {
  gan: string // 천간 (甲乙丙丁戊己庚辛壬癸)
  ji: string // 지지 (子丑寅卯辰巳午未申酉戌亥)
}

// 백엔드 HiddenStems: initial/middle/main 구조
export interface HiddenStem {
  initial: string
  middle: string | null
  main: string
}

// 백엔드 OHangRatio: mok/hwa/to/geum/su (영문 필드명)
export interface OHangRatio {
  mok: number
  hwa: number
  to: number
  geum: number
  su: number
}

export interface YuksinItem {
  target: string
  yuksin: string
}

export interface SibiUnsungItem {
  pillar: string
  ji: string
  stage: string
}

// 백엔드 SewunItem: ganji 중첩 객체 구조
export interface SewunItem {
  year: number
  ganji: GanJi
  is_current: boolean
}

// 백엔드 DeunItem: ganji 중첩 객체 구조
export interface DeunItem {
  age: number
  ganji: GanJi
}

export interface DeunResult {
  banghyang: string
  deun_su: number
  deun_list: DeunItem[]
}

export interface ShinsalItem {
  name: string
  trigger_ji: string
  description?: string
}

export interface PillarMeaning {
  pillar: string
  label: string
  meaning: string
}

export interface HapchungRelation {
  relation_type: string
  subtype?: string | null
  pillar1: string
  pillar2: string
  ji1: string
  ji2: string
}

// ─── 응답 타입 ───────────────────────────────────────────────

// /api/v1/saju 응답 (전체 계산 결과) - 백엔드 SajuResult 모델과 1:1 대응
export interface SajuResult {
  year_pillar: GanJi
  month_pillar: GanJi
  day_pillar: GanJi
  hour_pillar: GanJi | null
  deun: DeunResult | null
  jijanggan: Record<string, HiddenStem[]> | null
  yuksin_list: YuksinItem[] | null
  ohang_ratio: OHangRatio | null
  sibiunsung: SibiUnsungItem[] | null
  shinsal: ShinsalItem[] | null
  sewun: SewunItem[] | null
  pillar_meanings?: PillarMeaning[]
  hapchung?: HapchungRelation[] | null
}

// /api/v1/saju/identity 응답 - 백엔드 IdentityResponse 모델과 1:1 대응
export interface IdentityResult {
  day_gan: string
  gyouk_name: string | null
  ilgan_content: Record<string, unknown> | null
  gyouk_content: Record<string, unknown> | null
  yongsin_content: Record<string, unknown> | null
}

// 통합 사주 데이터 (화면 표시용)
export interface SajuFullResult {
  request: SajuRequest
  pillars: SajuResult
  identity?: IdentityResult
}

// AI 채팅 응답
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface ChatResponse {
  message: string
  session_id: string
}

// API 에러 응답
export interface ApiError {
  detail: string
  status_code?: number
}
