import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OhangBar } from '../OhangBar'

describe('OhangBar', () => {
  const defaultProps = {
    label: '목(木)',
    value: 35.7,
    colorClass: 'bg-[#2d5a27]',
    textColorClass: 'text-[#2d5a27]',
  }

  it('label을 렌더링한다', () => {
    render(<OhangBar {...defaultProps} />)
    expect(screen.getByText('목(木)')).toBeInTheDocument()
  })

  it('value를 반올림하여 퍼센트로 표시한다', () => {
    render(<OhangBar {...defaultProps} />)
    expect(screen.getByText('36%')).toBeInTheDocument()
  })

  it('진행 바 너비가 퍼센트에 맞게 설정된다', () => {
    render(<OhangBar {...defaultProps} />)
    const progressBar = document.querySelector('[style*="width"]')
    expect(progressBar).toHaveStyle({ width: '36%' })
  })

  it('colorClass가 진행 바에 적용된다', () => {
    render(<OhangBar {...defaultProps} />)
    const progressBar = document.querySelector('.bg-\\[\\#2d5a27\\]')
    expect(progressBar).toBeInTheDocument()
  })
})
