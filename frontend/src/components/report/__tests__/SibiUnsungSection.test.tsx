import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SibiUnsungSection } from '../SibiUnsungSection'
import type { SibiUnsungItem } from '@/services/types'

const sibiunsung: SibiUnsungItem[] = [
  { pillar: 'year', ji: '자', stage: '제왕' },
  { pillar: 'month', ji: '인', stage: '목욕' },
  { pillar: 'day', ji: '오', stage: '사' },
  { pillar: 'hour', ji: '신', stage: '장생' },
]

describe('SibiUnsungSection', () => {
  it('sibiunsung이 null이면 아무것도 렌더링하지 않는다', () => {
    const { container } = render(<SibiUnsungSection sibiunsung={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('섹션 제목 "십이운성"을 렌더링한다', () => {
    render(<SibiUnsungSection sibiunsung={sibiunsung} />)
    expect(screen.getByText('십이운성')).toBeInTheDocument()
  })

  it('각 기둥의 단계 이름을 렌더링한다', () => {
    render(<SibiUnsungSection sibiunsung={sibiunsung} />)
    expect(screen.getByText('제왕')).toBeInTheDocument()
    expect(screen.getByText('목욕')).toBeInTheDocument()
    expect(screen.getByText('사')).toBeInTheDocument()
    expect(screen.getByText('장생')).toBeInTheDocument()
  })

  it('왕성 단계(장생, 건록, 제왕)는 green 뱃지를 표시한다', () => {
    render(<SibiUnsungSection sibiunsung={sibiunsung} />)
    // 제왕, 장생 -> 왕성(왕) 뱃지
    const wangBadges = screen.getAllByText('왕')
    expect(wangBadges.length).toBeGreaterThan(0)
  })

  it('보통 단계(목욕, 관대, 태, 양)는 yellow 뱃지를 표시한다', () => {
    render(<SibiUnsungSection sibiunsung={sibiunsung} />)
    // 목욕 -> 평 뱃지
    const pyeongBadges = screen.getAllByText('평')
    expect(pyeongBadges.length).toBeGreaterThan(0)
  })

  it('쇠약 단계(쇠, 병, 사, 묘, 절)는 red 뱃지를 표시한다', () => {
    render(<SibiUnsungSection sibiunsung={sibiunsung} />)
    // 사 -> 쇠 뱃지
    const soiBadges = screen.getAllByText('쇠')
    expect(soiBadges.length).toBeGreaterThan(0)
  })
})
