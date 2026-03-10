# SPEC-PROMPT-001: 사주 프롬프트 시스템 개선

**TAG BLOCK**
```
SPEC-ID: SPEC-PROMPT-001
Title: Saju Prompt System Enhancement
Status: Planned
Priority: High
Created: 2026-03-10
Domain: Prompt Engineering, Content Integration
Related-SPECs: None
```

## Environment

### 시스템 환경

- **프로젝트**: 사주 분석 웹 서비스 (Python 리디자인)
- **버전**: 0.6.0
- **기반**: 기존 manse_ori (Node.js) 재설계
- **백엔드**: FastAPI 0.110+, Python 3.11+
- **프론트엔드**: Streamlit 1.32+
- **LLM**: OpenAI GPT-4o (선택적 사용)

### 기술 환경

- **프레임워크**: FastAPI (REST API), Streamlit (UI)
- **데이터 모델**: Pydantic v2
- **콘텐츠 소스**: JSON 파일들 (`manse_ori/testResult/`)
- **서비스 레이어**: `app/services/prompt_builder.py`, `app/services/content_loader.py`

### 비즈니스 환경

- **대상 사용자**: 일반 사용자, 개발자, 연구자
- **핵심 가치**: 전문 사주 해석의 대중화
- **현재 문제**: ContentLoader의 구조화된 콘텐츠가 프롬프트에 활용되지 않음

## Assumptions

### 기본 가정

1. **RAG 미도입**: 현재 프로젝트는 결정론적 조회(deterministic lookup)를 사용하며, 벡터 데이터베이스 기반 RAG는 필요하지 않음
2. **콘텐츠 존재**: `manse_ori/testResult/` 디렉토리에 일간, 격국, 용신, 희신 등의 구조화된 JSON 콘텐츠가 이미 존재
3. **계산 완성**: 사주 계산 로직은 이미 완성되어 있으며, 정확한 일간, 격국, 용신 값을 도출할 수 있음
4. **API 안정성**: 백엔드 API(`/api/v1/saju/interpret`)는 안정적으로 동작하며, Streamlit UI와 연동됨

### 기술적 가정

1. **ContentLoader 기능**: `ContentLoader` 클래스는 이미 JSON 파일에서 콘텐츠를 로드하는 기능을 구현함
2. **프롬프트 빌더**: `prompt_builder.py`의 `build_interpretation_prompt()` 함수는 현재 기본 데이터만 포함
3. **스트림릿 통합**: `streamlit_app.py`는 이미 백엔드 API와 통신하며, AI 해석 탭에서 결과를 표시
4. **백엔드 엔드포인트**: `/api/v1/saju/interpret` 엔드포인트는 `saju_result`와 `user_context`를 받아 LLM 해석을 반환

### 검증 필요 가정

1. **콘텐츠 품질**: 기존 JSON 콘텐츠의 품질과 완전성이 검증되어야 함
2. **프롬프트 효과**: ContentLoader 주입 후 LLM 해석 품질 향상 정도를 정량적으로 측정 필요
3. **성능 영향**: 프롬프트에 추가 콘텐츠 주입 시 토큰 사용량과 응답 시간 영향을 모니터링 필요

## Requirements

### SPEC-PROMPT-001: ContentLoader → 프롬프트 주입 (Priority 1)

**Ubiquitous Requirement**: 시스템은 항상 ContentLoader의 구조화된 콘텐츠를 프롬프트에 주입하여 LLM 해석 품질을 향상시켜야 한다.

**Event-Driven Requirements**:
- **WHEN** 사용자가 사주 해석을 요청하면, **시스템은** ContentLoader에서 일간, 격국, 용신, 희신 콘텐츠를 조회하여 프롬프트에 포함해야 한다.
- **WHEN** 프롬프트가 구성되면, **시스템은** 계산된 사주 데이터와 ContentLoader 콘텐츠를 결합하여 구조화된 프롬프트를 생성해야 한다.

**State-Driven Requirements**:
- **IF** ContentLoader에서 해당 콘텐츠를 찾을 수 없으면, **시스템은** null 처리하고 프롬프트 생성을 계속해야 한다.
- **IF** 일간, 격국, 용신 값이 계산되면, **시스템은** 각 값에 해당하는 콘텐츠를 자동으로 주입해야 한다.

**Unwanted Behavior Requirements**:
- 시스템은 ContentLoader 조회 실패 시 프롬프트 생성을 중단하면 안 된다.
- 시스템은 중복된 콘텐츠를 프롬프트에 여러 번 포함하면 안 된다.

### SPEC-PROMPT-002: 핵심 판단 요약 블록 추가 (Priority 2)

**Ubiquitous Requirement**: 시스템은 항상 사주의 핵심 판단 요소(신강약, 월령, 오행 균형, 핵심 십신)를 요약하여 프롬프트에 포함해야 한다.

**Event-Driven Requirements**:
- **WHEN** 사주 계산이 완료되면, **시스템은** 일간 강약, 월령 특성, 오행 과부족, 핵심 십신을 분석해야 한다.
- **WHEN** 핵심 판단 요약이 생성되면, **시스템은** 이를 프롬프트의 별도 섹션으로 추가해야 한다.

**State-Driven Requirements**:
- **IF** 일간이 강하면, **시스템은** 억부 용신(강한 일간 억제) 관련 콘텐츠를 강조해야 한다.
- **IF** 일간이 약하면, **시스템은** 부조 용신(약한 일간 지원) 관련 콘텐츠를 강조해야 한다.

### SPEC-PROMPT-003: 질문 우선 재구성 (Priority 3)

**Event-Driven Requirements**:
- **WHEN** 사용자가 추가 질문을 제시하면, **시스템은** 해당 질문과 관련된 항목을 상세히 설명하기 위해 프롬프트 우선순위를 조정해야 한다.
- **WHEN** 사용자 질문이 없으면, **시스템은** 균형 잡힌 전체 해석을 제공해야 한다.

**Optional Requirements**:
- **WHERE 가능하면**, 시스템은 질문 카테고리(직업, 연애, 재물, 건강 등)를 자동으로 분류하여 해당 분야 콘텐츠를 우선적으로 제공해야 한다.

### SPEC-PROMPT-004: Streamlit 통합 (Priority 1)

**Ubiquitous Requirement**: 시스템은 항상 Streamlit UI에서 개선된 프롬프트 시스템을 통해 생성된 해석을 표시해야 한다.

**Event-Driven Requirements**:
- **WHEN** 사용자가 "AI 해석 받기" 버튼을 클릭하면, **시스템은** ContentLoader 주입이 된 프롬프트로 해석을 생성해야 한다.
- **WHEN** API 응답을 받으면, **시스템은** Streamlit의 AI 해석 탭에 결과를 표시해야 한다.

**State-Driven Requirements**:
- **IF** API 호출이 실패하면, **시스템은** 사용자에게 명확한 에러 메시지를 표시해야 한다.
- **IF** LLM 해석이 생성되면, **시스템은** 사용 모델 정보와 함께 해석을 표시해야 한다.

## Specifications

### SPC-PROMPT-001: ContentLoader 주입 시스템

**목표**: ContentLoader의 구조화된 콘텐츠를 프롬프트에 자동 주입하여 LLM 해석 품질 향상

**구현 범위**:
1. `prompt_builder.py`에 ContentLoader 통합
2. 일간, 격국, 용신, 희신 콘텐츠 주입 로직
3. 콘텐츠가 없을 경우의 graceful handling
4. 프롬프트 토큰 최적화

**기술적 상세**:
- 일간 콘텐츠: `get_ilgan_content(day_gan)` - 일간 성격, 특징 설명
- 격국 콘텐츠: `get_gyouk_content(gyouk_name)` - 격국 해설, 베스트/최악 조합
- 용신 콘텐츠: `get_yongsin_content(dang_ryeong)` - 용신 재능, 진로 설명
- 희신 콘텐츠: `get_hisin_content(dang_ryeong)` - 희신 상세 설명

**프롬프트 구조**:
```
[사주 원국 데이터]
[명리학 콘텐츠] ← 새로운 섹션
  - 일간 해설
  - 격국 해설
  - 용신/희신 해설
[핵심 판단 요약] ← 새로운 섹션
[사용자 질문]
```

### SPC-PROMPT-002: 핵심 판단 요약 생성

**목표**: 사주 계산 결과에서 핵심 판단 요소를 추출하여 요약 블록 생성

**구현 범위**:
1. 일간 강약 분석 (신강약)
2. 월령 특성 추출
3. 오행 균형 분석 (과부족 식별)
4. 핵심 십신 식별

**기술적 상세**:
- 신강약: 일간의 오행 세기 기반 판단 (yongshin.py 참조)
- 월령: 월지의 오행 특성
- 오행 균형: ohang_ratio에서 강한 오행, 부족한 오행 식별
- 핵심 십신: 사주에서 가장 많이 나타나는 육신

### SPC-PROMPT-003: 질문 우선순위 시스템

**목표**: 사용자 질문에 따라 프롬프트 우선순위를 동적으로 조정

**구현 범위**:
1. 질문 키워드 분석
2. 질문 카테고리 분류 (직업, 연애, 재물, 건강 등)
3. 카테고리별 콘텐츠 가중치 조정
4. 균형 잡힌 해석 출력

**기술적 상세**:
- 질문이 없으면: 모든 항목을 균등하게 설명
- 질문이 있으면: 관련 항목 상세, 나머지 간략
- 질문 카테고리 분류: 키워드 매칭 기반 자동 분류

### SPC-PROMPT-004: Streamlit UI 연동

**목표**: Streamlit UI에서 개선된 프롬프트 시스템을 통해 생성된 해석 표시

**구현 범위**:
1. `/api/v1/saju/interpret` 엔드포인트 호출
2. ContentLoader 주입된 해석 결과 표시
3. 에러 처리 및 사용자 피드백
4. 로딩 상태 표시

**기술적 상세**:
- `streamlit_app.py`의 `render_tab_interpret()` 함수 수정 불필요 (이미 API 호출 구현됨)
- 백엔드 `prompt_builder.py` 수정만으로 자동 반영
- 에러 메시지 개선: ContentLoader 로딩 실패 등

## Traceability

### 요구사항-설계 매핑

| 요구사항 | 설계 요소 | 구현 파일 |
|---------|----------|----------|
| SPEC-PROMPT-001 | ContentLoader 주입 | `app/services/prompt_builder.py` |
| SPEC-PROMPT-002 | 핵심 판단 요약 | `app/services/prompt_builder.py` |
| SPEC-PROMPT-003 | 질문 우선순위 | `app/services/prompt_builder.py` |
| SPEC-PROMPT-004 | Streamlit 통합 | `streamlit_app.py` (기존) |

### 품질 속성 매핑

| 품질 속성 | SPEC 영향 |
|----------|----------|
| 신뢰성 | SPEC-PROMPT-004 (에러 처리) |
| 사용성 | SPEC-PROMPT-003 (질문 우선) |
| 효율성 | SPEC-PROMPT-001 (토큰 최적화) |
| 유지보수성 | 전체 (명확한 구조) |
