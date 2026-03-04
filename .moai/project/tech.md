# 사주 분석 웹 서비스 - 기술 스택 명세서

## 기술 스택 전체 개요

| 레이어 | 기술 | 버전 | 역할 |
|--------|------|------|------|
| 언어 | Python | 3.11+ | 핵심 언어 |
| API 프레임워크 | FastAPI | 0.110+ | REST API 서버 |
| UI 프레임워크 | Streamlit | 1.32+ | 프로토타입 웹 UI |
| 도메인 모델 | Pydantic v2 | 2.6+ | 입력 검증 및 데이터 모델 |
| LLM | OpenAI API | 1.12+ | 운세 해설 생성 |
| ASGI 서버 | Uvicorn | 0.27+ | FastAPI 서버 구동 |
| 테스트 | Pytest | 8.0+ | 단위/통합 테스트 |
| 타입 체커 | mypy | 1.8+ | 정적 타입 검사 |
| 린터/포매터 | ruff + black | 최신 | 코드 품질 관리 |
| HTTP 클라이언트 | httpx | 0.27+ | API 테스트용 |

---

## 각 기술 선택 이유

### Python 3.11+

**선택 이유**:

1. **타입 힌트 완성도**: `3.11`부터 타입 힌트 시스템이 안정화되어 `str | None` 유니온 타입 단축 문법 사용 가능
2. **데이터클래스 개선**: `@dataclass` 성능 향상 및 `KW_ONLY` 지원으로 도메인 모델 작성 용이
3. **비동기 지원**: `asyncio` 성숙도로 FastAPI의 `async def` 핸들러 최적 성능 확보
4. **성능**: 3.11은 3.10 대비 10~60% 성능 향상 (CPython 최적화)
5. **수학 라이브러리**: 절기 계산에 필요한 천문 계산(ephem, astral 등) 파이썬 생태계 풍부

**사주 도메인 적용**:
- 간지(干支) 테이블을 `Enum`으로 정의하여 타입 안전 보장
- 절기 날짜 계산에 `datetime` 표준 라이브러리 직접 활용
- 400년 데이터 julgi.json 파싱에 표준 `json` 모듈 사용

---

### FastAPI

**선택 이유**:

1. **자동 API 문서화**: `/docs`(Swagger UI), `/redoc` 자동 생성 → 개발자 API 테스트 편의
2. **Pydantic 통합**: 요청/응답 모델 자동 검증, 직렬화, OpenAPI 스키마 자동 생성
3. **async 최우선 설계**: 사주 계산 + OpenAI API 호출을 비동기로 처리하여 대기 시간 최소화
4. **의존성 주입**: `Depends()` 시스템으로 인증, 설정, DB 연결 깔끔하게 관리
5. **성능**: Starlette 기반으로 Node.js와 동등한 고성능 비동기 처리

**사주 서비스 적용**:

```python
# FastAPI 라우터 예시 구조
@router.post("/api/v1/saju", response_model=SajuResponse)
async def calculate_saju(
    request: SajuRequest,
    service: SajuService = Depends(get_saju_service),
    api_key: str = Depends(verify_api_key)
) -> SajuResponse:
    return await service.calculate(request)
```

**API 엔드포인트 설계**:

| 엔드포인트 | 메서드 | 인증 | 설명 |
|-----------|--------|------|------|
| `/api/v1/saju` | POST | API Key / JWT | 사주 계산 + LLM 해설 |
| `/api/v1/calendar/convert` | POST | API Key | 양음력 변환 |
| `/api/v1/saju/terms` | GET | 없음 | 절기 목록 조회 |
| `/health` | GET | 없음 | 서버 헬스 체크 |
| `/docs` | GET | 없음 | Swagger UI |

---

### Streamlit

**선택 이유**:

1. **빠른 프로토타이핑**: HTML/CSS/JS 없이 순수 Python으로 웹 UI 구현
2. **데이터 시각화**: 오행 비율 파이 차트, 대운 타임라인 등 차트 라이브러리(Altair, Plotly) 내장 지원
3. **반응형 입력 위젯**: 날짜 선택기, 라디오 버튼, 슬라이더 즉시 사용 가능
4. **배포 용이성**: `streamlit run app.py` 한 줄로 실행, Streamlit Cloud 무료 배포
5. **개발 속도**: 백엔드 개발자가 프론트엔드 지식 없이 UI 테스트 환경 구축

**운영 전환 시나리오**:
- 초기: Streamlit으로 빠른 기능 검증
- 중기: FastAPI 백엔드 + Streamlit 프론트엔드로 분리 운영
- 최종: FastAPI 백엔드 + React/Next.js 정식 프론트엔드로 교체 (Streamlit은 내부 도구로 유지)

---

### Pydantic v2

**선택 이유**:

1. **입력 검증**: 생년월일 범위(1600~2100년), 월(1~12), 일(1~31) 자동 검증
2. **타입 강제**: `Literal["male", "female"]`로 성별 입력 강제
3. **직렬화**: FastAPI 응답 JSON 자동 직렬화
4. **성능**: v2는 Rust 기반 core로 v1 대비 5~50배 빠른 검증
5. **문서화**: OpenAPI 스키마 자동 생성으로 API 문서 품질 향상

**사주 모델 검증 예시**:

```python
# 입력 검증 규칙 예시 (구현 참고)
class SajuRequest(BaseModel):
    birth_year: int = Field(ge=1600, le=2100)   # 1600~2100년
    birth_month: int = Field(ge=1, le=12)        # 1~12월
    birth_day: int = Field(ge=1, le=31)          # 1~31일
    birth_hour: int | None = Field(None, ge=0, le=23)  # 0~23시
    gender: Literal["male", "female"]
    is_lunar: bool = False
    is_leap_month: bool = False
```

---

### OpenAI API (GPT-4o)

**선택 이유**:

1. **한국어 품질**: GPT-4o는 한국어 이해 및 생성 품질이 최상위
2. **구조화 출력**: JSON 모드로 운세 구조화 응답 강제 가능
3. **컨텍스트 길이**: 128K 토큰으로 사주 데이터 전체 + 상세 해설 생성 가능
4. **스트리밍**: `stream=True`로 실시간 해설 스트리밍 표시 가능

**프롬프트 전략**:

```
시스템 메시지:
  "당신은 30년 경력의 사주 전문 상담사입니다.
   복잡한 사주 이론을 일반인이 이해하기 쉽게 설명합니다.
   해설은 친근하고 긍정적인 톤을 유지합니다."

사용자 메시지:
  "[사주 원국 데이터]
   년주: 갑자(甲子) - 목(木) 양(陽)
   월주: 병진(丙辰) - 화(火) 양(陽)
   일주: 경술(庚戌) - 금(金) 양(陽) [일간: 본인]
   시주: 무오(戊午) - 토(土) 양(陽)

   용신: 수(水) - 강한 화기(火氣)를 조절
   현재 대운: 임자(壬子) 대운 (2024-2034)

   위 사주를 종합하여 성격, 직업운, 올해 운세를 해설해주세요."
```

**비용 관리**:
- `include_llm: bool` 파라미터로 선택적 호출
- 사주 계산은 무료, LLM 해설만 API 비용 발생
- 응답 캐싱 고려 (동일 사주 반복 조회 시)

---

### Pytest

**선택 이유**:

1. **기존 케이스 포팅**: manse_ori의 60+ 테스트 케이스를 Python으로 직접 변환
2. **픽스처 시스템**: `conftest.py`로 julgi.json 데이터 공유, 재사용
3. **파라미터화 테스트**: `@pytest.mark.parametrize`로 다수 사주 케이스 간결하게 테스트
4. **비동기 테스트**: `pytest-asyncio`로 FastAPI 비동기 엔드포인트 테스트
5. **커버리지**: `pytest-cov`로 85%+ 커버리지 측정

**테스트 구조 예시**:

```python
# tests/test_core/test_pillar.py 예시 구조
@pytest.mark.parametrize("year,expected_gan,expected_ji", [
    (1984, "갑", "자"),   # 갑자년
    (1985, "을", "축"),   # 을축년
    (2024, "갑", "진"),   # 갑진년
])
def test_year_pillar(year, expected_gan, expected_ji):
    result = calculate_year_pillar(year)
    assert result.gan == expected_gan
    assert result.ji == expected_ji
```

---

## 개발 환경 요구 사항

| 요구 사항 | 버전/사양 | 필수 여부 |
|-----------|-----------|-----------|
| Python | 3.11 이상 | 필수 |
| pip / uv | 최신 버전 | 필수 |
| Git | 2.x 이상 | 필수 |
| OpenAI API 키 | 유효한 키 | LLM 해설 기능에만 필수 |
| 인터넷 연결 | - | OpenAI API 호출 시 필요 |
| 메모리 | 512MB 이상 | 권장 |

### Python 가상환경 설정

```bash
# 프로젝트 루트에서 실행
uv venv --python 3.11
uv sync --extra dev
uv run python --version  # Python 3.11.x 확인
```

---

## 빌드 및 실행 방법

### FastAPI 서버 실행

```bash
# 개발 모드 (자동 재시작 활성화)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# 운영 모드 (워커 수 조정)
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4

# API 문서 확인
# http://localhost:8000/docs     → Swagger UI
# http://localhost:8000/redoc    → ReDoc
```

### Streamlit UI 실행

```bash
# Streamlit 앱 실행
streamlit run streamlit_app.py

# 기본 주소: http://localhost:8501
```

### 테스트 실행

```bash
uv run pytest tests/ -q --no-cov          # 빠른 테스트
uv run pytest tests/ --cov=core           # 커버리지 포함
uv run pytest tests/ -m "not llm_integration"  # LLM 제외
```

### 코드 품질 검사

```bash
uv run ruff check . --fix   # lint 자동수정
uv run ruff format .        # 포맷
uv run mypy core/ app/ --ignore-missing-imports  # 타입 검사
```

---

## 환경 변수 (.env)

### `.env.example` 내용

```bash
# OpenAI 설정 (LLM 해설 기능 필수)
OPENAI_API_KEY=sk-proj-...
OPENAI_MODEL=gpt-4o
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.7

# FastAPI 설정
APP_ENV=development               # development / production
APP_HOST=0.0.0.0
APP_PORT=8000
APP_SECRET_KEY=your-secret-key-here  # JWT 서명용

# API 인증
API_KEY_HEADER=X-API-Key
VALID_API_KEYS=key1,key2,key3     # 쉼표 구분 API 키 목록

# 데이터 파일 경로
JULGI_DATA_PATH=data/julgi.json

# 로깅
LOG_LEVEL=INFO                    # DEBUG / INFO / WARNING / ERROR
```

### 환경 변수 로딩 방식

Pydantic `BaseSettings`를 사용하여 타입 안전하게 환경 변수를 로딩합니다.

```python
# app/config.py 예시 구조
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    openai_api_key: str
    openai_model: str = "gpt-4o"
    app_env: str = "development"
    julgi_data_path: str = "data/julgi.json"

    class Config:
        env_file = ".env"
```

---

## 기존 Node.js 대비 아키텍처 개선 사항

### 1. 전역 변수 제거 → 요청 범위 격리

| 항목 | manse_ori (Node.js) | Python 리디자인 |
|------|---------------------|-----------------|
| 상태 관리 | `global_saju_data` 전역 객체 | `SajuContext` 요청별 인스턴스 |
| 동시성 위험 | 동시 요청 시 전역 상태 충돌 위험 | 요청별 독립 컨텍스트, 충돌 없음 |
| 테스트 용이성 | 전역 상태 리셋 필요 | 순수 함수, 매번 새 객체 |

### 2. 타입 안전성

| 항목 | manse_ori (Node.js) | Python 리디자인 |
|------|---------------------|-----------------|
| 간지 표현 | 문자열 그대로 전달 | `GanJi` Pydantic 모델 |
| 오행 값 | 임의 문자열 | `OhangType(Enum)` |
| 육신 값 | 숫자 코드 | `YuksinType(Enum)` |
| 런타임 오류 | 타입 오류 런타임에 발견 | mypy로 컴파일 타임 검사 |

### 3. API 문서화

| 항목 | manse_ori (Node.js) | Python 리디자인 |
|------|---------------------|-----------------|
| API 문서 | 없음 또는 수동 작성 | FastAPI 자동 OpenAPI 생성 |
| 스키마 검증 | 없음 | Pydantic 자동 JSON Schema |
| 예시 응답 | 없음 | Pydantic `model_config` 예시 포함 |

### 4. 에러 처리 계층화

| 에러 유형 | manse_ori 처리 | Python 처리 |
|-----------|----------------|-------------|
| 잘못된 날짜 | 런타임 예외 | Pydantic 검증 오류 (422) |
| 절기 데이터 없음 | 오류 전파 불명확 | `SolarTermNotFound` 예외 |
| OpenAI 실패 | 없음 | `LLMServiceError` + 폴백 처리 |
| 인증 실패 | 일부 구현 | HTTPException 401/403 통일 |

### 5. 테스트 구조

| 항목 | manse_ori | Python 리디자인 |
|------|-----------|-----------------|
| 테스트 프레임워크 | Mocha/Jest (분산) | pytest (통합) |
| 커버리지 목표 | 명시 없음 | 85% 이상 (TRUST 5) |
| 회귀 테스트 | 일부 수동 | `reference_cases.json` 자동 비교 |
| CI 통합 | 없음 | GitHub Actions 통합 |

### 6. LLM 통합 (신규)

manse_ori에는 없던 기능으로, OpenAI GPT-4o를 통해:
- 일반 사용자가 사주 전문 용어 없이 결과 이해 가능
- 개인화된 운세 해설 생성
- 스트리밍 응답으로 실시간 표시

---

## 의존성 목록

> 의존성은 `pyproject.toml`로 관리 (uv 패키지 매니저 사용)

### 운영 의존성 (pyproject.toml `[project.dependencies]`)

```
fastapi>=0.110.0
uvicorn[standard]>=0.27.0
pydantic>=2.6.0
pydantic-settings>=2.2.0
openai>=1.12.0
streamlit>=1.32.0
httpx>=0.27.0
python-jose[cryptography]>=3.3.0   # JWT 처리
python-multipart>=0.0.9             # 파일 업로드 지원
```

### 개발 의존성 (pyproject.toml `[project.optional-dependencies] dev`)

```
pytest>=8.0.0
pytest-asyncio>=0.23.0
pytest-cov>=4.1.0
httpx>=0.27.0                       # API 테스트
mypy>=1.8.0
ruff>=0.3.0
pre-commit>=3.6.0
```

---

## 향후 기술 로드맵

| 단계 | 기간 | 추가 기술 | 목적 |
|------|------|-----------|------|
| Phase 1 | 1~2개월 | Streamlit + FastAPI | 기능 검증 |
| Phase 2 | 3~4개월 | Redis 캐시 | 동일 사주 계산 결과 캐싱 |
| Phase 3 | 5~6개월 | PostgreSQL + SQLAlchemy | 사용자 데이터 저장 |
| Phase 4 | 7~9개월 | React/Next.js | 정식 프론트엔드 교체 |
| Phase 5 | 10개월+ | Docker + Kubernetes | 컨테이너 운영 |
