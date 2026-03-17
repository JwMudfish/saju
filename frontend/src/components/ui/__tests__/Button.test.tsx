import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button', () => {
  it('기본 텍스트를 렌더링한다', () => {
    render(<Button>클릭</Button>)
    expect(screen.getByRole('button', { name: '클릭' })).toBeInTheDocument()
  })

  it('isLoading=true일 때 Spinner를 표시하고 비활성화된다', () => {
    render(<Button isLoading>로딩 중</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    // Spinner의 aria-label 확인
    expect(screen.getByRole('status', { name: '로딩 중' })).toBeInTheDocument()
  })

  it('disabled=true일 때 클릭 이벤트가 발생하지 않는다', async () => {
    const handleClick = vi.fn()
    render(<Button disabled onClick={handleClick}>비활성</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('primary variant가 기본값이다', () => {
    render(<Button>기본</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-primary')
  })

  it('danger variant를 렌더링한다', () => {
    render(<Button variant="danger">삭제</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-red-600')
  })

  it('onClick 핸들러가 호출된다', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>클릭</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
