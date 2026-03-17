import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from '../Card'

describe('Card', () => {
  it('children을 렌더링한다', () => {
    render(<Card>카드 내용</Card>)
    expect(screen.getByText('카드 내용')).toBeInTheDocument()
  })

  it('기본 variant는 default이다', () => {
    const { container } = render(<Card>내용</Card>)
    // CSS가 disabled이므로 클래스명으로 검증
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('rounded-xl')
    expect(card.className).toContain('border')
  })

  it('elevated variant 클래스가 적용된다', () => {
    const { container } = render(<Card variant="elevated">내용</Card>)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('shadow-md')
  })

  it('padding lg 클래스가 적용된다', () => {
    const { container } = render(<Card padding="lg">내용</Card>)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('p-8')
  })

  it('className prop이 병합된다', () => {
    const { container } = render(<Card className="custom-class">내용</Card>)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('custom-class')
  })
})
