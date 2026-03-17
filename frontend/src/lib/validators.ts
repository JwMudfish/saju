// 날짜 유효성 검사
export function isValidDate(year: number, month: number, day: number): boolean {
  if (year < 1900 || year > 2100) return false
  if (month < 1 || month > 12) return false
  if (day < 1) return false

  const daysInMonth = getDaysInMonth(year, month)
  return day <= daysInMonth
}

// 월별 일수 계산 (음력/양력 공통 근사치)
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

// 양력 날짜 유효성 검사
export function isValidSolarDate(year: number, month: number, day: number): boolean {
  if (!isValidDate(year, month, day)) return false
  const date = new Date(year, month - 1, day)
  return (
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
  )
}

// 음력 날짜 유효성 검사 (기본 범위 검사)
export function isValidLunarDate(year: number, month: number, day: number): boolean {
  if (year < 1900 || year > 2100) return false
  if (month < 1 || month > 12) return false
  if (day < 1 || day > 30) return false
  return true
}

// 연도 유효성 검사 (사주 계산 가능 범위)
export function isValidBirthYear(year: number): boolean {
  const currentYear = new Date().getFullYear()
  return year >= 1924 && year <= currentYear
}

// 온보딩 Step 1 필드 검사
export interface BirthInfoFields {
  year: number | ''
  month: number | ''
  day: number | ''
  hour: number | ''
  isLunar: boolean
  isLeapMonth: boolean
}

export interface ValidationResult {
  valid: boolean
  errors: Record<string, string>
}

export function validateBirthInfo(fields: BirthInfoFields): ValidationResult {
  const errors: Record<string, string> = {}

  if (fields.year === '') {
    errors.year = '출생 연도를 입력해주세요'
  } else if (!isValidBirthYear(fields.year as number)) {
    errors.year = '1924년 ~ 현재 연도 사이로 입력해주세요'
  }

  if (fields.month === '') {
    errors.month = '출생 월을 입력해주세요'
  } else if ((fields.month as number) < 1 || (fields.month as number) > 12) {
    errors.month = '1 ~ 12 사이로 입력해주세요'
  }

  if (fields.day === '') {
    errors.day = '출생 일을 입력해주세요'
  } else {
    const maxDay = fields.isLunar ? 30 : getDaysInMonth(fields.year as number, fields.month as number)
    if ((fields.day as number) < 1 || (fields.day as number) > maxDay) {
      errors.day = `1 ~ ${maxDay} 사이로 입력해주세요`
    }
  }

  return { valid: Object.keys(errors).length === 0, errors }
}
