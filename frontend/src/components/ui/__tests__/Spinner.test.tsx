import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Spinner } from '../Spinner'

describe('Spinner', () => {
  it('role=status와 aria-label="로딩 중"을 가진다', () => {
    render(<Spinner />)
    expect(screen.getByRole('status', { name: '로딩 중' })).toBeInTheDocument()
  })

  it('size sm 클래스를 적용한다', () => {
    render(<Spinner size="sm" />)
    const spinner = screen.getByRole('status')
    expect(spinner.className).toContain('size-4')
  })

  it('size lg 클래스를 적용한다', () => {
    render(<Spinner size="lg" />)
    const spinner = screen.getByRole('status')
    expect(spinner.className).toContain('size-8')
  })
})
