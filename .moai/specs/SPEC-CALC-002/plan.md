---
id: SPEC-CALC-002
type: plan
version: 1.0.0
---

# SPEC-CALC-002 구현 계획

## 1. 개발 방법론

`quality.yaml` 설정에 따라 **Hybrid 모드**를 적용한다:

- **신규 코드** (새 함수, 새 모델): **TDD** (RED → GREEN → REFACTOR)
- **기존 코드 확장** (`saju_service.py` 통합): **DDD** (ANALYZE → PRESERVE → IMPROVE)

모든 마일스톤은 의존성 순서에 따라 순차적으로 진행한다.

---

## 2. 작업 분해

### 마일스톤 1 (우선순위: 높음) - 도메인 모델 추가

기존 계산 결과를 담을 모델을 먼저 정의한다. 이후 모든 작업의 기반이 된다.

**TASK-001**: `core/models/domain.py` 확장 — `HapchungRelation` 모델 추가

- `relation_type: str` — 관계 유형 ("충", "형", "해", "파", "육합", "삼합", "방합")
- `subtype: str | None` — 세부 유형 (형: "무은지형", "무례지형", "자형")
- `pillar1: str` — 첫 번째 기둥 이름 ("year", "month", "day", "hour")
- `pillar2: str` — 두 번째 기둥 이름
- `ji1: str` — 첫 번째 기둥의 지지
- `ji2: str` — 두 번째 기둥의 지지
- `description: str | None = None` — 관계 설명 (선택)

**TDD 접근**: `HapchungRelation` 모델 생성 테스트를 먼저 작성한 후 모델 구현.

**TASK-002**: `core/models/response.py` 확장 — `SajuResult`에 `hapchung` 필드 추가

- `hapchung: list[HapchungRelation] | None = None`
- 기존 모든 필드는 그대로 유지 (하위 호환성)

**TDD 접근**: `SajuResult`에 `hapchung` 필드가 포함되는 테스트를 먼저 작성.

---

### 마일스톤 2 (우선순위: 높음) - 핵심 계산 로직 구현

**TASK-003**: `core/hapchung.py` 확장 — 형·해·파 상수 및 판별 함수

TDD 순서:

1. **RED** — `test_hapchung_detail.py`에 실패하는 테스트 작성
   - `test_is_hyeong_museunji()`: 인-사, 사-신, 신-인 형 관계
   - `test_is_hyeong_mueunji()`: 축-술, 술-미, 미-축 형 관계
   - `test_is_hyeong_murye()`: 자-묘 형 관계
   - `test_is_hyeong_jahyeong()`: 진-진, 오-오, 유-유, 해-해 자형
   - `test_is_hyeong_non_jahyeong()`: 자-자, 인-인 등 자형이 아닌 동일 지지
   - `test_is_hae_all_pairs()`: 해 6쌍 전체 검증
   - `test_is_hae_non_pair()`: 해 관계가 없는 지지 쌍
   - `test_is_pa_all_pairs()`: 파 6쌍 전체 검증
   - `test_is_pa_non_pair()`: 파 관계가 없는 지지 쌍
   - `test_get_hyeong_subtype()`: 각 유형별 subtype 반환값 검증
   - `test_hyeong_bidirectional()`: 형 관계의 양방향성 검증 (인-사 == 사-인)

2. **GREEN** — 다음 상수 및 함수를 `core/hapchung.py`에 추가
   - `_HYEONG_RULES: list[dict]` — frozenset 기반 형 규칙 목록
   - `_JAHYEONG_SET: frozenset[str]` — 자형 지지 집합 {"진", "오", "유", "해"}
   - `_HAE_PAIRS: list[frozenset[str]]` — 해 6쌍
   - `_PA_PAIRS: list[frozenset[str]]` — 파 6쌍
   - `is_hyeong(ji1: str, ji2: str) -> bool`
   - `get_hyeong_subtype(ji1: str, ji2: str) -> str | None`
   - `is_hae(ji1: str, ji2: str) -> bool`
   - `is_pa(ji1: str, ji2: str) -> bool`

3. **REFACTOR** — 조회 성능을 위한 집합(set) 변환, docstring 완성

**TASK-004**: `core/hapchung.py` 추가 — `calc_pillar_hapchung()` 통합 함수

TDD 순서:

1. **RED** — `test_hapchung_detail.py`에 통합 함수 테스트 추가
   - `test_calc_pillar_hapchung_chung()`: 충 관계가 있는 쌍 검출
   - `test_calc_pillar_hapchung_hyeong()`: 형 관계가 있는 쌍 검출
   - `test_calc_pillar_hapchung_hae()`: 해 관계가 있는 쌍 검출
   - `test_calc_pillar_hapchung_pa()`: 파 관계가 있는 쌍 검출
   - `test_calc_pillar_hapchung_priority()`: 충이 형보다 우선 반환 검증
   - `test_calc_pillar_hapchung_no_hour()`: 시주 없는 3기둥 3쌍 처리
   - `test_calc_pillar_hapchung_empty()`: 관계 없는 사기둥 → 빈 리스트 반환
   - `test_calc_pillar_hapchung_jahyeong()`: 동일 지지 자형 검출

2. **GREEN** — `calc_pillar_hapchung(pillars_ji: list[tuple[str, str]]) -> list[HapchungRelation]` 구현
   - 모든 쌍 조합에 대해 `itertools.combinations` 사용
   - 우선순위: 충 → 형 → 해 → 파 → 육합 → 삼합 → 방합
   - 자형은 ji1 == ji2인 경우에만 별도 처리

3. **REFACTOR** — 우선순위 로직 정리, docstring 작성

---

### 마일스톤 3 (우선순위: 중간) - 서비스 통합

**TASK-005**: `app/services/saju_service.py` 확장 — DDD 방식 적용

DDD 순서:

1. **ANALYZE** — 기존 `calculate()` 메서드의 동작 흐름 파악
   - 기존 사기둥 조립 방식과 None 처리 패턴 확인
   - `shinsal`, `sibiunsung` 등 기존 `_calc_*` 메서드 패턴 파악

2. **PRESERVE** — 기존 동작 보호
   - 기존 351개 테스트 통과 확인 (실행 후 스냅샷)
   - `calculate()` 반환 타입 불변 확인

3. **IMPROVE** — `_calc_hapchung()` 추가 및 `calculate()` 호출 통합

   ```python
   def _calc_hapchung(self, pillars: FourPillars) -> list[HapchungRelation]:
       """사기둥 지지 간 합충형해파 관계를 분석합니다."""
       try:
           pillars_ji = [("year", pillars.year_pillar.ji),
                         ("month", pillars.month_pillar.ji),
                         ("day", pillars.day_pillar.ji)]
           if pillars.hour_pillar:
               pillars_ji.append(("hour", pillars.hour_pillar.ji))
           return calc_pillar_hapchung(pillars_ji)
       except Exception:
           return []
   ```

---

### 마일스톤 4 (우선순위: 중간) - 테스트 완성 및 품질 검증

**TASK-006**: `tests/test_hapchung_detail.py` 완성

- TASK-003/004에서 작성한 단위 테스트 전체 통과 확인
- 에지 케이스 보완:
  - `인`-`사` 쌍: 해(害) 관계도 있으므로 우선순위에 의해 형(刑)으로 분류됨을 검증
  - `사`-`신` 쌍: 파(破) 관계도 있으므로 형(刑)으로 분류됨을 검증
- 커버리지 측정: `uv run pytest tests/test_hapchung_detail.py --cov=core/hapchung`

**TASK-007**: 통합 테스트

- `tests/test_saju_service.py` 또는 신규 `tests/test_saju_hapchung_integration.py` 파일에 추가
- `SajuService.calculate()` 호출 후 `result.hapchung` 필드 포함 여부 검증
- 시주 있는 경우 / 없는 경우 각각 검증

**TASK-008**: 품질 게이트 통과 확인

```bash
# 전체 테스트 실행 (회귀 방지)
uv run pytest tests/ -q --no-cov

# 커버리지 확인
uv run pytest tests/ --cov=core --cov=app --cov-report=term-missing

# 린트 및 타입 검사
uv run ruff check . --fix
uv run ruff format .
uv run mypy core/ app/ --ignore-missing-imports
```

---

## 3. 기술 접근 방식

### 3.1 형(刑) 데이터 구조 설계

형 관계는 같은 지지 쌍이 다른 유형에 속할 수 있어 단순 frozenset 목록으로 표현 불가.
`_HYEONG_RULES`를 `list[dict]` 형태로 정의하고, 별도 조회 집합(set)을 파생하여 O(1) 판별:

```python
_HYEONG_PAIR_SET: frozenset[frozenset] = frozenset(r["pair"] for r in _HYEONG_RULES)
```

### 3.2 인-사 쌍 중복 관계 처리

`인`-`사` 쌍은 **형(刑, 무은지형)** 과 **해(害)** 양쪽에 해당한다.
`사`-`신` 쌍은 **형(刑, 무은지형)** 과 **파(破)** 양쪽에 해당한다.

우선순위 규칙에 따라 형(刑)이 해(害)와 파(破)보다 우선이므로, 이 쌍들은 형으로 분류된다.
이는 설계 결정이며 `spec.md` Section 5.1 FR-004에 명시되어 있다.

### 3.3 자형(自刑) 처리

자형은 `ji1 == ji2`이지만, 사기둥에서 동일 기둥의 지지가 같은 것은 의미가 없다.
`calc_pillar_hapchung`은 **서로 다른 기둥 쌍**만을 검사하므로, 자형은 두 기둥의 지지가 동일한 경우에만 발생 (예: 연주 지지 "진"과 월주 지지 "진").

### 3.4 `hapchung_relation()` 함수와의 관계

기존 `hapchung_relation(ji1, ji2) -> str | None` 함수는 단일 관계 이름 문자열만 반환한다.
신규 `calc_pillar_hapchung()`은 기둥 정보와 세부 유형을 포함한 `HapchungRelation` 객체를 반환한다.
두 함수는 서로 독립적으로 공존하며, 기존 함수는 수정하지 않는다.

---

## 4. 위험 및 대응

| 위험 | 가능성 | 영향도 | 대응 방안 |
|------|--------|--------|----------|
| 인-사 쌍이 형과 해 양쪽에 해당하여 우선순위 혼동 | 중간 | 낮음 | 단위 테스트로 우선순위 명시적 검증 |
| 기존 `hapchung_relation()` 반환값과 신규 `calc_pillar_hapchung()` 결과 불일치 | 낮음 | 낮음 | 두 함수는 독립적으로 동작하도록 설계 |
| 서비스 통합 중 기존 테스트 회귀 | 낮음 | 높음 | TASK-008에서 전체 테스트 스위트 재실행 |
| mypy 타입 오류 (HapchungRelation 임포트 누락) | 낮음 | 낮음 | response.py 임포트 목록 확인 필수 |

---

## 5. 완료 기준 (Definition of Done)

- [ ] `HapchungRelation` 모델이 `core/models/domain.py`에 추가됨
- [ ] `SajuResult.hapchung` 필드가 `core/models/response.py`에 추가됨
- [ ] `is_hyeong()`, `is_hae()`, `is_pa()`, `get_hyeong_subtype()` 함수가 `core/hapchung.py`에 추가됨
- [ ] `calc_pillar_hapchung()` 함수가 `core/hapchung.py`에 추가됨
- [ ] `SajuService._calc_hapchung()` 메서드가 추가되고 `calculate()`에서 호출됨
- [ ] `tests/test_hapchung_detail.py`의 모든 테스트 통과
- [ ] 기존 테스트 351개 전부 통과 (회귀 없음)
- [ ] `core/hapchung.py` 커버리지 85% 이상
- [ ] ruff 린트 오류 0건
- [ ] mypy 타입 오류 0건
- [ ] 모든 신규 공개 함수에 한국어 docstring 포함
