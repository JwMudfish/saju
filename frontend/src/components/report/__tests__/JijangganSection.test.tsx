import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JijangganSection } from '../JijangganSection'
import type { HiddenStem } from '@/services/types'

const jijanggan: Record<string, HiddenStem> = {
  year: { initial: '계', middle: null, main: '임' },
  month: { initial: '무', middle: '갑', main: '병' },
  day: { initial: '기', middle: '정', main: '무' },
  hour: { initial: '경', middle: null, main: '무' },
}

describe('JijangganSection', () => {
  it('jijanggan이 null이면 아무것도 렌더링하지 않는다', () => {
    const { container } = render(<JijangganSection jijanggan={null} />)
    expect(container.firstChild).toBeNull()
  })

  it('섹션 제목 "지장간"을 렌더링한다', () => {
    render(<JijangganSection jijanggan={jijanggan} />)
    expect(screen.getByText('지장간')).toBeInTheDocument()
  })

  it('여기(initial) 글자를 렌더링한다', () => {
    render(<JijangganSection jijanggan={jijanggan} />)
    expect(screen.getByText('계')).toBeInTheDocument()
    // '무'는 month.initial이기도 하고 day.main이기도 하므로 getAllByText 사용
    const muElements = screen.getAllByText('무')
    expect(muElements.length).toBeGreaterThan(0)
  })

  it('정기(main) 글자를 렌더링한다', () => {
    render(<JijangganSection jijanggan={jijanggan} />)
    expect(screen.getByText('임')).toBeInTheDocument()
    expect(screen.getByText('병')).toBeInTheDocument()
  })

  it('중기(middle)가 있으면 렌더링한다', () => {
    render(<JijangganSection jijanggan={jijanggan} />)
    expect(screen.getByText('갑')).toBeInTheDocument()
    expect(screen.getByText('정')).toBeInTheDocument()
  })

  it('중기가 null이면 렌더링하지 않는다', () => {
    // year: middle=null, hour: middle=null
    // 중기 레이블을 확인: 해당 항목에서 중기 레이블이 없어야 함
    render(<JijangganSection jijanggan={jijanggan} />)
    // 중기 레이블은 2개만 있어야 함 (month, day만 중기 있음)
    const middleLabels = screen.getAllByText('중기')
    expect(middleLabels).toHaveLength(2)
  })

  it('여기/중기/정기 레이블을 표시한다', () => {
    render(<JijangganSection jijanggan={jijanggan} />)
    expect(screen.getAllByText('여기').length).toBeGreaterThan(0)
    expect(screen.getAllByText('정기').length).toBeGreaterThan(0)
  })
})
