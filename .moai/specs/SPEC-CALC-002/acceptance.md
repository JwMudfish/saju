---
id: SPEC-CALC-002
type: acceptance
version: 1.0.0
---

# SPEC-CALC-002 인수 기준

## 1. 인수 시나리오

---

### 시나리오 AC-001: 형(刑) — 무은지형(恃勢之刑) 인사신 3순환 판별

**Given** `core/hapchung` 모듈이 로드되고
**When** 다음 지지 쌍에 대해 `is_hyeong(ji1, ji2)`를 호출하면
**Then** 모든 경우에서 `True`를 반환해야 한다:

| ji1 | ji2 | 설명 |
|-----|-----|------|
| 인 | 사 | 인형사 |
| 사 | 신 | 사형신 |
| 신 | 인 | 신형인 |
| 사 | 인 | 역방향도 True (양방향 처리) |
| 신 | 사 | 역방향도 True |
| 인 | 신 | 역방향도 True |

---

### 시나리오 AC-002: 형(刑) — 무은지형(無恩之刑) 축술미 3순환 판별

**Given** `core/hapchung` 모듈이 로드되고
**When** 다음 지지 쌍에 대해 `is_hyeong(ji1, ji2)`를 호출하면
**Then** 모든 경우에서 `True`를 반환해야 한다:

| ji1 | ji2 | 설명 |
|-----|-----|------|
| 축 | 술 | 축형술 |
| 술 | 미 | 술형미 |
| 미 | 축 | 미형축 |
| 술 | 축 | 역방향도 True |
| 미 | 술 | 역방향도 True |
| 축 | 미 | 역방향도 True |

---

### 시나리오 AC-003: 형(刑) — 무례지형(無禮之刑) 자묘 쌍방향 판별

**Given** `core/hapchung` 모듈이 로드되고
**When** 다음 지지 쌍에 대해 `is_hyeong(ji1, ji2)`를 호출하면
**Then** 모두 `True`를 반환해야 한다:

| ji1 | ji2 | 설명 |
|-----|-----|------|
| 자 | 묘 | 자형묘 |
| 묘 | 자 | 묘형자 (역방향) |

---

### 시나리오 AC-004: 형(刑) — 자형(自刑) 판별

**Given** `core/hapchung` 모듈이 로드되고
**When** 동일한 지지를 두 인수로 `is_hyeong(ji, ji)`를 호출하면
**Then** 자형 목록({진, 오, 유, 해})에 속하는 지지는 `True`, 나머지는 `False`를 반환해야 한다:

| ji | 기대값 | 이유 |
|----|--------|------|
| 진 | True | 자형 목록 포함 |
| 오 | True | 자형 목록 포함 |
| 유 | True | 자형 목록 포함 |
| 해 | True | 자형 목록 포함 |
| 자 | False | 자형 목록 미포함 |
| 축 | False | 자형 목록 미포함 |
| 인 | False | 자형 목록 미포함 |
| 묘 | False | 자형 목록 미포함 |
| 사 | False | 자형 목록 미포함 |
| 미 | False | 자형 목록 미포함 |
| 신 | False | 자형 목록 미포함 |
| 술 | False | 자형 목록 미포함 |

---

### 시나리오 AC-005: 형(刑) — 형 관계가 아닌 쌍 판별

**Given** `core/hapchung` 모듈이 로드되고
**When** 형 관계가 없는 지지 쌍에 대해 `is_hyeong(ji1, ji2)`를 호출하면
**Then** `False`를 반환해야 한다:

| ji1 | ji2 | 이유 |
|-----|-----|------|
| 자 | 오 | 충 관계 (형 아님) |
| 인 | 오 | 삼합 관계 (형 아님) |
| 갑 | 을 | 지지가 아닌 천간 (형 정의 없음) |

---

### 시나리오 AC-006: 형(刑) — subtype 반환

**Given** `core/hapchung` 모듈이 로드되고
**When** `get_hyeong_subtype(ji1, ji2)`를 호출하면
**Then** 다음과 같은 세부 유형이 반환되어야 한다:

| ji1 | ji2 | 기대 subtype |
|-----|-----|-------------|
| 인 | 사 | "무은지형" |
| 사 | 신 | "무은지형" |
| 신 | 인 | "무은지형" |
| 축 | 술 | "무은지형" |
| 술 | 미 | "무은지형" |
| 미 | 축 | "무은지형" |
| 자 | 묘 | "무례지형" |
| 진 | 진 | "자형" |
| 오 | 오 | "자형" |
| 유 | 유 | "자형" |
| 해 | 해 | "자형" |
| 자 | 오 | None (형 관계 없음) |

---

### 시나리오 AC-007: 해(害) — 6쌍 전체 판별

**Given** `core/hapchung` 모듈이 로드되고
**When** 다음 지지 쌍에 대해 `is_hae(ji1, ji2)`를 호출하면
**Then** 모든 경우에서 `True`를 반환해야 한다 (양방향 포함):

| ji1 | ji2 | 명칭 |
|-----|-----|------|
| 자 | 미 | 자미해 |
| 미 | 자 | 역방향 |
| 축 | 오 | 축오해 |
| 오 | 축 | 역방향 |
| 인 | 사 | 인사해 |
| 사 | 인 | 역방향 |
| 묘 | 진 | 묘진해 |
| 진 | 묘 | 역방향 |
| 신 | 해 | 신해해 |
| 해 | 신 | 역방향 |
| 유 | 술 | 유술해 |
| 술 | 유 | 역방향 |

---

### 시나리오 AC-008: 해(害) — 해 관계가 아닌 쌍 판별

**Given** `core/hapchung` 모듈이 로드되고
**When** 해 관계가 없는 지지 쌍에 대해 `is_hae(ji1, ji2)`를 호출하면
**Then** `False`를 반환해야 한다:

| ji1 | ji2 | 이유 |
|-----|-----|------|
| 자 | 오 | 충 관계 (해 아님) |
| 자 | 자 | 동일 지지 (해는 자기 자신 없음) |
| 인 | 해 | 파 관계 (해 아님) |

---

### 시나리오 AC-009: 파(破) — 6쌍 전체 판별

**Given** `core/hapchung` 모듈이 로드되고
**When** 다음 지지 쌍에 대해 `is_pa(ji1, ji2)`를 호출하면
**Then** 모든 경우에서 `True`를 반환해야 한다 (양방향 포함):

| ji1 | ji2 | 명칭 |
|-----|-----|------|
| 자 | 유 | 자유파 |
| 유 | 자 | 역방향 |
| 오 | 묘 | 오묘파 |
| 묘 | 오 | 역방향 |
| 인 | 해 | 인해파 |
| 해 | 인 | 역방향 |
| 사 | 신 | 사신파 |
| 신 | 사 | 역방향 |
| 진 | 축 | 진축파 |
| 축 | 진 | 역방향 |
| 술 | 미 | 술미파 |
| 미 | 술 | 역방향 |

---

### 시나리오 AC-010: 파(破) — 파 관계가 아닌 쌍 판별

**Given** `core/hapchung` 모듈이 로드되고
**When** 파 관계가 없는 지지 쌍에 대해 `is_pa(ji1, ji2)`를 호출하면
**Then** `False`를 반환해야 한다:

| ji1 | ji2 | 이유 |
|-----|-----|------|
| 자 | 오 | 충 관계 (파 아님) |
| 자 | 자 | 동일 지지 (파는 자기 자신 없음) |
| 인 | 사 | 형·해 관계 (파 아님) |

---

### 시나리오 AC-011: calc_pillar_hapchung — 충 관계 검출

**Given** 연주 지지가 "자"이고 월주 지지가 "오"인 3기둥이 주어지고
**When** `calc_pillar_hapchung([("year","자"), ("month","오"), ("day","인")])`을 호출하면
**Then** 결과 목록에 다음 항목이 포함되어야 한다:
- `relation_type = "충"`, `pillar1 = "year"`, `pillar2 = "month"`, `ji1 = "자"`, `ji2 = "오"`

---

### 시나리오 AC-012: calc_pillar_hapchung — 형 관계 검출

**Given** 연주 지지가 "인"이고 월주 지지가 "사"인 3기둥이 주어지고
**When** `calc_pillar_hapchung([("year","인"), ("month","사"), ("day","술")])`을 호출하면
**Then** 결과 목록에 다음 항목이 포함되어야 한다:
- `relation_type = "형"`, `pillar1 = "year"`, `pillar2 = "month"`, `ji1 = "인"`, `ji2 = "사"`, `subtype = "무은지형"`

---

### 시나리오 AC-013: calc_pillar_hapchung — 해 관계 검출

**Given** 연주 지지가 "자"이고 월주 지지가 "미"인 3기둥이 주어지고
**When** `calc_pillar_hapchung([("year","자"), ("month","미"), ("day","오")])`을 호출하면
**Then** 결과 목록에 다음 항목이 포함되어야 한다:
- `relation_type = "해"`, `pillar1 = "year"`, `pillar2 = "month"`, `ji1 = "자"`, `ji2 = "미"`

---

### 시나리오 AC-014: calc_pillar_hapchung — 파 관계 검출

**Given** 연주 지지가 "자"이고 월주 지지가 "유"인 3기둥이 주어지고
**When** `calc_pillar_hapchung([("year","자"), ("month","유"), ("day","인")])`을 호출하면
**Then** 결과 목록에 다음 항목이 포함되어야 한다:
- `relation_type = "파"`, `pillar1 = "year"`, `pillar2 = "month"`, `ji1 = "자"`, `ji2 = "유"`

---

### 시나리오 AC-015: calc_pillar_hapchung — 우선순위 (충 > 형)

**Given** 연주 지지가 "자"이고 월주 지지가 "오"인 2기둥과
**And** 충(자-오)과 형 관계가 동시에 성립하는 시나리오가 주어지고
**When** `calc_pillar_hapchung([("year","자"), ("month","오")])`을 호출하면
**Then** 해당 쌍에서는 `relation_type = "충"`만 반환해야 한다 (형은 포함되지 않음)

---

### 시나리오 AC-016: calc_pillar_hapchung — 인-사 쌍 우선순위 (형 > 해)

**Given** 연주 지지가 "인"이고 월주 지지가 "사"인 쌍이 주어지고
**And** "인"-"사"는 형(무은지형) 관계이면서 동시에 해(害) 관계에도 해당하고
**When** `calc_pillar_hapchung([("year","인"), ("month","사"), ("day","술")])`을 호출하면
**Then** 해당 쌍에서는 `relation_type = "형"`만 반환해야 한다 (해는 포함되지 않음)

---

### 시나리오 AC-017: calc_pillar_hapchung — 시주 없는 경우 3쌍 처리

**Given** 시주가 없는 3기둥(연·월·일)이 주어지고
**When** `calc_pillar_hapchung([("year","자"), ("month","오"), ("day","인")])`을 호출하면
**Then** 연-월, 연-일, 월-일 3쌍에 대해서만 관계를 분석해야 한다

---

### 시나리오 AC-018: calc_pillar_hapchung — 시주 있는 경우 6쌍 처리

**Given** 시주가 포함된 4기둥이 주어지고
**When** `calc_pillar_hapchung([("year","자"), ("month","오"), ("day","인"), ("hour","술")])`을 호출하면
**Then** 년-월, 년-일, 년-시, 월-일, 월-시, 일-시 6쌍을 모두 분석해야 한다

---

### 시나리오 AC-019: calc_pillar_hapchung — 관계 없는 경우 빈 리스트 반환

**Given** 어떤 쌍도 합충형해파 관계가 없는 사기둥이 주어지고
**When** `calc_pillar_hapchung(pillars_ji)`를 호출하면
**Then** 빈 리스트 `[]`를 반환해야 한다

---

### 시나리오 AC-020: calc_pillar_hapchung — 자형 검출

**Given** 연주와 월주 지지가 모두 "진"인 기둥이 주어지고
**When** `calc_pillar_hapchung([("year","진"), ("month","진"), ("day","인")])`을 호출하면
**Then** 결과 목록에 다음 항목이 포함되어야 한다:
- `relation_type = "형"`, `subtype = "자형"`, `ji1 = "진"`, `ji2 = "진"`

---

### 시나리오 AC-021: SajuResult — hapchung 필드 포함

**Given** `SajuResult` 모델이 로드되고
**When** `SajuResult` 인스턴스를 생성할 때 `hapchung` 필드를 지정하지 않으면
**Then** `result.hapchung`은 `None`이어야 한다

**When** `hapchung=[HapchungRelation(...)]`을 포함하여 생성하면
**Then** `result.hapchung`은 해당 리스트를 반환해야 한다

---

### 시나리오 AC-022: SajuService — hapchung 필드 API 응답 포함

**Given** FastAPI 테스트 클라이언트가 준비되고
**When** `POST /api/v1/saju`에 유효한 생년월일시 데이터를 전송하면
**Then** JSON 응답에 `"hapchung"` 키가 포함되어야 하고, 그 값은 배열 또는 `null`이어야 한다

---

### 시나리오 AC-023: SajuService — 시주 없는 경우 3쌍 분석

**Given** FastAPI 테스트 클라이언트가 준비되고
**When** `POST /api/v1/saju`에 시주 없는 생년월일 데이터를 전송하면
**Then** `result.hapchung` 목록에는 "hour" 기둥을 포함하는 항목이 없어야 한다

---

### 시나리오 AC-024: SajuService — 부분 실패 허용

**Given** `_calc_hapchung()` 내부에서 예외가 발생하는 상황을 모의(mock)하고
**When** `SajuService.calculate()`를 호출하면
**Then** 다른 필드(year_pillar, month_pillar 등)는 정상 반환되어야 하고
**And** `result.hapchung`은 `None`이거나 빈 리스트여야 한다 (예외가 전파되지 않아야 함)

---

## 2. 품질 게이트 (Quality Gates)

### 2.1 테스트 커버리지

| 모듈 | 최소 커버리지 |
|------|-------------|
| `core/hapchung.py` | 85% 이상 |
| `core/models/domain.py` (추가분) | 85% 이상 |
| `core/models/response.py` (추가분) | 85% 이상 |
| `app/services/saju_service.py` (추가분) | 85% 이상 |

### 2.2 회귀 방지

- 기존 테스트 351개가 모두 통과해야 한다.
- `hapchung_relation()` 기존 함수의 반환값이 변경되지 않아야 한다.

### 2.3 코드 품질

- `uv run ruff check .` — 오류 0건
- `uv run ruff format .` — 변경 없음
- `uv run mypy core/ app/ --ignore-missing-imports` — 오류 0건

### 2.4 API 호환성

- `POST /api/v1/saju` 응답 JSON 구조에 `hapchung` 필드가 추가되지만,
  기존 필드는 모두 유지되어야 한다 (하위 호환성).

---

## 3. 검증 명령어

```bash
# 전체 테스트 실행 (빠른 확인)
uv run pytest tests/ -q --no-cov

# hapchung 관련 테스트만 실행
uv run pytest tests/test_hapchung_detail.py -v

# 커버리지 포함 전체 실행
uv run pytest tests/ --cov=core --cov=app --cov-report=term-missing

# 린트 및 포맷 확인
uv run ruff check . && uv run ruff format --check .

# 타입 검사
uv run mypy core/ app/ --ignore-missing-imports
```
