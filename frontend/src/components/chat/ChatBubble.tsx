// ChatBubble.tsx: 채팅 메시지 버블 컴포넌트 (레퍼런스 디자인 기반)
import type { ChatMessage } from '@/services/types'

interface ChatBubbleProps {
  message: ChatMessage
}

// 타임스탬프를 HH:MM 형식으로 변환
function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user'

  if (isUser) {
    // 사용자 메시지: 오른쪽 정렬
    return (
      <div className="flex items-end gap-3 justify-end ml-auto max-w-[85%]">
        <div className="flex flex-col gap-1.5 items-end">
          <p className="text-primary text-[11px] font-bold uppercase tracking-widest px-1">당신</p>
          <div className="rounded-2xl rounded-br-none px-5 py-3.5 bg-primary text-white shadow-md">
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>
          <span className="text-[10px] text-slate-400 px-1">{formatTime(message.timestamp)}</span>
        </div>
        {/* 사용자 아바타 */}
        <div className="flex-shrink-0 size-10 rounded-full overflow-hidden border-2 border-primary/20 bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-lg">person</span>
        </div>
      </div>
    )
  }

  // AI 메시지: 왼쪽 정렬
  return (
    <div className="flex items-end gap-3 max-w-[85%]">
      {/* AI 아바타 */}
      <div className="flex-shrink-0 bg-primary/10 border border-primary/20 rounded-full p-1">
        <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white">
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 items-start">
        <p className="text-primary text-[11px] font-bold uppercase tracking-widest px-1">
          Saju Coach
        </p>
        <div className="rounded-2xl rounded-bl-none px-5 py-3.5 bg-white dark:bg-slate-800 shadow-sm border border-primary/5 text-slate-800 dark:text-slate-200">
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>

        {/* AI 메시지 액션 버튼 */}
        <div className="flex gap-2 mt-1">
          <button
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/5 hover:bg-primary/10 text-primary text-xs font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-sm">thumb_up</span>
            도움이 돼요
          </button>
          <button
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/5 hover:bg-primary/10 text-primary text-xs font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-sm">share</span>
            공유하기
          </button>
        </div>

        <span className="text-[10px] text-slate-400 px-1">{formatTime(message.timestamp)}</span>
      </div>
    </div>
  )
}
