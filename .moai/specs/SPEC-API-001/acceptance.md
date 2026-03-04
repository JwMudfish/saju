---
id: SPEC-API-001
version: 1.0.0
status: draft
created: 2026-02-27
updated: 2026-02-27
author: jw
---

# SPEC-API-001 인수 기준 (Acceptance Criteria)

<!-- TAG: SPEC-API-001 -->

## 완료 정의 (Definition of Done)

- [ ] 모든 AC 시나리오 통과
- [ ] `app/` 모듈 코드 커버리지 >= 85%
- [ ] ruff 린트 오류 0개
- [ ] mypy strict 모드 오류 0개
- [ ] OpenAPI 문서(`/docs`) 정상 접근 가능
- [ ] `uvicorn app.main:app` 정상 실행

---

## AC-001: POST /api/v1/saju - 유효한 입력으로 사주 계산 성공

**관련 요구사항:** FR-001, FR-004
**우선순위:** 높음

```gherkin
Feature: 사주 계산 API

  Scenario: 유효한 양력 생년월일로 사주 계산 요청
    Given API 서버가 실행 중이고
    And 요청 본문이 다음과 같을 때:
      | 필드         | 값      |
      | birth_year  | 1990    |
      | birth_month | 5       |
      | birth_day   | 15      |
      | birth_hour  | 14      |
      | is_lunar    | false   |
      | gender      | "male"  |
    When 클라이언트가 POST /api/v1/saju로 요청을 전송하면
    Then HTTP 상태 코드 200을 반환해야 한다
    And 응답 JSON은 다음 필드를 포함해야 한다:
      | 필드              | 타입    | 설명        |
      | year_pillar      | object  | 연주 (년의 천간지지) |
      | month_pillar     | object  | 월주 (월의 천간지지) |
      | day_pillar       | object  | 일주 (일의 천간지지) |
      | hour_pillar      | object  | 시주 (시의 천간지지) |
    And 응답 시간은 500ms 미만이어야 한다
```

**테스트 코드 참조:** `tests/test_api_saju.py::test_calculate_saju_valid_input`

---

## AC-002: POST /api/v1/calendar/convert - 음력에서 양력으로 변환

**관련 요구사항:** FR-002
**우선순위:** 높음

```gherkin
Feature: 음양력 변환 API

  Scenario: 유효한 음력 날짜를 양력으로 변환
    Given API 서버가 실행 중이고
    And 요청 본문이 다음과 같을 때:
      | 필드           | 값     |
      | year          | 1990   |
      | month         | 3      |
      | day           | 20     |
      | is_leap_month | false  |
    When 클라이언트가 POST /api/v1/calendar/convert로 요청을 전송하면
    Then HTTP 상태 코드 200을 반환해야 한다
    And 응답 JSON은 다음 필드를 포함해야 한다:
      | 필드          | 타입   |
      | solar_year   | int    |
      | solar_month  | int    |
      | solar_day    | int    |
    And 반환된 양력 날짜는 core/calendar.py의 계산 결과와 동일해야 한다

  Scenario: 윤달 음력 날짜를 양력으로 변환
    Given API 서버가 실행 중이고
    And 요청 본문에 is_leap_month가 true로 설정되어 있을 때
    When 클라이언트가 POST /api/v1/calendar/convert로 요청을 전송하면
    Then HTTP 상태 코드 200 또는 422를 반환해야 한다
    And 유효한 윤달인 경우 양력 변환 결과를 반환해야 한다
    And 유효하지 않은 윤달인 경우 HTTP 422와 상세 오류 메시지를 반환해야 한다
```

**테스트 코드 참조:** `tests/test_api_calendar.py::test_convert_lunar_to_solar`

---

## AC-003: GET /health - 헬스 체크

**관련 요구사항:** FR-003
**우선순위:** 높음

```gherkin
Feature: 헬스 체크 API

  Scenario: 서버 상태 확인
    Given API 서버가 실행 중일 때
    When 클라이언트가 GET /health로 요청을 전송하면
    Then HTTP 상태 코드 200을 반환해야 한다
    And 응답 JSON은 {"status": "ok"}이어야 한다
    And 응답 시간은 50ms 미만이어야 한다

  Scenario: 헬스 체크는 인증 없이 접근 가능
    Given 인증 헤더 없이 요청할 때
    When 클라이언트가 GET /health로 요청을 전송하면
    Then HTTP 상태 코드 200을 반환해야 한다
```

**테스트 코드 참조:** `tests/test_api_health.py::test_health_check`

---

## AC-004: POST /api/v1/saju - 유효하지 않은 birth_year로 422 반환

**관련 요구사항:** FR-001
**우선순위:** 높음

```gherkin
Feature: 사주 계산 입력 검증

  Scenario: 너무 이른 연도로 요청 시 422 반환
    Given API 서버가 실행 중이고
    And 요청 본문의 birth_year가 1500일 때
    When 클라이언트가 POST /api/v1/saju로 요청을 전송하면
    Then HTTP 상태 코드 422 Unprocessable Entity를 반환해야 한다
    And 응답 JSON에 "detail" 필드가 포함되어야 한다
    And 오류 메시지에 유효하지 않은 입력 값에 대한 설명이 포함되어야 한다

  Scenario: 필수 필드 누락 시 422 반환
    Given API 서버가 실행 중이고
    And 요청 본문에 birth_month 필드가 없을 때
    When 클라이언트가 POST /api/v1/saju로 요청을 전송하면
    Then HTTP 상태 코드 422 Unprocessable Entity를 반환해야 한다

  Scenario: 유효하지 않은 gender 값으로 422 반환
    Given API 서버가 실행 중이고
    And 요청 본문의 gender가 "unknown"일 때
    When 클라이언트가 POST /api/v1/saju로 요청을 전송하면
    Then HTTP 상태 코드 422 Unprocessable Entity를 반환해야 한다

  Scenario: birth_month가 범위를 초과할 때 422 반환
    Given API 서버가 실행 중이고
    And 요청 본문의 birth_month가 13일 때
    When 클라이언트가 POST /api/v1/saju로 요청을 전송하면
    Then HTTP 상태 코드 422 Unprocessable Entity를 반환해야 한다
```

**테스트 코드 참조:** `tests/test_api_saju.py::test_calculate_saju_invalid_birth_year`

---

## AC-005: 코드 커버리지 >= 85% (app/ 모듈)

**관련 요구사항:** FR-007
**우선순위:** 높음

```gherkin
Feature: API 레이어 코드 품질

  Scenario: app/ 모듈 테스트 커버리지 충족
    Given 모든 API 테스트가 작성되어 있을 때
    When pytest를 --cov=app 옵션으로 실행하면
    Then app/ 모듈의 전체 코드 커버리지가 85% 이상이어야 한다
    And 다음 파일은 90% 이상 커버리지를 달성해야 한다:
      | 파일                              |
      | app/api/endpoints/health.py      |
      | app/api/endpoints/saju.py        |
      | app/api/endpoints/calendar.py    |
      | app/services/saju_service.py     |
      | app/services/calendar_service.py |
```

**검증 명령어:**

```bash
uv run pytest tests/test_api_*.py -v \
  --cov=app \
  --cov-report=term-missing \
  --cov-fail-under=85
```

---

## AC-006: OpenAPI 문서 자동 생성

**관련 요구사항:** FR-005
**우선순위:** 중간

```gherkin
Feature: OpenAPI 문서

  Scenario: /docs 엔드포인트 접근
    Given API 서버가 실행 중일 때
    When 클라이언트가 GET /docs로 요청을 전송하면
    Then HTTP 상태 코드 200을 반환해야 한다
    And Swagger UI HTML을 반환해야 한다

  Scenario: /openapi.json 스키마 유효성
    Given API 서버가 실행 중일 때
    When 클라이언트가 GET /openapi.json으로 요청을 전송하면
    Then HTTP 상태 코드 200을 반환해야 한다
    And 반환된 JSON은 유효한 OpenAPI 3.0 스키마이어야 한다
    And 다음 경로가 포함되어야 한다:
      | 경로                      | 메서드 |
      | /health                   | GET    |
      | /api/v1/saju             | POST   |
      | /api/v1/calendar/convert | POST   |
```

**테스트 코드 참조:** `tests/test_api_health.py::test_openapi_schema`

---

## AC-007: 환경 변수 기반 설정 로드

**관련 요구사항:** FR-006
**우선순위:** 중간

```gherkin
Feature: 설정 관리

  Scenario: 기본값으로 애플리케이션 시작
    Given .env 파일이 없을 때
    When FastAPI 애플리케이션이 시작되면
    Then app_name이 "사주 API"이어야 한다
    And debug가 False이어야 한다

  Scenario: 환경 변수로 설정 오버라이드
    Given APP_DEBUG=true 환경 변수가 설정되어 있을 때
    When FastAPI 애플리케이션이 시작되면
    Then debug 모드가 활성화되어야 한다
```

---

## 테스트 픽스처 설계

```python
# tests/conftest.py (예시)
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.fixture
async def client() -> AsyncClient:
    """비동기 테스트 클라이언트"""
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as c:
        yield c

# 유효한 사주 계산 요청 데이터
VALID_SAJU_REQUEST = {
    "birth_year": 1990,
    "birth_month": 5,
    "birth_day": 15,
    "birth_hour": 14,
    "is_lunar": False,
    "gender": "male",
}

# 유효한 음양력 변환 요청 데이터
VALID_CALENDAR_REQUEST = {
    "year": 1990,
    "month": 3,
    "day": 20,
    "is_leap_month": False,
}
```

---

## 품질 게이트 체크리스트

### 기능 검증
- [ ] AC-001: POST /api/v1/saju 정상 응답 확인
- [ ] AC-002: POST /api/v1/calendar/convert 정상 응답 확인
- [ ] AC-003: GET /health 정상 응답 확인
- [ ] AC-004: 유효하지 않은 입력 422 반환 확인
- [ ] AC-006: /docs OpenAPI 문서 접근 가능 확인

### 품질 검증
- [ ] AC-005: app/ 커버리지 >= 85%
- [ ] ruff: `uv run ruff check app/ tests/` 오류 0개
- [ ] mypy: `uv run mypy app/ --strict` 오류 0개
- [ ] 전체 테스트: `uv run pytest` 전체 통과 (core/ + app/)
