---
id: SPEC-API-001
version: 1.0.0
status: completed
created: 2026-02-27
updated: 2026-02-27
author: jw
priority: high
---

## HISTORY

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-02-27 | jw | 최초 작성 |

---

## 1. 개요 (Overview)

### 1.1 프로젝트 배경

SPEC-CORE-001에서 구현된 사주팔자 Python 순수 계산 엔진(`core/`)을 외부에 노출하는 FastAPI 기반 REST API 레이어를 구축한다. 계산 엔진은 프로젝트 루트의 `core/` 패키지에 위치하며, API 레이어는 `app/` 패키지로 분리된다.

### 1.2 범위 (Scope)

**포함 범위:**
- `app/` 디렉토리 구조 생성 (FastAPI 애플리케이션 패키지)
- 3개 REST API 엔드포인트 구현
  - `POST /api/v1/saju` - 사주 계산
  - `POST /api/v1/calendar/convert` - 음양력 변환
  - `GET /health` - 헬스 체크
- 서비스 레이어 (`app/services/`)
- Pydantic BaseSettings 기반 설정 관리 (`app/config.py`)
- pytest-asyncio 기반 API 테스트

**제외 범위:**
- LLM 통합 (별도 SPEC으로 분리)
- Streamlit UI (별도 SPEC으로 분리)
- 인증/인가 JWT + API Key (별도 SPEC으로 분리)
- 데이터베이스 연동 (별도 SPEC으로 분리)
- 레이트 리미팅 (별도 SPEC으로 분리)

### 1.3 의존성

| SPEC ID | 제목 | 상태 | 관계 |
|---------|------|------|------|
| SPEC-CORE-001 | 사주팔자 Python 순수 계산 엔진 | completed | 필수 선행 의존 |
| SPEC-INFRA-001 | 인프라 구성 (Docker, CI/CD) | planned | 선택적 |

---

## 2. 환경 (Environment)

### 2.1 기술 스택

| 항목 | 버전 | 역할 |
|------|------|------|
| Python | >=3.11 | 런타임 |
| FastAPI | >=0.110.0 | ASGI 웹 프레임워크 |
| Uvicorn | >=0.27.0 | ASGI 서버 |
| Pydantic v2 | >=2.6.0 | 데이터 검증 (core/에서 이미 사용) |
| pydantic-settings | >=2.2.0 | 환경 변수 기반 설정 관리 |
| httpx | >=0.27.0 | 비동기 HTTP 클라이언트 (테스트용) |
| pytest-asyncio | >=0.23.0 | 비동기 테스트 (dev) |
| uv | latest | 패키지 관리자 |

### 2.2 프로젝트 구조 (목표 상태)

```
saju/                           ← 프로젝트 루트
├── core/                       ← 기존 계산 엔진 (SPEC-CORE-001, 이동 금지)
│   ├── models/
│   │   ├── domain.py
│   │   ├── request.py
│   │   └── response.py
│   ├── pillar.py
│   ├── calendar.py
│   ├── solar_term.py
│   ├── jijanggan.py
│   ├── ohang.py
│   ├── yuksin.py
│   ├── hapchung.py
│   ├── yongshin.py
│   └── deun.py
├── app/                        ← 신규 API 레이어 (본 SPEC)
│   ├── __init__.py
│   ├── main.py                 ← FastAPI 애플리케이션 진입점
│   ├── config.py               ← Pydantic BaseSettings
│   ├── api/
│   │   ├── __init__.py
│   │   ├── router.py           ← 라우터 통합
│   │   ├── deps.py             ← 공통 의존성
│   │   └── endpoints/
│   │       ├── __init__.py
│   │       ├── health.py       ← GET /health
│   │       ├── saju.py         ← POST /api/v1/saju
│   │       └── calendar.py     ← POST /api/v1/calendar/convert
│   └── services/
│       ├── __init__.py
│       ├── saju_service.py     ← SajuService
│       └── calendar_service.py ← CalendarService
├── tests/
│   ├── test_api_health.py      ← 헬스 체크 테스트
│   ├── test_api_saju.py        ← 사주 엔드포인트 테스트
│   └── test_api_calendar.py    ← 음양력 변환 테스트
└── pyproject.toml
```

### 2.3 핵심 제약 조건

- `core/` 모듈은 프로젝트 루트에 그대로 유지한다 (이동 금지)
- API 레이어는 `from core.pillar import calc_four_pillars` 형태로 직접 임포트한다
- `app/core/` 경로로 파일을 이동하거나 복사하지 않는다

---

## 3. 가정 (Assumptions)

| ID | 가정 | 신뢰도 | 검증 방법 |
|----|------|--------|---------|
| A-001 | `core/` 패키지의 모든 함수는 순수 동기 함수이며 thread-safe하다 | High | SPEC-CORE-001 확인됨 |
| A-002 | FastAPI의 기본 ThreadPoolExecutor로 동기 core/ 함수를 처리하기에 충분하다 | High | 별도 벤치마크 불필요 |
| A-003 | MVP 단계에서 인증 없이 API를 노출해도 무방하다 (로컬/개발 환경) | Medium | 배포 환경 확인 필요 |
| A-004 | 음양력 변환은 `core/calendar.py`의 기존 함수를 재사용한다 | High | SPEC-CORE-001 확인됨 |
| A-005 | Pydantic v2의 `BaseSettings`와 `core/`의 `BaseModel`은 호환된다 | High | 동일 pydantic>=2.6.0 사용 |

---

## 4. 요구사항 (Requirements)

### 4.1 기능 요구사항

#### FR-001: POST /api/v1/saju 엔드포인트

**WHEN** 클라이언트가 유효한 사주 계산 요청을 `POST /api/v1/saju`로 전송하면 **THEN** 시스템은 `core/` 모듈을 활용하여 사주 계산을 수행하고 HTTP 200과 함께 `FourPillars` 데이터를 반환해야 한다.

**WHEN** 요청 데이터가 Pydantic 검증에 실패하면 (예: 유효하지 않은 birth_year) **THEN** 시스템은 HTTP 422 Unprocessable Entity를 반환해야 한다.

**IF** birth_year가 1900 미만이거나 현재 연도 초과이면 **THEN** 시스템은 HTTP 422를 반환해야 한다.

요청 스키마 (Request Schema):
```python
class SajuRequest(BaseModel):
    birth_year: int   # 출생년도 (예: 1990)
    birth_month: int  # 출생월 (1-12)
    birth_day: int    # 출생일 (1-31)
    birth_hour: int   # 출생시 (0-23)
    is_lunar: bool    # 음력 여부 (기본값: False)
    gender: str       # 성별 ("male" | "female")
```

응답 스키마는 `core/models/response.py`의 `SajuResult`를 재사용한다.

#### FR-002: POST /api/v1/calendar/convert 엔드포인트

**WHEN** 클라이언트가 음력 날짜를 `POST /api/v1/calendar/convert`로 전송하면 **THEN** 시스템은 `core/calendar.py`를 사용하여 양력으로 변환하고 HTTP 200과 결과를 반환해야 한다.

**WHEN** 요청 데이터가 유효하지 않으면 **THEN** 시스템은 HTTP 422를 반환해야 한다.

요청 스키마:
```python
class CalendarConvertRequest(BaseModel):
    year: int
    month: int
    day: int
    is_leap_month: bool = False  # 윤달 여부
```

응답 스키마:
```python
class CalendarConvertResponse(BaseModel):
    solar_year: int
    solar_month: int
    solar_day: int
```

#### FR-003: GET /health 엔드포인트

**The** 시스템은 **항상** `GET /health` 요청에 HTTP 200과 `{"status": "ok"}` 응답을 반환해야 한다.

#### FR-004: SajuService 서비스 레이어

**The** `SajuService`는 **항상** `core/` 모듈을 오케스트레이션하는 단일 진입점 역할을 수행해야 한다.

**WHEN** `SajuService.calculate(request)`가 호출되면 **THEN** 서비스는 다음 순서로 처리해야 한다:
1. `is_lunar=True`인 경우 `core/calendar.py`를 통해 양력 변환
2. `core/pillar.py`를 통해 사주 계산 (연주, 월주, 일주, 시주)
3. `core/ohang.py`, `core/yuksin.py` 등으로 오행/육신 분석
4. `SajuResult` 객체 반환

**IF** `core/` 모듈에서 예외가 발생하면 **THEN** 서비스는 `ValueError`를 HTTP 422로, 기타 예외는 HTTP 500으로 변환해야 한다.

#### FR-005: FastAPI 애플리케이션 진입점 (app/main.py)

**The** `app/main.py`는 **항상** 다음을 포함해야 한다:
- `FastAPI` 인스턴스 생성 (제목, 버전, 설명 포함)
- `lifespan` 컨텍스트 매니저 (시작/종료 이벤트)
- `api/router.py`의 라우터 등록
- CORS 미들웨어 설정 (개발 환경용)

#### FR-006: Pydantic BaseSettings 설정 (app/config.py)

**The** `Settings` 클래스는 **항상** 환경 변수에서 설정을 로드해야 한다.

필수 설정 항목:
```python
class Settings(BaseSettings):
    app_name: str = "사주 API"
    app_version: str = "0.1.0"
    debug: bool = False
    cors_origins: list[str] = ["*"]

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
```

**WHEN** `APP_DEBUG=true` 환경 변수가 설정되면 **THEN** FastAPI는 디버그 모드로 실행되어야 한다.

#### FR-007: pytest-asyncio 기반 API 테스트

**The** API 테스트는 **항상** `httpx.AsyncClient`와 `pytest-asyncio`를 사용하여 작성해야 한다.

**WHEN** 테스트가 실행되면 **THEN** `app/` 모듈의 코드 커버리지가 85% 이상이어야 한다.

---

## 5. 비기능 요구사항

### 5.1 성능

- `POST /api/v1/saju` 응답 시간: P95 < 500ms (core/ 계산 포함)
- `GET /health` 응답 시간: P95 < 50ms

### 5.2 코드 품질

- ruff 린트 오류 0개
- mypy strict 모드 통과
- app/ 모듈 테스트 커버리지 >= 85%

### 5.3 API 설계

- RESTful 설계 원칙 준수
- JSON 요청/응답 형식
- HTTP 상태 코드 표준 준수 (200, 422, 500)
- OpenAPI 문서 자동 생성 (`/docs`, `/redoc`)

---

## 6. 아키텍처 설계 방향

### 6.1 레이어 구조

```
클라이언트 요청
    ↓
FastAPI 라우터 (app/api/endpoints/)
    ↓
서비스 레이어 (app/services/)
    ↓
계산 엔진 (core/)
    ↓
응답 반환
```

### 6.2 임포트 패턴

```python
# 올바른 임포트 패턴 (core/는 프로젝트 루트에 위치)
from core.pillar import calc_four_pillars
from core.calendar import lunar_to_solar
from core.models.request import SajuRequest
from core.models.response import SajuResult
```

### 6.3 의존성 주입

FastAPI의 `Depends` 패턴을 활용하여 `Settings` 및 `Service` 인스턴스를 주입한다.

```python
# app/api/deps.py
from functools import lru_cache
from app.config import Settings
from app.services.saju_service import SajuService

@lru_cache
def get_settings() -> Settings:
    return Settings()

def get_saju_service() -> SajuService:
    return SajuService()
```

---

## 7. 트레이서빌리티 태그

| 태그 ID | 연결 | 설명 |
|---------|------|------|
| SPEC-API-001-FR-001 | `app/api/endpoints/saju.py` | POST /api/v1/saju 구현 |
| SPEC-API-001-FR-002 | `app/api/endpoints/calendar.py` | POST /api/v1/calendar/convert 구현 |
| SPEC-API-001-FR-003 | `app/api/endpoints/health.py` | GET /health 구현 |
| SPEC-API-001-FR-004 | `app/services/saju_service.py` | SajuService 구현 |
| SPEC-API-001-FR-005 | `app/main.py` | FastAPI 진입점 |
| SPEC-API-001-FR-006 | `app/config.py` | 설정 관리 |
| SPEC-API-001-FR-007 | `tests/test_api_*.py` | API 테스트 |
