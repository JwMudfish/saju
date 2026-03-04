---
id: SPEC-INTERP-001
version: 1.0.0
status: completed
created: 2026-03-04
updated: 2026-03-04
author: jw
priority: medium
depends_on: SPEC-CALC-001, SPEC-API-001
---

## HISTORY

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-03-04 | jw | 최초 작성 |

---

## 1. 개요

### 1.1 배경

SPEC-CALC-001과 SPEC-API-001에서 구축한 사주팔자 계산 엔진과 REST API는 구조화된 수치 데이터를 반환한다. 그러나 일반 사용자가 육신, 십이운성, 신살 등의 전문 용어를 이해하기는 어렵다. LLM(대규모 언어 모델)을 활용하여 계산 결과를 자연어 한국어 해석 텍스트로 자동 변환함으로써 서비스 접근성과 사용자 가치를 높인다.

### 1.2 범위

**포함 범위:**
- `app/services/interpretation_service.py` — `InterpretationService` 구현
- `POST /api/v1/saju/interpret` 엔드포인트
- OpenAI GPT API 연동 (openai Python SDK)
- 프롬프트 구성 모듈 (`app/services/prompt_builder.py`)
- Streamlit UI "해석" 탭 추가 (`streamlit_app.py`)
- 환경 변수 `OPENAI_API_KEY` 설정 지원
- API 키 미설정 시 우아한 폴백(graceful degradation) 처리
- 단위 테스트 및 통합 테스트

**제외 범위:**
- 해석 결과의 데이터베이스 저장 및 캐싱
- 스트리밍 응답 (Server-Sent Events)
- 사용자 인증 및 사용량 제한(Rate Limiting)
- 해석 텍스트 편집 및 커스터마이징 기능
- 다국어 해석 (영어 등)

### 1.3 목표

1. `SajuResult` 데이터를 입력받아 자연어 한국어 해석 텍스트를 자동 생성한다
2. gpt-4o 모델을 활용하여 품질 높은 해석을 제공한다
3. `ANTHROPIC_API_KEY` 미설정 시에도 서비스가 중단되지 않도록 폴백 응답을 반환한다
4. Streamlit UI에 "해석" 탭을 추가하여 사용자가 즉시 해석 결과를 확인할 수 있게 한다

### 1.4 선행조건

| SPEC ID | 제목 | 상태 | 관계 |
|---------|------|------|------|
| SPEC-CORE-001 | 사주팔자 Python 순수 계산 엔진 | completed | 간접 의존 (`SajuResult` 모델) |
| SPEC-API-001 | FastAPI REST API | completed | 필수 선행 (`SajuService`, 엔드포인트 패턴) |
| SPEC-CALC-001 | 확장 계산 (십이운성, 신살, 세운) | completed | 필수 선행 (완전한 `SajuResult` 데이터) |

---

## 2. 환경 (Environment)

### 2.1 기술 스택

| 항목 | 버전 | 역할 |
|------|------|------|
| Python | >=3.11 | 런타임 |
| anthropic | >=0.40.0 | Anthropic Claude API 클라이언트 |
| FastAPI | >=0.110.0 | REST API 프레임워크 (기존) |
| Pydantic v2 | >=2.6.0 | 요청/응답 데이터 검증 (기존) |
| pydantic-settings | >=2.2.0 | 환경 변수 기반 설정 관리 (기존) |
| Streamlit | >=1.32.0 | 웹 UI (기존) |
| pytest | >=8.0.0 | 테스트 프레임워크 |
| pytest-asyncio | >=0.23.0 | 비동기 테스트 |
| respx 또는 unittest.mock | 최신 | Anthropic API 모킹 |

### 2.2 외부 서비스

| 서비스 | 설명 | 인증 |
|--------|------|------|
| Anthropic Claude API | LLM 해석 텍스트 생성 | `ANTHROPIC_API_KEY` 환경 변수 |

**사용 모델:** `claude-sonnet-4-6`

### 2.3 프로젝트 구조 (목표 상태)

```
saju/
├── core/                         ← 기존 계산 엔진 (변경 없음)
├── app/
│   ├── config.py                 ← ANTHROPIC_API_KEY 설정 추가
│   ├── api/
│   │   └── endpoints/
│   │       └── saju.py           ← POST /api/v1/saju/interpret 추가
│   └── services/
│       ├── saju_service.py       ← 기존 (변경 없음)
│       ├── interpretation_service.py  ← 신규
│       └── prompt_builder.py     ← 신규
├── tests/
│   ├── test_interpretation_service.py  ← 신규
│   └── test_api_interpret.py           ← 신규
└── streamlit_app.py              ← "해석" 탭 추가
```

### 2.4 핵심 제약 조건

- `core/` 모듈은 변경하지 않는다
- Anthropic API는 동기식 `anthropic.Anthropic` 클라이언트를 사용한다 (FastAPI의 `run_in_executor` 경유)
- 프롬프트는 `prompt_builder.py`에서 구성하며, 서비스 로직과 분리한다

---

## 3. 가정 (Assumptions)

| ID | 가정 | 신뢰도 | 검증 방법 |
|----|------|--------|---------|
| A-001 | Anthropic Python SDK (`anthropic>=0.40.0`)는 Python 3.11과 호환된다 | High | pip install 후 버전 확인 |
| A-002 | `claude-sonnet-4-6` 모델은 한국어 사주 해석에 충분한 성능을 제공한다 | High | 수동 테스트로 검증 |
| A-003 | 사주 해석 API 응답 시간은 LLM 처리 시간에 의존하며 10~30초 내에 완료된다 | Medium | 실제 API 호출로 측정 |
| A-004 | MVP 단계에서 해석 결과를 캐싱하지 않아도 서비스 부하가 감당 가능하다 | Medium | 트래픽 모니터링 필요 |
| A-005 | `ANTHROPIC_API_KEY` 환경 변수가 설정되지 않아도 다른 API 기능은 정상 동작해야 한다 | High | 폴백 로직 단위 테스트로 검증 |
| A-006 | `SajuResult` 의 모든 필드는 JSON 직렬화 가능하며 프롬프트 구성에 사용 가능하다 | High | Pydantic `model_dump()` 확인 |

---

## 4. 요구사항 (Requirements)

### REQ-INTERP-001: 입력 처리 — API 요청 수신

**WHEN** 클라이언트가 유효한 `InterpretRequest`를 `POST /api/v1/saju/interpret`으로 전송하면 **THEN** 시스템은 요청을 검증하고 `InterpretationService`에 처리를 위임해야 한다.

**WHEN** 요청 데이터가 Pydantic 검증에 실패하면 **THEN** 시스템은 HTTP 422 Unprocessable Entity를 반환해야 한다.

**[Ubiquitous]** 시스템은 항상 `SajuResult` 전체 데이터를 해석 입력으로 수용해야 한다.

### REQ-INTERP-002: 입력 처리 — 데이터 변환

**WHEN** `InterpretationService.interpret(saju_result)`가 호출되면 **THEN** 서비스는 `SajuResult`를 `prompt_builder.py`를 통해 구조화된 텍스트 프롬프트로 변환해야 한다.

**[Ubiquitous]** 프롬프트는 항상 다음 5개 영역을 포함해야 한다:
1. 사주 총평 (사주팔자 개요)
2. 성격/기질 분석 (일간 및 격국 기반)
3. 대운 흐름 해설 (deun_list 기반)
4. 신살 풀이 (shinsal 기반, 데이터가 없으면 생략)
5. 오행 균형 분석 (ohang_ratio 기반)

### REQ-INTERP-010: LLM 호출 — 프롬프트 구성

**[Ubiquitous]** 시스템은 항상 `claude-sonnet-4-6` 모델을 사용하여 해석 텍스트를 생성해야 한다.

**WHEN** `prompt_builder.build_interpretation_prompt(saju_result)`가 호출되면 **THEN** 빌더는 사주 데이터를 한국어 문맥에 맞게 포맷하여 시스템 프롬프트와 사용자 프롬프트를 분리하여 반환해야 한다.

**[Ubiquitous]** 시스템 프롬프트는 항상 사주 전문가 페르소나를 설정해야 한다 (예: "당신은 30년 경력의 사주명리학 전문가입니다").

### REQ-INTERP-011: LLM 호출 — Anthropic API 연동

**WHEN** `InterpretationService`가 Anthropic API를 호출하면 **THEN** 서비스는 `anthropic.Anthropic` 동기 클라이언트를 `asyncio.get_event_loop().run_in_executor(None, ...)`로 래핑하여 비동기적으로 실행해야 한다.

**IF** `ANTHROPIC_API_KEY`가 환경 변수에 설정되어 있지 않으면 **THEN** 시스템은 Anthropic API를 호출하지 않고 폴백 메시지를 즉시 반환해야 한다.

**[Unwanted]** 시스템은 API 키가 없는 상태에서 Anthropic API 호출을 시도해서는 안 된다.

### REQ-INTERP-020: 응답 처리 — 텍스트 반환

**WHEN** Anthropic API가 정상 응답을 반환하면 **THEN** 시스템은 `InterpretResult` 모델로 래핑하여 HTTP 200과 함께 반환해야 한다.

**[Ubiquitous]** 응답 모델 `InterpretResult`는 항상 다음 필드를 포함해야 한다:
- `interpretation` (str): 생성된 한국어 해석 텍스트
- `model` (str): 사용된 모델명 (`"claude-sonnet-4-6"` 또는 `"fallback"`)
- `is_fallback` (bool): 폴백 응답 여부

### REQ-INTERP-021: 응답 처리 — 오류 처리

**WHEN** Anthropic API 호출이 `anthropic.APIStatusError`로 실패하면 **THEN** 시스템은 HTTP 502 Bad Gateway를 반환해야 한다.

**WHEN** Anthropic API 호출이 타임아웃(`anthropic.APITimeoutError`)으로 실패하면 **THEN** 시스템은 HTTP 504 Gateway Timeout을 반환해야 한다.

**IF** `ANTHROPIC_API_KEY`가 설정되지 않은 경우 **THEN** 시스템은 HTTP 200과 함께 `is_fallback: true`, 안내 메시지가 포함된 폴백 응답을 반환해야 한다.

**[Unwanted]** 시스템은 LLM 오류 시 전체 서비스 장애로 이어지는 예외를 전파해서는 안 된다.

### REQ-INTERP-030: FastAPI 엔드포인트

**[Ubiquitous]** 시스템은 항상 `POST /api/v1/saju/interpret` 경로로 해석 요청을 수용해야 한다.

**WHEN** `POST /api/v1/saju/interpret` 요청이 도착하면 **THEN** 엔드포인트는 `InterpretationService`를 의존성 주입으로 획득하고 `interpret()` 메서드를 호출해야 한다.

**[Where]** `ANTHROPIC_API_KEY`가 설정된 경우 엔드포인트 응답 시간은 30초 이내를 목표로 한다.

요청 스키마:
```python
class InterpretRequest(BaseModel):
    saju_result: SajuResult
    user_context: str | None = None  # 사용자 추가 컨텍스트 (선택)
```

응답 스키마:
```python
class InterpretResult(BaseModel):
    interpretation: str
    model: str
    is_fallback: bool
```

### REQ-INTERP-040: UI 연동 — Streamlit "해석" 탭

**WHEN** Streamlit 앱에서 사용자가 사주 계산을 완료하고 "해석" 탭을 클릭하면 **THEN** UI는 `POST /api/v1/saju/interpret`를 호출하고 결과를 표시해야 한다.

**IF** 해석 API 호출이 실패하거나 `is_fallback: true`인 경우 **THEN** UI는 오류 메시지 대신 안내 텍스트(예: "API 키를 설정하면 AI 해석을 이용할 수 있습니다")를 표시해야 한다.

**[Ubiquitous]** Streamlit UI는 항상 해석 로딩 중 스피너를 표시해야 한다.

---

## 5. 사양 (Specifications)

### 5.1 InterpretationService 설계

```python
# app/services/interpretation_service.py

class InterpretationService:
    def __init__(self, api_key: str | None = None):
        self._api_key = api_key  # None이면 폴백 모드

    async def interpret(self, saju_result: SajuResult, user_context: str | None = None) -> InterpretResult:
        if not self._api_key:
            return self._fallback_response()
        # anthropic 클라이언트 생성 후 run_in_executor로 비동기 처리
        ...

    def _fallback_response(self) -> InterpretResult:
        return InterpretResult(
            interpretation="ANTHROPIC_API_KEY가 설정되지 않아 AI 해석을 제공할 수 없습니다. "
                          "환경 변수에 API 키를 설정하면 상세 해석을 이용하실 수 있습니다.",
            model="fallback",
            is_fallback=True,
        )
```

### 5.2 프롬프트 빌더 설계

```python
# app/services/prompt_builder.py

SYSTEM_PROMPT = """당신은 30년 경력의 사주명리학 전문가입니다.
주어진 사주팔자 데이터를 바탕으로 친절하고 이해하기 쉬운 한국어로 해석해 주세요.
전문 용어는 사용 후 반드시 쉬운 말로 설명하고, 긍정적이고 건설적인 방향으로 해석하세요."""

def build_interpretation_prompt(saju_result: SajuResult) -> str:
    """SajuResult를 구조화된 한국어 프롬프트로 변환한다."""
    ...
```

### 5.3 app/config.py 변경 사항

기존 `Settings` 클래스에 `anthropic_api_key` 필드를 추가한다:

```python
class Settings(BaseSettings):
    # 기존 필드 유지
    anthropic_api_key: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        # ANTHROPIC_API_KEY 환경 변수를 자동으로 읽음
    )
```

### 5.4 트레이서빌리티 태그

| 태그 ID | 연결 파일 | 설명 |
|---------|----------|------|
| SPEC-INTERP-001-REQ-001 | `app/api/endpoints/saju.py` | `POST /api/v1/saju/interpret` 엔드포인트 |
| SPEC-INTERP-001-REQ-002 | `app/services/prompt_builder.py` | 데이터→프롬프트 변환 |
| SPEC-INTERP-001-REQ-010 | `app/services/prompt_builder.py` | 프롬프트 구성 로직 |
| SPEC-INTERP-001-REQ-011 | `app/services/interpretation_service.py` | Anthropic API 연동 |
| SPEC-INTERP-001-REQ-020 | `app/services/interpretation_service.py` | 응답 모델 반환 |
| SPEC-INTERP-001-REQ-021 | `app/services/interpretation_service.py` | 오류 처리 및 폴백 |
| SPEC-INTERP-001-REQ-030 | `app/api/endpoints/saju.py` | FastAPI 엔드포인트 정의 |
| SPEC-INTERP-001-REQ-040 | `streamlit_app.py` | Streamlit "해석" 탭 |

---

## Implementation Notes (실제 구현 요약)

**구현 일자:** 2026-03-04

**계획 대비 변경 사항:**
- API: Anthropic Claude (`claude-sonnet-4-6`) → OpenAI GPT (`gpt-4o`)
- 환경 변수: `ANTHROPIC_API_KEY` → `OPENAI_API_KEY`
- 이유: 프로젝트 요구사항 변경 (OpenAI API 사용 결정)

**구현된 파일:**
- `app/services/interpretation_service.py` — InterpretationService (OpenAI GPT-4o)
- `app/services/prompt_builder.py` — 5섹션 한국어 해석 프롬프트 빌더
- `app/api/endpoints/saju.py` — POST /api/v1/saju/interpret 엔드포인트 추가
- `streamlit_app.py` — AI 해석 탭 (5번째 탭) 추가
- `app/config.py` — openai_api_key 설정 필드
- `tests/test_interpretation_service.py` — 단위 테스트 28개
- `tests/test_api_interpret.py` — 통합 테스트 8개
- `.env.example` — 환경 변수 설정 가이드

**최종 상태:**
- 테스트: 379 passed (0 failed)
- 커버리지: 95%+
- ruff: clean, mypy: clean
