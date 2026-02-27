# CHANGELOG

모든 주요 변경 사항은 이 파일에 기록됩니다.

형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.0.0/)를 따르며,
이 프로젝트는 [유의적 버전](https://semver.org/lang/ko/)을 사용합니다.

---

## [0.1.0] - 2026-02-27

### Added (SPEC-CORE-001: 사주팔자 Python 순수 계산 엔진)

#### 핵심 계산 모듈
- `core/constants.py` — 10천간(GAN_LIST), 12지지(JI_LIST), 60갑자(GANJI_60), 오행·음양 매핑 상수
- `core/exceptions.py` — 도메인 예외 클래스 (`SajuError`, `YearRangeError`, `SolarTermNotFoundError`, `InvalidLunarDateError`)
- `core/solar_term.py` — `julgi.json` 기반 절기 캐시(싱글톤), 절입 시각 계산
- `core/pillar.py` — 년·월·일·시 4주(四柱) 계산 (`calc_four_pillars`)
- `core/jijanggan.py` — 지장간(地藏干) 테이블 및 추출 함수
- `core/ohang.py` — 음양오행(陰陽五行) 분석, 오행 관계 계산
- `core/yuksin.py` — 육신(六神) 관계 계산
- `core/hapchung.py` — 삼합·육합·충·형·해(三合六合沖刑害) 분석
- `core/yongshin.py` — 용신(用神) 분석
- `core/deun.py` — 대운(大運) 방향·수·목록 계산
- `core/calendar.py` — 태음력 ↔ 양력 상호 변환 (`korean-lunar-calendar` 기반)

#### 데이터 모델 (Pydantic v2)
- `core/models/request.py` — `SajuRequest` (년·월·일·시, 성별, 음력 여부, 윤달 여부)
- `core/models/domain.py` — `GanJi`, `HiddenStems`, `DeunItem`, `OHangRatio`
- `core/models/response.py` — `FourPillars`, `SajuResult`

#### 데이터
- `data/julgi.json` — 400년치 절기 데이터 (1800–2200년, 18,124줄)

#### 테스트 (TDD: RED-GREEN-REFACTOR)
- 231개 테스트, **95% 코드 커버리지**
- `tests/test_constants.py` — 상수 검증 (18개)
- `tests/test_models.py` — Pydantic 모델 검증
- `tests/test_solar_term.py` — 절기 캐시 및 절입 계산
- `tests/test_pillar.py` — 4주 계산 정확성
- `tests/test_jijanggan.py` — 지장간 추출
- `tests/test_ohang.py` — 오행 관계 분석
- `tests/test_yuksin.py` — 육신 계산
- `tests/test_hapchung.py` — 합충형해 분석
- `tests/test_yongshin.py` — 용신 분석
- `tests/test_deun.py` — 대운 계산
- `tests/test_calendar.py` — 음양력 변환
- `tests/test_integration.py` — 통합 시나리오 검증

#### 인프라
- `pyproject.toml` — hatchling 빌드, ruff/mypy 설정, Python 3.11+ 요구
- `uv.lock` — 재현 가능한 의존성 잠금 파일
- `Dockerfile` — 컨테이너 실행 환경

### 기술 스택
- Python 3.11+ (uv 가상환경으로 Python 3.11.12 지정)
- Pydantic v2 (타입 안전 모델)
- korean-lunar-calendar (음양력 변환)
- uv (패키지 매니저)
- pytest + pytest-cov (테스트)
- ruff (lint/format)
- mypy (타입 검사)

---

## [0.1.1] - 2026-02-27

### Changed (Python 3.11 마이그레이션)
- uv 가상환경을 Python 3.11로 명시적 지정 (`.venv` 생성)
- `str | None` 유니온 타입 사용 (Python 3.10+ 문법)
- pyproject.toml `requires-python = ">=3.11"` 명시
- 241개 테스트 전체 통과 확인 (Python 3.11.12)

### Fixed
- Python 3.9 호환성 이슈 해결 (`str | None` 타입 오류)
- uv sync --dev로 개발 의존성 완전 설치

---

## [0.3.0] - 2026-02-27

### Added (Streamlit 웹 UI)

#### Streamlit 애플리케이션
- `streamlit_app.py` — 사주팔자 계산 웹 인터페이스
- 사이드바 입력 폼 (생년월일, 성별, 음력/윤달 여부)
- 4주 (사주팔자) 결과 표시
- 대운 (大運) 테이블 시각화

#### 기술 스택
- streamlit 1.54+ (웹 UI 프레임워크)
- requests 2.31+ (HTTP 클라이언트)

---

## [0.2.0] - 2026-02-27

### Added (SPEC-API-001: FastAPI REST API)

#### FastAPI 애플리케이션
- `app/main.py` — FastAPI 애플리케이션 팩토리, CORS 미들웨어
- `app/config.py` — Pydantic BaseSettings 기반 설정 관리
- `app/api/router.py` — API 라우터 통합
- `app/api/deps.py` — 의존성 주입 (서비스 팩토리)

#### REST API 엔드포인트
- `GET /health` — 헬스 체크
- `POST /api/v1/saju` — 사주팔자 계산
- `POST /api/v1/calendar/convert` — 음양력 변환

#### 서비스 레이어
- `app/services/saju_service.py` — 사주 계산 비즈니스 로직
- `app/services/calendar_service.py` — 음양력 변환 비즈니스 로직

#### API 테스트
- 10개 API 테스트 (pytest-asyncio)
- `tests/test_api_health.py` — 헬스 체크 (2개)
- `tests/test_api_saju.py` — 사주 계산 API (6개)
- `tests/test_api_calendar.py` — 음양력 변환 API (2개)

#### 기술 스택
- FastAPI 0.115+ (REST API 프레임워크)
- uvicorn[standard] (ASGI 서버)
- pydantic-settings (설정 관리)
