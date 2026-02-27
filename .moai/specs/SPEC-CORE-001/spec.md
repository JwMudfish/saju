---
id: SPEC-CORE-001
version: 1.0.0
status: completed
created: 2026-02-27
updated: 2026-02-27
author: jw
priority: critical
---

## HISTORY

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-02-27 | jw | 최초 작성 |

---

## 1. 개요 (Overview)

### 1.1 프로젝트 배경

사주팔자(四柱八字)는 출생 연·월·일·시를 60갑자(干支) 체계로 변환하여 개인의 운명과 성격을 분석하는 동양 전통 명리학이다. 본 프로젝트는 기존 Node.js 기반 레퍼런스 구현체(`manse_ori/`)를 분석하여, 프로덕션 수준의 Python 순수 계산 엔진으로 재구현하는 것을 목표로 한다.

기존 구현체(`manse_ori/`)는 기능적으로 검증된 코드이나, **전역 변수(global variable) 사용으로 인한 동시성 버그** 및 타입 안전성 부재 문제를 내포하고 있다. 신규 Python 엔진은 이 문제를 근본적으로 해결하면서 동일한 계산 결과를 보장해야 한다.

### 1.2 범위 (Scope)

**포함 범위:**
- 양음력 상호 변환 (`calendar.py`)
- 절기(節氣) 데이터 로드 및 절입(節入) 시각 계산 (`solar_term.py`)
- 년·월·일·시 4주(四柱) 계산 (`pillar.py`)
- 지장간(地藏干) 추출 (`jijanggan.py`)
- 음양오행(陰陽五行) 분석 (`ohang.py`)
- 육신(六神) 관계 계산 (`yuksin.py`)
- 합충형해(合沖刑害) 분석 (`hapchung.py`)
- 용신(用神) 분석 (`yongshin.py`)
- 대운(大運) 계산 (`deun.py`)
- `julgi.json` 기반 400년치 절기 데이터 관리

**제외 범위:**
- REST API 엔드포인트 (별도 SPEC)
- 웹 프론트엔드 UI (별도 SPEC)
- 사용자 인증 및 세션 관리 (별도 SPEC)
- 데이터베이스 영속성 (별도 SPEC)

### 1.3 목표 (Goals)

| 목표 | 설명 |
|------|------|
| 정확성 | `manse_ori/` 레퍼런스의 60+ 테스트 케이스 100% 일치 |
| 동시성 안전 | 요청 범위(request-scoped) 객체로 전역 변수 완전 제거 |
| 타입 안전성 | Pydantic v2 BaseModel을 통한 모든 입출력 타입 검증 |
| 성능 | `julgi.json` 캐시 후 단일 사주 계산 500ms 미만 |
| 테스트 가능성 | 순수 함수(Pure Function) 기반으로 단위 테스트 100% 가능 |

---

## 2. 도메인 용어 정의 (Domain Terms)

### 2.1 핵심 용어 테이블

| 한국어 | 한자 | 영문 식별자 | 설명 |
|--------|------|-------------|------|
| 간지 | 干支 | `GanJi` | 천간(天干)과 지지(地支)의 조합. 예: 갑자(甲子) |
| 천간 | 天干 | `gan` (heavenly stem) | 갑·을·병·정·무·기·경·신·임·계 (10개) |
| 지지 | 地支 | `ji` (earthly branch) | 자·축·인·묘·진·사·오·미·신·유·술·해 (12개) |
| 4주 | 四柱 | `FourPillars` | 년주·월주·일주·시주의 총칭 |
| 년주 | 年柱 | `year_pillar` | 출생 연도의 간지 |
| 월주 | 月柱 | `month_pillar` | 출생 월의 간지 (절기 기준) |
| 일주 | 日柱 | `day_pillar` | 출생 일의 간지 |
| 시주 | 時柱 | `hour_pillar` | 출생 시각의 간지 (선택) |
| 60갑자 | 六十甲子 | `SEXAGENARY_CYCLE` | 천간과 지지의 60가지 조합 순환 |
| 절기 | 節氣 | `solar_term` | 24절기. 월주 결정에 사용 |
| 절입 | 節入 | `solar_term_entry` | 절기가 시작되는 정확한 일시 |
| 지장간 | 地藏干 | `hidden_stems` | 지지 내부에 감춰진 천간. 여기·중기·정기로 구성 |
| 여기 | 餘氣 | `initial_ki` | 지장간 첫 번째 기운 |
| 중기 | 中氣 | `middle_ki` | 지장간 두 번째 기운 (없을 수 있음) |
| 정기 | 正氣 | `main_ki` | 지장간 세 번째 기운 (주기) |
| 오행 | 五行 | `OHang` | 목(木)·화(火)·토(土)·금(金)·수(水) |
| 음양 | 陰陽 | `UmYang` | 음(陰, yin)과 양(陽, yang) |
| 육신 | 六神 | `yuksin` | 일간 기준 나머지 천간의 관계. 비겁·식상·재성·관성·인성 |
| 비겁 | 比劫 | `bigyeob` | 나와 같은 오행. 비견·겁재 |
| 식상 | 食傷 | `sigsang` | 내가 생하는 오행. 식신·상관 |
| 재성 | 財星 | `jaeseong` | 내가 극하는 오행. 편재·정재 |
| 관성 | 官星 | `gwanseong` | 나를 극하는 오행. 편관·정관 |
| 인성 | 印星 | `inseong` | 나를 생하는 오행. 편인·정인 |
| 합충형해 | 合沖刑害 | `HapChung` | 간지 간의 상호작용. 합(合)·충(沖)·형(刑)·해(害) |
| 삼합 | 三合 | `samhap` | 지지 3개의 합 (예: 신자진 水局) |
| 육합 | 六合 | `yukhap` | 지지 2개의 합 (예: 자축 土) |
| 용신 | 用神 | `yongshin` | 사주에서 가장 필요한 오행 |
| 대운 | 大運 | `deun` | 10년 단위의 운세 주기 |
| 대운수 | 大運數 | `deun_number` | 대운이 시작되는 나이 |
| 순행 | 順行 | `forward` | 월지를 다음 방향으로 진행하는 대운 |
| 역행 | 逆行 | `reverse` | 월지를 이전 방향으로 거슬러 진행하는 대운 |
| 양력 | 陽曆 | `solar` | 그레고리력 (Gregorian calendar) |
| 음력 | 陰曆 | `lunar` | 태음태양력 (Lunisolar calendar) |
| 윤달 | 閏月 | `leap_month` | 음력에서 추가된 달 |

---

## 3. EARS 요구사항 (Requirements)

### 3.1 Ubiquitous Requirements (항상 적용)

**FR-001**
시스템은 항상 순수 함수(Pure Function)로 사주를 계산해야 한다.
> WHY: 전역 상태 제거로 동시성 버그 방지 및 단위 테스트 용이성 확보
> IMPACT: 위반 시 다중 요청 환경에서 데이터 오염 발생

**FR-002**
시스템은 항상 Pydantic v2 `BaseModel`을 사용하여 모든 계산 입출력을 타입 안전하게 처리해야 한다.
> WHY: 런타임 타입 오류를 조기에 감지하여 신뢰성 확보
> IMPACT: 위반 시 잘못된 타입 데이터로 인한 계산 오류 발생

**FR-003**
시스템은 항상 `julgi.json`을 서버 시작 시 한 번만 로드하여 싱글턴 캐시(singleton cache)로 관리해야 한다.
> WHY: 347KB 파일을 매 요청마다 읽으면 성능 저하 발생
> IMPACT: 위반 시 요청당 10~50ms 추가 지연 및 I/O 부하 증가

**FR-004**
시스템은 항상 60갑자(60 Sexagenary Cycle) 순환 테이블을 기반으로 간지를 결정해야 한다.
> WHY: 간지 계산의 일관성과 정확성을 보장하는 표준 방법
> IMPACT: 위반 시 년·월·일·시 간지 계산 오류 발생

**FR-005**
시스템은 항상 1600년 ~ 2100년 범위의 생년월일만 지원해야 한다.
> WHY: `julgi.json`이 해당 범위만 커버하며, 범위 외 데이터는 신뢰 불가
> IMPACT: 위반 시 절기 데이터 미존재로 `KeyError` 발생

---

### 3.2 Event-Driven Requirements (이벤트 기반)

**FR-006**
WHEN 생년월일시와 성별이 `SajuRequest`로 입력되면, THEN 시스템은 년·월·일·시 4주(四柱)를 계산해야 한다.

**FR-007**
WHEN 절입(節入) 시각이 주어지면, THEN 시스템은 절기 기준으로 월주의 천간을 결정해야 한다.
> 절입 시각 이전 출생: 이전 달 월간(月干) 적용
> 절입 시각 이후 출생: 해당 달 월간(月干) 적용

**FR-008**
WHEN 지지(地支)가 주어지면, THEN 시스템은 여기(餘氣)·중기(中氣)·정기(正氣) 3단계 지장간을 추출해야 한다.
> 일부 지지는 중기가 없음 (예: 자(子), 오(午))

**FR-009**
WHEN 일주(日柱)의 일간(日干)이 결정되면, THEN 시스템은 나머지 7개 천간(년간·월간·시간·지장간 포함)과의 육신 관계를 계산해야 한다.
> 육신 계산 기준: 오행 상생·상극 관계 + 음양 동일/이성 여부

**FR-010**
WHEN 모든 4주 계산이 완료되면, THEN 시스템은 합충형해(合沖刑害) 관계를 종합 분석해야 한다.
> 분석 대상: 천간합, 지지 삼합·육합·방합, 충(沖), 형(刑), 해(害)

---

### 3.3 State-Driven Requirements (상태 기반)

**FR-011**
IF 입력이 음력(`is_lunar=True`)이면, THEN 사주 계산 전에 반드시 양력으로 변환해야 한다.
> 윤달 여부(`is_leap_month`)를 함께 처리해야 함

**FR-012**
IF 성별이 남성이고 출생 년간이 양(陽)이면 (또는 여성이고 음(陰)이면), THEN 시스템은 대운을 순행(順行)으로 계산해야 한다.

**FR-013**
IF 성별이 여성이고 출생 년간이 양(陽)이면 (또는 남성이고 음(陰)이면), THEN 시스템은 대운을 역행(逆行)으로 계산해야 한다.

---

### 3.4 Optional Requirements (선택 기능)

**FR-014**
Where 출생 시각(`birth_hour`)이 제공된 경우, 시주(時柱)를 계산해야 한다. 제공되지 않으면 `hour_pillar = None`으로 처리해야 한다.

---

### 3.5 Unwanted Behavior Requirements (금지 조건)

**FR-015**
If 출생 연도가 지원 범위(1600~2100년) 밖이면, THEN 시스템은 `ValueError`를 발생시켜야 한다.
> 오류 메시지: "1600~2100년 범위만 지원합니다. 입력값: {year}"

**FR-016**
If `julgi.json`에서 해당 연도 절기 데이터를 찾을 수 없으면, THEN 시스템은 `SolarTermNotFoundError`를 발생시켜야 한다.

**FR-017**
If 음력 날짜가 해당 월의 유효 범위를 초과하면, THEN 시스템은 `InvalidLunarDateError`를 발생시켜야 한다.
> 예: 음력 2월 30일 → 해당 월의 최대 일수 초과 시

---

## 4. 모듈 구조 (Module Structure)

```
saju/
├── core/                           # 순수 계산 엔진 패키지
│   ├── __init__.py
│   ├── constants.py                # 60갑자, 오행, 음양 상수 및 Enum 정의
│   ├── exceptions.py               # SolarTermNotFoundError, InvalidLunarDateError 등
│   ├── models/                     # Pydantic v2 도메인 모델
│   │   ├── __init__.py
│   │   ├── request.py              # SajuRequest (입력 모델)
│   │   ├── response.py             # SajuResult, FourPillars, GanJi (출력 모델)
│   │   └── domain.py               # HiddenStems, Yuksin, OHangRatio 등 내부 모델
│   ├── calendar.py                 # 양력 ↔ 음력 상호 변환
│   ├── solar_term.py               # julgi.json 로더(싱글턴) + 절입 시각 계산
│   ├── pillar.py                   # 년·월·일·시 4주 계산 (핵심 모듈)
│   ├── jijanggan.py                # 지장간 추출
│   ├── ohang.py                    # 음양오행 분류 및 비율 계산
│   ├── yuksin.py                   # 육신 관계 계산
│   ├── hapchung.py                 # 합충형해 분석
│   ├── yongshin.py                 # 용신 분석
│   └── deun.py                     # 대운 계산
├── data/
│   ├── julgi.json                  # 400년치 절기 데이터 (347KB, manse_ori에서 복사)
│   └── lunar_calendar.json         # 음력 변환 데이터 (필요 시)
├── tests/
│   ├── conftest.py                 # reference_cases fixture (manse_ori 60+ 케이스)
│   ├── test_calendar.py
│   ├── test_solar_term.py
│   ├── test_pillar.py
│   ├── test_jijanggan.py
│   ├── test_ohang.py
│   ├── test_yuksin.py
│   ├── test_hapchung.py
│   ├── test_yongshin.py
│   ├── test_deun.py
│   └── test_integration.py         # 전체 파이프라인 통합 테스트
├── requirements.txt
├── requirements-dev.txt
└── pyproject.toml
```

---

## 5. 제약 사항 (Constraints)

### 5.1 성능 제약

| 항목 | 기준값 | 측정 조건 |
|------|--------|----------|
| 단일 사주 계산 시간 | < 500ms | `julgi.json` 캐시 로드 완료 후 |
| 메모리 증가량 | < 100MB | 단일 요청 처리 시 |
| `julgi.json` 초기 로드 시간 | < 2,000ms | 서버 최초 시작 시 |

### 5.2 호환성 제약

| 항목 | 요구사항 |
|------|----------|
| Python 버전 | 3.11 이상 |
| Pydantic 버전 | v2.6.0 이상 |
| 지원 연도 범위 | 1600 ~ 2100년 |
| 지원 달력 형식 | 양력(Gregorian), 음력(Lunisolar) |

### 5.3 데이터 요구사항

| 항목 | 설명 |
|------|------|
| `julgi.json` | `manse_ori/data/julgi.json`에서 복사. 400년치 절기 데이터 포함 |
| 60갑자 테이블 | `constants.py`에 하드코딩. 천간 10개 × 지지 12개 = 60 조합 |
| 지장간 테이블 | `jijanggan.py`에 12지지 × 여기·중기·정기 형태로 하드코딩 |
| 오행 상생·상극표 | `constants.py`에 Dict 형태로 정의 |
| 육신 계산 매트릭스 | `yuksin.py`에 일간 기준 10천간 × 육신 매핑 테이블로 정의 |

### 5.4 품질 제약

| 항목 | 기준 |
|------|------|
| 테스트 커버리지 | `core/` 패키지 85% 이상 |
| `manse_ori` 회귀 테스트 | 60+ 케이스 100% 통과 |
| 타입 체크 | `mypy --strict` 오류 0건 |
| 린트 | `ruff check` 오류 0건 |
