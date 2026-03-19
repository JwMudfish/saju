# SPEC-UI-007 구현 계획

## 구현 전략

**접근법**: TDD (새 컴포넌트) + 타입 수정
**영역**: Frontend 전용 (백엔드 변경 없음)
**예상 파일 수**: 6-8개

## 구현 단계

### Phase 1: 타입 수정 (선행 필수)

**파일**: `frontend/src/services/types.ts`
- `jijanggan` 타입 수정: `Record<string, HiddenStem[]>` → `Record<string, HiddenStem>`
- 영향 범위 확인 (타입 오류 전파 없음)

### Phase 2: PillarGrid 확장 + 신규 컴포넌트 3개

**디렉토리**: `frontend/src/components/report/`

#### 2-1. PillarGrid.tsx 확장 (십성/육신 — 기존 컴포넌트 수정)
- 신규 Props 추가: `yuksinList?: YuksinItem[] | null`
- 기존 2행(천간/지지) 아래 십성 3행째 추가
- `YuksinCell` 서브 컴포넌트 내부 정의
- 일간 셀: "[일간]" 레이블, ring 강조 유지
- 십성 5대 분류 색상 맵: `{ 비겁: 'text-slate', 식상: 'text-yellow', 재성: 'text-green', 관성: 'text-blue', 인성: 'text-purple' }`

#### 2-2. JijangganSection.tsx (지장간)
- Props: `jijanggan: Record<string, HiddenStem> | null`
- 4기둥 순서(시주/일주/월주/연주)로 표시
- 각 기둥당 여기(initial)/중기(middle, nullable)/정기(main) 3행
- 각 간(干)에 OHANG_STYLES 오행 색상 적용

#### 2-3. SibiUnsungSection.tsx (십이운성)
- Props: `sibiunsung: SibiUnsungItem[] | null`
- 4기둥 × 단계명 그리드
- 단계별 강약 뱃지: 왕(장생/건록/제왕) → green, 중(목욕/관대/양/태) → yellow, 쇠(쇠/병/사/묘/절) → red

#### 2-4. ShinsalSection.tsx (신살)
- Props: `shinsal: ShinsalItem[] | null`
- 카드 목록 형태
- 신살 없으면 "이 사주에는 주요 신살이 없습니다" 안내

### Phase 3: 토글 래퍼 컴포넌트

**파일**: `frontend/src/components/report/DetailAnalysisAccordion.tsx`
- 접기/펼치기 상태 관리 (useState, 초기: false = 접힘)
- 지장간/십이운성/신살 3개 섹션 내부 포함
- 애니메이션: Tailwind `transition-all`
- "심화 분석 펼치기 ▼ / 접기 ▲" 토글 버튼

### Phase 4: ReportPage 통합

**파일**: `frontend/src/pages/ReportPage.tsx`
- 기존 "집중 분석" 섹션 아래에 `<DetailAnalysisAccordion>` 추가
- pillars(SajuResult)에서 관련 props 전달

### Phase 5: 테스트

**파일**: `frontend/src/components/report/__tests__/YuksinSection.test.tsx` 등
- 각 컴포넌트별 기본 렌더링, null 처리, 접근성 테스트

## 파일 목록

| 파일 | 유형 |
|------|------|
| `src/services/types.ts` | 수정 (jijanggan 타입 수정) |
| `src/components/report/PillarGrid.tsx` | 수정 (십성 3행 추가) |
| `src/components/report/JijangganSection.tsx` | 신규 |
| `src/components/report/SibiUnsungSection.tsx` | 신규 |
| `src/components/report/ShinsalSection.tsx` | 신규 |
| `src/components/report/DetailAnalysisAccordion.tsx` | 신규 |
| `src/pages/ReportPage.tsx` | 수정 (아코디언 추가) |
| `src/components/report/__tests__/` | 신규 테스트 파일들 |

## 십성 색상 매핑 계획

| 분류 | 세부 십성 | 색상 계열 |
|------|----------|----------|
| 비겁 (比劫) | 비견, 겁재 | slate (중립) |
| 식상 (食傷) | 식신, 상관 | yellow (표현) |
| 재성 (財星) | 편재, 정재 | green (재물) |
| 관성 (官星) | 편관, 정관 | blue (권위) |
| 인성 (印星) | 편인, 정인 | purple (학문) |
