---
id: SPEC-CORE-001
version: 1.0.0
status: draft
created: 2026-02-27
updated: 2026-02-27
author: jw
---

## HISTORY

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-02-27 | jw | 최초 작성 |

---

## 1. 구현 전략 (Implementation Strategy)

### 1.1 기본 원칙

본 구현은 `manse_ori/` Node.js 레퍼런스 코드를 **번역(translation)**하는 것이 아니라, 동일한 **계산 결과**를 보장하는 완전히 새로운 Python 구현이다. 핵심 전략은 다음과 같다:

1. **하향식 설계 (Top-Down Design)**: Pydantic 도메인 모델 먼저 정의 → 계산 모듈 구현 → 통합 테스트
2. **데이터 우선 검증 (Data-First Validation)**: 각 모듈 구현 전에 `manse_ori` 케이스로 예상값 확인
3. **점진적 통합 (Progressive Integration)**: 모듈 단위 완성 후 전체 파이프라인 연결
4. **회귀 방어 (Regression Defense)**: `manse_ori` 60+ 케이스를 `conftest.py`에 픽스처로 등록하여 매 커밋마다 자동 검증

### 1.2 아키텍처 결정

| 결정 사항 | 선택 | 이유 |
|-----------|------|------|
| 입출력 타입 | Pydantic v2 BaseModel | 런타임 타입 검증 + IDE 지원 |
| 절기 데이터 | 싱글턴 캐시 패턴 | 347KB JSON 매 요청 로드 방지 |
| 음력 변환 | 자체 구현 or korean-lunar-calendar | manse_ori 로직 분석 후 결정 |
| 전역 상태 | 완전 제거 | 동시성 안전을 위한 핵심 요구사항 |
| 테스트 방식 | pytest + conftest 픽스처 | manse_ori 케이스 재사용성 극대화 |

---

## 2. 단계별 구현 계획 (Phased Implementation)

### Phase 1: 기초 설정 (Foundation) - 우선순위: Primary Goal

**목표**: 프로젝트 뼈대 구성, 도메인 모델 정의, 데이터 준비

#### 1-1. 프로젝트 구조 생성

```
saju/
├── core/
│   ├── __init__.py
│   └── models/
│       └── __init__.py
├── data/
├── tests/
├── requirements.txt
├── requirements-dev.txt
└── pyproject.toml
```

작업 목록:
- [ ] 디렉토리 구조 생성
- [ ] `pyproject.toml` 작성 (ruff, mypy, pytest 설정 포함)
- [ ] `requirements.txt` 작성
- [ ] `requirements-dev.txt` 작성

#### 1-2. 상수 및 Enum 정의 (`core/constants.py`)

정의할 상수:
```python
# 천간 (Heavenly Stems)
GAN_LIST: tuple[str, ...] = ("갑", "을", "병", "정", "무", "기", "경", "신", "임", "계")

# 지지 (Earthly Branches)
JI_LIST: tuple[str, ...] = ("자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해")

# 60갑자 순환 리스트
SEXAGENARY_CYCLE: list[tuple[str, str]]  # [(갑, 자), (을, 축), ...]

# 오행 매핑
GAN_TO_OHANG: dict[str, str]  # {"갑": "목", "을": "목", ...}
JI_TO_OHANG: dict[str, str]   # {"자": "수", "축": "토", ...}

# 음양 매핑
GAN_TO_UMYANG: dict[str, str]  # {"갑": "양", "을": "음", ...}

# 오행 상생·상극 테이블
OHANG_SAENG: dict[str, str]  # {"목": "화", "화": "토", ...}
OHANG_GEUK: dict[str, str]   # {"목": "토", "토": "수", ...}
```

#### 1-3. Pydantic 도메인 모델 (`core/models/`)

**request.py**:
```python
class SajuRequest(BaseModel):
    year: int = Field(..., ge=1600, le=2100)
    month: int = Field(..., ge=1, le=12)
    day: int = Field(..., ge=1, le=31)
    hour: int | None = Field(None, ge=0, le=23)
    gender: Literal["male", "female"]
    is_lunar: bool = False
    is_leap_month: bool = False
```

**response.py**:
```python
class GanJi(BaseModel):
    gan: str    # 천간 (예: "갑")
    ji: str     # 지지 (예: "자")
    index: int  # 60갑자 인덱스 (0-59)

class FourPillars(BaseModel):
    year_pillar: GanJi
    month_pillar: GanJi
    day_pillar: GanJi
    hour_pillar: GanJi | None = None

class SajuResult(BaseModel):
    request: SajuRequest
    four_pillars: FourPillars
    hidden_stems: dict[str, HiddenStems]  # 지지 → 지장간
    yuksin: dict[str, str]               # 천간 → 육신명
    ohang_ratio: OHangRatio
    hapchung: HapChungResult
    yongshin: list[str]
    deun: list[DeunItem]
```

#### 1-4. 예외 클래스 (`core/exceptions.py`)

```python
class SajuError(Exception): ...
class SolarTermNotFoundError(SajuError): ...
class InvalidLunarDateError(SajuError): ...
class InvalidDateRangeError(SajuError): ...
```

#### 1-5. 데이터 파일 복사

- `manse_ori/data/julgi.json` → `data/julgi.json` 복사 확인
- 데이터 형식 분석 및 문서화

---

### Phase 2: 핵심 계산 모듈 - 우선순위: Primary Goal

**목표**: 4주 계산을 가능하게 하는 핵심 모듈 구현

#### 2-1. 양음력 변환 (`core/calendar.py`)

구현 함수:
```python
def lunar_to_solar(year: int, month: int, day: int,
                   is_leap: bool = False) -> date: ...

def solar_to_lunar(dt: date) -> tuple[int, int, int, bool]:
    # returns (year, month, day, is_leap)
    ...
```

검증 전략:
- `manse_ori/changeYangUm.js` 로직 분석
- 경계값 테스트: 윤달, 월말, 연말
- 50+ 케이스 양방향 변환 검증

#### 2-2. 절기 계산 (`core/solar_term.py`)

구현 내용:
```python
# 싱글턴 캐시 패턴
_JULGI_CACHE: dict | None = None

def get_julgi_cache() -> dict:
    """julgi.json을 한 번만 로드하여 캐시로 반환"""
    global _JULGI_CACHE
    if _JULGI_CACHE is None:
        _JULGI_CACHE = _load_julgi_json()
    return _JULGI_CACHE

def get_solar_term_entry(year: int, month: int) -> datetime:
    """해당 월의 절입 시각 반환"""
    ...

def get_month_pillar_index(birth_dt: datetime) -> int:
    """절입 시각 기준으로 월주 인덱스 결정"""
    ...
```

주의사항:
- `julgi.json` 데이터 구조 완전 분석 필요
- 절입 시각은 분(minute) 단위까지 정확해야 함
- 1600년 이전/2100년 이후 요청 시 `SolarTermNotFoundError` 발생

#### 2-3. 4주 계산 (`core/pillar.py`)

구현 함수:
```python
def calc_year_pillar(solar_year: int) -> GanJi: ...
def calc_month_pillar(birth_dt: datetime) -> GanJi: ...
def calc_day_pillar(birth_date: date) -> GanJi: ...
def calc_hour_pillar(day_gan: str, birth_hour: int) -> GanJi: ...

def calc_four_pillars(request: SajuRequest) -> FourPillars: ...
```

계산 원리:
- **년주**: `(solar_year - 4) % 60` → 60갑자 인덱스
- **월주**: 절입 시각 기준 월 확정 → `(년간 인덱스 × 12 + 월 오프셋) % 60`
- **일주**: 기준일(1900년 1월 1일 = 갑술)부터 경과 일수 계산
- **시주**: 일간 기준으로 12지지별 시간(時干) 결정

#### 2-4. 지장간 (`core/jijanggan.py`)

구현 내용:
```python
# 12지지 × 지장간 하드코딩 테이블
JIJANGGAN_TABLE: dict[str, HiddenStems] = {
    "자": HiddenStems(initial="임", middle=None, main="계"),
    "축": HiddenStems(initial="계", middle="신", main="기"),
    # ...
}

def get_hidden_stems(ji: str) -> HiddenStems: ...
```

---

### Phase 3: 분석 모듈 - 우선순위: Secondary Goal

**목표**: 사주 분석에 필요한 부가 정보 계산

#### 3-1. 음양오행 (`core/ohang.py`)

```python
def get_gan_ohang(gan: str) -> str: ...       # 천간 → 오행
def get_ji_ohang(ji: str) -> str: ...         # 지지 → 오행
def calc_ohang_ratio(pillars: FourPillars) -> OHangRatio:
    """4주 + 지장간 기반 오행 비율 계산 (합계 100%)"""
    ...
```

#### 3-2. 육신 계산 (`core/yuksin.py`)

```python
def calc_yuksin(day_gan: str, target_gan: str) -> str:
    """일간 기준 대상 천간의 육신 결정
    Returns: "비견"|"겁재"|"식신"|"상관"|"편재"|"정재"|"편관"|"정관"|"편인"|"정인"
    """
    ...
```

육신 결정 로직:
- 오행 관계 (동일/생/극) + 음양 동일성으로 편/정 결정
- 비겁: 같은 오행 (양-양 or 음-음 = 비견, 이성 = 겁재)
- 식상: 일간이 생하는 오행 (동성 = 식신, 이성 = 상관)
- 재성: 일간이 극하는 오행 (이성 = 편재, 동성 = 정재)
- 관성: 일간을 극하는 오행 (이성 = 편관, 동성 = 정관)
- 인성: 일간을 생하는 오행 (이성 = 편인, 동성 = 정인)

#### 3-3. 합충형해 (`core/hapchung.py`)

```python
def find_cheongan_hap(gans: list[str]) -> list[HapResult]: ...   # 천간합
def find_samhap(jis: list[str]) -> list[HapResult]: ...           # 삼합
def find_yukhap(jis: list[str]) -> list[HapResult]: ...           # 육합
def find_banghap(jis: list[str]) -> list[HapResult]: ...          # 방합
def find_chung(jis: list[str]) -> list[ChungResult]: ...          # 충
def find_hyeong(jis: list[str]) -> list[HyeongResult]: ...        # 형
def find_hae(jis: list[str]) -> list[HaeResult]: ...              # 해

def analyze_hapchung(pillars: FourPillars) -> HapChungResult: ...
```

#### 3-4. 용신 분석 (`core/yongshin.py`)

```python
def calc_yongshin(pillars: FourPillars, ohang_ratio: OHangRatio) -> list[str]:
    """오행 불균형 기반 용신 결정"""
    ...
```

---

### Phase 4: 고급 계산 - 우선순위: Secondary Goal

#### 4-1. 대운 계산 (`core/deun.py`)

```python
def calc_deun_direction(year_gan: str, gender: str) -> str:
    """순행/역행 결정
    Returns: "forward" | "reverse"
    """
    ...

def calc_deun_number(birth_dt: datetime, gender: str,
                     julgi_cache: dict) -> int:
    """대운수(첫 대운 시작 나이) 계산"""
    ...

def calc_deun_list(month_pillar: GanJi, direction: str,
                   deun_number: int, count: int = 10) -> list[DeunItem]:
    """대운 목록 계산 (기본 10대운)"""
    ...
```

대운수 계산 원리:
- 순행: 출생일에서 다음 절기까지의 일수 ÷ 3
- 역행: 출생일에서 이전 절기까지의 일수 ÷ 3
- 소수점 이하 처리: 반올림 또는 버림 (manse_ori 로직 확인 필요)

---

### Phase 5: 통합 테스트 - 우선순위: Final Goal

#### 5-1. `manse_ori` 레퍼런스 케이스 포팅

`tests/conftest.py`에 픽스처로 등록:

```python
@pytest.fixture
def reference_cases() -> list[dict]:
    """manse_ori의 60+ 테스트 케이스 로드"""
    cases_path = Path(__file__).parent / "data" / "reference_cases.json"
    return json.loads(cases_path.read_text())
```

포팅 대상 케이스 (최소 60개):
- 남성 양년생 (갑·병·무·경·임년)
- 여성 음년생 (을·정·기·신·계년)
- 음력 입력 케이스
- 윤달 케이스
- 시주 없음 케이스
- 절입 경계 케이스 (절입 전후 1시간 이내)

#### 5-2. 통합 테스트 (`tests/test_integration.py`)

```python
@pytest.mark.parametrize("case", reference_cases())
def test_reference_case_full_pipeline(case):
    """manse_ori 레퍼런스 케이스 100% 일치 검증"""
    request = SajuRequest(**case["input"])
    result = calc_saju(request)
    assert result.four_pillars.year_pillar == GanJi(**case["expected"]["year_pillar"])
    assert result.four_pillars.month_pillar == GanJi(**case["expected"]["month_pillar"])
    assert result.four_pillars.day_pillar == GanJi(**case["expected"]["day_pillar"])
    if case["input"].get("hour") is not None:
        assert result.four_pillars.hour_pillar == GanJi(**case["expected"]["hour_pillar"])
```

---

## 3. 기술 스택 및 의존성

### 3.1 프로덕션 의존성 (`requirements.txt`)

```
pydantic>=2.6.0
python-dateutil>=2.9.0
```

> 의도적으로 최소 의존성 유지. 절기 계산과 음력 변환은 `julgi.json` 데이터 기반 자체 구현.

### 3.2 개발 의존성 (`requirements-dev.txt`)

```
pytest>=8.0.0
pytest-cov>=5.0.0
pytest-asyncio>=0.23.0
mypy>=1.8.0
ruff>=0.3.0
```

### 3.3 `pyproject.toml` 핵심 설정

```toml
[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "--cov=core --cov-report=term-missing"

[tool.ruff]
line-length = 100
target-version = "py311"

[tool.mypy]
strict = true
python_version = "3.11"
```

---

## 4. 위험 분석 (Risk Analysis)

| 위험 | 수준 | 영향 | 완화 전략 |
|------|------|------|----------|
| 절기 기준 월주 계산 오차 | High | 4주 전체 오류 | manse_ori 절입 로직 완전 이해 후 구현. 경계값 20+ 케이스 테스트 |
| 음력 변환 정확도 | High | 모든 음력 입력 실패 | manse_ori `changeYangUm.js` 로직 1:1 이식. 1900~2100년 전체 검증 |
| 대운 순역행 경계 조건 | Medium | 대운수 1~2년 오차 | 소수점 처리 방식 manse_ori와 동일하게 맞춤 |
| manse_ori 레퍼런스 100% 불일치 | High | 프로덕션 배포 불가 | Phase 1부터 conftest.py 케이스 등록 후 TDD로 개발 |
| `julgi.json` 데이터 형식 변경 | Low | 절기 파싱 오류 | 데이터 스키마 버전 관리 및 로딩 시 유효성 검증 |

---

## 5. 테스트 전략 (Test Strategy)

### 5.1 테스트 피라미드

```
        통합 테스트 (Integration)
       ─────────────────────────────
         단위 테스트 (Unit)
       ─────────────────────────────
      데이터 검증 (Data Validation)
```

| 테스트 유형 | 비율 | 도구 | 목표 |
|------------|------|------|------|
| 단위 테스트 | 70% | pytest | 각 모듈 함수별 입출력 검증 |
| 통합 테스트 | 25% | pytest | manse_ori 60+ 케이스 100% 통과 |
| 데이터 검증 | 5% | pytest | julgi.json 형식 및 범위 유효성 |

### 5.2 픽스처 설계 (`tests/conftest.py`)

```python
@pytest.fixture(scope="session")
def julgi_cache() -> dict:
    """세션 범위 julgi.json 캐시 (테스트 속도 최적화)"""
    return get_julgi_cache()

@pytest.fixture
def sample_request_male_1984() -> SajuRequest:
    return SajuRequest(year=1984, month=4, day=15, hour=10, gender="male")

@pytest.fixture
def reference_cases() -> list[dict]:
    """manse_ori 레퍼런스 케이스 전체 로드"""
    ...
```

### 5.3 커버리지 목표

| 패키지 | 목표 커버리지 |
|--------|-------------|
| `core/` 전체 | ≥ 85% |
| `core/pillar.py` | ≥ 95% (핵심 모듈) |
| `core/solar_term.py` | ≥ 90% |
| `core/yuksin.py` | ≥ 90% |
