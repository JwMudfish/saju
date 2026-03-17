---
id: SPEC-UI-006
version: "1.0.0"
status: completed
created: "2026-03-18"
updated: "2026-03-18"
author: jw
priority: high
issue_number: 0
---

# SPEC-UI-006: React/TypeScript Frontend UX/UI 개선

## HISTORY

| 버전    | 날짜         | 작성자 | 변경 내용     |
| ------- | ------------ | ------ | ------------- |
| 1.0.0   | 2026-03-18   | jw     | 초기 SPEC 작성 |

---

## 1. 개요

사주 프로젝트의 React 19 + TypeScript 5.9 프론트엔드에서 발견된 15개 UX/UI 이슈를 체계적으로 개선한다. Loading State 부재, 에러 복구 UI 미비, 접근성 위반, 모바일 반응형 깨짐, 컴포넌트 일관성 결여 등 사용자 경험에 직접적인 영향을 미치는 문제들을 해결한다.

### 기술 스택

- Frontend: React 19 + TypeScript 5.9 + Vite + Tailwind CSS
- Backend: FastAPI `/api/v1`
- State Management: Zustand v5 (persist)
- 대상 페이지: LandingPage, InputPage, LoadingPage, ReportPage, ChatPage

---

## 2. Environment (환경)

- React 19 Server Components 및 Client Components 혼합 환경
- Vite 빌드 시스템 기반
- Tailwind CSS 유틸리티 클래스 기반 스타일링
- Zustand v5 persist 미들웨어를 통한 상태 영속화
- FastAPI `/api/v1` 백엔드 REST API
- 모바일 및 데스크톱 브라우저 지원 필요

---

## 3. Assumptions (가정)

- A1: 백엔드 API 응답 시간은 평균 2~5초이며, 이 동안 사용자에게 시각적 피드백이 필요하다.
- A2: 모바일 사용자 비율이 50% 이상이므로 모바일 우선 반응형 대응이 필수적이다.
- A3: WCAG 2.1 AA 수준의 접근성을 목표로 한다.
- A4: 기존 Tailwind CSS 기반 스타일링을 유지하되, 공유 컴포넌트를 통해 일관성을 확보한다.
- A5: ChatBubble 내 버튼(복사, 좋아요, 싫어요)은 향후 피드백 수집 API와 연동할 예정이다.

---

## 4. Requirements (요구사항)

### 모듈 1: UX 기본 흐름 (Loading State, Error Recovery, New Analysis CTA)

**REQ-UI006-001** [HARD]
WHEN API 호출이 시작되면 THE 시스템은 SHALL 호출 대상 영역에 Skeleton UI 또는 Spinner를 표시한다.
- 적용 대상: LandingPage, InputPage에서의 API fetch
- Loading 상태는 API 응답 수신 또는 타임아웃(30초) 시 해제된다.

**REQ-UI006-002** [HARD]
WHEN API 호출이 실패하면 THE 시스템은 SHALL 사용자 친화적 에러 메시지와 "다시 시도" 버튼을 표시한다.
- 에러 UI는 HTTP 상태 코드에 따라 분류된 메시지를 제공한다 (네트워크 오류, 서버 오류, 타임아웃).
- "다시 시도" 버튼 클릭 시 동일한 API 호출을 재실행한다.

**REQ-UI006-003** [HARD]
WHEN ReportPage에서 사주 분석 결과를 확인한 후 THE 시스템은 SHALL "새로운 분석 시작" CTA 버튼을 제공한다.
- 버튼 클릭 시 InputPage로 이동하며, 이전 입력 상태를 초기화한다.

### 모듈 2: 접근성 (Accessibility)

**REQ-UI006-004** [HARD]
THE ProgressBar 컴포넌트는 SHALL `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` 속성을 포함한다.
- `aria-valuenow`는 현재 진행률(0~100)을 동적으로 반영한다.

**REQ-UI006-005** [HARD]
THE 아이콘 전용 버튼(복사, 좋아요, 싫어요, 공유)은 SHALL `aria-label` 속성을 포함한다.
- 각 버튼의 기능을 명확히 설명하는 한국어 레이블을 제공한다.

**REQ-UI006-006** [HARD]
THE 시스템은 SHALL 모든 텍스트 요소에서 WCAG 2.1 AA 기준 색상 대비(4.5:1 이상)를 충족한다.
- 특히 강조 색상 골드(#D4AF37)가 어두운 배경 위에서 사용될 때, 대비 비율이 4.5:1 미만인 경우 대체 색상을 적용한다.

### 모듈 3: 모바일 반응형

**REQ-UI006-007** [HARD]
WHILE 화면 너비가 768px 미만일 때 THE LandingPage는 SHALL 모바일 내비게이션 헤더를 표시한다.
- 햄버거 메뉴 또는 간소화된 내비게이션 UI를 제공한다.

**REQ-UI006-008** [HARD]
WHILE 화면 너비가 640px 미만일 때 THE OhangRatio 2열 그리드 레이아웃은 SHALL 1열 레이아웃으로 전환된다.
- 각 오행 항목의 가독성이 유지되어야 한다.

**REQ-UI006-009** [SOFT]
WHILE 채팅 칩 리스트가 수평 스크롤 가능한 상태일 때 THE 시스템은 SHALL 스크롤 가능 힌트(그라디언트 페이드 또는 화살표 인디케이터)를 표시한다.

### 모듈 4: 컴포넌트 일관성

**REQ-UI006-010** [HARD]
THE 시스템은 SHALL 공유 UI 컴포넌트(Button, Input, Card)를 `src/components/ui/` 디렉토리에 추출하여 일관된 스타일을 적용한다.
- Button: 크기(sm, md, lg), 변형(primary, secondary, ghost, danger) 지원
- Input: 기본, 에러, 비활성화 상태 지원
- Card: 일관된 그림자, 테두리, 패딩 적용

**REQ-UI006-011** [HARD]
THE OhangBar 컴포넌트는 SHALL ReportPage 내부의 인라인 정의에서 독립 파일(`src/components/report/OhangBar.tsx`)로 추출된다.

**REQ-UI006-012** [SOFT]
THE 시스템은 SHALL 타이포그래피 계층을 통일한다.
- 페이지 제목: `text-3xl font-bold`
- 섹션 제목: `text-2xl font-semibold`
- 본문: `text-base`
- 캡션: `text-sm text-gray-500`

**REQ-UI006-013** [SOFT]
THE 시스템은 SHALL 버튼 그림자 스타일을 통일한다.
- Primary 버튼: `shadow-md`
- Secondary/Ghost 버튼: `shadow-sm` 또는 `shadow-none`

### 모듈 5: 채팅 인터페이스

**REQ-UI006-014** [HARD]
WHEN ChatBubble 내 복사 버튼이 클릭되면 THE 시스템은 SHALL 해당 메시지 텍스트를 클립보드에 복사하고, 복사 완료 피드백(토스트 또는 아이콘 변경)을 표시한다.

**REQ-UI006-015** [HARD]
WHEN ChatBubble 내 좋아요/싫어요 버튼이 클릭되면 THE 시스템은 SHALL 선택 상태를 시각적으로 표시하고, 로컬 상태에 저장한다.
- 향후 피드백 API 연동 시 서버 전송으로 확장 가능한 구조로 설계한다.

**REQ-UI006-016** [HARD]
WHEN 사용자가 채팅 입력 필드에서 Enter 키를 누르면 THE 시스템은 SHALL 메시지를 전송한다.
- Shift+Enter는 줄바꿈으로 동작한다.
- 빈 메시지는 전송하지 않는다.

---

## 5. Specifications (사양)

### 공유 컴포넌트 구조

```
src/components/ui/
  Button.tsx        -- 크기/변형 Props 기반 공유 버튼
  Input.tsx         -- 상태별 스타일 지원 공유 입력
  Card.tsx          -- 일관된 컨테이너 컴포넌트
  Spinner.tsx       -- 로딩 인디케이터
  ErrorMessage.tsx  -- 에러 표시 + 재시도 버튼
  Toast.tsx         -- 토스트 알림 컴포넌트

src/components/report/
  OhangBar.tsx      -- ReportPage에서 추출된 오행 바 차트
```

### 색상 접근성 대체안

| 기존 색상               | 용도         | 대비 이슈                     | 대체 색상 제안         |
| ----------------------- | ------------ | ----------------------------- | ---------------------- |
| #D4AF37 (Gold)          | 강조 텍스트   | 어두운 배경에서 AA 미충족 가능 | #E8C547 또는 #F0D060   |

### Loading State 적용 범위

| 페이지       | 트리거              | Loading UI 유형       |
| ------------ | -------------------- | --------------------- |
| LandingPage  | 초기 데이터 fetch    | Skeleton UI           |
| InputPage    | 분석 요청 API 호출   | Full-screen Spinner   |
| ChatPage     | 메시지 전송          | 인라인 Spinner        |

---

## 6. Traceability (추적성)

| 요구사항 ID      | 관련 파일/영역                    | plan.md 참조       | acceptance.md 참조 |
| ----------------- | --------------------------------- | ------------------- | ------------------- |
| REQ-UI006-001     | LandingPage, InputPage            | Phase 2             | AC-001              |
| REQ-UI006-002     | ErrorMessage 컴포넌트              | Phase 2             | AC-002              |
| REQ-UI006-003     | ReportPage                        | Phase 2             | AC-003              |
| REQ-UI006-004     | ProgressBar                       | Phase 3             | AC-004              |
| REQ-UI006-005     | ChatBubble, IconButton            | Phase 3             | AC-004              |
| REQ-UI006-006     | 전역 색상 시스템                   | Phase 3             | AC-004              |
| REQ-UI006-007     | LandingPage                       | Phase 4             | AC-005              |
| REQ-UI006-008     | ReportPage OhangRatio             | Phase 4             | AC-005              |
| REQ-UI006-009     | ChatPage 칩 리스트                 | Phase 4             | AC-005              |
| REQ-UI006-010     | src/components/ui/                | Phase 1             | AC-006              |
| REQ-UI006-011     | OhangBar.tsx                      | Phase 1             | AC-006              |
| REQ-UI006-012     | 전역 타이포그래피                  | Phase 1             | AC-006              |
| REQ-UI006-013     | 전역 버튼 스타일                   | Phase 1             | AC-006              |
| REQ-UI006-014     | ChatBubble 복사 버튼               | Phase 2             | AC-007              |
| REQ-UI006-015     | ChatBubble 좋아요/싫어요           | Phase 2             | AC-007              |
| REQ-UI006-016     | ChatPage 입력 필드                 | Phase 2             | AC-007              |

---

## 7. Implementation Notes (구현 완료)

SPEC-UI-006 구현이 2026-03-18에 완료되었습니다.

### 생성된 컴포넌트

**공유 UI 컴포넌트** (`src/components/ui/`):
- `Button.tsx` — cva 기반, 4개 변형(primary, secondary, ghost, danger), 3개 크기(sm, md, lg), isLoading 상태 지원
- `Input.tsx` — aria-invalid 지원, error/helperText props, 상태별 스타일
- `Card.tsx` — cva 기반, variant/padding 지원, 일관된 컨테이너
- `Spinner.tsx` — role="status", aria-label="로딩 중"
- `ErrorMessage.tsx` — errorType(network/server/timeout), 한국어 메시지, 재시도 버튼
- `Toast.tsx` — @radix-ui/react-toast 기반, useToast 훅

**특수 컴포넌트** (`src/components/report/`):
- `OhangBar.tsx` — ReportPage에서 추출된 오행 바 차트

### 기능 개선 사항

**Loading State**: LandingPage, InputPage, ChatPage에 로딩 인디케이터 추가
**Error Recovery**: HTTP 오류별 분류된 에러 메시지 및 재시도 버튼 (REQ-UI006-002)
**접근성**:
- ProgressBar에 ARIA 속성 추가 (role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax)
- 아이콘 버튼에 aria-label 추가
- 골드 색상 (#D4AF37) → #E8C547로 변경 (WCAG AA 대비율 충족)

**모바일 반응형**:
- LandingPage 모바일 내비게이션 헤더 (화면 < 768px)
- OhangRatio 2열 → 1열 레이아웃 (화면 < 640px)
- ChatPage 칩 리스트 스크롤 힌트

**컴포넌트 일관성**:
- 공유 UI 컴포넌트로 스타일 통일
- 타이포그래피 계층 정리 (제목, 섹션, 본문, 캡션)
- 버튼 그림자 스타일 통일

**채팅 기능**:
- ChatBubble 복사 버튼 (클립보드 복사 + 토스트)
- 좋아요/싫어요 버튼 (로컬 상태 저장, 향후 API 연동)
- Textarea IME-safe Enter 키 처리 (Shift+Enter = 줄바꿈)

### 의존성

- `class-variance-authority` — cva 기반 컴포넌트 스타일링
- `clsx` — 조건부 className 결합
- `tailwind-merge` — Tailwind 클래스 병합
- `@radix-ui/react-toast` — Toast 컴포넌트
- `lucide-react` — 아이콘 라이브러리

### 테스트 완료

39개 테스트, 7개 테스트 파일에서 모든 요구사항 검증 완료.

### 커밋 해시

구현 완료: commit `f9728bd`
