# SPEC-UI-005: Streamlit UI 확장 - 신규 컨텐츠 표시

**TAG BLOCK**
```
TAG: SPEC-UI-005
DOMAIN: UI (User Interface)
TITLE: Streamlit UI 확장 - 신규 컨텐츠 표시
CREATED: 2026-03-12
STATUS: Planned
PRIORITY: High
ASSIGNED: expert-frontend
RELATED: SPEC-CONTENT-002, SPEC-CONTENT-003
```

## 1. 개요 (Overview)

### 1.1 목적 (Purpose)

최근 완료된 SPEC-CONTENT-002 및 SPEC-CONTENT-003의 API 구현으로 추가된 21개의 신규 컨텐츠 필드를 Streamlit UI에 표시합니다. 현재 6탭 대시보드 구조를 확장하여 모든 신규 기능을 사용자에게 제공합니다.

### 1.2 범위 (Scope)

**범위 포함 (In Scope):**
- 기존 6탭에 신규 컨텐츠 섹션 추가
- 2개의 신규 탭 생성 ("관계 분석", "경운 안내")
- 반응형 레이아웃 구현 (데스크탑/모바일)
- 로딩 및 에러 상태 처리 개선

**범위 제외 (Out of Scope):**
- API 구현 변경 (이미 완료됨)
- 데이터베이스 스키마 변경
- 인증/권한 시스템 변경
- 다크 모드 지원

### 1.3 배경 (Background)

**문제 상황:**
- SPEC-CONTENT-002 Phase 2: 영격령 세부지표, 신격 상화/설화, 신격 길흉 구현 완료
- SPEC-CONTENT-003 Phase 1-3: 상신/구신, 합충 관계, 일간 화월/연애, 베프/노소 유형, 경운 질문 구현 완료
- 위 모든 기능이 API 응답에 포함되어 있으나 Streamlit UI에 표시되지 않음

**기존 UI 구조:**
1. "나의 정체성" - 일간 캐릭터, 격국 캐릭터, 용신 캐릭터
2. "사주 기초" - 기본 사주 정보
3. "십이운성" - 12운성 정보
4. "대운/세운" - 운세 정보
5. "육친/신살" - 육친과 신살
6. "일간/월주/일진" - 일간/월주/일진 정보

## 2. 환경 (Environment)

### 2.1 기술 스택

**프레임워크:**
- Streamlit: ^1.28.0
- Python: ^3.11.0

**기존 구조:**
- streamlit_app.py: 메인 애플리케이션 (현재 약 500라인)
- 6탭 구조: st.tabs()로 구현
- API 호출: analyze_saju() 함수 (단일 호출, 모든 데이터 반환)

### 2.2 데이터 소스

**API 응답 구조 (변경 없음):**
```python
response = {
    # 기존 필드
    "ilgan_character": "...",
    "jeokguk_character": "...",

    # 신규 필드 (SPEC-CONTENT-002 Phase 2)
    "jisok": "...",
    "joonghwa": "...",
    "hwakjang": "...",
    "sanghwa": "...",
    "sulhwa": "...",
    "shgj_gilhung_content": "...",

    # 신규 필드 (SPEC-CONTENT-003 Phase 1)
    "sangsin_compliment_content": "...",
    "gusin_gisin_content": "...",
    "jisok_content": "...",
    "joonghwa_content": "...",
    "hwakjang_content": "...",

    # 신규 필드 (SPEC-CONTENT-003 Phase 2)
    "hapchung_content": "...",
    "ilgan_hw_content": "...",
    "ilgan_love_content": "...",
    "bestfriend_content": "...",

    # 신규 필드 (SPEC-CONTENT-003 Phase 3)
    "old_young_content": "...",
    "light_question_content": "...",
}
```

## 3. 가정 (Assumptions)

### 3.1 기술 가정

- [A1] API 응답 구조는 안정적이며 변경되지 않음
- [A2] Streamlit 애플리케이션은 단일 페이지 애플리케이션으로 동작
- [A3] 사용자는 데스크탑 또는 모바일 브라우저에서 접근

### 3.2 사용자 가정

- [A4] 사용자는 사주 기초 지식이 있으며 신규 용어 이해 가능
- [A5] 사용자는 Korean (한국어)을 기본 언어로 사용

### 3.3 비즈니스 가정

- [A6] 신규 탭 추가로 인한 사용자 경험 저하 없음
- [A7] 로딩 시간 증가는 허용 가능 범위 내 (3초 이내)

## 4. 요구사항 (Requirements)

### 4.1 Ubiquitous Requirements (항상 활성 요구사항)

**[UR-001] 데이터 표시 완결성**
시스템은 항상 API 응답의 모든 신규 필드를 UI에 표시해야 한다.
- 이유: 구현된 기능을 사용자에게 제공하기 위해
- 검증: 21개 신규 필드가 모두 UI 컴포넌트로 매핑됨

**[UR-002] 로딩 상태 표시**
시스템은 항상 데이터 로딩 중일 때 사용자에게 로딩 인디케이터를 표시해야 한다.
- 이유: 사용자 경험 개선을 위해
- 검증: st.spinner() 또는 st.status() 사용

**[UR-003] 에러 처리**
시스템은 항상 API 호출 실패 시 사용자 친화적인 에러 메시지를 표시해야 한다.
- 이유: 실패 원인을 명확히 하기 위해
- 검증: st.error()로 에러 메시지 표시

**[UR-004] 일관된 스타일**
시스템은 항상 모든 UI 컴포넌트에 일관된 스타일을 적용해야 한다.
- 이유: 사용자 인터페이스 일관성 유지를 위해
- 검증: 색상, 폰트, 간격 통일

### 4.2 Event-Driven Requirements (이벤트 기반 요구사항)

**[ER-001] 탭 전환 이벤트**
WHEN 사용자가 탭을 전환하면, 시스템은 해당 탭의 컨텐츠를 렌더링해야 한다.
- 이유: 탭 기반 네비게이션 동작을 위해
- 검증: 모든 8개 탭 전환 시 정상 렌더링

**[ER-002] "관계 분석" 탭 선택**
WHEN 사용자가 "관계 분석" 탭을 선택하면, 시스템은 합충, 베프, 노소 관계 컨텐츠를 표시해야 한다.
- 이유: 관계 분석 컨텐츠를 한 곳에서 제공하기 위해
- 검증: 3개 expander로 각 관계 컨텐츠 표시

**[ER-003] "경운 안내" 탭 선택**
WHEN 사용자가 "경운 안내" 탭을 선택하면, 시스템은 경운 질문과 상담 내용을 표시해야 한다.
- 이유: 경운 질문 기능을 사용자에게 제공하기 위해
- 검증: 질문/답변 형식 UI로 표시

**[ER-004] 데이터 로드 완료**
WHEN API 호출이 완료되면, 시스템은 모든 탭에 데이터를 채워야 한다.
- 이유: 초기 데이터 표시를 위해
- 검증: 첫 번째 탭에 데이터 정상 표시

### 4.3 State-Driven Requirements (상태 기반 요구사항)

**[SR-001] 빈 데이터 처리**
IF API 응답에 특정 필드가 없으면, 시스템은 해당 섹션을 건너뛰어야 한다.
- 이유: 빈 컨텐츠 표시 방지를 위해
- 검증: 필드 존재 확인 후 조건부 렌더링

**[SR-002] 긴 컨텐츠 처리**
IF 컨텐츠 길이가 500자를 초과하면, 시스템은 expander로 접기/펼치기 기능을 제공해야 한다.
- 이유: 긴 텍스트로 인한 스크롤 최소화를 위해
- 검증: st.expander() 사용

**[SR-003] 반응형 레이아웃**
IF 화면 너비가 768px 이하이면, 시스템은 1열 레이아웃으로 표시해야 한다.
- 이유: 모바일 사용자 경험을 위해
- 검증: st.columns()을 조건부로 사용

**[SR-004] 일간/월주/일진 탭 확장**
IF 일간 화월 또는 일간 연애 데이터가 존재하면, 시스템은 기존 컨텐츠 아래에 추가 섹션을 표시해야 한다.
- 이유: 기존 탭 구조 유지하면서 컨텐츠 추가를 위해
- 검증: 기존 컨텐츠 다음에 신규 섹션 렌더링

### 4.4 Unwanted Requirements (금지 사항)

**[WR-001] 빈 컨텐츠 표시 금지**
시스템은 빈 컨텐츠를 표시해서는 안 된다.
- 이유: 사용자 혼란 방지를 위해
- 위반 시: 빈 섹션으로 인한 UI 공간 낭비

**[WR-002] 레이아웃 깨짐 금지**
시스템은 레이아웃 깨짐을 허용해서는 안 된다.
- 이유: 사용자 경험 저하 방지를 위해
- 위반 시: 컨텐츠 겹침 또는 잘림

**[WR-003] API 호출 증가 금지**
시스템은 기존 API 호출 횟수를 증가시켜서는 안 된다.
- 이유: 성능 저하 방지를 위해
- 위반 시: 페이지 로딩 시간 증가

**[WR-004] 기존 기능 변경 금지**
시스템은 기존 6탭의 기존 컨텐츠를 변경해서는 안 된다.
- 이유: 회귀 방지를 위해
- 위반 시: 기존 사용자 경험 변경

### 4.5 Optional Requirements (선택 사항)

**[OR-001] 다크 모드 지원**
가능하면 시스템은 다크 모드를 지원해야 한다.
- 이유: 사용자 선호도 반영을 위해
- 우선순위: Low

**[OR-002] 컨텐츠 검색 기능**
가능하면 시스템은 컨텐츠 내 검색 기능을 제공해야 한다.
- 이유: 대용량 텍스트 탐색을 위해
- 우선순위: Low

**[OR-003] 컨텐츠 공유 기능**
가능하면 시스템은 컨텐츠를 공유할 수 있는 기능을 제공해야 한다.
- 이유: 소셜 미디어 공유를 위해
- 우선순위: Low

## 5. 명세 (Specification)

### 5.1 UI 구조

**8탭 구조:**

1. **"나의 정체성" (기존 확장)**
   - 기존: 일간 캐릭터, 격국 캐릭터, 용신 캐릭터
   - 추가: 신격 상화/설화, 신격 길흉, 상신 보완, 구신 기신
   - 레이아웃: 3열 카드 → 6개 expander로 변경

2. **"사주 기초" (기존 확장)**
   - 기존: 기본 사주 정보
   - 추가: 영격령 세부지표, 영격령 설명
   - 레이아웃: 2열 (기본 정보 | 영격령)

3. **"십이운성" (변경 없음)**
   - 기존 컨텐츠 유지

4. **"대운/세운" (변경 없음)**
   - 기존 컨텐츠 유지

5. **"육친/신살" (변경 없음)**
   - 기존 컨텐츠 유지

6. **"일간/월주/일진" (기존 확장)**
   - 기존: 일간/월주/일진 정보
   - 추가: 일간 화월, 일간 연애
   - 레이아웃: 기존 + 2개 expander

7. **"관계 분석" (신규)**
   - 합충 관계 (hapchung_content)
   - 베프 유형 (bestfriend_content)
   - 노소 유형 (old_young_content)
   - 레이아웃: 3개 expander

8. **"경운 안내" (신규)**
   - 경운 질문 (light_question_content)
   - 레이아웃: 질문/답변 형식 (채팅 UI 스타일)

### 5.2 컴포넌트 사양

**카드 컴포넌트:**
```python
def render_card(title: str, content: str, icon: str = None):
    """일관된 카드 스타일 렌더링"""
    with st.container():
        st.markdown(f"### {icon if icon else ''} {title}")
        st.markdown(content)
```

**Expander 컴포넌트:**
```python
def render_expander(title: str, content: str, expanded: bool = False):
    """긴 컨텐츠를 위한 expander"""
    with st.expander(title, expanded=expanded):
        st.markdown(content)
```

**반응형 컬럼:**
```python
def get_responsive_columns():
    """화면 너비에 따른 컬럼 수 반환"""
    if st.session_state.get('mobile', False):
        return 1
    return 2  # 또는 3
```

### 5.3 데이터 매핑

| API 필드 | 탭 | 섹션 | 컴포넌트 |
|---------|-----|------|---------|
| jisok | 사주 기초 | 영격령 | Info Box |
| joonghwa | 사주 기초 | 영격령 | Info Box |
| hwakjang | 사주 기초 | 영격령 | Info Box |
| sanghwa | 나의 정체성 | 신격 | Expander |
| sulhwa | 나의 정체성 | 신격 | Expander |
| shgj_gilhung_content | 나의 정체성 | 신격 | Expander |
| sangsin_compliment_content | 나의 정체성 | 상신 | Expander |
| gusin_gisin_content | 나의 정체성 | 구신 | Expander |
| jisok_content | 사주 기초 | 영격령 설명 | Expander |
| joonghwa_content | 사주 기초 | 영격령 설명 | Expander |
| hwakjang_content | 사주 기초 | 영격령 설명 | Expander |
| hapchung_content | 관계 분석 | 합충 관계 | Expander |
| ilgan_hw_content | 일간/월주/일진 | 화월 | Expander |
| ilgan_love_content | 일간/월주/일진 | 연애 | Expander |
| bestfriend_content | 관계 분석 | 베프 유형 | Expander |
| old_young_content | 관계 분석 | 노소 유형 | Expander |
| light_question_content | 경운 안내 | 경운 질문 | Chat Style |

## 6. 추적성 (Traceability)

### 6.1 관련 SPEC

- **SPEC-CONTENT-002** Phase 2: 영격령 세부지표, 신격 상화/설화, 신격 길흉 API 구현
- **SPEC-CONTENT-003** Phase 1: 상신/구신, 영격령 설명 API 구현
- **SPEC-CONTENT-003** Phase 2: 합충 관계, 일간 화월/연애, 베프 유형 API 구현
- **SPEC-CONTENT-003** Phase 3: 노소 유형, 경운 질문 API 구현

### 6.2 구현 의존성

- API 구현: 완료됨 (CONTENT-002, CONTENT-003)
- 데이터베이스: 완료됨
- UI 프레임워크: Streamlit 설치됨

### 6.3 테스트 커버리지

- 모든 21개 신규 필드에 대한 UI 컴포넌트 매핑
- 8개 탭 모두에 대한 렌더링 테스트
- 반응형 레이아웃 테스트
- 에러 처리 테스트
