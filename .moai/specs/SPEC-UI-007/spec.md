# SPEC-UI-007: 리포트 페이지 심화 분석 섹션 추가

## 메타데이터

| 항목 | 내용 |
|------|------|
| SPEC ID | SPEC-UI-007 |
| 제목 | 리포트 페이지에 십성/지장간/십이운성/신살 섹션 추가 |
| 상태 | completed |
| 우선순위 | P1 |
| 생성일 | 2026-03-20 |
| 담당 영역 | Frontend (React/TypeScript) |
| 관련 SPEC | SPEC-UI-006 (Frontend UX/UI 기반), SPEC-API-002 (API 엔드포인트) |

## 배경 및 목적

현재 리포트 페이지는 만세력(4기둥), 인생 성향(일간/격국), 세운(3년 흐름), 오행 비율을 표시한다.
백엔드는 이미 십성(육신), 지장간, 십이운성, 신살을 계산하여 `/api/v1/saju` 응답에 포함하고 있으나,
프론트엔드에서 이를 전혀 활용하지 않고 있다.

이 SPEC은 해당 데이터를 UI에 표시하여 사용자가 더 깊이 있는 사주 분석을 받을 수 있도록 한다.

## 현황 분석 (연구 결과)

### 백엔드 응답 필드 (이미 완성)

```typescript
interface SajuResult {
  yuksin_list: YuksinItem[] | null     // 십성 (육신)
  jijanggan: Record<string, HiddenStem> | null  // 지장간
  sibiunsung: SibiUnsungItem[] | null  // 십이운성
  shinsal: ShinsalItem[] | null        // 신살
}
```

### 데이터 구조

**십성(육신) - yuksin_list**:
```json
[
  { "target": "년간", "yuksin": "편관" },
  { "target": "월간", "yuksin": "정재" },
  { "target": "일지", "yuksin": "식신" }
]
```

**지장간 - jijanggan**:
```json
{
  "year": { "initial": "임", "middle": null, "main": "계" },
  "month": { "initial": "계", "middle": "신", "main": "기" }
}
```

**십이운성 - sibiunsung**:
```json
[
  { "pillar": "year", "ji": "해", "stage": "장생" },
  { "pillar": "month", "ji": "축", "stage": "목욕" }
]
```

**신살 - shinsal**:
```json
[
  { "name": "역마살", "trigger_ji": "신", "description": "이동·변화·활동성을 상징" },
  { "name": "천을귀인", "trigger_ji": "축", "description": "귀인의 도움·행운을 상징" }
]
```

### 기존 타입 오류 (수정 필요)

`types.ts` 라인: `jijanggan: Record<string, HiddenStem[]> | null`
→ 수정: `jijanggan: Record<string, HiddenStem> | null`

## 요구사항 (EARS 형식)

### REQ-UI007-001: 타입 수정
**WHEN** jijanggan 데이터를 TypeScript로 처리할 때,
**THE SYSTEM SHALL** `HiddenStem[]` 배열이 아닌 `HiddenStem` 단일 객체 타입을 사용한다.

### REQ-UI007-002: 십성(육신) — 만세력 그리드 통합
**WHERE** 만세력(PillarGrid) 카드 영역에서,
**THE SYSTEM SHALL** 기존 천간/지지 2행 아래 십성 3행째를 추가한다.
- 4기둥 × 3행 (천간 / 지지 / 십성) 그리드
- 일간(일주 천간 셀)은 "[일간]" 레이블 표시 (십성 없음, ring 강조 유지)
- 나머지 7글자는 세부 십성명(비견/겁재/식신/상관/편재/정재/편관/정관/편인/정인) 표시
- 십성 셀에 5대 분류별 색상 적용 (비겁:회색, 식상:노랑, 재성:초록, 관성:파랑, 인성:보라)

### REQ-UI007-003: 지장간 섹션
**WHERE** 리포트 페이지 심화 분석 영역에서,
**THE SYSTEM SHALL** 4기둥 지지 각각의 지장간(여기/중기/정기)을 표시한다.
- 중기(middle)가 null인 경우 생략
- 각 지장간 글자에 오행 색상 적용

### REQ-UI007-004: 십이운성 섹션
**WHERE** 리포트 페이지 심화 분석 영역에서,
**THE SYSTEM SHALL** 4기둥 각각의 십이운성 단계(장생~양)를 표시한다.
- 12단계: 장생, 목욕, 관대, 건록, 제왕, 쇠, 병, 사, 묘, 절, 태, 양
- 각 단계에 강약 표시 (장생/건록/제왕: 왕상, 목욕/관대: 중립, 병/사/묘/절: 쇠약)

### REQ-UI007-005: 신살 섹션
**WHERE** 리포트 페이지 심화 분석 영역에서,
**THE SYSTEM SHALL** 해당 사주에 있는 신살 목록을 표시한다.
- 신살이 없으면 "해당 신살 없음" 표시
- 각 신살에 이름, 발동 지지, 의미 설명 표시
- 신살 종류별 아이콘 또는 색상 구분 (역마살/도화살/화개살/백호살/천을귀인)

### REQ-UI007-006: UI 배치 — 통합 그리드 + 아코디언
**WHEN** 사용자가 리포트 페이지를 로드할 때,
**THE SYSTEM SHALL** 다음 레이아웃을 적용한다:
- 만세력 섹션: 기존 천간/지지 2행 + 신규 십성 3행째 통합 (항상 표시)
- 심화 분석 아코디언: 기존 섹션 아래에 "심화 분석 펼치기" 버튼 추가
  - 초기 상태: 접힌 상태(collapsed)
  - 펼치면 지장간 / 십이운성 / 신살 3개 섹션 표시
  - 기존 레이아웃(인생 성향, 세운, 오행 분포) 변경 없음

### REQ-UI007-007: 데이터 없음 처리
**WHEN** yuksin_list, jijanggan, sibiunsung, shinsal 중 어느 하나가 null일 때,
**THE SYSTEM SHALL** 해당 섹션을 비활성화 또는 "분석 데이터 없음" 메시지로 표시한다.

### REQ-UI007-008: 반응형 레이아웃
**WHERE** 모바일 환경(< 640px)에서,
**THE SYSTEM SHALL** 심화 분석 섹션이 단일 컬럼으로 표시된다.

## 인수 기준

- [ ] REQ-UI007-001: `types.ts`의 `jijanggan` 타입이 `Record<string, HiddenStem>`으로 수정됨
- [ ] REQ-UI007-002: 십성 섹션에서 8글자 모두 십성명이 표시되고 일간 구분됨
- [ ] REQ-UI007-003: 지장간 섹션에서 4기둥 지지의 여기/중기/정기 표시 (오행 색상 적용)
- [ ] REQ-UI007-004: 십이운성 섹션에서 4기둥 단계명 표시 (강약 시각화)
- [ ] REQ-UI007-005: 신살 섹션에서 발견된 신살 이름·의미 표시, 없으면 안내 메시지
- [ ] REQ-UI007-006: "심화 분석" 토글로 접고 펼치는 기능 동작
- [ ] REQ-UI007-007: null 데이터 시 우아한 처리 (오류 없음)
- [ ] REQ-UI007-008: 모바일 단일 컬럼 레이아웃 적용
- [ ] TypeScript 컴파일 오류 없음 (tsc --noEmit)
- [ ] 기존 39개 테스트 모두 통과
- [ ] ESLint 오류 없음
