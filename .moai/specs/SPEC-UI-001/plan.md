---
id: SPEC-UI-001
document: plan
version: 1.0.0
---

# SPEC-UI-001 구현 계획

## 1. 접근 방식

### 1.1 기본 전략

기존 `streamlit_app.py`를 전면 재작성한다. 현재 코드는 단일 `main()` 함수에 입력과 출력이 혼재되어 있어, 신규 기능을 추가할수록 유지보수가 어려워진다. 재작성 시 다음 원칙을 적용한다:

- **함수 분리**: 각 탭과 사이드바를 독립된 렌더링 함수로 분리
- **단일 API 호출**: 계산 버튼 클릭 시 1회만 API를 호출하고 결과를 `st.session_state`에 캐시
- **방어적 데이터 접근**: `.get()` 패턴으로 누락 필드를 안전하게 처리
- **의존성 최소화**: Plotly는 오행 차트에만 사용. 그 외 모든 컴포넌트는 Streamlit 네이티브

### 1.2 구현 전제 조건

SPEC-CALC-001 구현 완료 후 API 응답 구조를 확인하고 구현을 시작한다. 그 전에는 목업(mock) 응답 데이터를 기반으로 UI 구조만 먼저 구현할 수 있다.

### 1.3 파일 구조

변경 대상 파일은 단 1개이다:

```
streamlit_app.py    # 전면 재작성 (현재 179줄 → 약 400~500줄 예상)
```

`pyproject.toml`에 plotly 의존성 추가가 필요한 경우:

```
uv add plotly
```

---

## 2. 구현 계획 (마일스톤)

### 1차 목표: 핵심 구조 확립

**작업 1: 코드 구조 설계**

현재 `streamlit_app.py`의 단일 `main()` 함수를 다음 함수들로 분리한다:

```python
def render_sidebar() -> dict | None:
    """사이드바 입력 폼을 렌더링하고 입력값 딕셔너리를 반환."""
    # 달력 타입, 생년월일, 시각, 성별 입력
    # 계산 버튼 처리
    # 반환: 입력값 딕셔너리 또는 None (버튼 미클릭 시)

def safe_api_call(payload: dict) -> dict | None:
    """API 호출 래퍼. 오류 시 st.error 표시 후 None 반환."""

def render_tab_wonkuk(result: dict) -> None:
    """Tab 1: 사주 원국 탭 렌더링."""

def render_tab_yuksin(result: dict) -> None:
    """Tab 2: 십성 분석 탭 렌더링."""

def render_tab_luck(result: dict) -> None:
    """Tab 3: 운의 흐름 탭 렌더링."""

def render_tab_detail(result: dict) -> None:
    """Tab 4: 세부 지표 탭 렌더링."""

def main() -> None:
    """앱 진입점. 사이드바 → API 호출 → 탭 렌더링 조율."""
```

**작업 2: 사이드바 및 API 호출 개선**

- 시각 미상 처리: 체크박스 체크 → 슬라이더 비활성화 + `birth_hour=None`
- 음력 선택 시만 윤달 체크박스 표시 (기존 로직 유지·개선)
- 성별 라디오: "남성" / "여성" 2개로 단순화
- `st.session_state`로 계산 결과 캐시 (페이지 리렌더링 시 재계산 방지)
- `safe_api_call()`: requests 예외를 구분 처리 (timeout, HTTPError 400, HTTPError 500)

**작업 3: Tab 1 — 사주 원국 구현**

4기둥 카드 레이아웃:

```python
# 4열 레이아웃으로 년주·월주·일주·시주를 나란히 표시
col1, col2, col3, col4 = st.columns(4)
pillar_labels = ["年柱", "月柱", "日柱", "時柱"]
pillar_meanings = ["조상·어린시절", "부모·직업환경", "나·배우자", "자녀·말년"]
pillar_keys = ["year_pillar", "month_pillar", "day_pillar", "hour_pillar"]
```

각 카드에:
- 기둥 레이블 (年柱 등) — `st.subheader`
- 천간 (큰 글씨) — `st.metric` 또는 마크다운 큰 폰트
- 지지 (큰 글씨) — 같은 방식
- 상징 의미 — `st.caption`

기본 정보 섹션:
- 절입일, 대운 방향, 대운수를 `st.info` 박스로 표시

### 2차 목표: 분석 탭 구현

**작업 4: Tab 2 — 십성 분석 구현**

```python
# 십성 그룹 정의
YUKSIN_GROUPS = {
    "비겁 (비견·겁재)": {"설명": "형제·동료·경쟁", "십성": ["비견", "겁재"]},
    "식상 (식신·상관)": {"설명": "표현·창의·배설", "십성": ["식신", "상관"]},
    "재성 (편재·정재)": {"설명": "돈·여자·아버지", "십성": ["편재", "정재"]},
    "관성 (편관·정관)": {"설명": "명예·직업·남자", "십성": ["편관", "정관"]},
    "인성 (편인·정인)": {"설명": "학문·어머니·보호", "십성": ["편인", "정인"]},
}
```

테이블은 `st.dataframe`으로 렌더링. 각 행에 위치, 간지, 십성명, 그룹 표시.
5그룹 설명은 `st.expander`로 접을 수 있게 구현.

**작업 5: Tab 3 — 운의 흐름 구현**

현재 나이 계산 (대략):

```python
from datetime import date
current_year = date.today().year
birth_year = result["solar_date"]["year"]  # 또는 입력값 사용
current_age = current_year - birth_year
```

현재 대운 강조: 조건부 컬럼 추가 또는 `st.dataframe`의 `highlight_max` 활용.
세운 테이블: 현재 연도 행 강조.

요약 카드: `st.metric` 3개를 나란히 배치 — 현재 대운간지, 현재 세운간지, 대운 시작 나이.

### 3차 목표: 세부 지표 및 차트 구현

**작업 6: Tab 4 — 세부 지표 구현**

지장간 테이블:

```python
# 4지지 각각의 여기·중기·정기를 4행 3열 테이블로
jijanggan_data = []
for pillar_key, label in zip(pillar_keys, pillar_labels):
    jjg = result.get("jijanggan", {}).get(pillar_key, {})
    jijanggan_data.append({
        "기둥": label,
        "여기(餘氣)": jjg.get("yeogi", "-"),
        "중기(中氣)": jjg.get("junggi", "-"),
        "정기(正氣)": jjg.get("jeonggi", "-"),
    })
```

신살 테이블: `result.get("shinsal", [])` 가 빈 리스트이면 안내 메시지.

오행 차트 (Plotly):

```python
import plotly.graph_objects as go

ohang = result.get("ohang_ratio", {})
ohang_labels = ["목(木)", "화(火)", "토(土)", "금(金)", "수(水)"]
ohang_keys = ["wood", "fire", "earth", "metal", "water"]
values = [ohang.get(k, 0) for k in ohang_keys]

fig = go.Figure(go.Bar(x=ohang_labels, y=values, text=values, texttemplate="%{text:.1f}%"))
fig.update_layout(title="오행 분포", yaxis_title="%", height=300)
st.plotly_chart(fig, use_container_width=True)
```

### 선택 목표: 개선사항

- 최강/최약 오행 텍스트 요약 (REQ-UI-046)
- 십성 카드 클릭 상세 설명 (REQ-UI-024 — `st.expander` 활용)
- 페이지 레이아웃 `wide` 모드 전환 검토

---

## 3. 기술 접근

### 3.1 세션 상태 관리

```python
# 계산 결과를 session_state에 저장하여 리렌더링 시 재계산 방지
if "saju_result" not in st.session_state:
    st.session_state["saju_result"] = None

if calculate_clicked:
    with st.spinner("계산 중..."):
        result = safe_api_call(payload)
    if result:
        st.session_state["saju_result"] = result

if st.session_state["saju_result"]:
    # 탭 렌더링
    ...
```

### 3.2 방어적 데이터 접근 패턴

```python
def get_nested(data: dict, *keys, default="-"):
    """중첩 딕셔너리에서 안전하게 값 추출."""
    for key in keys:
        if not isinstance(data, dict):
            return default
        data = data.get(key, default)
        if data == default:
            return default
    return data
```

### 3.3 오류 처리

```python
def safe_api_call(payload: dict) -> dict | None:
    try:
        response = requests.post(f"{API_BASE_URL}/api/v1/saju", json=payload, timeout=10)
        if response.status_code == 400:
            st.error("입력값이 올바르지 않습니다. 생년월일과 시각을 확인하세요.")
            return None
        if response.status_code == 500:
            st.error("서버 오류가 발생했습니다. 잠시 후 다시 시도하거나 관리자에게 문의하세요.")
            return None
        response.raise_for_status()
        return response.json()
    except requests.Timeout:
        st.error("요청 시간이 초과되었습니다. 네트워크를 확인하고 다시 시도하세요.")
        return None
    except requests.ConnectionError:
        st.error("API 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요.")
        return None
    except Exception:
        st.error("알 수 없는 오류가 발생했습니다.")
        return None
```

### 3.4 기술 스택 결정

| 항목          | 선택         | 근거                                  |
|--------------|-------------|--------------------------------------|
| 차트          | Plotly       | Streamlit과 통합 용이, 네이티브 `plotly_chart` 지원 |
| 테이블        | st.dataframe | 정렬·필터 내장, 넓은 데이터 지원         |
| 상태 관리     | st.session_state | 페이지 리렌더링 간 데이터 유지         |
| 레이아웃      | st.columns   | 반응형 컬럼 분할, 추가 의존성 없음       |

---

## 4. 위험 및 대응

| 위험 요인                          | 발생 가능성 | 대응 방안                                          |
|----------------------------------|-----------|--------------------------------------------------|
| SPEC-CALC-001 API 응답 구조 변경    | 높음      | `.get()` 패턴 전면 적용, 필드 누락 시 기본값 "-" 표시 |
| Plotly 미설치 환경에서 import 오류   | 낮음      | `try/except ImportError`로 차트 대신 텍스트 표 대체 |
| 시주 미상 시 십성/십이운성 키 없음    | 중간      | `hour_pillar is None` 조건으로 사전 분기            |
| 세운 데이터 형태 불일치              | 중간      | 빈 리스트 방어 처리 + 안내 메시지                    |
