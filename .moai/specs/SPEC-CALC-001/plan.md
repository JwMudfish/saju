---
id: SPEC-CALC-001
type: plan
version: 1.0.0
---

# SPEC-CALC-001 구현 계획

## 1. 작업 분해

본 SPEC은 기존 `core/` 모듈에 대한 의존성이 있으므로 순차적으로 진행한다.

### 마일스톤 1 (우선순위: 높음) - 도메인 모델 확장

기존 계산 결과를 API에 노출하기 위한 모델 확장. 다른 모든 작업의 기반이 된다.

**TASK-001**: `core/models/domain.py` 확장
- `SibiUnsungItem` 모델 추가: `pillar: str`, `stage: str` (기둥 이름과 십이운성 단계)
- `ShinsalItem` 모델 추가: `name: str`, `trigger_ji: str`, `description: str | None`
- `SewunItem` 모델 추가: `year: int`, `ganji: GanJi`, `is_current: bool`
- `PillarMeaning` 모델 추가: `pillar: str`, `meaning: str` (연주/월주/일주/시주 상징 의미)
- `YuksinItem` 모델 추가: `target: str`, `yuksin: str` (천간 또는 지지 대상과 육신명)

**TASK-002**: `core/models/response.py` 확장
- `SajuResult`에 다음 Optional 필드 추가:
  - `jijanggan: dict[str, HiddenStems] | None = None` (기둥명 → 지장간)
  - `yuksin: list[YuksinItem] | None = None` (각 천간의 육신)
  - `ohang_ratio: OHangRatio | None = None` (오행 비율)
  - `sibiunsung: list[SibiUnsungItem] | None = None` (기둥별 십이운성)
  - `shinsal: list[ShinsalItem] | None = None` (해당 신살 목록)
  - `sewun: list[SewunItem] | None = None` (세운 11개)
  - `pillar_meanings: list[PillarMeaning] | None = None` (기둥별 의미)

### 마일스톤 2 (우선순위: 높음) - 신규 계산 모듈 구현

**TASK-003**: `core/sibiunsung.py` 신규 구현
- 상수 정의: `SIBI_UNSUNG_STAGES`, `JANGSAENG_START`, `JI_ORDER`
- `calc_sibiunsung(day_gan: str, target_ji: str) -> str` 구현
  - 일간 오행 및 음양 판별 (`core/ohang.py` 활용)
  - 양간: 장생 시작 지지에서 순방향 인덱스 계산
  - 음간: 장생 시작 지지에서 역방향 인덱스 계산
- `calc_all_sibiunsung(day_gan: str, pillars: FourPillars) -> list[SibiUnsungItem]` 구현
  - 4개 기둥 각 지지에 대해 `calc_sibiunsung` 호출
  - 시주가 None인 경우 시주 항목 생략

**TASK-004**: `core/shinsal.py` 신규 구현
- 상수 테이블 정의:
  - `YEOKMA_MAP`: 연지 → 역마살 해당 지지
  - `DOHWA_MAP`: 연지 → 도화살 해당 지지
  - `HWAGAE_MAP`: 연지 → 화개살 해당 지지
  - `BAEKHO_PATTERNS`: 백호살 해당 일주 패턴 목록
  - `CHEONUL_MAP`: 일간 → 천을귀인 해당 지지 목록
- 개별 신살 판별 함수 구현:
  - `check_yeokma(year_ji: str, pillars_ji: list[str]) -> ShinsalItem | None`
  - `check_dohwa(year_ji: str, pillars_ji: list[str]) -> ShinsalItem | None`
  - `check_hwagae(year_ji: str, pillars_ji: list[str]) -> ShinsalItem | None`
  - `check_baekho(day_gan: str, day_ji: str) -> ShinsalItem | None`
  - `check_cheonul(day_gan: str, pillars_ji: list[str]) -> ShinsalItem | None`
- `calc_shinsal(year_ji: str, day_gan: str, day_ji: str, pillars_ji: list[str]) -> list[ShinsalItem]` 구현

**TASK-005**: `core/deun.py` 확장 (세운 계산)
- `calc_sewun(current_year: int) -> list[SewunItem]` 구현
  - `current_year` 기준 -5 ~ +5 범위(총 11개) 연도 산출
  - 각 연도의 천간: `(연도 - 4) % 10` 인덱스로 천간 10개 순환
  - 각 연도의 지지: `(연도 - 4) % 12` 인덱스로 지지 12개 순환
  - `is_current: bool` 플래그 설정

### 마일스톤 3 (우선순위: 높음) - 기존 계산 결과 통합

이미 계산되었지만 `SajuResult`에 포함되지 않았던 지장간, 육신, 오행비율을 서비스 레이어에서 조립한다.

**TASK-006**: `app/services/saju_service.py` 확장
- `jijanggan` 조립: `core/jijanggan.py`의 기존 함수 호출 → 기둥명 키 딕셔너리 변환
- `yuksin` 조립: `core/yuksin.py`의 `calc_yuksin` 호출 → 7개 천간(일간 제외) + 4개 지지의 정기 대상
- `ohang_ratio` 조립: `core/ohang.py` 활용하여 8글자 오행 카운트 → 백분율 환산
- `sibiunsung` 조립: TASK-003 구현체 호출
- `shinsal` 조립: TASK-004 구현체 호출
- `sewun` 조립: TASK-005 구현체 호출, `datetime.now().year` 주입
- `pillar_meanings` 조립: 고정 매핑 테이블 적용

### 마일스톤 4 (우선순위: 높음) - 테스트 작성

**TASK-007**: `tests/test_sibiunsung.py` 작성
- 양간(갑) 기준 각 지지별 십이운성 검증 (12개 케이스)
- 음간(을) 기준 역방향 검증 (12개 케이스)
- 토 오행 일간(무, 기) 케이스 검증
- 시주 없음 처리 검증

**TASK-008**: `tests/test_shinsal.py` 작성
- 역마살: 연지별 해당/미해당 케이스 각 3개 이상
- 도화살: 연지별 해당/미해당 케이스 각 3개 이상
- 화개살: 연지별 해당/미해당 케이스 각 3개 이상
- 백호살: 일주 패턴 해당/미해당 케이스
- 천을귀인: 일간별 해당/미해당 케이스
- 신살 없음(빈 목록) 반환 케이스

**TASK-009**: `tests/test_sewun.py` 작성
- 현재 연도 포함 여부 검증
- 총 11개 항목 반환 검증
- 60갑자 순환 경계 케이스 검증 (경자년 앞뒤 등)

**TASK-010**: `tests/test_saju_service_extended.py` 작성
- `SajuResult`에 모든 신규 필드가 포함됨을 검증
- 시주 없음 시 sibiunsung 시주 항목 생략 검증
- 신살 없는 사주의 빈 목록 반환 검증

### 마일스톤 5 (우선순위: 보통) - 품질 검증

**TASK-011**: 린트 및 타입 검사
- `uv run ruff check . --fix` 실행 후 오류 0건 확인
- `uv run ruff format .` 실행
- `uv run mypy core/ app/` 실행 후 타입 오류 0건 확인

**TASK-012**: 전체 테스트 커버리지 확인
- `uv run pytest tests/ --cov=core --cov-report=term-missing`
- 신규 모듈 커버리지 85% 이상 확인
- 기존 231개 테스트 모두 통과 확인

---

## 2. 기술적 접근

### 2.1 십이운성 계산 접근법

음양에 따른 방향성이 핵심이다. 양간은 지지 12개를 `자→축→인→묘→진→사→오→미→신→유→술→해` 순서로 순환하며 장생 시작 지지에서 인덱스 0을 시작한다. 음간은 동일 시작 지지에서 역방향(`해→술→유→...→자`) 순환한다.

인덱스 계산 공식:
```
양간: index = (JI_ORDER.index(target_ji) - JI_ORDER.index(start_ji)) % 12
음간: index = (JI_ORDER.index(start_ji) - JI_ORDER.index(target_ji)) % 12
```

### 2.2 신살 판별 접근법

신살은 대부분 연지(年支)와 사주 내 다른 지지의 조합 관계로 결정된다. 상수 딕셔너리 조회 방식으로 구현하여 O(1) 시간 복잡도를 유지한다. 백호살은 일주 간지 패턴 세트(frozenset)에서의 멤버십 확인으로 구현한다.

### 2.3 세운 계산 접근법

60갑자 순환은 `(연도 - 4) % 60` 인덱스로 결정되며, 이를 천간 10개 및 지지 12개 순환과 매핑한다:
- 천간 인덱스: `(연도 - 4) % 10`
- 지지 인덱스: `(연도 - 4) % 12`

### 2.4 서비스 레이어 확장 접근법

기존 `calc` 호출 이후 추가 계산을 수행하는 방식으로 확장한다. 각 추가 계산은 try-except로 감싸서 부분 실패 시에도 기존 응답은 정상 반환되도록 한다.

---

## 3. 위험 요소 및 대응

| 위험 | 수준 | 대응 방안 |
|------|------|----------|
| 음간 십이운성 역방향 로직 오류 | 높음 | 기존 역학 참고 문헌과 manse_ori 코드 대조 검증, 12개 케이스 전수 테스트 |
| 신살 판별 기준 테이블 오류 | 중간 | 기존 한국 사주 전문 라이브러리(파이썬 만세력 등)와 결과 비교 |
| SajuResult 모델 변경으로 인한 기존 테스트 파손 | 중간 | 모든 새 필드를 Optional로 선언, 기존 테스트에서 None 허용 확인 |
| 세운 60갑자 경계값 오류 | 낮음 | 공지된 역사적 간지를 기준으로 경계값 단위 테스트 작성 |
| 서비스 레이어 복잡도 증가 | 낮음 | 각 계산 단위를 별도 private 메서드로 분리하여 책임 분산 |

---

## 4. 구현 순서 (의존성 기반)

```
TASK-001 (도메인 모델)
    └─→ TASK-002 (응답 모델)
            └─→ TASK-003 (십이운성 모듈)
            └─→ TASK-004 (신살 모듈)
            └─→ TASK-005 (세운 확장)
                    └─→ TASK-006 (서비스 통합)
                            └─→ TASK-007, 008, 009, 010 (테스트)
                                    └─→ TASK-011, 012 (품질 검증)
```

TASK-003, TASK-004, TASK-005는 TASK-002 완료 후 병렬로 진행 가능하다.
