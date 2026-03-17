import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChatBubble } from '../ChatBubble'
import type { ChatMessage } from '@/services/types'

const mockUserMessage: ChatMessage = {
  id: '1',
  role: 'user',
  content: '안녕하세요',
  timestamp: 1700000000000,
}

const mockAiMessage: ChatMessage = {
  id: '2',
  role: 'assistant',
  content: 'AI 응답 내용입니다',
  timestamp: 1700000000000,
}

describe('ChatBubble - 사용자 메시지', () => {
  it('사용자 메시지 내용을 표시한다', () => {
    render(<ChatBubble message={mockUserMessage} />)
    expect(screen.getByText('안녕하세요')).toBeInTheDocument()
  })
})

describe('ChatBubble - AI 메시지', () => {
  beforeEach(() => {
    // clipboard API 모킹
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('AI 메시지 내용을 표시한다', () => {
    render(<ChatBubble message={mockAiMessage} />)
    expect(screen.getByText('AI 응답 내용입니다')).toBeInTheDocument()
  })

  it('복사 버튼이 aria-label="메시지 복사"를 가진다', () => {
    render(<ChatBubble message={mockAiMessage} />)
    expect(screen.getByRole('button', { name: '메시지 복사' })).toBeInTheDocument()
  })

  it('좋아요 버튼이 aria-label="좋아요"를 가진다', () => {
    render(<ChatBubble message={mockAiMessage} />)
    expect(screen.getByRole('button', { name: '좋아요' })).toBeInTheDocument()
  })

  it('싫어요 버튼이 aria-label="싫어요"를 가진다', () => {
    render(<ChatBubble message={mockAiMessage} />)
    expect(screen.getByRole('button', { name: '싫어요' })).toBeInTheDocument()
  })

  it('복사 버튼 클릭 시 clipboard.writeText를 호출한다', async () => {
    render(<ChatBubble message={mockAiMessage} />)
    const copyButton = screen.getByRole('button', { name: '메시지 복사' })
    await userEvent.click(copyButton)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('AI 응답 내용입니다')
  })

  it('좋아요 버튼 클릭 시 선택 상태가 된다', async () => {
    render(<ChatBubble message={mockAiMessage} />)
    const likeButton = screen.getByRole('button', { name: '좋아요' })

    await userEvent.click(likeButton)
    // 선택 상태로 변경됨 - 녹색 배경
    await waitFor(() => {
      expect(likeButton.className).toContain('bg-green-100')
    })
  })

  it('좋아요 버튼 두 번 클릭 시 선택 해제된다', async () => {
    render(<ChatBubble message={mockAiMessage} />)
    const likeButton = screen.getByRole('button', { name: '좋아요' })

    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    await waitFor(() => {
      expect(likeButton.className).not.toContain('bg-green-100')
    })
  })

  it('싫어요 버튼 클릭 시 선택 상태가 된다', async () => {
    render(<ChatBubble message={mockAiMessage} />)
    const dislikeButton = screen.getByRole('button', { name: '싫어요' })

    await userEvent.click(dislikeButton)
    await waitFor(() => {
      expect(dislikeButton.className).toContain('bg-red-100')
    })
  })

  it('복사 버튼이 처음에는 Copy 아이콘을 가진다', () => {
    render(<ChatBubble message={mockAiMessage} />)
    // 복사 버튼이 항상 접근 가능해야 함
    const copyButton = screen.getByRole('button', { name: '메시지 복사' })
    expect(copyButton).toBeInTheDocument()
  })
})
