# SPEC-UI-006: 구현 계획

> SPEC 참조: [spec.md](./spec.md)
> 수락 기준: [acceptance.md](./acceptance.md)

---

## 1. 구현 전략

본 SPEC은 4개 Phase로 나뉘며, 각 Phase는 의존성을 기반으로 순서를 결정한다. Phase 1(컴포넌트 추출)이 선행되어야 Phase 2~4에서 공유 컴포넌트를 활용할 수 있다.

---

## 2. Phase 분해

### Phase 1: 컴포넌트 추출 및 공유 컴포넌트 생성 [Priority: High]

**목표**: 재사용 가능한 공유 UI 컴포넌트를 추출하고, 기존 인라인 컴포넌트를 독립 파일로 분리한다.

**작업 항목**:

1. `src/components/ui/Button.tsx` 생성
   - Props: `variant` (primary | secondary | ghost | danger), `size` (sm | md | lg), `isLoading`, `disabled`
   - Tailwind 클래스 매핑 테이블 정의
   - 기존 ad-hoc 버튼을 모두 공유 Button으로 교체

2. `src/components/ui/Input.tsx` 생성
   - Props: `error`, `disabled`, `helperText`
   - 상태별 border/ring 색상 적용

3. `src/components/ui/Card.tsx` 생성
   - Props: `variant` (default | elevated), `padding` (sm | md | lg)
   - 일관된 `shadow-md`, `rounded-xl`, `border` 적용

4. `src/components/ui/Spinner.tsx` 생성
   - Props: `size` (sm | md | lg), `color`
   - `aria-label="로딩 중"` 포함

5. `src/components/report/OhangBar.tsx` 추출
   - ReportPage 내부 인라인 정의를 독립 파일로 이동
   - Props 인터페이스 정의, 기존 동작 보존 확인

6. 타이포그래피 일관성 적용
   - 페이지 제목: `text-3xl font-bold`
   - 섹션 제목: `text-2xl font-semibold`
   - 본문: `text-base`, 캡션: `text-sm text-gray-500`

7. 버튼 그림자 통일
   - Primary: `shadow-md`, Secondary/Ghost: `shadow-sm`

**관련 요구사항**: REQ-UI006-010, REQ-UI006-011, REQ-UI006-012, REQ-UI006-013

**산출물**:
- `src/components/ui/Button.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Spinner.tsx`
- `src/components/report/OhangBar.tsx`
- 기존 페이지 파일 업데이트 (import 변경)

---

### Phase 2: UX/Loading/Error 상태 및 채팅 인터페이스 [Priority: High]

**목표**: API 호출 시 Loading 상태 표시, 에러 복구 UI, 새 분석 CTA, 채팅 버튼 기능 구현

**작업 항목**:

1. `src/components/ui/ErrorMessage.tsx` 생성
   - Props: `message`, `onRetry`, `errorType` (network | server | timeout)
   - 에러 유형별 사용자 친화적 메시지 매핑
   - "다시 시도" 버튼 포함

2. `src/components/ui/Toast.tsx` 생성
   - Props: `message`, `type` (success | error | info), `duration`
   - 자동 소멸 타이머

3. LandingPage Loading State 추가
   - API fetch 시작 시 Skeleton UI 표시
   - 에러 발생 시 ErrorMessage 표시

4. InputPage Loading State 추가
   - 분석 요청 시 Full-screen Spinner 오버레이
   - 에러 발생 시 ErrorMessage 표시 + 재시도

5. ReportPage "새로운 분석 시작" CTA 추가
   - 리포트 하단에 Button 컴포넌트 활용
   - 클릭 시 InputPage 이동 + Zustand 상태 초기화

6. ChatBubble 복사 버튼 onClick 핸들러
   - `navigator.clipboard.writeText()` 호출
   - 복사 완료 시 Toast 표시 또는 아이콘 변경 (체크 아이콘 2초)

7. ChatBubble 좋아요/싫어요 onClick 핸들러
   - 로컬 상태(useState)로 선택 상태 관리
   - 선택 시 시각적 강조 (색상 변경)
   - 확장 가능한 구조: 추후 `POST /api/v1/feedback` 연동 포인트 주석 표기

8. 채팅 입력 Enter 키 전송
   - `onKeyDown` 핸들러: Enter = 전송, Shift+Enter = 줄바꿈
   - 빈 메시지(trim 후 빈 문자열) 전송 방지

**관련 요구사항**: REQ-UI006-001~003, REQ-UI006-014~016

**의존성**: Phase 1 완료 (Button, Spinner, Card 컴포넌트 필요)

---

### Phase 3: 접근성 개선 [Priority: High]

**목표**: WCAG 2.1 AA 기준 충족을 위한 ARIA 속성 추가 및 색상 대비 수정

**작업 항목**:

1. ProgressBar ARIA 속성 추가
   - `role="progressbar"`
   - `aria-valuenow={currentValue}`
   - `aria-valuemin={0}`
   - `aria-valuemax={100}`
   - `aria-label="분석 진행률"`

2. 아이콘 전용 버튼 aria-label 추가
   - 복사 버튼: `aria-label="메시지 복사"`
   - 좋아요 버튼: `aria-label="좋아요"`
   - 싫어요 버튼: `aria-label="싫어요"`
   - 공유 버튼: `aria-label="공유하기"`

3. 색상 대비 수정
   - Gold (#D4AF37) 텍스트를 어두운 배경에서 사용하는 곳 조사
   - 대비 비율 4.5:1 미만인 경우 대체 색상(#E8C547 또는 #F0D060) 적용
   - Chrome DevTools Lighthouse 또는 axe-core로 검증

**관련 요구사항**: REQ-UI006-004~006

**의존성**: Phase 2 완료 (ChatBubble 버튼 핸들러 구현 후 aria-label 적용)

---

### Phase 4: 모바일 반응형 [Priority: Medium]

**목표**: 모바일 환경에서의 레이아웃 및 내비게이션 개선

**작업 항목**:

1. LandingPage 모바일 내비게이션 추가
   - `md:` breakpoint 기준 데스크톱/모바일 분기
   - 모바일: 햄버거 메뉴 + 드로어/시트 UI
   - 상태 관리: `useState`로 메뉴 열림/닫힘

2. OhangRatio 반응형 그리드 수정
   - 데스크톱(640px 이상): `grid-cols-2`
   - 모바일(640px 미만): `grid-cols-1`
   - Tailwind 반응형 클래스 활용: `grid-cols-1 sm:grid-cols-2`

3. 채팅 칩 스크롤 힌트 추가
   - 스크롤 가능 영역 양쪽에 그라디언트 페이드 오버레이
   - `overflow-x-auto` + `scroll-snap-type` 적용
   - `IntersectionObserver`로 스크롤 끝 감지하여 페이드 토글

**관련 요구사항**: REQ-UI006-007~009

**의존성**: Phase 1 완료 (공유 컴포넌트 활용)

---

## 3. Phase 의존성 그래프

```
Phase 1 (컴포넌트 추출)
    |
    +---> Phase 2 (UX/Loading/Error + 채팅)
    |         |
    |         +---> Phase 3 (접근성)
    |
    +---> Phase 4 (모바일 반응형)
```

- Phase 1은 모든 후속 Phase의 선행 조건
- Phase 2와 Phase 4는 Phase 1 완료 후 병렬 진행 가능
- Phase 3은 Phase 2 완료 후 진행 (ChatBubble 버튼 핸들러 필요)

---

## 4. 리스크 및 대응 방안

| 리스크                                       | 영향도 | 대응 방안                                                  |
| -------------------------------------------- | ------ | ----------------------------------------------------------- |
| 기존 버튼 교체 시 스타일 회귀                 | 높음   | 교체 전 스크린샷 비교, Storybook 활용 가능                  |
| OhangBar 추출 시 Props 전달 누락              | 중간   | TypeScript strict 타입 검증, 추출 전 인터페이스 정의 선행   |
| Gold 색상 변경 시 디자인 일관성 훼손          | 중간   | 디자인 토큰으로 관리, 변경 전후 시각적 비교                 |
| Enter 키 전송이 IME 입력(한글) 중 오동작      | 높음   | `isComposing` 체크: `event.nativeEvent.isComposing` 활용     |
| 모바일 내비게이션 추가 시 기존 레이아웃 깨짐  | 중간   | 모바일 우선 개발, breakpoint별 점진적 테스트                |

---

## 5. 기술 접근 방식

### Loading State 패턴

```
커스텀 훅 useApiCall 설계:
- state: { loading, error, data }
- execute(): loading=true -> fetch -> success/error 처리
- retry(): error 상태에서 execute() 재호출
```

### 공유 컴포넌트 설계 원칙

- **Composition over Configuration**: 과도한 Props 대신 children 패턴 활용
- **Tailwind 변형 관리**: `cva` (class-variance-authority) 또는 조건부 클래스 유틸 활용 검토
- **TypeScript strict**: 모든 Props에 명시적 타입 정의

### 접근성 테스트 도구

- axe-core: 자동화된 접근성 위반 검출
- Lighthouse: 전반적인 접근성 점수 측정
- 키보드 내비게이션 수동 테스트

---

## 6. 전문가 상담 권장

| 도메인           | 에이전트           | 상담 영역                                    |
| ---------------- | ------------------ | -------------------------------------------- |
| Frontend         | expert-frontend    | 공유 컴포넌트 아키텍처, React 19 패턴        |
| UI/UX Design     | design-uiux        | 접근성 색상 대비, 타이포그래피 계층 검증      |
| Testing          | expert-testing     | 접근성 자동화 테스트, E2E 시나리오            |
