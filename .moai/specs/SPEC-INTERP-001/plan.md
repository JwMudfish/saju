---
id: SPEC-INTERP-001
version: 1.0.0
status: planned
created: 2026-03-04
updated: 2026-03-04
author: jw
---

<!-- SPEC-INTERP-001 -->

## 구현 계획 — SPEC-INTERP-001: LLM 기반 사주 해석 텍스트 자동 생성

---

## 1. 기술 스택

| 항목 | 선택 | 이유 |
|------|------|------|
| LLM 클라이언트 | `anthropic>=0.40.0` | 공식 Anthropic Python SDK, 안정적인 메시지 API 제공 |
| 모델 | `claude-sonnet-4-6` | 한국어 성능 우수, 사주 도메인 지식 풍부 |
| 비동기 처리 | `asyncio.get_event_loop().run_in_executor` | 동기 SDK를 FastAPI 비동기 컨텍스트에서 안전하게 실행 |
| 설정 관리 | `pydantic-settings` (기존 `app/config.py` 확장) | 환경 변수 `ANTHROPIC_API_KEY` 통합 |
| 테스트 모킹 | `unittest.mock.patch` | Anthropic API 외부 호출 격리 |

---

## 2. 작업 분해 (Task Decomposition)

### 우선순위: 높음 (Primary Goal)

**Task 1: 의존성 추가**
- `pyproject.toml`에 `anthropic>=0.40.0` 추가
- `uv add anthropic` 실행

**Task 2: Settings 확장 (`app/config.py`)**
- 기존 `Settings` 클래스에 `anthropic_api_key: str | None = None` 필드 추가
- `ANTHROPIC_API_KEY` 환경 변수 자동 매핑 확인

**Task 3: 응답 모델 정의 (`core/models/response.py` 또는 `app/api/endpoints/saju.py`)**
- `InterpretRequest` 모델: `saju_result: SajuResult`, `user_context: str | None = None`
- `InterpretResult` 모델: `interpretation: str`, `model: str`, `is_fallback: bool`

**Task 4: 프롬프트 빌더 구현 (`app/services/prompt_builder.py`)**
- `SYSTEM_PROMPT` 상수 정의 (사주 전문가 페르소나)
- `build_interpretation_prompt(saju_result: SajuResult, user_context: str | None) -> str` 구현
- 5개 해석 영역 구조화: 사주 총평, 성격/기질, 대운 흐름, 신살 풀이, 오행 균형
- None 필드 안전 처리 (shinsal, ohang_ratio 등이 None인 경우 해당 섹션 생략)

**Task 5: InterpretationService 구현 (`app/services/interpretation_service.py`)**
- `InterpretationService.__init__(api_key: str | None)` 구현
- `async interpret(saju_result, user_context) -> InterpretResult` 구현
  - API 키 없는 경우: 즉시 폴백 응답 반환
  - API 키 있는 경우: `run_in_executor`로 동기 Anthropic 클라이언트 호출
- `_fallback_response() -> InterpretResult` 구현
- `anthropic.APIStatusError` → HTTP 502 변환
- `anthropic.APITimeoutError` → HTTP 504 변환

**Task 6: FastAPI 엔드포인트 추가 (`app/api/endpoints/saju.py`)**
- `POST /api/v1/saju/interpret` 엔드포인트 추가
- `InterpretationService` 의존성 주입 (`app/api/deps.py`에 `get_interpretation_service` 팩토리 추가)
- 요청 검증 및 응답 반환

### 우선순위: 중간 (Secondary Goal)

**Task 7: Streamlit UI 확장 (`streamlit_app.py`)**
- 기존 4탭 구조에 "해석" 탭 추가 (5번째 탭)
- 사주 계산 결과를 `POST /api/v1/saju/interpret`로 전달하는 로직 구현
- 로딩 스피너 표시 (`st.spinner`)
- `is_fallback: true` 또는 오류 발생 시 안내 메시지 표시

### 우선순위: 낮음 (Optional Goal)

**Task 8: 단위 테스트 (`tests/test_interpretation_service.py`)**
- `api_key=None`일 때 폴백 응답 반환 테스트
- `api_key` 있을 때 Anthropic API 호출 테스트 (mock)
- `APIStatusError` 발생 시 502 처리 테스트
- `APITimeoutError` 발생 시 504 처리 테스트

**Task 9: 통합 테스트 (`tests/test_api_interpret.py`)**
- `POST /api/v1/saju/interpret` 엔드포인트 정상 호출 테스트 (mock)
- API 키 미설정 폴백 응답 확인 테스트
- 잘못된 요청 형식 422 응답 테스트

---

## 3. 구현 순서

```
Task 1 (의존성)
  → Task 2 (Settings 확장)
    → Task 3 (응답 모델 정의)
      → Task 4 (prompt_builder)
        → Task 5 (InterpretationService)
          → Task 6 (FastAPI 엔드포인트)
            → Task 7 (Streamlit UI)
            → Task 8 (단위 테스트)
            → Task 9 (통합 테스트)
```

Task 7, 8, 9는 Task 6 완료 후 병렬 진행 가능하다.

---

## 4. 아키텍처 설계

### 4.1 레이어 구조

```
[Streamlit UI / 외부 클라이언트]
    ↓ POST /api/v1/saju/interpret (InterpretRequest)
[FastAPI 엔드포인트 (app/api/endpoints/saju.py)]
    ↓ Depends(get_interpretation_service)
[InterpretationService (app/services/interpretation_service.py)]
    ↓ prompt_builder.build_interpretation_prompt()
[PromptBuilder (app/services/prompt_builder.py)]
    ↓ anthropic.Anthropic().messages.create() via run_in_executor
[Anthropic Claude API (외부)]
    ↑ 응답 텍스트
[InterpretResult 반환]
```

### 4.2 의존성 주입 패턴

```python
# app/api/deps.py (기존 파일에 추가)

from app.services.interpretation_service import InterpretationService

def get_interpretation_service(
    settings: Settings = Depends(get_settings),
) -> InterpretationService:
    return InterpretationService(api_key=settings.anthropic_api_key)
```

### 4.3 Anthropic API 호출 패턴 (비동기 래핑)

```python
import asyncio
import anthropic

async def _call_anthropic(self, messages: list[dict]) -> str:
    loop = asyncio.get_event_loop()
    client = anthropic.Anthropic(api_key=self._api_key)

    def _sync_call():
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=2048,
            system=SYSTEM_PROMPT,
            messages=messages,
        )
        return response.content[0].text

    return await loop.run_in_executor(None, _sync_call)
```

---

## 5. 리스크 분석

| 리스크 | 확률 | 영향도 | 대응 방안 |
|--------|------|--------|---------|
| `ANTHROPIC_API_KEY` 미설정 | 높음 | 낮음 | 폴백 응답으로 서비스 지속, 안내 메시지 표시 |
| LLM 응답 지연 (10~30초) | 중간 | 중간 | Streamlit 스피너 표시, 타임아웃 설정 (30초) |
| Anthropic API Rate Limit 초과 | 낮음 | 중간 | `APIStatusError` 포착하여 HTTP 502 반환 |
| LLM 응답 한국어 품질 저하 | 낮음 | 중간 | 시스템 프롬프트 개선, 프롬프트 엔지니어링 반복 |
| `SajuResult` 필드 일부 None으로 인한 프롬프트 오류 | 낮음 | 낮음 | `prompt_builder.py`에서 None 체크 후 섹션 생략 |
| anthropic SDK 버전 호환성 | 낮음 | 낮음 | `>=0.40.0` 명시, pyproject.toml에 고정 |

---

## 6. 테스트 전략

### 6.1 단위 테스트 (TDD - RED → GREEN → REFACTOR)

테스트 대상: `InterpretationService`, `prompt_builder`

| 테스트 케이스 | 검증 항목 |
|------------|---------|
| API 키 없음 → 폴백 반환 | `is_fallback=True`, `model="fallback"` |
| 정상 LLM 응답 (mock) | `is_fallback=False`, `model="claude-sonnet-4-6"`, 텍스트 비어있지 않음 |
| APIStatusError → 502 | HTTPException status_code == 502 |
| APITimeoutError → 504 | HTTPException status_code == 504 |
| shinsal=None인 SajuResult | 프롬프트에 "신살" 섹션 생략 확인 |
| ohang_ratio=None인 SajuResult | 프롬프트에 "오행 균형" 섹션 생략 확인 |

### 6.2 통합 테스트

테스트 대상: `POST /api/v1/saju/interpret` 엔드포인트

| 테스트 케이스 | 검증 항목 |
|------------|---------|
| 유효한 SajuResult 전송, API 키 없음 | HTTP 200, `is_fallback=True` |
| 유효한 SajuResult 전송, API 키 있음 (mock) | HTTP 200, `is_fallback=False` |
| 잘못된 요청 형식 | HTTP 422 |
| Anthropic API 오류 (mock) | HTTP 502 |

---

## 트레이서빌리티 태그

<!-- SPEC-INTERP-001 -->
