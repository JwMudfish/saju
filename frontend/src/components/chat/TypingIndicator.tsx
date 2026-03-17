// TypingIndicator.tsx: AI 응답 중 타이핑 애니메이션 인디케이터
export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      {/* AI 아바타 */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-base text-primary">auto_awesome</span>
      </div>

      {/* 점 애니메이션 버블 */}
      <div className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-sm">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
