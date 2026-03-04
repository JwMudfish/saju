# 사주 분석 웹 서비스 - 프로젝트 구조 명세서

## 디렉토리 구조 전체 개요

```
saju/
├── app/                        # FastAPI 애플리케이션
│   ├── __init__.py
│   ├── main.py                 # FastAPI 앱 진입점
│   ├── config.py               # 앱 설정 (Pydantic BaseSettings)
│   ├── api/                    # FastAPI 라우터 및 엔드포인트
│   │   ├── __init__.py
│   │   ├── router.py           # API 라우터 설정
│   │   ├── deps.py             # 의존성 주입
│   │   └── endpoints/
│   │       ├── __init__.py
│   │       ├── saju.py         # POST /api/v1/saju
│   │       ├── calendar.py     # POST /api/v1/calendar/convert
│   │       └── health.py       # GET /health
│   └── services/               # 비즈니스 서비스 레이어
│       ├── __init__.py
│       ├── saju_service.py         # 사주 계산 오케스트레이션
│       ├── calendar_service.py     # 달력 변환 서비스
│       ├── interpretation_service.py  # LLM 해설 서비스
│       └── prompt_builder.py       # 사주 결과 → 프롬프트 변환
├── core/                       # 사주 계산 엔진 (핵심 도메인 로직)
│   ├── __init__.py
│   ├── models/                 # 도메인 모델 (Pydantic/데이터클래스)
│   │   └── ...
│   └── ...                     # 계산 모듈들 (calendar, pillar 등)
├── data/                       # 정적 데이터 파일
│   ├── julgi.json              # 400년 절기 데이터 (manse_ori에서 이전)
│   ├── gansipyo.json           # 갑자표 (60 간지 순환)
│   └── jijanggan.json          # 지장간 데이터
├── tests/                      # 테스트 스위트
│   ├── __init__.py
│   ├── conftest.py             # pytest 픽스처 설정
│   ├── test_core/
│   │   ├── test_calendar.py    # 양음력 변환 테스트
│   │   ├── test_pillar.py      # 4주 계산 테스트
│   │   ├── test_solar_term.py  # 절기 탐지 테스트
│   │   ├── test_jijanggan.py   # 지장간 테스트
│   │   ├── test_ohang.py       # 오행 분석 테스트
│   │   ├── test_yuksin.py      # 육신 테스트
│   │   ├── test_hapchung.py    # 합충 테스트
│   │   └── test_deun.py        # 대운 테스트
│   ├── test_api/
│   │   ├── test_saju_endpoint.py
│   │   └── test_calendar_endpoint.py
│   └── test_data/
│       └── reference_cases.json  # manse_ori 60+ 레퍼런스 케이스
├── streamlit_app.py            # Streamlit UI 진입점 (프로젝트 루트)
├── .env.example                # 환경 변수 템플릿
├── .env                        # 실제 환경 변수 (git 무시)
├── pyproject.toml              # 프로젝트 메타데이터 및 의존성 (uv 관리)
└── README.md                   # 프로젝트 소개 문서
```

> **참고**: Streamlit UI는 `streamlit_app.py`로 프로젝트 루트에 위치합니다 (`app/ui/`가 아님).
> LLM 통합은 `app/services/interpretation_service.py`에 구현되어 있습니다 (`app/llm/`이 아님).
> 도메인 모델은 `core/models/`에 위치합니다 (`app/models/`가 아님).

---

## 각 모듈 역할 상세 설명

### `app/core/` - 사주 계산 엔진

핵심 도메인 로직을 담당하는 순수 계산 모듈입니다. 외부 의존성(HTTP, DB, LLM)을 일절 포함하지 않아 독립적인 테스트와 재사용이 가능합니다.

| 파일 | 역할 | 주요 기능 |
|------|------|-----------|
| `calendar.py` | 양음력 변환 | `SolarToLunar`, `LunarToSolar`, 윤달 판별 |
| `pillar.py` | 4주 계산 | `calculate_year_pillar`, `calculate_month_pillar`, `calculate_day_pillar`, `calculate_hour_pillar` |
| `solar_term.py` | 절기 계산 | `find_solar_term`, `get_month_stem_by_term`, julgi.json 로딩 |
| `jijanggan.py` | 지장간 추출 | `get_hidden_stems`, 여기/중기/정기 분류 |
| `ohang.py` | 음양오행 | `get_ohang`, `get_yinyang`, 오행 비율 계산 |
| `yuksin.py` | 육신 계산 | `calculate_yuksin`, 일간 대비 각 간지 관계 분류 |
| `hapchung.py` | 합충 분석 | `find_samhap`, `find_yukhap`, `find_chung`, `find_hyeong`, `find_hae` |
| `yongshin.py` | 용신 분석 | `determine_yongshin`, 억부/조후/통관 용신 결정 |
| `deun.py` | 대운 계산 | `calculate_deun_number`, `generate_deun_list`, 남녀 순역행 구분 |

**설계 원칙**: 모든 함수는 순수 함수(pure function)로 작성합니다. 전역 상태 없이 입력에 대해 항상 동일한 출력을 반환합니다.

---

### `app/models/` - 도메인 모델

Pydantic v2 모델을 사용하여 입력 검증과 도메인 객체를 정의합니다.

#### `input.py` - 입력 모델

```python
# 예시 구조 (실제 구현 시 참고)
class SajuRequest(BaseModel):
    name: str                        # 이름
    birth_year: int                  # 출생 연도 (1600-2100)
    birth_month: int                 # 출생 월 (1-12)
    birth_day: int                   # 출생 일 (1-31)
    birth_hour: int | None           # 출생 시각 (0-23), 모를 경우 None
    gender: Literal["male", "female"]  # 성별 (대운 순역행 결정)
    is_lunar: bool = False           # 음력 여부
    is_leap_month: bool = False      # 윤달 여부
    include_llm: bool = True         # LLM 해설 포함 여부
```

#### `saju.py` - 사주 결과 모델

```python
# 예시 구조
class GanJi(BaseModel):
    gan: str    # 천간 (갑을병정무기경신임계)
    ji: str     # 지지 (자축인묘진사오미신유술해)
    ohang: str  # 오행
    yinyang: str  # 음양

class FourPillars(BaseModel):
    year: GanJi
    month: GanJi
    day: GanJi
    hour: GanJi | None
```

---

### `app/api/` - FastAPI 레이어

REST API 엔드포인트를 정의합니다. 계산 로직은 `services/`에 위임하고, API 레이어는 요청/응답 직렬화와 인증만 담당합니다.

#### 주요 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| `POST` | `/api/v1/saju` | 사주 계산 및 운세 해설 |
| `POST` | `/api/v1/calendar/convert` | 양음력 변환 |
| `GET` | `/api/v1/saju/terms` | 절기 정보 조회 |
| `GET` | `/health` | 서버 상태 확인 |

#### `middleware/auth.py` - 인증

- JWT Bearer 토큰 인증
- API Key 헤더(`X-API-Key`) 인증
- 두 방식 모두 지원, 선택적 적용

---

### `app/ui/` - Streamlit UI

프로토타입 및 테스트 목적의 웹 UI입니다. FastAPI와 독립적으로 실행 가능합니다.

#### 화면 구성

| 컴포넌트 | 설명 |
|----------|------|
| `input_form.py` | 생년월일시 입력, 양음력 선택, 성별 선택 |
| `result_view.py` | 사주팔자 표, 육신표, 오행 비율 차트 |
| `pillar_chart.py` | 4주 8자 시각적 표현 (색상 오행 구분) |
| `deun_chart.py` | 대운 타임라인 시각화 |

---

### `app/llm/` - OpenAI 통합

GPT-4o를 활용한 사주 해설 생성 모듈입니다.

#### `prompts.py` - 프롬프트 전략

```
시스템 프롬프트: "당신은 30년 경력의 사주 전문가입니다.
                사주를 쉽고 친근하게 설명합니다."
사용자 프롬프트: 구조화된 사주 데이터 + 해설 요청
```

- 사주 원국(原局) 데이터 포함
- 특정 질문 가능 (올해 운세, 직업운, 연애운 등)
- 응답 포맷 지정 (JSON 또는 자유 텍스트)

---

### `app/services/` - 서비스 레이어

비즈니스 로직 오케스트레이션입니다. `core/` 모듈들을 조합하여 완전한 분석 결과를 생성합니다.

#### `saju_service.py` 처리 흐름

```
1. SajuRequest 수신
2. 음력이면 → calendar.py로 양력 변환
3. solar_term.py로 절기 기준 월주 계산
4. pillar.py로 4주 계산
5. jijanggan.py로 지장간 추출
6. ohang.py로 오행 분석
7. yuksin.py로 육신 계산
8. hapchung.py로 합충 분석
9. yongshin.py로 용신 판단
10. deun.py로 대운 계산
11. (선택) llm/client.py로 해설 생성
12. SajuResponse 반환
```

---

### `data/` - 정적 데이터

| 파일 | 크기 | 설명 |
|------|------|------|
| `julgi.json` | ~347KB | 1600~2100년 절기 정확한 시각 데이터 |
| `gansipyo.json` | ~5KB | 60 갑자 순환표 |
| `jijanggan.json` | ~3KB | 12지지별 지장간 구성 |

`julgi.json`은 manse_ori에서 그대로 이전하되, 파이썬 코드에서 효율적 접근을 위해 인덱싱 구조를 최적화합니다.

---

### `tests/` - 테스트 스위트

manse_ori의 60+ 검증된 테스트 케이스를 Python pytest로 포팅합니다.

#### 테스트 전략

| 레벨 | 대상 | 방법 |
|------|------|------|
| 단위 테스트 | `core/` 각 모듈 | pytest + 레퍼런스 케이스 비교 |
| 통합 테스트 | `services/` | 실제 입력 → 전체 결과 검증 |
| API 테스트 | `api/` 엔드포인트 | httpx + pytest-asyncio |
| 회귀 테스트 | manse_ori 결과와 비교 | `test_data/reference_cases.json` 활용 |

#### `test_data/reference_cases.json` 구조

```json
[
  {
    "description": "갑자년생 남성 예시",
    "input": {
      "birth_year": 1984, "birth_month": 4, "birth_day": 15,
      "birth_hour": 10, "gender": "male", "is_lunar": false
    },
    "expected": {
      "year_pillar": {"gan": "갑", "ji": "자"},
      "month_pillar": {"gan": "병", "ji": "진"},
      "day_pillar": {"gan": "경", "ji": "술"},
      "hour_pillar": {"gan": "무", "ji": "오"}
    }
  }
]
```

---

## 모듈 간 의존성 다이어그램

```
입력 요청
    │
    ▼
api/endpoints/saju.py
    │
    ▼
services/saju_service.py ◄──────────── llm/client.py
    │                                        │
    ├── core/calendar.py                     ▲
    ├── core/solar_term.py ◄── data/julgi.json
    ├── core/pillar.py
    ├── core/jijanggan.py ◄── data/jijanggan.json
    ├── core/ohang.py
    ├── core/yuksin.py
    ├── core/hapchung.py
    ├── core/yongshin.py
    └── core/deun.py
    │
    ▼
models/analysis.py (응답 모델)
    │
    ▼
API 응답 / Streamlit UI 표시
```

**의존성 규칙**:
- `core/` 모듈은 상호 의존하지 않음 (단방향 흐름)
- `services/`만 여러 `core/` 모듈을 조합
- `api/`는 `services/`와 `models/`만 의존
- `ui/`는 `services/`나 직접 API 호출 중 선택 가능
