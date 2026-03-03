# Saju (사주) - Python 사주팔자 계산 엔진

Python 순수 계산으로 구현한 사주팔자(四柱八字) 엔진입니다.

## 특징

- 순수 Python 3.11+ 구현
- uv 기반 빠른 패키지 관리
- 95%+ 테스트 커버리지
- 태음력 변환 지원
- 완전한 타입 안전성 (mypy strict mode)
- 십이운성·신살·세운 계산 지원
- 4탭 Streamlit 대시보드 (원국·십성·운·세부지표)

## 요구사항

- Python 3.11 이상
- [uv](https://github.com/astral-sh/uv) 패키지 매니저

## 설치

### uv 설치

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

또는 Homebrew:

```bash
brew install uv
```

### 프로젝트 설치

```bash
# 가상환경 생성 (Python 3.11)
uv venv --python 3.11

# 의존성 설치
uv sync
```

## 사용법

### Python API

```python
from core.calendar import lunar_to_solar, solar_to_lunar
from core.pillar import create_four_pillars

# 태음력 변환
solar_date = lunar_to_solar(1984, 3, 15, leap=False)

# 사주팔자 계산
saju = create_four_pillars(1984, 4, 15, 12, 30, False)
```

### FastAPI REST API

서버 시작:

```bash
uv run uvicorn app.main:app --reload --port 8000
```

엔드포인트:

```bash
# 헬스 체크
curl http://localhost:8000/health

# 사주 계산
curl -X POST http://localhost:8000/api/v1/saju \
  -H "Content-Type: application/json" \
  -d '{
    "birth_year": 1984,
    "birth_month": 4,
    "birth_day": 15,
    "birth_hour": 12,
    "is_lunar": false,
    "is_leap_month": false,
    "gender": "male"
  }'

# 음양력 변환
curl -X POST http://localhost:8000/api/v1/calendar/convert \
  -H "Content-Type: application/json" \
  -d '{
    "year": 1984,
    "month": 3,
    "day": 15,
    "is_lunar": true,
    "is_leap_month": false
  }'
```

### Streamlit 웹 UI

웹 인터페이스 시작:

```bash
# UI 의존성 설치 (최초 1회)
uv sync --extra ui

# Streamlit 앱 실행
uv run streamlit run streamlit_app.py
```

브라우저에서 `http://localhost:8501` 접속

```bash
# 헬스 체크
curl http://localhost:8000/health

# 사주 계산
curl -X POST http://localhost:8000/api/v1/saju \
  -H "Content-Type: application/json" \
  -d '{
    "birth_year": 1984,
    "birth_month": 4,
    "birth_day": 15,
    "birth_hour": 12,
    "is_lunar": false,
    "is_leap_month": false,
    "gender": "male"
  }'

# 음양력 변환
curl -X POST http://localhost:8000/api/v1/calendar/convert \
  -H "Content-Type: application/json" \
  -d '{
    "year": 1984,
    "month": 3,
    "day": 15,
    "is_lunar": true,
    "is_leap_month": false
  }'
```

## 개발

### 테스트 실행

```bash
# 전체 테스트
uv run pytest

# 커버리지 포함
uv run pytest --cov=core --cov-report=html
```

### 코드 포맷팅

```bash
# Ruff lint
uv run ruff check .

# Ruff format
uv run ruff format .
```

### 타입 체크

```bash
uv run mypy core/
```

## 프로젝트 구조

```
saju/
├── core/              # 핵심 계산 모듈
│   ├── calendar.py    # 태음력 변환
│   ├── pillar.py      # 사주 기둥 계산
│   ├── deun.py        # 대운·세운 계산
│   ├── sibiunsung.py  # 십이운성 계산
│   ├── shinsal.py     # 신살 판별
│   └── ...
├── app/               # FastAPI REST API
│   ├── api/           # API 엔드포인트
│   │   ├── endpoints/ # /saju, /calendar/convert, /health
│   │   └── router.py  # 라우팅
│   ├── services/      # 비즈니스 로직
│   └── main.py        # 애플리케이션 팩토리
├── tests/             # 테스트 스위트 (95%+ 커버리지)
├── pyproject.toml     # 프로젝트 설정 (hatchling)
└── uv.lock            # 의존성 잠금 파일
```

## 빌드 시스템

- **Build Backend**: hatchling (setuptools에서 마이그레이션 완료)
- **Package Manager**: uv (pip에서 마이그레이션 완료)
- **Lock File**: uv.lock (재현 가능한 빌드 보장)

## 라이선스

MIT License

## 변경 사항

### v0.3.0 (SPEC-CALC-001 + SPEC-UI-001)

- 십이운성(十二運星) 계산 모듈 추가 (`core/sibiunsung.py`)
- 신살(神殺) 판별 모듈 추가 (`core/shinsal.py`): 역마살·도화살·화개살·백호살·천을귀인
- 세운(歲運) 계산 기능 추가 (`core/deun.py` 확장): 현재 연도 기준 ±5년 11개 간지
- `SajuResult` 응답 필드 확장: 지장간·육신·오행비율·십이운성·신살·세운·기둥 의미
- Streamlit 4탭 대시보드: 사주 원국, 십성 분석, 운의 흐름, 세부 지표
- 테스트 351개 (기존 231개 → +120개), 커버리지 95% 유지

### v0.2.0 (SPEC-INFRA-001)

- 빌드 시스템을 setuptools에서 hatchling으로 변경
- 패키지 매니저를 pip에서 uv로 마이그레이션
- Python 3.11 버전 고정 (기존 3.9+)
- eval_type_backport 의존성 제거 (Python 3.11 불필요)
- uv.lock 추가 (재현 가능한 빌드)
- IDE 설정 파일 추가 (.vscode)
- CI/CD 워크플로우 uv로 업데이트
