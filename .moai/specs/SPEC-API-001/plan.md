---
id: SPEC-API-001
version: 1.0.0
status: draft
created: 2026-02-27
updated: 2026-02-27
author: jw
---

# SPEC-API-001 구현 계획

<!-- TAG: SPEC-API-001 -->

## 1. 개요

FastAPI REST API 레이어 구현 계획. `core/` 계산 엔진(SPEC-CORE-001)을 외부 서비스로 노출한다.

---

## 2. 의존성 추가 (pyproject.toml)

### 2.1 프로덕션 의존성

```toml
[project]
dependencies = [
    # 기존
    "pydantic>=2.6.0",
    "python-dateutil>=2.9.0",
    "korean-lunar-calendar>=0.3.1",
    # 신규 추가
    "fastapi>=0.110.0",
    "uvicorn[standard]>=0.27.0",
    "pydantic-settings>=2.2.0",
]
```

### 2.2 개발 의존성

```toml
[project.optional-dependencies]
dev = [
    # 기존
    "pytest>=8.0.0",
    "pytest-cov>=5.0.0",
    "mypy>=1.8.0",
    "ruff>=0.3.0",
    # 신규 추가
    "httpx>=0.27.0",
    "pytest-asyncio>=0.23.0",
]
```

### 2.3 pytest 설정 업데이트

```toml
[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "--cov=core --cov=app --cov-report=term-missing"
asyncio_mode = "auto"
```

---

## 3. 구현 단계

### Phase 1: app/ 패키지 구조 생성 (우선순위: 높음)

**목표:** FastAPI 애플리케이션 기반 구조 구축

**생성 파일:**

1. `app/__init__.py` - 빈 패키지 초기화 파일

2. `app/config.py` - Pydantic BaseSettings 설정 관리
   ```python
   from pydantic_settings import BaseSettings, SettingsConfigDict

   class Settings(BaseSettings):
       app_name: str = "사주 API"
       app_version: str = "0.1.0"
       debug: bool = False
       cors_origins: list[str] = ["*"]

       model_config = SettingsConfigDict(
           env_file=".env",
           env_file_encoding="utf-8",
       )
   ```

3. `app/main.py` - FastAPI 애플리케이션 진입점
   ```python
   from contextlib import asynccontextmanager
   from fastapi import FastAPI
   from fastapi.middleware.cors import CORSMiddleware
   from app.api.router import api_router
   from app.config import Settings

   @asynccontextmanager
   async def lifespan(app: FastAPI):
       # 시작 이벤트
       yield
       # 종료 이벤트

   def create_app(settings: Settings | None = None) -> FastAPI:
       s = settings or Settings()
       app = FastAPI(
           title=s.app_name,
           version=s.app_version,
           debug=s.debug,
           lifespan=lifespan,
       )
       app.add_middleware(CORSMiddleware, allow_origins=s.cors_origins, ...)
       app.include_router(api_router)
       return app

   app = create_app()
   ```

4. `app/api/__init__.py`
5. `app/api/deps.py` - 공통 의존성 주입
6. `app/api/router.py` - 라우터 통합
7. `app/api/endpoints/__init__.py`
8. `app/services/__init__.py`

**완료 기준:**
- `python -c "from app.main import app"` 정상 실행
- FastAPI 인스턴스 생성 확인

---

### Phase 2: 서비스 레이어 (우선순위: 높음)

**목표:** `core/` 모듈을 오케스트레이션하는 서비스 레이어 구현

**생성 파일:**

1. `app/services/saju_service.py`
   ```python
   from core.pillar import calc_four_pillars
   from core.calendar import lunar_to_solar
   from core.models.request import SajuRequest
   from core.models.response import SajuResult

   class SajuService:
       def calculate(self, request: SajuRequest) -> SajuResult:
           """사주 계산 오케스트레이션"""
           # 1. 음력 변환 (is_lunar=True인 경우)
           # 2. 사주 계산 (calc_four_pillars)
           # 3. 오행/육신 분석
           # 4. SajuResult 반환
   ```

2. `app/services/calendar_service.py`
   ```python
   from core.calendar import lunar_to_solar

   class CalendarService:
       def convert_lunar_to_solar(
           self,
           year: int,
           month: int,
           day: int,
           is_leap_month: bool = False,
       ) -> tuple[int, int, int]:
           """음력 → 양력 변환"""
   ```

**완료 기준:**
- 서비스 단위 테스트 통과 (core/ 모듈 직접 호출 검증)
- 예외 처리 확인 (ValueError → HTTP 422, 기타 → HTTP 500)

---

### Phase 3: API 엔드포인트 구현 (우선순위: 높음)

**목표:** 3개 REST 엔드포인트 구현

**생성 파일:**

1. `app/api/endpoints/health.py`
   ```python
   from fastapi import APIRouter

   router = APIRouter()

   @router.get("/health")
   async def health_check() -> dict[str, str]:
       return {"status": "ok"}
   ```

2. `app/api/endpoints/calendar.py`
   ```python
   from fastapi import APIRouter, Depends
   from pydantic import BaseModel
   from app.api.deps import get_calendar_service

   router = APIRouter(prefix="/api/v1/calendar")

   class CalendarConvertRequest(BaseModel):
       year: int
       month: int
       day: int
       is_leap_month: bool = False

   class CalendarConvertResponse(BaseModel):
       solar_year: int
       solar_month: int
       solar_day: int

   @router.post("/convert", response_model=CalendarConvertResponse)
   async def convert_calendar(
       request: CalendarConvertRequest,
       service=Depends(get_calendar_service),
   ) -> CalendarConvertResponse:
       ...
   ```

3. `app/api/endpoints/saju.py`
   ```python
   from fastapi import APIRouter, Depends, HTTPException
   from core.models.request import SajuRequest
   from core.models.response import SajuResult
   from app.api.deps import get_saju_service

   router = APIRouter(prefix="/api/v1")

   @router.post("/saju", response_model=SajuResult)
   async def calculate_saju(
       request: SajuRequest,
       service=Depends(get_saju_service),
   ) -> SajuResult:
       try:
           return service.calculate(request)
       except ValueError as e:
           raise HTTPException(status_code=422, detail=str(e))
   ```

4. `app/api/router.py`
   ```python
   from fastapi import APIRouter
   from app.api.endpoints import health, saju, calendar

   api_router = APIRouter()
   api_router.include_router(health.router, tags=["Health"])
   api_router.include_router(saju.router, tags=["사주"])
   api_router.include_router(calendar.router, tags=["음양력"])
   ```

**완료 기준:**
- `uvicorn app.main:app --reload` 정상 실행
- `/docs` OpenAPI 문서 접근 가능
- 수동 curl 테스트 통과

---

### Phase 4: API 테스트 (우선순위: 높음)

**목표:** 85% 이상 커버리지의 API 테스트 작성

**생성 파일:**

1. `tests/test_api_health.py`
2. `tests/test_api_saju.py`
3. `tests/test_api_calendar.py`

**테스트 패턴:**
```python
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.fixture
async def client() -> AsyncClient:
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as c:
        yield c

@pytest.mark.asyncio
async def test_health(client: AsyncClient) -> None:
    response = await client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
```

**완료 기준:**
- `pytest tests/test_api_*.py` 전체 통과
- `app/` 모듈 커버리지 >= 85%
- ruff 린트 오류 0개

---

## 4. 리스크 및 대응 방안

| 리스크 | 발생 가능성 | 영향도 | 대응 방안 |
|--------|-----------|-------|---------|
| core/ 모듈 임포트 경로 문제 | 중 | 높 | pyproject.toml에서 패키지 루트 명시 확인 |
| core/ 동기 함수와 FastAPI 비동기 처리 충돌 | 낮 | 중 | `run_in_executor` 또는 동기 엔드포인트 사용 |
| Pydantic v2 BaseSettings 호환성 | 낮 | 중 | pydantic-settings 별도 패키지 설치 필수 |
| pytest-asyncio 버전 호환성 | 낮 | 낮 | asyncio_mode = "auto" 설정으로 해결 |

---

## 5. 구현 순서 (권장)

```
Phase 1 (구조)
    → Phase 2 (서비스) : Phase 1 완료 후 시작
        → Phase 3 (엔드포인트) : Phase 2 완료 후 시작
            → Phase 4 (테스트) : Phase 3 완료 후 병행 가능
```

**참고:** Phase 3과 Phase 4는 TDD 방식으로 병행 진행 가능 (테스트 먼저 작성 후 구현).

---

## 6. 실행 방법

### 개발 서버 실행

```bash
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 테스트 실행

```bash
uv run pytest tests/test_api_*.py -v --cov=app
```

### 전체 테스트 (core/ + app/)

```bash
uv run pytest -v --cov=core --cov=app --cov-report=term-missing
```
