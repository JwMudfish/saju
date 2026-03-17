// ChatPage.tsx: AI 채팅 페이지 (레퍼런스 디자인 기반)
import { useState, useRef, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useSajuStore } from '@/stores/sajuStore'
import { useChatStore } from '@/stores/chatStore'
import { sendChatMessage } from '@/services/sajuApi'
import { ChatBubble } from '@/components/chat/ChatBubble'
import { TypingIndicator } from '@/components/chat/TypingIndicator'
import { PRESET_QUESTIONS } from '@/lib/constants'
import type { ChatMessage } from '@/services/types'

export function ChatPage() {
  const navigate = useNavigate()
  const { result, _hydrated } = useSajuStore()
  const { messages, sessionId, isTyping, addMessage, setTyping } = useChatStore()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 새 메시지 추가 시 맨 아래로 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // 메시지 전송 처리
  async function handleSend(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    setInput('')

    // 사용자 메시지 추가
    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    }
    addMessage(userMessage)

    // AI 응답 요청
    setTyping(true)
    try {
      const response = await sendChatMessage({
        message: trimmed,
        session_id: sessionId,
        context: { saju_result: result },
      })

      const aiMessage: ChatMessage = {
        id: `${Date.now()}-ai`,
        role: 'assistant',
        content: response.message,
        timestamp: Date.now(),
      }
      addMessage(aiMessage)
    } catch {
      const errorMessage: ChatMessage = {
        id: `${Date.now()}-error`,
        role: 'assistant',
        content: '죄송합니다, 응답 중 오류가 발생했습니다. 다시 시도해 주세요.',
        timestamp: Date.now(),
      }
      addMessage(errorMessage)
    } finally {
      setTyping(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSend(input)
    }
  }

  // localStorage 복원 전에는 렌더링 보류
  if (!_hydrated) return null

  // 결과가 없으면 온보딩으로 리다이렉트
  if (!result) {
    return <Navigate to="/onboarding" replace />
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      {/* 상단 헤더 */}
      <header className="flex items-center justify-between border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          {/* AI 아바타 */}
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-white">
            <span className="material-symbols-outlined">storm</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
              사주 코치 상담 중
            </h1>
            {/* 온라인 상태 표시 */}
            <div className="flex items-center gap-1.5">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-green-500" />
              </span>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                상담 가능
              </p>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate('/report')}
            className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            aria-label="리포트로 돌아가기"
          >
            <span className="material-symbols-outlined">history</span>
          </button>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            aria-label="더보기"
          >
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </header>

      {/* 채팅 영역 */}
      <main className="flex-1 overflow-y-auto px-4 py-6 md:px-20 lg:px-40 space-y-6">
        {/* 메시지가 없을 때 안내 */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-3xl text-primary">
                chat_bubble_outline
              </span>
            </div>
            <p className="text-base font-semibold text-slate-600 dark:text-slate-400 mb-1">
              사주 코치에게 무엇이든 물어보세요
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              당신의 사주를 기반으로 맞춤형 답변을 드립니다
            </p>
          </div>
        )}

        {/* 채팅 버블 목록 */}
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {/* 타이핑 인디케이터 */}
        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </main>

      {/* 하단 액션 영역 */}
      <footer className="bg-white dark:bg-background-dark border-t border-primary/10 p-4 md:px-20 lg:px-40 space-y-4">
        {/* 프리셋 질문 칩 */}
        <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {PRESET_QUESTIONS.map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => void handleSend(q.label)}
              disabled={isTyping}
              className="flex h-9 flex-shrink-0 items-center justify-center gap-x-2 rounded-full border border-primary/20 bg-primary/5 px-4 hover:bg-primary/10 transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm text-primary">{q.icon}</span>
              <p className="text-slate-700 dark:text-slate-200 text-xs font-semibold">{q.label}</p>
            </button>
          ))}
        </div>

        {/* 입력창 */}
        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-xl p-2 pl-4 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
          <button
            type="button"
            className="text-slate-400 hover:text-primary transition-colors flex-shrink-0"
            aria-label="첨부"
          >
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="사주 코치에게 무엇이든 물어보세요..."
            disabled={isTyping}
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none disabled:opacity-50"
          />
          <button
            type="button"
            className="text-slate-400 hover:text-primary transition-colors flex-shrink-0"
            aria-label="이모지"
          >
            <span className="material-symbols-outlined">mood</span>
          </button>
          <button
            type="button"
            onClick={() => void handleSend(input)}
            disabled={!input.trim() || isTyping}
            aria-label="전송"
            className="flex size-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-40 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>

        <p className="text-center text-[10px] text-slate-400 uppercase tracking-tighter">
          POWERED BY DESTINY ENGINE
        </p>
      </footer>
    </div>
  )
}
