---
id: SPEC-CALC-002
version: 1.0.0
status: planned
created: 2026-03-04
updated: 2026-03-04
author: jw
priority: medium
depends_on: SPEC-CALC-001, SPEC-CORE-001
---

# SPEC-CALC-002: 형(刑)·해(害)·파(破) 계산 및 사기둥 전체 쌍 분석

## HISTORY

| 버전  | 날짜       | 작성자 | 변경 내용   |
|-------|------------|--------|-------------|
| 1.0.0 | 2026-03-04 | jw     | 최초 작성   |

---

## 1. 개요

### 1.1 배경

현재 `core/hapchung.py`는 삼합(三合)·육합(六合)·충(沖)·방합(方合) 4가지 관계를 구현하고 있으며,
모듈 주석에 "형(刑)과 해(害)는 manse_ori 현재 구현 범위에 포함되지 않는다"고 명시되어 있다.

사주 이론에서 형·해·파는 충(沖)과 함께 핵심적인 극(剋) 계열 관계로,
이 세 가지가 누락된 상태에서는 사기둥 간 기운의 상호작용을 완전하게 분석할 수 없다.

또한 현재 `hapchung_relation()` 함수는 단일 지지 쌍에 대한 단일 관계만 반환하며,
사기둥 전체(6쌍)에 걸친 종합 분석 결과를 `SajuResult`에 포함하는 기능이 없다.

### 1.2 범위

본 SPEC은 다음을 포함한다:

- `core/hapchung.py` 확장: 형·해·파 관계 상수 및 판별 함수 추가
- `core/models/domain.py` 확장: `HapchungRelation` 도메인 모델 추가
- `core/models/response.py` 확장: `SajuResult`에 `hapchung` 필드 추가
- `app/services/saju_service.py` 확장: `_calc_hapchung()` 메서드 추가 및 `calculate()` 통합
- `tests/test_hapchung_detail.py` 신규 생성: 형·해·파 단위 테스트
- 기존 `tests/test_saju_service.py` 또는 신규 통합 테스트 파일 추가

본 SPEC은 다음을 포함하지 않는다:

- 기존 삼합·육합·충·방합 로직 변경
- 용신(yongshin.py) 로직 변경
- UI(Streamlit) 또는 API 라우터 시그니처 변경
- 음력 변환 로직 변경
- 대운(대운)·세운과의 합충형해파 교차 분석 (별도 SPEC 예정)

### 1.3 목표

1. 형·해·파 판별 함수를 `core/hapchung.py`에 추가하여 테스트 커버리지 85% 이상 달성
2. `SajuResult` 응답에 `hapchung: list[HapchungRelation] | None` 필드를 포함
3. 기존 API 엔드포인트(`POST /api/v1/saju`)의 하위 호환성을 유지하면서 응답 데이터 확장
4. 모든 신규 계산 함수는 순수 함수(pure function) 형태로 작성하여 재사용성과 테스트 용이성 확보

---

## 2. 도메인 용어 정의

| 용어 | 한자 | 설명 |
|------|------|------|
| 형 | 刑 | 지지 간 벌하고 형벌하는 관계. 무은지형·무례지형·자형 세 가지 유형이 있음 |
| 무은지형 | 恃勢之刑 | 인-사-신 세 글자가 서로 형하는 3방향 순환 관계 |
| 무은지형 | 無恩之刑 | 축-술-미 세 글자가 서로 형하는 3방향 순환 관계 |
| 무례지형 | 無禮之刑 | 자-묘 두 글자가 서로 형하는 쌍방향 관계 |
| 자형 | 自刑 | 진-진, 오-오, 유-유, 해-해처럼 동일 지지끼리 형하는 관계 |
| 해 | 害 | 지지 간 서로 해치는 관계. 육합을 방해하는 구조에서 발생하는 6쌍 |
| 파 | 破 | 지지 간 부수고 깨는 관계. 충(沖)보다 약한 부분적 충돌인 6쌍 |
| 사기둥 | 四柱 | 연주(年柱)·월주(月柱)·일주(日柱)·시주(時柱) 네 개의 천간지지 쌍 |
| 지지 | 地支 | 자·축·인·묘·진·사·오·미·신·유·술·해 12개 땅의 기운 |
| 기둥 쌍 | - | 사기둥에서 두 기둥을 선택한 조합. 총 6쌍(년-월, 년-일, 년-시, 월-일, 월-시, 일-시) |
| 합충형해파 | 合沖刑害破 | 지지 간 다섯 가지 주요 상호작용 관계의 총칭 |

---

## 3. 형·해·파 관계 상수 정의

### 3.1 형(刑) 관계

형은 3종류로 분류된다.

**무은지형(恃勢之刑) - 3방향 순환:**

| 형하는 지지 | 형받는 지지 | 유형 |
|------------|------------|------|
| 인(寅) | 사(巳) | 무은지형 |
| 사(巳) | 신(申) | 무은지형 |
| 신(申) | 인(寅) | 무은지형 |

**무은지형(無恩之刑) - 3방향 순환:**

| 형하는 지지 | 형받는 지지 | 유형 |
|------------|------------|------|
| 축(丑) | 술(戌) | 무은지형 |
| 술(戌) | 미(未) | 무은지형 |
| 미(未) | 축(丑) | 무은지형 |

**무례지형(無禮之刑) - 쌍방향:**

| 지지 쌍 | 유형 |
|---------|------|
| 자(子) ↔ 묘(卯) | 무례지형 |

**자형(自刑) - 동일 지지:**

| 지지 | 유형 |
|------|------|
| 진(辰) ↔ 진(辰) | 자형 |
| 오(午) ↔ 오(午) | 자형 |
| 유(酉) ↔ 유(酉) | 자형 |
| 해(亥) ↔ 해(亥) | 자형 |

> 설계 결정: 형은 고전 이론에서 방향성이 있으나(인형사 ≠ 사형인), 본 구현에서는 **양방향(bidirectional)**으로 처리한다. 즉 인-사 쌍이 있으면 형 관계가 성립하는 것으로 판정한다. 이는 사용자에게 결과를 직관적으로 제공하기 위한 단순화이다.

### 3.2 해(害) 관계

해는 육합(六合) 관계를 방해하는 구조에서 파생된 6쌍이다.

| 지지 쌍 | 설명 |
|---------|------|
| 자(子) ↔ 미(未) | 자미해 |
| 축(丑) ↔ 오(午) | 축오해 |
| 인(寅) ↔ 사(巳) | 인사해 |
| 묘(卯) ↔ 진(辰) | 묘진해 |
| 신(申) ↔ 해(亥) | 신해해 |
| 유(酉) ↔ 술(戌) | 유술해 |

### 3.3 파(破) 관계

파는 충(沖)보다 약한 부분적 충돌을 나타내는 6쌍이다.

| 지지 쌍 | 설명 |
|---------|------|
| 자(子) ↔ 유(酉) | 자유파 |
| 오(午) ↔ 묘(卯) | 오묘파 |
| 인(寅) ↔ 해(亥) | 인해파 |
| 사(巳) ↔ 신(申) | 사신파 |
| 진(辰) ↔ 축(丑) | 진축파 |
| 술(戌) ↔ 미(未) | 술미파 |

---

## 4. 도메인 모델 명세

### 4.1 HapchungRelation 모델 (`core/models/domain.py` 추가)

```python
class HapchungRelation(BaseModel):
    """합충형해파 관계 결과 항목."""

    relation_type: str   # 관계 유형: "충", "형", "해", "파", "육합", "삼합", "방합"
    subtype: str | None  # 세부 유형 (형의 경우: "무은지형", "무례지형", "자형" 등)
    pillar1: str         # 첫 번째 기둥 ("year", "month", "day", "hour")
    pillar2: str         # 두 번째 기둥
    ji1: str             # 첫 번째 기둥의 지지
    ji2: str             # 두 번째 기둥의 지지
    description: str | None = None  # 관계 설명 (선택)
```

### 4.2 SajuResult 확장 (`core/models/response.py`)

기존 `SajuResult` 모델에 다음 Optional 필드를 추가한다:

```python
hapchung: list[HapchungRelation] | None = None
```

---

## 5. 요구사항 명세 (EARS 형식)

### 5.1 항상 적용되는 요구사항 (Ubiquitous)

**FR-001**: 시스템은 항상 형·해·파 관계 데이터를 모듈 레벨 상수(`_HYEONG_RULES`, `_HAE_PAIRS`, `_PA_PAIRS`)로 정의해야 한다.

**FR-002**: 시스템은 항상 기존 `SajuResult` 필드를 유지하면서 `hapchung` 필드를 추가해야 한다 (하위 호환성 보장).

**FR-003**: 시스템은 항상 `hapchung` 필드를 Optional로 선언하여 시주 미입력 시에도 정상 동작해야 한다.

**FR-004**: 시스템은 항상 관계 우선순위 `충 > 형 > 해 > 파 > 합(육합 > 삼합 > 방합)` 순서로 각 기둥 쌍에 대해 가장 강한 관계 하나를 `HapchungRelation` 목록에 포함해야 한다.

### 5.2 이벤트 기반 요구사항 (Event-Driven)

**FR-005**: WHEN 사주 계산 요청이 수신되면 THEN 시스템은 사기둥 지지들 중 모든 쌍(최대 6쌍)에 대해 형·해·파 관계를 포함한 합충형해파 분석을 수행하고, 관계가 발견된 쌍만 `hapchung` 목록에 포함시켜야 한다.

**FR-006**: WHEN `is_hyeong(ji1, ji2)` 함수가 호출되면 THEN 시스템은 주어진 두 지지가 형 관계인지 판별하여 boolean을 반환해야 한다. 자형의 경우 `ji1 == ji2`이고 자형 목록에 포함될 때만 True를 반환해야 한다.

**FR-007**: WHEN `is_hae(ji1, ji2)` 함수가 호출되면 THEN 시스템은 주어진 두 지지가 해 관계인지 판별하여 boolean을 반환해야 한다.

**FR-008**: WHEN `is_pa(ji1, ji2)` 함수가 호출되면 THEN 시스템은 주어진 두 지지가 파 관계인지 판별하여 boolean을 반환해야 한다.

**FR-009**: WHEN `calc_pillar_hapchung(pillars_ji)` 함수가 호출되면 THEN 시스템은 입력된 지지 리스트의 모든 쌍 조합에 대해 합충형해파 관계를 분석하고 `list[HapchungRelation]`을 반환해야 한다.

**FR-010**: WHEN `SajuService.calculate()` 메서드가 사주 계산을 완료하면 THEN 시스템은 `_calc_hapchung(pillars)` 메서드를 호출하여 결과를 `SajuResult.hapchung`에 포함시켜야 한다.

### 5.3 상태 기반 요구사항 (State-Driven)

**FR-011**: IF 시주(時柱)가 입력되지 않은 경우 THEN 시스템은 3쌍(년-월, 년-일, 월-일)에 대해서만 합충형해파 분석을 수행해야 한다.

**FR-012**: IF 시주(時柱)가 입력된 경우 THEN 시스템은 6쌍(년-월, 년-일, 년-시, 월-일, 월-시, 일-시) 모두에 대해 합충형해파 분석을 수행해야 한다.

**FR-013**: IF 어떤 기둥 쌍에서도 관계가 발견되지 않는 경우 THEN 시스템은 `hapchung`을 빈 리스트(`[]`)로 반환해야 한다.

**FR-014**: IF 형 관계에서 자형(自刑)인 경우 THEN 시스템은 `subtype: "자형"`을 `HapchungRelation`에 포함시켜야 한다.

**FR-015**: IF `_calc_hapchung()` 메서드에서 예외가 발생하는 경우 THEN 시스템은 `hapchung`을 `None`으로 설정하고 기존 계산 결과는 그대로 반환해야 한다 (부분 실패 허용).

### 5.4 선택적 요구사항 (Optional)

**FR-016**: 가능하면 `HapchungRelation.description` 필드에 각 관계의 사주 해석 의미를 한 줄 설명으로 포함한다.

**FR-017**: 가능하면 형(刑)의 세부 유형(무은지형·무례지형·자형)을 `subtype` 필드에 포함한다.

### 5.5 금지 사항 (Unwanted)

**FR-018**: 시스템은 기존 `hapchung_relation()` 함수의 시그니처 및 반환 타입을 변경하지 않아야 한다.

**FR-019**: 시스템은 기존 삼합·육합·충·방합 상수(`_SAMHAP_GROUPS`, `_YUKHAP_PAIRS`, `_CHUNG_PAIRS`, `_BANGHAP_GROUPS`)를 수정하지 않아야 한다.

**FR-020**: 시스템은 자형(自刑) 판별 시 자형 목록에 없는 지지끼리 동일 지지라는 이유만으로 자형으로 판정하지 않아야 한다 (진·오·유·해 4개만 자형).

**FR-021**: 시스템은 합충형해파 분석에서 동일 기둥 쌍에 대해 복수의 관계를 중복 포함하지 않아야 한다 (우선순위에 따라 하나만 반환).

---

## 6. 모듈 구조

### 6.1 수정 파일

```
core/
├── hapchung.py                    # 형·해·파 상수 및 판별 함수 추가
├── models/
│   ├── domain.py                  # HapchungRelation 모델 추가
│   └── response.py                # SajuResult.hapchung 필드 추가
app/
└── services/
    └── saju_service.py            # _calc_hapchung() 추가 및 calculate() 통합
```

### 6.2 신규 테스트 파일

```
tests/
└── test_hapchung_detail.py        # 형·해·파 단위 테스트 (신규)
```

### 6.3 핵심 구현 명세

#### `core/hapchung.py` 추가 상수

```python
# 형(刑) 규칙 - 양방향 처리를 위해 쌍(frozenset) 기반 저장
# 3방향 순환 형은 (시작, 끝, 유형) 튜플 목록으로 저장
_HYEONG_RULES: list[dict] = [
    # 무은지형(恃勢之刑) - 인사신 3순환
    {"pair": frozenset({"인", "사"}), "subtype": "무은지형"},
    {"pair": frozenset({"사", "신"}), "subtype": "무은지형"},
    {"pair": frozenset({"신", "인"}), "subtype": "무은지형"},
    # 무은지형(無恩之刑) - 축술미 3순환
    {"pair": frozenset({"축", "술"}), "subtype": "무은지형"},
    {"pair": frozenset({"술", "미"}), "subtype": "무은지형"},
    {"pair": frozenset({"미", "축"}), "subtype": "무은지형"},
    # 무례지형(無禮之刑) - 자묘 쌍방향
    {"pair": frozenset({"자", "묘"}), "subtype": "무례지형"},
]

# 자형(自刑) - 동일 지지 4개
_JAHYEONG_SET: frozenset[str] = frozenset({"진", "오", "유", "해"})

# 해(害) 쌍 - 6쌍
_HAE_PAIRS: list[frozenset[str]] = [
    frozenset({"자", "미"}),
    frozenset({"축", "오"}),
    frozenset({"인", "사"}),
    frozenset({"묘", "진"}),
    frozenset({"신", "해"}),
    frozenset({"유", "술"}),
]

# 파(破) 쌍 - 6쌍
_PA_PAIRS: list[frozenset[str]] = [
    frozenset({"자", "유"}),
    frozenset({"오", "묘"}),
    frozenset({"인", "해"}),
    frozenset({"사", "신"}),
    frozenset({"진", "축"}),
    frozenset({"술", "미"}),
]
```

#### 신규 공개 함수

**`is_hyeong(ji1: str, ji2: str) -> bool`**
- 두 지지 간 형(刑) 관계 판별 (자형 포함)
- 자형: `ji1 == ji2 and ji1 in _JAHYEONG_SET`
- 일반 형: `frozenset({ji1, ji2}) in {r["pair"] for r in _HYEONG_RULES}`

**`get_hyeong_subtype(ji1: str, ji2: str) -> str | None`**
- 형의 세부 유형 반환 ("무은지형" / "무례지형" / "자형" / None)

**`is_hae(ji1: str, ji2: str) -> bool`**
- 두 지지 간 해(害) 관계 판별
- `ji1 != ji2`이고 `frozenset({ji1, ji2}) in set(_HAE_PAIRS)` 조건

**`is_pa(ji1: str, ji2: str) -> bool`**
- 두 지지 간 파(破) 관계 판별
- `ji1 != ji2`이고 `frozenset({ji1, ji2}) in set(_PA_PAIRS)` 조건

**`calc_pillar_hapchung(pillars_ji: list[tuple[str, str]]) -> list[HapchungRelation]`**
- 입력: `[(pillar_name, ji_char), ...]` 리스트 (예: `[("year", "인"), ("month", "술"), ("day", "자")]`)
- 모든 쌍 조합에 대해 우선순위 순으로 관계 판별
- 우선순위: 충 > 형 > 해 > 파 > 육합 > 삼합 > 방합
- 관계가 있는 쌍만 `HapchungRelation` 목록에 포함하여 반환

#### `app/services/saju_service.py` 확장

**`_calc_hapchung(self, pillars: FourPillars) -> list[HapchungRelation]`**
- `pillars`에서 지지 목록을 추출하여 `calc_pillar_hapchung()` 호출
- 시주가 None인 경우 3개 기둥만 사용
- 예외 발생 시 빈 리스트 반환

**`calculate()` 메서드 수정**
- 기존 계산 완료 후 `_calc_hapchung(pillars)` 호출
- 반환되는 `SajuResult`에 `hapchung` 필드 포함

---

## 7. 제약 사항

### 7.1 성능 제약

- 형·해·파 판별 함수 포함 사기둥 쌍 분석은 기존 대비 50ms 이내 추가 지연만 허용
- 상수 집합(frozenset, set)을 모듈 레벨에서 정의하여 O(1) 조회 보장

### 7.2 호환성 제약

- Python 3.11 이상 사용 (기존 환경 유지)
- Pydantic v2 모델 패턴 사용
- 기존 테스트 351개 전부 통과해야 함 (SPEC-CALC-001 완료 기준, 회귀 방지)
- `hapchung_relation()` 기존 함수 시그니처 및 반환 타입 불변

### 7.3 품질 제약

- 신규 테스트 파일(`test_hapchung_detail.py`)의 커버리지 85% 이상
- `core/hapchung.py` 전체 커버리지 85% 이상 유지
- ruff 린트 오류 0건
- mypy 타입 오류 0건
- 모든 신규 공개 함수에 docstring 작성 (한국어 설명 포함)

### 7.4 설계 제약

- 모든 신규 계산 함수는 순수 함수(pure function)로 작성
- 신규 도메인 모델은 Pydantic v2 BaseModel 상속
- 형·해·파 상수 테이블은 모듈 레벨에서 frozenset 또는 list[frozenset]으로 정의
