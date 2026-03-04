---
id: SPEC-UI-002
version: 1.0.0
status: planned
created: 2026-03-04
updated: 2026-03-04
author: jw
priority: medium
depends_on: SPEC-CALC-002, SPEC-UI-001
---

# SPEC-UI-002: 합충형해파(合沖刑害破) Streamlit UI 표시

## 배경 및 목적

SPEC-CALC-002에서 합충형해파 계산 기능이 완성되었다. `core/hapchung.py`의 `calc_pillar_hapchung()` 함수가 사기둥(년주, 월주, 일주, 시주) 간의 모든 관계를 계산하며, 결과는 `SajuResult.hapchung: list[HapchungRelation]`에 저장된다. 그러나 현재 `streamlit_app.py`의 `render_tab_detail()` 함수는 hapchung 데이터를 전혀 표시하지 않는다.

이 SPEC은 세부 지표 탭에 합충형해파 섹션을 추가하여 사용자가 기둥 간 관계를 직관적으로 확인할 수 있도록 한다.

## 범위 (Scope)

- **포함**: `streamlit_app.py`의 `render_tab_detail()` 함수에 합충형해파 섹션 추가
- **제외**: 백엔드 로직 변경 없음 (데이터는 이미 `result.hapchung`에 존재)
- **제외**: 새 API 엔드포인트 추가 없음

## 환경 (Environment)

- Python 3.11
- Streamlit (프로젝트 기존 버전)
- pandas (프로젝트 기존 설치)
- 기존 `SajuResult.hapchung: list[HapchungRelation]` 데이터 모델 활용

## 가정 (Assumptions)

- `HapchungRelation` 모델은 `relation_type`, `subtype`, `pillar1`, `pillar2`, `ji1`, `ji2` 필드를 포함한다
- 관계 우선순위: 충 > 형 > 해 > 파 > 육합 > 삼합 > 방합
- 형의 세부유형: 시세지형(인사신), 무은지형(축술미), 무례지형(자묘), 자형(진오유해)
- `render_tab_detail()` 함수는 현재 지장간, 십이운성, 신살, 오행 섹션을 포함하며, hapchung 섹션은 그 뒤에 추가된다
- 백엔드 서비스가 이미 `SajuResult`에 hapchung 리스트를 올바르게 채운다

## 요구사항 (Requirements)

### R-001: 항상 적용 요구사항 (Ubiquitous)

시스템은 항상 사주 계산 결과가 있을 때 `render_tab_detail()` 함수 내에서 합충형해파 섹션을 렌더링해야 한다.

- 섹션 제목: `합충형해파 (合沖刑害破)`
- 섹션 위치: 오행(五行) 섹션 이후
- 표시 형식: 테이블 (열: 기둥1, 지지1, 기둥2, 지지2, 관계, 세부유형)

### R-002: 이벤트 기반 요구사항 (Event-Driven)

**WHEN** 사주 계산 결과의 `hapchung` 리스트에 하나 이상의 `HapchungRelation` 항목이 있을 때,
**THEN** 시스템은 모든 관계를 테이블로 표시해야 한다.

- 테이블 열 구성:
  - `기둥1`: `pillar1` 값 (년주/월주/일주/시주)
  - `지지1`: `ji1` 값 (지지 한자)
  - `기둥2`: `pillar2` 값
  - `지지2`: `ji2` 값
  - `관계`: `relation_type` 값 (충/형/해/파/육합/삼합/방합)
  - `세부유형`: `subtype` 값 (형의 경우 시세지형 등, 없으면 빈 문자열)

### R-003: 비원하는 동작 요구사항 (Unwanted Behavior)

시스템은 `hapchung` 리스트가 비어 있을 때, 테이블을 표시하지 않아야 한다.

대신 "기둥 간 특별한 관계가 없습니다." 안내 메시지를 `st.info()` 컴포넌트로 표시해야 한다.

### R-004: 상태 기반 요구사항 (State-Driven)

**IF** 테이블에서 특정 행의 `관계` 값이 "충"일 때,
**THEN** 시스템은 해당 행을 시각적으로 강조해야 한다.

- 구현 방법: pandas `Styler`를 사용하여 "충" 관계 행의 배경색을 붉은 계열(`#FFCCCC` 또는 `background-color: #ffe0e0`)로 표시
- 기타 관계 유형(형, 해, 파, 육합, 삼합, 방합)은 기본 색상 유지

### R-005: 선택적 요구사항 (Optional)

선택적으로 각 관계 유형의 전통적 의미 설명을 `st.expander()`로 제공할 수 있다.

- 확장 제목: "합충형해파 용어 설명"
- 내용: 충(沖), 형(刑), 해(害), 파(破), 육합(六合), 삼합(三合), 방합(方合) 각 관계의 간단한 설명
- 기본 상태: 접힌 상태 (expanded=False)

## 기술적 접근 방식 (Technical Approach)

### 데이터 흐름

```
result.hapchung: list[HapchungRelation]
    ↓
render_tab_detail(result) 함수 내 합충형해파 섹션
    ↓
pandas DataFrame 변환
    ↓
st.dataframe() 또는 pandas Styler 적용 후 표시
```

### 구현 전략

1. **백엔드 변경 없음**: `result.hapchung` 데이터를 그대로 활용
2. **pandas DataFrame 변환**: `HapchungRelation` 리스트를 DataFrame으로 변환
3. **색상 코딩**: pandas `Styler.apply()` 또는 `Styler.map()`으로 충 관계 강조
4. **세부유형 표시**: `subtype`이 있으면 "형 (시세지형)" 형식으로 조합, 없으면 빈 문자열
5. **빈 상태 처리**: `hapchung` 리스트가 비어 있으면 `st.info()` 메시지 표시

### 파일 변경 대상

- **수정**: `/Users/jwmudfish/my_project/saju/streamlit_app.py`
  - `render_tab_detail()` 함수에 합충형해파 섹션 추가
- **변경 없음**: `core/hapchung.py`, `core/models/`, `app/services/`

## 관계 유형 참조

| 관계 | 한자 | 우선순위 | 설명 |
|------|------|----------|------|
| 충 | 沖 | 1 | 가장 강한 충돌 관계 |
| 형 | 刑 | 2 | 처벌, 억압의 관계 |
| 해 | 害 | 3 | 해를 끼치는 관계 |
| 파 | 破 | 4 | 깨지는 관계 |
| 육합 | 六合 | 5 | 음양 합의 관계 |
| 삼합 | 三合 | 6 | 삼방 합의 관계 |
| 방합 | 方合 | 7 | 방위 합의 관계 |

### 형(刑) 세부유형

| 세부유형 | 해당 지지 |
|----------|----------|
| 시세지형 | 인(寅), 사(巳), 신(申) |
| 무은지형 | 축(丑), 술(戌), 미(未) |
| 무례지형 | 자(子), 묘(卯) |
| 자형 | 진(辰), 오(午), 유(酉), 해(亥) |
