import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChatMessage } from '@/services/types'

interface ChatState {
  messages: ChatMessage[]
  sessionId: string
  isTyping: boolean

  // 액션
  addMessage: (message: ChatMessage) => void
  setTyping: (typing: boolean) => void
  clearMessages: () => void
  generateSessionId: () => void
}

function createSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      sessionId: createSessionId(),
      isTyping: false,

      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),

      setTyping: (isTyping) => set({ isTyping }),

      clearMessages: () =>
        set({ messages: [], sessionId: createSessionId() }),

      generateSessionId: () => set({ sessionId: createSessionId() }),
    }),
    {
      name: 'chat-store',
      partialize: (state) => ({
        messages: state.messages,
        sessionId: state.sessionId,
      }),
    },
  ),
)
