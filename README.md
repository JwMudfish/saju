# Saju (사주) - Python 사주팔자 계산 엔진

Python 순수 계산으로 구현한 사주팔자(四柱八字) 엔진입니다.

## 특징

- 순수 Python 3.11+ 구현
- uv 기반 빠른 패키지 관리
- 94%+ 테스트 커버리지 (650개)
- 태음력 변환 지원
- 완전한 타입 안전성 (mypy strict mode)
- 십이운성·신살·세운 계산 지원
- 신격(상신/구신) 계算 지원
- 합충형해파(合沖刑害破) 사기둥 쌍 분석 지원
- 합충형해파 분석 UI (합충형해파 관계 테이블, 강조 표시)
- 일간·격국·용신 캐릭터 카드 + 희신 콘텐츠 UI (ContentLoader 서비스)
- 신격(상신/구신) 지표 UI + 길흉 콘텐츠
- **개선된 AI 해석 프롬프트 시스템** (ContentLoader 연동, 핵심 판단 요약, 질문 우선순위)
- 6탭 Streamlit 대시보드 (원국·십성·운·세부지표·AI 해석·나의 정체성)
- 기능별 개별 REST API 엔드포인트: `/saju/pillars`, `/saju/analysis`, `/saju/fortune`, `/saju/identity`

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

# AI 해석 (OpenAI API 키 필요)
curl -X POST http://localhost:8000/api/v1/saju/interpret \
  -H "Content-Type: application/json" \
  -d '{
    "saju_result": { ... },
    "user_context": "직업 운을 알고 싶어요"
  }'

# 사주팔자 4기둥만 조회
curl -X POST http://localhost:8000/api/v1/saju/pillars \
  -H "Content-Type: application/json" \
  -d '{"birth_year": 1984, "birth_month": 4, "birth_day": 15, "birth_hour": 12, "is_lunar": false, "is_leap_month": false, "gender": "male"}'

# 육신·합충형해파·오행 분석
curl -X POST http://localhost:8000/api/v1/saju/analysis \
  -H "Content-Type: application/json" \
  -d '{"birth_year": 1984, "birth_month": 4, "birth_day": 15, "birth_hour": 12, "is_lunar": false, "is_leap_month": false, "gender": "male"}'

# 대운·세운 정보
curl -X POST http://localhost:8000/api/v1/saju/fortune \
  -H "Content-Type: application/json" \
  -d '{"birth_year": 1984, "birth_month": 4, "birth_day": 15, "birth_hour": 12, "is_lunar": false, "is_leap_month": false, "gender": "male"}'

# 일간·격국·용신 카드 콘텐츠
curl -X POST http://localhost:8000/api/v1/saju/identity \
  -H "Content-Type: application/json" \
  -d '{"birth_year": 1984, "birth_month": 4, "birth_day": 15, "birth_hour": 12, "is_lunar": false, "is_leap_month": false, "gender": "male"}'
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

## React 프론트엔드

사주 프로젝트는 React 19 + TypeScript 기반의 모던 프론트엔드를 포함합니다.

### 기술 스택

- **프레임워크**: React 19 + TypeScript 5.9
- **빌드 도구**: Vite
- **스타일링**: Tailwind CSS
- **상태 관리**: Zustand v5 (persist 미들웨어)
- **UI 컴포넌트**: Radix UI, Lucide React
- **HTTP 클라이언트**: axios

### 주요 기능

- **공유 UI 컴포넌트**: Button, Input, Card, Spinner, ErrorMessage, Toast (src/components/ui/)
- **접근성**: WCAG 2.1 AA 수준 준수, ARIA 속성 완벽 구현
- **반응형 디자인**: 모바일 우선, 768px 이하에서 햄버거 메뉴
- **로딩 상태**: 모든 API 호출에 대한 시각적 피드백
- **에러 복구**: HTTP 상태별 사용자 친화적 메시지 및 재시도 버튼
- **AI 채팅 인터페이스**: 메시지 복사, 좋아요/싫어요, IME-safe 입력

### 시작하기

#### 프론트엔드 실행

```bash
# 프로젝트 루트에서 frontend 디렉토리로 이동
cd frontend

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 브라우저에서 http://localhost:5173 접속
```

#### 테스트 실행

```bash
# 전체 테스트
npm test

# 커버리지 포함
npm test -- --coverage
```

#### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 주요 페이지

- **LandingPage** (`src/pages/LandingPage.tsx`): 홈 페이지, 사주 입력 안내
- **InputPage** (`src/pages/InputPage.tsx`): 생년월일, 성별, 음력 여부 입력
- **ReportPage** (`src/pages/ReportPage.tsx`): 사주 분석 결과 표시, 오행 바 차트
- **ChatPage** (`src/pages/ChatPage.tsx`): AI 질문 인터페이스
- **OnboardingPage** (`src/pages/OnboardingPage.tsx`): 사용자 입력 흐름

### 컴포넌트 구조

```
src/
├── components/
│   ├── ui/                    # 공유 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Spinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── Toast.tsx
│   ├── report/
│   │   └── OhangBar.tsx       # 오행 바 차트
│   ├── chat/
│   │   └── ChatBubble.tsx     # 채팅 메시지 버블
│   └── ...
├── pages/                      # 페이지 컴포넌트
├── services/                   # API 서비스
└── stores/                     # Zustand 상태 관리
```

### 백엔드 연동

프론트엔드는 FastAPI 백엔드 (`/api/v1`) 와 통신합니다:

```bash
# 백엔드 서버 실행 (별도 터미널)
uv run uvicorn app.main:app --reload --port 8000

# 프론트엔드는 CORS 설정을 통해 http://localhost:8000 접속
```

## 환경 변수 설정

### 백엔드 (Python)

OpenAI API를 사용하려면 API 키가 필요합니다:

```bash
cp .env.example .env
# .env 파일에서 OPENAI_API_KEY 값 설정
```

API 키 없이도 기본 사주 계산 기능은 정상 동작합니다 (AI 해석만 제한됨).

### 프론트엔드 (React)

프론트엔드 환경 변수는 `.env` 파일에서 설정합니다:

```bash
# frontend/.env
VITE_API_URL=http://localhost:8000
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
│   ├── shgj.py        # 신격(상신/구신) 계산
│   ├── deun.py        # 대운·세운 계산
│   ├── sibiunsung.py  # 십이운성 계산
│   ├── shinsal.py     # 신살 판별
│   └── ...
├── app/               # FastAPI REST API
│   ├── api/           # API 엔드포인트
│   │   ├── endpoints/ # /saju, /saju/pillars, /saju/analysis, /saju/fortune, /saju/identity, /saju/interpret, /calendar/convert, /health
│   │   └── router.py  # 라우팅
│   ├── services/      # 비즈니스 로직
│   │   ├── saju_service.py       # 사주 계산
│   │   ├── interpretation_service.py  # AI 해석 (OpenAI)
│   │   ├── content_loader.py     # JSON 콘텐츠 로더 (일간/용신/격국/신격 카드)
│   │   └── prompt_builder.py     # 해석 프롬프트 생성 (ContentLoader 연동, 핵심 판단 요약, 질문 우선순위)
│   └── main.py        # 애플리케이션 팩토리
├── tests/             # 테스트 스위트 (650개, 94%+ 커버리지)
│   ├── core/          # 코어 모듈 테스트
│   ├── services/      # 서비스 계층 단위 테스트
│   └── integration/   # E2E 통합 테스트
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

### v1.2.0 (SPEC-PROMPT-001)

- **프롬프트 빌더 전면 개편** (`app/services/prompt_builder.py`)
  - ContentLoader 연동: 일간, 격국, 용신, 희신 콘텐츠 자동 주입
  - 핵심 판단 요약 섹션: 신강약, 오행 균형, 핵심 십신 분석
  - 질문 우선순위 시스템: 카테고리별 키워드 분류 (직업, 연애, 재물, 건강)
  - 개선된 프롬프트 구조: 명리학 콘텐츠 + 핵심 판단 요약 + 사용자 질문 섹션
- LLM 해석 품질 향상: 구조화된 콘텐츠와 판단 요약을 통한 전문적인 해석 제공
- 테스트 650개 (+29개), 커버리지 94%

### v1.1.0 (SPEC-CONTENT-002)

- `core/shgj.py` 신격(Shgj) 계산 모듈 추가
  - 상신(Sangsin) 계산: 용신을 돕는 천간 도출
  - 구신(Gusin) 계산: 용신을 극하는 천간 도출
  - 오행 상생상극 기반 알고리즘 구현
- `core/yongshin.py` 영격령 세부지표 필드 확장
  - 사령(Saryeong), 중화(Junghwa), 지속(Jisok), 확장(Hwakjang)
  - Optional 필드로 하위 호환성 유지
- `ContentLoader` 상신/구신/길흉 컨텐츠 로딩 지원
  - `get_sangsin_content()`, `get_gusin_content()` 메서드 추가
  - `get_shgj_gilhung_content()` 길흉 분류 컨텐츠 추가
- `/saju/identity` API 응답에 신격 지표 추가
  - `shgj`, `sangsin_content`, `gusin_content`, `shgj_gilhung_content` 필드
- Streamlit "나의 정체성" 탭에 신격 지표 UI 추가
  - 상신/구신 설명 카드
  - 길신/흉신 expander
- 알고리즘 패리티 테스트 27개 추가 (`tests/core/test_shgj_parity.py`)
- E2E 통합 테스트 10개 추가 (`tests/integration/test_shgj_integration.py`)
- ContentLoader 테스트 29개 추가 (상신/구신/길흉)
- 총 테스트: 515개 → 621개 (+106개), 커버리지 91%
- MVP 범위: 상신/구신 계산 완료, 국국분/상화/설화는 None 반환 (추후 구현)

### v1.0.0 (SPEC-CONTENT-001)

- `ContentLoader` 서비스 희신/희기신/연봉 콘텐츠 로딩 지원 추가
  - `get_hisin_content()`, `get_hisin_gisin_content()`, `get_salary_content()` 메서드 추가
  - `_DANG_RYEONG_TO_HISIN10_DIR` 매핑: 8개 당령 → Hisin10 디렉토리명
- `IdentityResponse`에 `hisin_content`, `hisin_gisin_content`, `salary_content` 필드 추가
- `/saju/identity` API 응답에 희신/희기신/연봉 콘텐츠 포함
- Streamlit "나의 정체성" 탭 희신 콘텐츠 카드 섹션 추가 (기존 3-컬럼 하단)
- 테스트 515개 (+14개), 커버리지 94%

### v0.9.0 (SPEC-API-002)

- 기능별 개별 REST API 엔드포인트 4개 분리 (하위 호환성 유지)
  - `POST /api/v1/saju/pillars` — 사주팔자 4기둥 + 기둥 의미
  - `POST /api/v1/saju/analysis` — 육신·합충형해파·오행비율·지장간·십이운성·신살
  - `POST /api/v1/saju/fortune` — 대운·세운 정보
  - `POST /api/v1/saju/identity` — 일간·격국·용신 카드 콘텐츠 (ContentLoader 연동)
- `core/models/response.py` — `PillarsResponse`, `AnalysisResponse`, `FortuneResponse`, `IdentityResponse` 추가
- 테스트 501개 (+24개), 커버리지 95% 유지

### v0.8.0 (SPEC-UI-004)

- 격국(格局) 캐릭터 카드: 10격국별 특성 카드 표시 (`contents_gyouk.json`)
- `ContentLoader` 서비스 `get_gyouk_content()` 및 `YUKSIN_TO_GYOUK` 매핑 추가
- Streamlit "나의 정체성" 탭 3-컬럼 확장 (일간 | 격국 | 용신)
- `_calc_gyouk_from_result()`: 월지 육신 기반 격국명 자동 도출
- 테스트 477개 (+11개), 커버리지 95% 유지

### v0.7.0 (SPEC-UI-003)

- 일간 캐릭터 카드: 10천간별 성격 카드 표시 (`contents_ilgan.json`)
- 용신 재능 해설: 8가지 용신 유형별 재능·진로 카드 표시 (`contents_yongsin.json`)
- `ContentLoader` 서비스: 앱 시작 시 JSON 캐싱, O(1) 조회 (`app/services/content_loader.py`)
- Streamlit "나의 정체성" 6번째 탭 (일간 카드 + 용신 카드 2열 레이아웃)
- `SajuResult.yongshin` 필드 추가 (하위 호환성 유지)
- `SajuService.calculate()`에 용신 계산 통합 (`birth_hour=None` 지원)
- 테스트 466개 (+14개), 커버리지 95% 유지

### v0.6.0 (SPEC-UI-002)

- 세부 지표 탭에 합충형해파(合沖刑害破) 분석 섹션 추가 (`streamlit_app.py`)
  - 기둥 쌍 6열 테이블: 기둥1 | 지지1 | 기둥2 | 지지2 | 관계 | 세부유형
  - 충(沖) 관계 행 붉은 배경색(#ffe0e0) 강조 (pandas Styler)
  - 빈 결과 시 "기둥 간 특별한 관계가 없습니다." 안내 메시지
  - 합충형해파 용어 설명 expander (7가지 관계 유형 설명)
- 테스트 452개 (기존 431개 → +21개), 커버리지 95% 유지

### v0.5.0 (SPEC-CALC-002)

- 형(刑)·해(害)·파(破) 판별 함수 추가 (`core/hapchung.py`)
  - `is_hyeong()`: 시세지형(인사신)·무은지형(축술미)·무례지형(자묘)·자형(진오유해)
  - `is_hae()`: 육해(六害) 6쌍 (자미·축오·인사·묘진·신해·유술)
  - `is_pa()`: 육파(六破) 6쌍 (자유·오묘·인해·사신·진축·술미)
  - `get_hyeong_subtype()`: 형 세부 유형 반환
- `HapchungRelation` 도메인 모델 추가 (`core/models/domain.py`)
- `calc_pillar_hapchung()`: 사기둥 지지 전체 쌍(최대 6쌍) 합충형해파 분석
  - 우선순위: 충 > 형 > 해 > 파 > 육합 > 삼합 > 방합
- `SajuResult.hapchung` 필드 추가 (`core/models/response.py`)
- 테스트 431개 (기존 379개 → +52개), 커버리지 95% 유지

### v0.4.0 (SPEC-INTERP-001)

- LLM 기반 사주 해석 기능 추가 (`app/services/interpretation_service.py`)
- OpenAI GPT-4o API 연동 (gpt-4o 모델, `OPENAI_API_KEY` 환경변수)
- 5섹션 한국어 해석 프롬프트 빌더 (`app/services/prompt_builder.py`)
- REST API 신규 엔드포인트: `POST /api/v1/saju/interpret`
  - API 키 미설정 시 graceful fallback (HTTP 200 + is_fallback: true)
  - LLM 서비스 오류 시 HTTP 502, 타임아웃 시 HTTP 504
- Streamlit 5번째 탭 추가: "AI 해석" (실시간 GPT-4o 해석)
- `.env.example` 환경 변수 설정 가이드 추가
- 테스트 379개 (기존 351개 → +28개), 커버리지 95% 유지

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
