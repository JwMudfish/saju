---
name: UI 레퍼런스 기반 전면 재구현
description: front_example/ 폴더의 레퍼런스 HTML 4개를 분석해 React 컴포넌트 전면 재구현한 작업
type: project
---

front_example/ 폴더의 레퍼런스 HTML을 기반으로 React 컴포넌트를 전면 재구현했다.

**Why:** 기존 컴포넌트의 디자인이 레퍼런스 HTML 디자인과 다르게 구현되어 있어 레퍼런스에 최대한 맞게 재구현 요청.

**How to apply:** 향후 UI 수정 시 front_example/ 폴더의 레퍼런스 HTML을 먼저 확인한다.

## 재구현된 파일 목록

1. `src/pages/LandingPage.tsx` - 풀 네비게이션 헤더 + 2컬럼 히어로 + 3컬럼 기능 카드 + CTA 섹션 + 푸터
2. `src/pages/OnboardingPage.tsx` - temple icon 헤더 + primary 색상 진행바 + 데코레이션 푸터
3. `src/components/onboarding/StepBirthInfo.tsx` - primary/50 uppercase 레이블 + border-2 border-primary/20 인풋 + 아이콘 인풋
4. `src/pages/ReportPage.tsx` - sticky 헤더 + lg:grid-cols-12 2컬럼 레이아웃 + 만세력/성향/3년흐름 + 오행비율 사이드바 + AI 질문 푸터
5. `src/pages/ChatPage.tsx` - h-screen 전체화면 + primary 원형 아바타 + 초록 상태 dot + 스타일 버블 + 프리셋 칩 + add/emoji/send 입력바
6. `src/components/report/PillarGrid.tsx` - aspect-square 셀 + element-* CSS 클래스 + 3행(헤더/천간/지지) 그리드 + 일간 accent-gold 링
7. `src/components/chat/ChatBubble.tsx` - 이름 레이블 위에 표시 + rounded-bl-none/rounded-br-none + AI 메시지 액션버튼 (thumb_up, share)

## 핵심 디자인 패턴

- primary: #800020 (딥 버건디)
- accent-gold: #C5A059
- 헤더: border-b border-primary/10, bg-white/80 backdrop-blur-md sticky
- 버튼: bg-primary text-white shadow-lg shadow-primary/20
- 카드: border border-primary/10 rounded-xl bg-white dark:bg-slate-900
- 인풋: border-2 border-primary/20 focus:border-primary rounded-xl py-4
- element 클래스: element-wood/fire/earth/metal/water (src/styles/index.css에 정의)

## 중요 제약사항

- stores, services, hooks, lib 파일은 절대 수정 금지
- TypeScript strict mode 유지 (tsc --noEmit 통과 필수)
- @/ 절대 경로 사용
- 한국어 코드 주석
