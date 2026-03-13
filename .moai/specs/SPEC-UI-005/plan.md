# SPEC-UI-005: 구현 계획 (Implementation Plan)

**TAG BLOCK**
```
TAG: SPEC-UI-005
PHASE: Plan
DOMAIN: UI (User Interface)
RELATED: spec.md, acceptance.md
```

## 1. 이정표 (Milestones)

### Priority 1: 기존 탭 확장 (Primary Goal)

**목표:** 기존 6탭에 신규 컨텐츠 추가하여 기능 완성

**작업 항목:**
1. "나의 정체성" 탭 확장
   - 신격 상화/설화 섹션 추가
   - 신격 길흉 섹션 추가
   - 상신 보완 섹션 추가
   - 구신 기신 섹션 추가
   - 3열 카드 → 6개 expander로 구조 변경

2. "사주 기초" 탭 확장
   - 영격령 세부지표 섹션 추가 (jisok, joonghwa, hwakjang)
   - 영격령 설명 섹션 추가 (jisok_content, joonghwa_content, hwakjang_content)

3. "일간/월주/일진" 탭 확장
   - 일간 화월 섹션 추가 (ilgan_hw_content)
   - 일간 연애 섹션 추가 (ilgan_love_content)

**완료 기준:**
- 14개 신규 필드가 UI에 표시됨
- 기존 컨텐츠는 변경되지 않음
- 레이아웃 깨짐 없음

### Priority 2: 신규 탭 추가 (Secondary Goal)

**목표:** 2개의 신규 탭 생성하여 카테고리화된 컨텐츠 제공

**작업 항목:**
1. "관계 분석" 탭 생성
   - 합충 관계 섹션 (hapchung_content)
   - 베프 유형 섹션 (bestfriend_content)
   - 노소 유형 섹션 (old_young_content)
   - 3개 expander 구조

2. "경운 안내" 탭 생성
   - 경운 질문 섹션 (light_question_content)
   - 질문/답변 형식 UI (채팅 스타일)

**완료 기준:**
- 2개 신규 탭이 생성됨
- 4개 신규 필드가 UI에 표시됨
- 탭 전환 시 정상 렌더링

### Priority 3: UI 개선 (Final Goal)

**목표:** 반응형 레이아웃과 사용자 경험 개선

**작업 항목:**
1. 반응형 레이아웃 구현
   - 데스크탑: 2-3열 레이아웃
   - 모바일: 1열 레이아웃
   - 화면 너비 감지 로직

2. 로딩 상태 개선
   - st.spinner() 추가
   - 탭 전환 로딩 인디케이터

3. 에러 처리 개선
   - API 호출 실패 시 사용자 친화적 메시지
   - 빈 데이터 처리 개선

4. 스타일 일관성
   - 색상 테마 통일
   - 폰트 크기/스타일 통일
   - 간격(padding/margin) 통일

**완료 기준:**
- 데스크탑/모바일 모두 정상 표시
- 로딩/에러 상태가 명확히 표시됨
- 모든 UI 컴포넌트에 일관된 스타일 적용

## 2. 기술 접근 방법 (Technical Approach)

### 2.1 Streamlit 컴포넌트 구조

**기존 구조 분석:**
```python
# streamlit_app.py (기존)
def main():
    st.title("사주 분석")
    data = analyze_saju()  # 단일 API 호출

    tabs = st.tabs([
        "나의 정체성", "사주 기초", "십이운성",
        "대운/세운", "육친/신살", "일간/월주/일진"
    ])

    with tabs[0]:
        # 나의 정체성 컨텐츠
    # ... 나머지 탭
```

**확장 구조:**
```python
# streamlit_app.py (확장)
def main():
    st.title("사주 분석")
    data = analyze_saju()  # 기존과 동일

    tabs = st.tabs([
        "나의 정체성", "사주 기초", "십이운성",
        "대운/세운", "육친/신살", "일간/월주/일진",
        "관계 분석", "경운 안내"  # 2개 신규 탭
    ])

    with tabs[0]:
        render_identity_tab(data)  # 함수로 분리
    with tabs[1]:
        render_basic_tab(data)  # 함수로 분리
    # ... 나머지 탭
```

### 2.2 API 호출 확장

**변경 사항:**
- API 호출 방식: 변경 없음 (단일 호출 유지)
- 응답 데이터 구조: 변경 없음
- 데이터 처리: 조건부 렌더링 추가

**구현 패턴:**
```python
def render_section_if_exists(data, field, title, renderer):
    """필드 존재 시 섹션 렌더링"""
    if field in data and data[field]:
        renderer(title, data[field])
```

### 2.3 레이아웃 설계

**데스크탑 레이아웃 (2-3열):**
```python
def render_desktop_layout():
    col1, col2, col3 = st.columns(3)
    with col1:
        # 컨텐츠 1
    with col2:
        # 컨텐츠 2
    with col3:
        # 컨텐츠 3
```

**모바일 레이아웃 (1열):**
```python
def render_mobile_layout():
    # 단일 열 컨텐츠
    st.markdown(content)
```

**반응형 구현:**
```python
def get_layout_columns():
    """화면 너비에 따른 컬럼 수 반환"""
    # Streamlit은 화면 너비 직접 감지 불가
    # CSS 미디어 쿼리 또는 사용자 설정 활용
    use_mobile = st.session_state.get('mobile_mode', False)
    return st.columns(1) if use_mobile else st.columns(3)
```

### 2.4 컴포넌트 재사용성

**공통 컴포넌트 추출:**
```python
# ui_components.py (선택 사항)

def render_info_box(title: str, content: str, icon: str = "ℹ️"):
    """정보 박스 렌더링"""
    st.info(f"{icon} **{title}**\n\n{content}")

def render_expander(title: str, content: str, expanded: bool = False):
    """Expander 렌더링"""
    with st.expander(title, expanded=expanded):
        st.markdown(content)

def render_card(title: str, content: str, icon: str = None):
    """카드 렌더링"""
    with st.container():
        st.markdown(f"### {icon if icon else ''} {title}")
        st.markdown(content)
```

## 3. 아키텍처 (Architecture)

### 3.1 8탭 구조 다이어그램

```
┌─────────────────────────────────────────────────────┐
│                  Streamlit App                       │
│  ┌───────────────────────────────────────────────┐  │
│  │           Tab Navigation (8 tabs)             │  │
│  └───────────────────────────────────────────────┘  │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │                                             │    │
│  │  Selected Tab Content                       │    │
│  │  - Desktop: 2-3 columns                     │    │
│  │  - Mobile: 1 column                         │    │
│  │                                             │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐       │    │
│  │  │ Section │ │ Section │ │ Section │       │    │
│  │  │   1     │ │   2     │ │   3     │       │    │
│  │  └─────────┘ └─────────┘ └─────────┘       │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │     API Response (Single Call)              │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### 3.2 컴포넌트 계층 구조

```
streamlit_app.py
├── main()
│   ├── analyze_saju()  # API 호출 (기존)
│   └── st.tabs([8 tabs])
│       ├── tabs[0]: "나의 정체성"
│       │   └── render_identity_tab(data)
│       │       ├── render_ilgan_character()  # 기존
│       │       ├── render_jeokguk_character()  # 기존
│       │       ├── render_yongsin_character()  # 기존
│       │       ├── render_singhwa_sulhwa()  # 신규
│       │       ├── render_gilhung()  # 신규
│       │       ├── render_sangsin()  # 신규
│       │       └── render_gusin()  # 신규
│       │
│       ├── tabs[1]: "사주 기초"
│       │   └── render_basic_tab(data)
│       │       ├── render_basic_info()  # 기존
│       │       ├── render_youngmyeong_detail()  # 신규
│       │       └── render_youngmyeong_description()  # 신규
│       │
│       ├── tabs[2]: "십이운성"  # 기존 (변경 없음)
│       ├── tabs[3]: "대운/세운"  # 기존 (변경 없음)
│       ├── tabs[4]: "육친/신살"  # 기존 (변경 없음)
│       │
│       ├── tabs[5]: "일간/월주/일진"
│       │   └── render_ilgan_tab(data)
│       │       ├── render_ilgan_basic()  # 기존
│       │       ├── render_hwawol()  # 신규
│       │       └── render_ilgan_love()  # 신규
│       │
│       ├── tabs[6]: "관계 분석"  # 신규
│       │   └── render_relationship_tab(data)
│       │       ├── render_hapchung()  # 신규
│       │       ├── render_bestfriend()  # 신규
│       │       └── render_old_young()  # 신규
│       │
│       └── tabs[7]: "경운 안내"  # 신규
│           └── render_gyeongun_tab(data)
│               └── render_light_question()  # 신규
```

### 3.3 데이터 흐름

```
User Request
    ↓
streamlit_app.py: main()
    ↓
analyze_saju()  # API 호출
    ↓
API Response (JSON)
    ├── Existing fields
    └── New fields (21개)
    ↓
Tab Selection
    ↓
render_tab_functions(data)
    ├── Conditional rendering
    └── Component reuse
    ↓
UI Display
    ├── Desktop layout
    └── Mobile layout
```

## 4. 위험 완화 (Risk Mitigation)

### 4.1 기술적 위험

**위험 1: 기존 기능 회귀**
- 영향: 중간 (Medium)
- 확률: 낮음 (Low)
- 완화 전략:
  - 기존 6탭 코드는 복사 후 신규 컨텐츠만 추가
  - 기존 컨텐츠는 주석 처리하지 않고 그대로 유지
  - 테스트: 기존 기능 수동 테스트 후 신규 기능 추가

**위험 2: 레이아웃 깨짐**
- 영향: 높음 (High)
- 확률: 중간 (Medium)
- 완화 전략:
  - expander 사용으로 긴 컨텐츠 처리
  - 조건부 렌더링으로 빈 컨텐츠 처리
  - 다양한 화면 크기에서 테스트

**위험 3: 성능 저하**
- 영향: 중간 (Medium)
- 확률: 낮음 (Low)
- 완화 전략:
  - API 호출 횟수 유지 (단일 호출)
  - st.cache_data()로 데이터 캐싱
  - 불필요한 재렌더링 방지

### 4.2 사용자 경험 위험

**위험 4: 탭 너무 많음**
- 영향: 중간 (Medium)
- 확률: 중간 (Medium)
- 완화 전략:
  - 탭 순서 최적화 (자주 사용하는 탭 앞에 배치)
  - 탭 이름 명확성 유지
  - 사용자 피드백 수집

**위험 5: 모바일 경험 저하**
- 영향: 높음 (High)
- 확률: 중간 (Medium)
- 완화 전략:
  - 1열 레이아웃으로 강제
  - 폰트 크기 조정
  - 모바일에서 테스트

### 4.3 데이터 무결성 위험

**위험 6: API 필드 누락**
- 영향: 높음 (High)
- 확률: 낮음 (Low)
- 완화 전략:
  - 조건부 렌더링으로 안전하게 처리
  - 누락 필드 로깅
  - 에러 메시지 사용자 친화적 표시

## 5. 영향 범위 (Impact Scope)

### 5.1 수정 파일

**주요 수정:**
- `streamlit_app.py`
  - 예상 추가 라인: 300-500 라인
  - 변경 영역: main() 함수, 탭 렌더링 함수
  - 호환성: 기존 기능 유지

**선택적 추가 (코드량이 많을 경우):**
- `ui_components.py` (신규 파일)
  - 용도: 공통 UI 컴포넌트 추출
  - 크기: 100-200 라인 예상
  - 장점: 코드 재사용성, 유지보수성 개선

### 5.2 비영향 파일

- API 구현 파일 (이미 완료됨)
- 데이터베이스 스키마 (변경 없음)
- 기타 유틸리티 파일

### 5.3 의존성 관계

**선행 조건:**
- SPEC-CONTENT-002 완료 (완료됨)
- SPEC-CONTENT-003 완료 (완료됨)

**후행 작업:**
- 사용자 매뉴얼 업데이트
- 스크린샷 업데이트
- 배포

## 6. 성공 지표 (Success Metrics)

### 6.1 기능 완료

- [ ] 21개 신규 필드가 모두 UI에 표시됨
- [ ] 8개 탭이 모두 정상 작동함
- [ ] 빈 데이터 처리가 정상 동작함

### 6.2 품질 기준

- [ ] 기존 기능 회귀 없음
- [ ] 레이아웃 깨짐 없음
- [ ] 로딩 시간 3초 이내
- [ ] 모바일/데스크탑 모두 정상 표시

### 6.3 사용자 경험

- [ ] 일관된 스타일 적용
- [ ] 로딩/에러 상태 명확히 표시
- [ ] 탭 전환流畅 (500ms 이내)

## 7. 다음 단계 (Next Steps)

1. expert-frontend 에이전트에게 구현 위임
2. 기존 코드 분석 및 구현 시작
3. Phase 1: 기존 탭 확장 구현
4. Phase 2: 신규 탭 추가 구현
5. Phase 3: UI 개선 및 최적화
6. 테스트 및 검증
7. 배포
