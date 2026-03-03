---
id: SPEC-INTERP-001
version: 1.0.0
status: planned
created: 2026-03-04
updated: 2026-03-04
author: jw
---

<!-- SPEC-INTERP-001 -->

## 인수 기준 — SPEC-INTERP-001: LLM 기반 사주 해석 텍스트 자동 생성

---

## 1. 정상 시나리오 (Happy Path)

### 시나리오 1: API 키 설정 시 LLM 해석 성공

```gherkin
Given 환경 변수 ANTHROPIC_API_KEY가 유효한 값으로 설정되어 있고
  And POST /api/v1/saju로 사주 계산을 완료한 유효한 SajuResult가 존재하며
  And Anthropic Claude API가 정상 응답을 반환하는 상태이다
When 클라이언트가 SajuResult를 포함한 InterpretRequest를 POST /api/v1/saju/interpret로 전송하면
Then HTTP 200 OK를 반환한다
  And 응답 본문의 interpretation 필드는 비어 있지 않은 한국어 텍스트이다
  And 응답 본문의 model 필드는 "claude-sonnet-4-6"이다
  And 응답 본문의 is_fallback 필드는 false이다
  And 응답 시간은 30초 이내이다
```

### 시나리오 2: API 키 미설정 시 폴백 응답

```gherkin
Given 환경 변수 ANTHROPIC_API_KEY가 설정되어 있지 않거나 빈 문자열이고
  And 유효한 SajuResult가 존재한다
When 클라이언트가 POST /api/v1/saju/interpret를 호출하면
Then HTTP 200 OK를 반환한다
  And 응답 본문의 is_fallback 필드는 true이다
  And 응답 본문의 model 필드는 "fallback"이다
  And 응답 본문의 interpretation 필드는 API 키 설정 안내 메시지를 포함한다
  And 외부 Anthropic API 호출은 발생하지 않는다
```

### 시나리오 3: Streamlit UI에서 해석 탭 표시

```gherkin
Given Streamlit 앱이 실행 중이고
  And 사용자가 생년월일 및 성별을 입력하여 사주 계산을 완료한 상태이다
When 사용자가 "해석" 탭을 클릭하면
Then 로딩 스피너가 표시된다
  And POST /api/v1/saju/interpret API가 호출된다
  And 응답이 도착하면 해석 텍스트가 화면에 출력된다
  And is_fallback이 true인 경우 "API 키를 설정하면 AI 해석을 이용할 수 있습니다" 안내가 표시된다
```

---

## 2. 오류 시나리오 (Edge Cases)

### 시나리오 4: 잘못된 요청 형식

```gherkin
Given 클라이언트가 유효하지 않은 JSON 요청을 전송한다
  (예: saju_result 필드 없음, 필수 year_pillar 누락)
When POST /api/v1/saju/interpret를 호출하면
Then HTTP 422 Unprocessable Entity를 반환한다
  And 응답 본문에는 유효성 오류 세부 정보가 포함된다
  And Anthropic API는 호출되지 않는다
```

### 시나리오 5: Anthropic API 호출 타임아웃

```gherkin
Given ANTHROPIC_API_KEY가 설정되어 있고
  And Anthropic API가 30초 이상 응답하지 않는 상태이다 (anthropic.APITimeoutError 발생)
When 클라이언트가 POST /api/v1/saju/interpret를 호출하면
Then HTTP 504 Gateway Timeout을 반환한다
  And 오류 메시지에는 타임아웃 관련 내용이 포함된다
  And 시스템 전체 서비스는 정상 유지된다
```

### 시나리오 6: Anthropic API 서버 오류

```gherkin
Given ANTHROPIC_API_KEY가 설정되어 있고
  And Anthropic API가 500 Internal Server Error를 반환한다 (anthropic.APIStatusError 발생)
When 클라이언트가 POST /api/v1/saju/interpret를 호출하면
Then HTTP 502 Bad Gateway를 반환한다
  And 사주 계산 엔드포인트 (POST /api/v1/saju)는 영향을 받지 않는다
```

### 시나리오 7: shinsal 및 ohang_ratio가 None인 SajuResult

```gherkin
Given SajuResult에서 shinsal 필드와 ohang_ratio 필드가 None이고
  And ANTHROPIC_API_KEY가 설정되어 있다
When POST /api/v1/saju/interpret를 호출하면
Then HTTP 200 OK를 반환한다
  And 프롬프트에서 신살 섹션과 오행 균형 섹션이 생략되어 오류 없이 처리된다
  And 나머지 해석 영역 (사주 총평, 성격/기질, 대운 흐름)은 정상 포함된다
```

### 시나리오 8: 선택적 user_context 포함 요청

```gherkin
Given 유효한 SajuResult와 함께 user_context="직업 운을 중점적으로 해석해 주세요"가 포함된 요청이다
  And ANTHROPIC_API_KEY가 설정되어 있다
When POST /api/v1/saju/interpret를 호출하면
Then HTTP 200 OK를 반환한다
  And 생성된 프롬프트에 user_context 내용이 반영된다
  And 해석 텍스트는 직업 관련 내용을 포함한다
```

---

## 3. 품질 게이트 (Quality Gates)

### 3.1 기능 품질

| 항목 | 기준 | 측정 방법 |
|------|------|---------|
| 해석 텍스트 언어 | 한국어 | 수동 확인 또는 언어 감지 라이브러리 |
| 해석 텍스트 최소 길이 | 200자 이상 | `len(interpretation) >= 200` |
| 폴백 응답 정확성 | `is_fallback=True` 및 안내 메시지 포함 | 단위 테스트 |
| 5개 해석 영역 커버 | 총평, 성격, 대운, 신살, 오행 | 프롬프트 단위 테스트로 섹션 확인 |

### 3.2 성능 품질

| 항목 | 기준 | 비고 |
|------|------|------|
| 정상 해석 응답 시간 | 30초 이내 | Anthropic API 포함 |
| 폴백 응답 시간 | 100ms 이내 | 외부 API 미호출 |
| 기존 `/api/v1/saju` 성능 영향 | 없음 | 독립 엔드포인트 |

### 3.3 코드 품질

| 항목 | 기준 |
|------|------|
| ruff 린트 오류 | 0개 |
| 테스트 커버리지 (`app/services/interpretation_service.py`) | 85% 이상 |
| 테스트 커버리지 (`app/services/prompt_builder.py`) | 85% 이상 |
| mypy 타입 오류 | 0개 |

### 3.4 안정성

| 항목 | 기준 |
|------|------|
| API 키 없음 시 서비스 중단 | 없음 (폴백 동작) |
| LLM 오류 시 다른 엔드포인트 영향 | 없음 (독립적 오류 처리) |
| None 필드 처리 | 예외 없이 처리 |

---

## 4. Definition of Done (완료 기준)

### 필수 완료 조건

- [ ] `anthropic>=0.40.0` 의존성이 `pyproject.toml`에 추가됨
- [ ] `app/config.py`에 `anthropic_api_key` 설정 필드가 추가됨
- [ ] `app/services/prompt_builder.py` 구현 완료 (5개 해석 영역, None 안전 처리)
- [ ] `app/services/interpretation_service.py` 구현 완료 (폴백, 비동기 LLM 호출, 오류 처리)
- [ ] `POST /api/v1/saju/interpret` 엔드포인트 구현 완료
- [ ] Streamlit "해석" 탭 추가 완료
- [ ] `tests/test_interpretation_service.py` 작성 완료 (시나리오 1~8 커버)
- [ ] `tests/test_api_interpret.py` 작성 완료
- [ ] `uv run pytest tests/ -q` 모든 테스트 통과
- [ ] `uv run ruff check .` 오류 0개
- [ ] API 키 없는 환경에서 폴백 동작 수동 확인

### 선택 완료 조건

- [ ] API 키 있는 환경에서 실제 LLM 해석 텍스트 품질 수동 검토
- [ ] `.env.example`에 `ANTHROPIC_API_KEY=` 항목 추가

---

## 트레이서빌리티 태그

<!-- SPEC-INTERP-001 -->
