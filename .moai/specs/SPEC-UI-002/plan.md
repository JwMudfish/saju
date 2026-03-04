---
id: SPEC-UI-002
type: plan
version: 1.0.0
status: planned
created: 2026-03-04
updated: 2026-03-04
---

# SPEC-UI-002 구현 계획: 합충형해파 Streamlit UI 표시

## 연관 SPEC

- **SPEC-UI-002**: 합충형해파 Streamlit UI 표시 (현재)
- **SPEC-CALC-002**: 합충형해파 계산 백엔드 (완료, 의존)
- **SPEC-UI-001**: Streamlit UI 기반 구조 (완료, 의존)

## 구현 단계

### 1단계: 기존 코드 분석 (Primary Goal)

**목표**: `streamlit_app.py`의 `render_tab_detail()` 함수 구조 파악

**작업 내용**:
- `render_tab_detail()` 함수 시그니처 및 파라미터 확인
- 기존 섹션 순서 파악 (지장간 → 십이운성 → 신살 → 오행)
- `HapchungRelation` 모델 필드 재확인 (`core/models/domain.py`)
- `SajuResult.hapchung` 접근 패턴 확인

**검증 기준**:
- `render_tab_detail()` 함수가 `result` 파라미터를 받는지 확인
- `result.hapchung`이 `list[HapchungRelation]` 타입인지 확인

---

### 2단계: 합충형해파 섹션 구현 (Primary Goal)

**목표**: `render_tab_detail()` 함수에 합충형해파 섹션 추가

**작업 내용**:

```python
# render_tab_detail() 내 오행 섹션 이후에 추가
def _render_hapchung_section(hapchung_list):
    """합충형해파 섹션 렌더링"""
    st.subheader("합충형해파 (合沖刑害破)")

    if not hapchung_list:
        st.info("기둥 간 특별한 관계가 없습니다.")
        return

    # DataFrame 변환
    rows = []
    for rel in hapchung_list:
        subtype_display = f" ({rel.subtype})" if rel.subtype else ""
        rows.append({
            "기둥1": rel.pillar1,
            "지지1": rel.ji1,
            "기둥2": rel.pillar2,
            "지지2": rel.ji2,
            "관계": rel.relation_type,
            "세부유형": rel.subtype or "",
        })

    df = pd.DataFrame(rows)

    # 충 관계 행 색상 강조 (pandas Styler)
    def highlight_chung(row):
        if row["관계"] == "충":
            return ["background-color: #ffe0e0"] * len(row)
        return [""] * len(row)

    styled_df = df.style.apply(highlight_chung, axis=1)
    st.dataframe(styled_df, use_container_width=True)
```

**삽입 위치**: 오행(五行) 섹션 렌더링 코드 이후

---

### 3단계: 용어 설명 expander 추가 (Secondary Goal)

**목표**: R-005 선택적 요구사항 구현

**작업 내용**:

```python
with st.expander("합충형해파 용어 설명", expanded=False):
    st.markdown("""
    - **충(沖)**: 지지 간 정면 충돌로 가장 강한 갈등 관계
    - **형(刑)**: 억압과 처벌의 관계, 세부유형에 따라 강도가 다름
    - **해(害)**: 서로 해를 끼치는 은근한 갈등 관계
    - **파(破)**: 서로 깨지는 관계로 합을 방해함
    - **육합(六合)**: 음양이 만나 합하는 안정적 관계
    - **삼합(三合)**: 세 지지가 합하여 강한 오행 에너지 형성
    - **방합(方合)**: 같은 방위 지지가 합하는 관계
    """)
```

---

### 4단계: 빈 상태 및 엣지케이스 처리 (Primary Goal)

**목표**: R-003 요구사항 구현 및 예외 처리

**작업 내용**:
- `hapchung` 리스트가 `None`인 경우 방어 처리
- `hapchung` 리스트가 빈 리스트인 경우 안내 메시지 표시
- `subtype`이 `None` 또는 빈 문자열인 경우 처리

**방어 코드**:
```python
hapchung_list = getattr(result, "hapchung", []) or []
```

---

### 5단계: 테스트 작성 (Secondary Goal)

**목표**: 새 UI 로직의 단위 테스트 작성

**테스트 대상**:
- `_render_hapchung_section()` 함수 (별도 분리 시)
- DataFrame 변환 로직
- 색상 강조 로직

**테스트 방법**:
- `unittest.mock`으로 Streamlit 함수 모킹
- 또는 비즈니스 로직만 분리하여 순수 Python 테스트
- `pytest`로 실행: `uv run pytest tests/ -q --no-cov`

**테스트 시나리오**:
1. 합충 관계가 있는 결과 → 테이블 표시 확인
2. 관계가 없는 결과 → 안내 메시지 확인
3. 충 관계 포함 시 → 색상 강조 적용 확인
4. 형 + 세부유형 있는 경우 → 세부유형 표시 확인

---

### 6단계: 통합 검증 (Final Goal)

**목표**: 실제 Streamlit 앱에서 동작 확인

**검증 절차**:
1. `uv run streamlit run streamlit_app.py` 실행
2. 사주 계산 수행
3. "세부 지표" 탭 클릭
4. 합충형해파 섹션 확인
5. 충 관계 행 붉은색 강조 확인
6. 빈 결과 케이스 확인 (해당되는 경우)

---

## 기술 스택

| 항목 | 상세 |
|------|------|
| Python | 3.11 (uv 가상환경) |
| Streamlit | 프로젝트 기존 설치 버전 |
| pandas | 프로젝트 기존 설치 버전 (Styler 활용) |
| pytest | `uv run pytest` |

## 위험 요소 및 대응

| 위험 요소 | 가능성 | 대응 방안 |
|-----------|--------|-----------|
| `render_tab_detail()` 시그니처 변경 | 낮음 | 1단계에서 사전 확인 후 구현 |
| pandas Styler + st.dataframe 호환성 | 중간 | `st.table()`로 폴백 또는 마크다운 테이블 사용 |
| `hapchung` 필드가 `None`인 케이스 | 낮음 | `getattr + or []` 방어 처리 |
| Streamlit 버전별 API 차이 | 낮음 | `use_container_width` 파라미터 확인 |

## 구현 우선순위

1. **필수**: R-001, R-002, R-003 (항상 적용, 이벤트 기반, 비원하는 동작)
2. **권장**: R-004 (충 관계 색상 강조)
3. **선택**: R-005 (용어 설명 expander)

## 변경 파일 목록

| 파일 | 변경 유형 | 설명 |
|------|-----------|------|
| `streamlit_app.py` | 수정 | `render_tab_detail()`에 합충형해파 섹션 추가 |
| `tests/test_streamlit_hapchung.py` | 신규 (선택) | UI 로직 단위 테스트 |
