import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ShinsalSection } from '../ShinsalSection'
import type { ShinsalItem } from '@/services/types'

const shinsalItems: ShinsalItem[] = [
  { name: '역마살', trigger_ji: '인', description: '이동이 많은 살' },
  { name: '도화살', trigger_ji: '자', description: null },
]

describe('ShinsalSection', () => {
  it('shinsal이 null이면 빈 메시지를 표시한다', () => {
    render(<ShinsalSection shinsal={null} />)
    expect(screen.getByText('이 사주에는 주요 신살이 없습니다')).toBeInTheDocument()
  })

  it('shinsal이 빈 배열이면 빈 메시지를 표시한다', () => {
    render(<ShinsalSection shinsal={[]} />)
    expect(screen.getByText('이 사주에는 주요 신살이 없습니다')).toBeInTheDocument()
  })

  it('섹션 제목 "신살"을 렌더링한다', () => {
    render(<ShinsalSection shinsal={shinsalItems} />)
    expect(screen.getByText('신살')).toBeInTheDocument()
  })

  it('신살 이름을 렌더링한다', () => {
    render(<ShinsalSection shinsal={shinsalItems} />)
    expect(screen.getByText('역마살')).toBeInTheDocument()
    expect(screen.getByText('도화살')).toBeInTheDocument()
  })

  it('trigger_ji를 렌더링한다', () => {
    render(<ShinsalSection shinsal={shinsalItems} />)
    expect(screen.getByText('인')).toBeInTheDocument()
    expect(screen.getByText('자')).toBeInTheDocument()
  })

  it('description이 있으면 렌더링한다', () => {
    render(<ShinsalSection shinsal={shinsalItems} />)
    expect(screen.getByText('이동이 많은 살')).toBeInTheDocument()
  })

  it('description이 null이면 설명 텍스트를 표시하지 않는다', () => {
    render(<ShinsalSection shinsal={shinsalItems} />)
    // 도화살은 description이 null이므로 빈 설명이 없어야 함
    const cards = document.querySelectorAll('[data-testid="shinsal-card"]')
    expect(cards.length).toBe(2)
  })
})
