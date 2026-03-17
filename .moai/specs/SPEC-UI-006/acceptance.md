# SPEC-UI-006: 수락 기준

> SPEC 참조: [spec.md](./spec.md)
> 구현 계획: [plan.md](./plan.md)

---

## 수락 기준 시나리오

### AC-001: API 호출 시 Loading State 표시

**Scenario 1: LandingPage 초기 데이터 로딩**

```gherkin
Given 사용자가 LandingPage에 접속한다
When 초기 데이터 API 호출이 시작된다
Then Skeleton UI가 데이터 표시 영역에 나타난다
And API 응답이 수신되면 Skeleton UI가 실제 콘텐츠로 교체된다
```

**Scenario 2: InputPage 분석 요청 로딩**

```gherkin
Given 사용자가 InputPage에서 사주 정보를 입력한다
When "분석 시작" 버튼을 클릭한다
Then Full-screen Spinner 오버레이가 표시된다
And 버튼과 입력 필드가 비활성화된다
And API 응답이 수신되면 Spinner가 사라지고 결과 페이지로 이동한다
```

**Scenario 3: Loading 타임아웃 처리**

```gherkin
Given API 호출이 진행 중이다
When 30초가 경과해도 응답이 없다
Then Loading UI가 해제된다
And 타임아웃 에러 메시지가 표시된다
```

---

### AC-002: API 에러 시 복구 UI

**Scenario 1: 네트워크 오류 복구**

```gherkin
Given 사용자가 API 호출을 트리거한다
When 네트워크 오류로 API 호출이 실패한다
Then "네트워크 연결을 확인해주세요" 메시지가 표시된다
And "다시 시도" 버튼이 표시된다
When 사용자가 "다시 시도" 버튼을 클릭한다
Then 동일한 API 호출이 재실행된다
And Loading State가 다시 표시된다
```

**Scenario 2: 서버 오류(5xx) 처리**

```gherkin
Given 사용자가 API 호출을 트리거한다
When 서버가 500 에러를 반환한다
Then "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요" 메시지가 표시된다
And "다시 시도" 버튼이 표시된다
```

---

### AC-003: 새로운 분석 시작 CTA

**Scenario 1: ReportPage에서 새 분석 시작**

```gherkin
Given 사용자가 ReportPage에서 사주 분석 결과를 확인하고 있다
When 페이지 하단으로 스크롤한다
Then "새로운 분석 시작" 버튼이 표시된다
When 사용자가 "새로운 분석 시작" 버튼을 클릭한다
Then InputPage로 이동한다
And 이전 입력 데이터(Zustand 상태)가 초기화된다
And InputPage의 모든 입력 필드가 비어 있다
```

---

### AC-004: ARIA 속성 및 접근성

**Scenario 1: ProgressBar 접근성**

```gherkin
Given LoadingPage의 ProgressBar가 렌더링된다
When 진행률이 45%인 상태이다
Then ProgressBar 요소에 role="progressbar" 속성이 존재한다
And aria-valuenow="45" 속성이 존재한다
And aria-valuemin="0" 속성이 존재한다
And aria-valuemax="100" 속성이 존재한다
```

**Scenario 2: 아이콘 버튼 접근성**

```gherkin
Given ChatBubble이 렌더링된다
When 스크린 리더가 복사 버튼에 포커스한다
Then "메시지 복사"라는 접근 가능한 이름이 읽힌다
When 스크린 리더가 좋아요 버튼에 포커스한다
Then "좋아요"라는 접근 가능한 이름이 읽힌다
```

**Scenario 3: 색상 대비 검증**

```gherkin
Given 어두운 배경 위에 강조 색상(Gold) 텍스트가 표시된다
When axe-core 접근성 검사를 실행한다
Then 색상 대비 관련 위반 사항이 0건이다
And 모든 텍스트의 대비 비율이 4.5:1 이상이다
```

---

### AC-005: 모바일 레이아웃 검증

**Scenario 1: 모바일 내비게이션**

```gherkin
Given 화면 너비가 375px(모바일)이다
When 사용자가 LandingPage에 접속한다
Then 모바일 내비게이션 헤더가 표시된다
And 햄버거 메뉴 아이콘이 보인다
When 사용자가 햄버거 메뉴를 탭한다
Then 내비게이션 메뉴가 열린다
```

**Scenario 2: OhangRatio 반응형 레이아웃**

```gherkin
Given 화면 너비가 375px(모바일)이다
When ReportPage의 OhangRatio 영역이 렌더링된다
Then 오행 항목이 1열 레이아웃으로 표시된다
And 각 항목의 텍스트가 잘리지 않는다

Given 화면 너비가 1024px(데스크톱)이다
When ReportPage의 OhangRatio 영역이 렌더링된다
Then 오행 항목이 2열 레이아웃으로 표시된다
```

**Scenario 3: 채팅 칩 스크롤 힌트**

```gherkin
Given 화면 너비가 375px(모바일)이다
And 채팅 칩 리스트 항목이 화면 너비를 초과한다
When ChatPage가 렌더링된다
Then 칩 리스트 오른쪽에 스크롤 가능 힌트(그라디언트 페이드)가 표시된다
When 사용자가 칩 리스트를 끝까지 스크롤한다
Then 오른쪽 스크롤 힌트가 사라진다
```

---

### AC-006: 공유 컴포넌트 및 스타일 일관성

**Scenario 1: Button 컴포넌트 통일**

```gherkin
Given 공유 Button 컴포넌트가 생성되었다
When 프로젝트 전체에서 버튼 요소를 검색한다
Then 모든 버튼이 src/components/ui/Button.tsx를 import하여 사용한다
And ad-hoc으로 스타일링된 <button> 태그가 존재하지 않는다
```

**Scenario 2: OhangBar 추출 검증**

```gherkin
Given OhangBar 컴포넌트가 src/components/report/OhangBar.tsx로 추출되었다
When ReportPage를 렌더링한다
Then OhangBar가 기존과 동일하게 표시된다
And ReportPage 파일 내에 OhangBar 관련 인라인 코드가 존재하지 않는다
```

**Scenario 3: 타이포그래피 계층 검증**

```gherkin
Given 모든 페이지가 렌더링된다
When 페이지 제목 요소를 검사한다
Then text-3xl font-bold 클래스가 적용되어 있다
When 섹션 제목 요소를 검사한다
Then text-2xl font-semibold 클래스가 적용되어 있다
```

---

### AC-007: 채팅 인터페이스 기능

**Scenario 1: 메시지 복사**

```gherkin
Given ChatPage에서 AI 응답 메시지가 표시되어 있다
When 사용자가 복사 버튼을 클릭한다
Then 해당 메시지 텍스트가 클립보드에 복사된다
And 복사 완료 피드백(체크 아이콘 또는 토스트)이 2초간 표시된다
```

**Scenario 2: 좋아요/싫어요 피드백**

```gherkin
Given ChatPage에서 AI 응답 메시지가 표시되어 있다
When 사용자가 좋아요 버튼을 클릭한다
Then 좋아요 버튼이 활성화 스타일(채워진 아이콘, 색상 변경)로 변경된다
And 싫어요 버튼이 비활성화 스타일로 유지된다
When 사용자가 다시 좋아요 버튼을 클릭한다
Then 좋아요 버튼이 비활성화 스타일로 돌아간다 (토글 동작)
```

**Scenario 3: Enter 키 메시지 전송**

```gherkin
Given ChatPage의 입력 필드에 "오늘의 운세를 알려주세요"가 입력되어 있다
When 사용자가 Enter 키를 누른다
Then 메시지가 전송된다
And 입력 필드가 비워진다
And 전송된 메시지가 채팅 영역에 표시된다
```

**Scenario 4: Shift+Enter 줄바꿈**

```gherkin
Given ChatPage의 입력 필드에 텍스트가 입력되어 있다
When 사용자가 Shift+Enter 키를 누른다
Then 메시지가 전송되지 않는다
And 입력 필드에 줄바꿈이 추가된다
```

**Scenario 5: 빈 메시지 전송 방지**

```gherkin
Given ChatPage의 입력 필드가 비어 있다 (또는 공백만 포함)
When 사용자가 Enter 키를 누른다
Then 메시지가 전송되지 않는다
And 입력 필드 상태가 변경되지 않는다
```

---

## Quality Gate 기준

| 항목                       | 기준                                        |
| -------------------------- | ------------------------------------------- |
| TypeScript 타입 오류       | 0건                                         |
| ESLint 경고                | 0건                                         |
| axe-core 접근성 위반       | 0건 (색상 대비, ARIA 속성 관련)              |
| 모바일 레이아웃 깨짐       | 375px, 390px, 414px 뷰포트에서 0건          |
| 기존 기능 회귀             | 모든 기존 테스트 통과                        |

---

## Definition of Done

- [ ] 모든 HARD 요구사항(REQ-UI006-001~008, 010~011, 014~016) 구현 완료
- [ ] 공유 컴포넌트(Button, Input, Card, Spinner, ErrorMessage, Toast) 생성 및 적용
- [ ] OhangBar 독립 파일 추출 완료
- [ ] ProgressBar ARIA 속성 추가 완료
- [ ] 모든 아이콘 버튼에 aria-label 적용 완료
- [ ] 색상 대비 WCAG AA 기준 충족 확인
- [ ] 모바일 내비게이션 구현 완료
- [ ] OhangRatio 반응형 레이아웃 수정 완료
- [ ] 채팅 버튼(복사, 좋아요, 싫어요) onClick 핸들러 구현 완료
- [ ] Enter 키 메시지 전송 구현 완료
- [ ] TypeScript strict 모드에서 타입 오류 0건
- [ ] axe-core 접근성 검사 통과
