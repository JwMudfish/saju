import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProgressBar } from '../ProgressBar'

// ONBOARDING_TOTAL_STEPS = 3 기준
describe('ProgressBar', () => {
  it('role=progressbar를 가진다', () => {
    render(<ProgressBar currentStep={1} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('aria-valuemin=0을 가진다', () => {
    render(<ProgressBar currentStep={1} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0')
  })

  it('aria-valuemax=100을 가진다', () => {
    render(<ProgressBar currentStep={2} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100')
  })

  it('aria-valuenow가 퍼센트 값(0-100)을 반영한다', () => {
    render(<ProgressBar currentStep={2} />)
    // 2/3 * 100 = 67%
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '67')
  })

  it('aria-label="분석 진행률"을 가진다', () => {
    render(<ProgressBar currentStep={1} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', '분석 진행률')
  })

  it('단계 정보 텍스트를 표시한다', () => {
    render(<ProgressBar currentStep={2} />)
    expect(screen.getByText('2 / 3 단계')).toBeInTheDocument()
  })
})
