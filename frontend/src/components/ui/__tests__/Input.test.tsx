import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Input } from '../Input'

describe('Input', () => {
  it('기본 input을 렌더링한다', () => {
    render(<Input placeholder="텍스트 입력" />)
    expect(screen.getByPlaceholderText('텍스트 입력')).toBeInTheDocument()
  })

  it('error prop이 있을 때 에러 메시지를 표시한다', () => {
    render(<Input error="필수 입력 항목입니다" />)
    expect(screen.getByText('필수 입력 항목입니다')).toBeInTheDocument()
  })

  it('error prop이 있을 때 aria-invalid=true가 설정된다', () => {
    render(<Input error="오류" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('helperText prop을 표시한다', () => {
    render(<Input helperText="생년월일을 입력해 주세요" />)
    expect(screen.getByText('생년월일을 입력해 주세요')).toBeInTheDocument()
  })

  it('disabled 상태에서 cursor-not-allowed 클래스를 가진다', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('cursor-not-allowed')
  })
})
