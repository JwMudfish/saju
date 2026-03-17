// 오행(五行) 색상 및 스타일 매핑
export const OHANG_STYLES = {
  목: {
    label: '목(木)',
    bg: 'bg-[#e8f5e9]',
    text: 'text-[#2d5a27]',
    border: 'border-[#2d5a27]',
    className: 'element-wood',
    hex: '#2d5a27',
    bgHex: '#e8f5e9',
  },
  화: {
    label: '화(火)',
    bg: 'bg-[#ffebee]',
    text: 'text-[#b71c1c]',
    border: 'border-[#b71c1c]',
    className: 'element-fire',
    hex: '#b71c1c',
    bgHex: '#ffebee',
  },
  토: {
    label: '토(土)',
    bg: 'bg-[#efebe9]',
    text: 'text-[#795548]',
    border: 'border-[#795548]',
    className: 'element-earth',
    hex: '#795548',
    bgHex: '#efebe9',
  },
  금: {
    label: '금(金)',
    bg: 'bg-[#eceff1]',
    text: 'text-[#455a64]',
    border: 'border-[#455a64]',
    className: 'element-metal',
    hex: '#455a64',
    bgHex: '#eceff1',
  },
  수: {
    label: '수(水)',
    bg: 'bg-[#e3f2fd]',
    text: 'text-[#0d47a1]',
    border: 'border-[#0d47a1]',
    className: 'element-water',
    hex: '#0d47a1',
    bgHex: '#e3f2fd',
  },
} as const

// 천간(天干) 오행 매핑 (한자 + 한글 모두 지원)
export const CHEONGAN_OHANG: Record<string, keyof typeof OHANG_STYLES> = {
  // 한자
  甲: '목', 乙: '목', 丙: '화', 丁: '화', 戊: '토',
  己: '토', 庚: '금', 辛: '금', 壬: '수', 癸: '수',
  // 한글
  갑: '목', 을: '목', 병: '화', 정: '화', 무: '토',
  기: '토', 경: '금', 신: '금', 임: '수', 계: '수',
}

// 지지(地支) 오행 매핑 (한자 + 한글 모두 지원)
export const JIJI_OHANG: Record<string, keyof typeof OHANG_STYLES> = {
  // 한자
  子: '수', 丑: '토', 寅: '목', 卯: '목', 辰: '토',
  巳: '화', 午: '화', 未: '토', 申: '금', 酉: '금',
  戌: '토', 亥: '수',
  // 한글
  자: '수', 축: '토', 인: '목', 묘: '목', 진: '토',
  사: '화', 오: '화', 미: '토', 신: '금', 유: '금',
  술: '토', 해: '수',
}

// 시간 선택 옵션 (24시간 + 모름)
export const HOUR_OPTIONS = [
  { value: '', label: '시간 모름' },
  { value: '0', label: '자시(子時) 23:00 ~ 01:00' },
  { value: '1', label: '축시(丑時) 01:00 ~ 03:00' },
  { value: '2', label: '인시(寅時) 03:00 ~ 05:00' },
  { value: '3', label: '묘시(卯時) 05:00 ~ 07:00' },
  { value: '4', label: '진시(辰時) 07:00 ~ 09:00' },
  { value: '5', label: '사시(巳時) 09:00 ~ 11:00' },
  { value: '6', label: '오시(午時) 11:00 ~ 13:00' },
  { value: '7', label: '미시(未時) 13:00 ~ 15:00' },
  { value: '8', label: '신시(申時) 15:00 ~ 17:00' },
  { value: '9', label: '유시(酉時) 17:00 ~ 19:00' },
  { value: '10', label: '술시(戌時) 19:00 ~ 21:00' },
  { value: '11', label: '해시(亥時) 21:00 ~ 23:00' },
] as const

// AI 채팅 프리셋 질문
export const PRESET_QUESTIONS = [
  { id: 'wealth', icon: 'payments', label: '오늘의 재물운' },
  { id: 'compatibility', icon: 'favorite', label: '궁합 확인' },
  { id: 'health', icon: 'health_and_safety', label: '건강 조언' },
  { id: 'lucky-color', icon: 'palette', label: '행운의 색상' },
  { id: 'lucky-direction', icon: 'explore', label: '행운의 방향' },
] as const

// 만세력 주(柱) 레이블
export const PILLAR_LABELS = {
  year: '연주(年柱)',
  month: '월주(月柱)',
  day: '일주(日柱)',
  hour: '시주(時柱)',
} as const

// 성별 옵션
export const GENDER_OPTIONS = [
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' },
] as const

// 온보딩 단계 수
export const ONBOARDING_TOTAL_STEPS = 3

// API 베이스 URL
export const API_BASE_URL = '/api'
