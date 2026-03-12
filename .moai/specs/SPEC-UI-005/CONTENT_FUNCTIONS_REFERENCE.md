# 신규 콘텐츠 로더 함수 레퍼런스

## SPEC-CONTENT-002 Phase 2 (신격 지표)

### 1. get_shgj_gilhung_content(gyouk_name: str, is_gil: bool)

```python
from app.services.content_loader import get_shgj_gilhung_content

# 신격 길흉 콘텐츠 로드
gyouk_name = "정관격"  # 격국명
is_gil = True          # 길격 여부
content = get_shgj_gilhung_content(gyouk_name, is_gil)

# 반환 구조
{
    "title": "신격 길흉 해석",
    "contentsList": [
        {
            "subtitle": "길격 특징",
            "contents": "내용..."
        }
    ]
}
```

**사용 위치**: Tab 6 > 신격 섹션 하단
**UI 패턴**: Expander "신격 길흉 상세 보기"

---

## SPEC-CONTENT-003 Phase 1 (영격령 및 보완)

### 2. get_sangsin_compliment_content(sangsin: str)

```python
from app.services.content_loader import get_sangsin_compliment_content

# 상신 보완 콘텐츠
sangsin = "겁재"  # 상신 천간
content = get_sangsin_compliment_content(sangsin)
```

**사용 위치**: Tab 6 > 상신 섹션 하단
**UI 패턴**: Expander "상신 보완 설명 보기"

### 3. get_gusin_gisin_content(gusin: str)

```python
from app.services.content_loader import get_gusin_gisin_content

# 구신 기신 콘텐츠
gusin = "식신"  # 구신 천간
content = get_gusin_gisin_content(gusin)
```

**사용 위치**: Tab 6 > 구신 섹션 하단
**UI 패턴**: Expander "구신 기신 설명 보기"

### 4. get_jisok_content(jisok: str)

```python
from app.services.content_loader import get_jisok_content

# 지속 상세 설명
jisok = "지속유"  # 지속 값
content = get_jisok_content(jisok)
```

**사용 위치**: Tab 6 > 영격령 섹션 > 지속 설명
**UI 패턴**: Expander "지속 설명 보기"

### 5. get_joonghwa_content(joonghwa: str)

```python
from app.services.content_loader import get_joonghwa_content

# 중화 상세 설명
joonghwa = "중화유"  # 중화 값
content = get_joonghwa_content(joonghwa)
```

**사용 위치**: Tab 6 > 영격령 섹션 > 중화 설명
**UI 패턴**: Expander "중화 설명 보기"

### 6. get_hwakjang_content(hwakjang: str)

```python
from app.services.content_loader import get_hwakjang_content

# 확장 상세 설명
hwakjang = "확장유"  # 확장 값
content = get_hwakjang_content(hwakjang)
```

**사용 위치**: Tab 6 > 영격령 섹션 > 확장 설명
**UI 패턴**: Expander "확장 설명 보기"

---

## SPEC-CONTENT-003 Phase 2 (관계 분석)

### 7. get_hapchung_content(hapchung_type: str)

```python
from app.services.content_loader import get_hapchung_content

# 합충 관계 콘텐츠
hapchung_type = "충"  # 충, 형, 해, 파, 육합, 삼합, 방합
content = get_hapchung_content(hapchung_type)
```

**사용 위치**: Tab 7 > 합충 관계
**데이터 소스**: `result.get("hapchung")[0]["relation_type"]`
**UI 패턴**: Expander "합충 관계 해석: {type}"

### 8. get_ilgan_hw_content(ilgan: str, month_ji: str)

```python
from app.services.content_loader import get_ilgan_hw_content

# 일간 화월 콘텐츠
ilgan = "갑"        # 일간 천간
month_ji = "인"    # 월지 지지
content = get_ilgan_hw_content(ilgan, month_ji)
```

**사용 위치**: Tab 7 > 일간 화월
**데이터 소스**: `day_pillar["gan"]`, `month_pillar["ji"]`
**UI 패턴**: Expander "일간 화월 관계 해석"

### 9. get_ilgan_love_content(ilgan: str)

```python
from app.services.content_loader import get_ilgan_love_content

# 일간 연애 콘텐츠
ilgan = "갑"  # 일간 천간
content = get_ilgan_love_content(ilgan)
```

**사용 위치**: Tab 7 > 일간 연애
**데이터 소스**: `day_pillar["gan"]`
**UI 패턴**: Expander "일간 연애 스타일 해석"

### 10. get_bestfriend_content(yuksin: str)

```python
from app.services.content_loader import get_bestfriend_content

# 베프 유형 콘텐츠
yuksin = "비견"  # 월지 십성
content = get_bestfriend_content(yuksin)
```

**사용 위치**: Tab 7 > 베프 유형
**데이터 소스**: `yuksin_list`에서 `target == "월지"`인 항목의 `yuksin`
**UI 패턴**: Expander "베프 유형: {yuksin}"

---

## SPEC-CONTENT-003 Phase 3 (경운 안내)

### 11. get_old_young_content(ilgan: str, month_ji: str)

```python
from app.services.content_loader import get_old_young_content

# 노소 유형 콘텐츠
ilgan = "갑"        # 일간 천간
month_ji = "인"    # 월지 지지
content = get_old_young_content(ilgan, month_ji)
```

**사용 위치**: Tab 8 > 노소 유형
**데이터 소스**: `day_pillar["gan"]`, `month_pillar["ji"]`
**UI 패턴**: Expander "노소 관계 유형 해석"

### 12. get_light_question_content(...)

```python
from app.services.content_loader import get_light_question_content

# 경운 질문 콘텐츠 (다중 파라미터)
content = get_light_question_content(
    question_id="q1",              # 질문 ID: "q1", "q7", "q8"
    gyouk_name="정관격",           # 격국명 (q1만 필요)
    sanghwa="sengYes",              # 상화 여부: "sengYes", "sengNo", None
    sulhwa="sulNo"                  # 설화 여부: "sulYes", "sulNo", None
)
```

**사용 위치**: Tab 8 > 경운 질문
**데이터 소스**:
- `gyouk_name`: `_calc_gyouk_from_result(result)`
- `sanghwa`, `sulhwa`: `shgj["sanghwa"]`, `shgj["sulhwa"]`

**질문 ID별 용도**:
- **q1**: 기본 경운 확인 (격국 기반)
- **q7**: 중재 경운 확인 (jungJe, 상화/설화 기반)
- **q8**: 식신 경운 확인 (siksin, 상화/설화 기반)

**UI 패턴**: 3개 개별 Expander
- "질문 1: 기본 경운 확인"
- "질문 7: 중재 경운 확인"
- "질문 8: 식신 경운 확인"

---

## 데이터 매핑 요약

### ShgjResult 필드

| 필드명 | 타입 | 설명 | UI 표시 |
|--------|------|------|---------|
| sangsin | str\|None | 상신 천간 | Metric + 상세 설명 |
| gusin | str\|None | 구신 천간 | Metric + 상세 설명 |
| gukgubun | str\|None | 국국분 | Metric |
| sanghwa | str\|None | 상화 관계 | Metric (신규) |
| sulhwa | str\|None | 설화 관계 | Metric (신규) |
| jisok | str\|None | 지속 | Metric + 상세 (신규) |
| joonghwa | str\|None | 중화 | Metric + 상세 (신규) |
| hwakjang | str\|None | 확장 | Metric + 상세 (신규) |
| gilhung | str\|None | 길흉 | 길흉 콘텐츠 로드에 사용 (신규) |

### API Response → UI 표시

```python
# 신격 핵심 지표 (6개)
shgj["sangsin"]     → st.metric("상신", value)
shgj["gusin"]       → st.metric("구신", value)
shgj["gukgubun"]    → st.metric("국국분", value)
shgj["sanghwa"]     → st.metric("상화", value)
shgj["sulhwa"]      → st.metric("설화", value)
shgj["gilhung"]     → st.metric("길흉", value)

# 영격령 지표 (3개)
shgj["jisok"]       → st.metric("지속", value) + expander
shgj["joonghwa"]    → st.metric("중화", value) + expander
shgj["hwakjang"]    → st.metric("확장", value) + expander

# 관계 분석 (Tab 7)
hapchung_list       → get_hapchung_content(relation_type)
day_pillar.gan      → get_ilgan_hw_content(ilgan, month_ji)
day_pillar.gan      → get_ilgan_love_content(ilgan)
yuksin_list         → get_bestfriend_content(month_ji_yuksin)

# 경운 안내 (Tab 8)
day_pillar.gan      → get_old_young_content(ilgan, month_ji)
month_pillar.ji     → (old_young 매개변수)
shgj["sanghwa"]     → get_light_question_content(..., sanghwa, ...)
shgj["sulhwa"]      → get_light_question_content(..., ..., sulhwa)
```

---

## 빈 데이터 처리 패턴

```python
# 안전한 데이터 접근
shgj = result.get("shgj")
if shgj is not None and not isinstance(shgj, dict):
    # Pydantic 모델인 경우 dict로 변환
    if hasattr(shgj, "model_dump"):
        shgj = shgj.model_dump()
    elif hasattr(shgj, "dict"):
        shgj = shgj.dict()

# 콘텐츠 로드 및 null 체크
content = get_sangsin_compliment_content(sangsin)
if content:
    # UI 렌더링
    with st.expander("상신 보완", expanded=False):
        # 콘텐츠 표시
else:
    st.info("상신 보완 데이터가 없습니다.")
```

---

## 함수 호출 순서 (render_tab_identity 예시)

```python
def render_tab_identity(result: dict[str, Any]) -> None:
    # 1. 기존 3-컬럼 (일간, 격국, 용신)

    # 2. 희신/희기신/연봉 (기존 expander 3개)

    # 3. 신격 섹션
    shgj = extract_shgj(result)  # Pydantic → dict 변환

    if shgj:
        # 3.1 핵심 지표 (6개 Metric)
        display_metrics(shgj)

        # 3.2 영격령 지표 (3개 Metric)
        display_yeonggengryeong(shgj)

        # 3.3 상신/구신 설명 + 보완
        sangsin = shgj.get("sangsin")
        display_sangsin(sangsin)
        display_sangsin_compliment(sangsin)  # 신규

        gusin = shgj.get("gusin")
        display_gusin(gusin)
        display_gusin_gisin(gusin)  # 신규

        # 3.4 영격령 설명 (3개)
        jisok = shgj.get("jisok")
        display_jisok(jisok)  # 신규

        joonghwa = shgj.get("joonghwa")
        display_joonghwa(joonghwa)  # 신규

        hwakjang = shgj.get("hwakjang")
        display_hwakjang(hwakjang)  # 신규

        # 3.5 신격 길흉
        gyouk_name = calc_gyouk(result)
        is_gil = determine_gilhung(shgj)
        display_shgj_gilhung(gyouk_name, is_gil)  # 신규
```

---

## 성능 최적화 팁

### 1. Lazy Loading
```python
# 필요한 시점에만 콘텐츠 로드
if st.session_state.get("show_shgj_detail", False):
    shgj_gilhung = get_shgj_gilhung_content(gyouk_name, is_gil)
```

### 2. 캐싱
```python
@st.cache_data(ttl=3600)
def load_shgj_gilhung(gyouk_name: str, is_gil: bool):
    return get_shgj_gilhung_content(gyouk_name, is_gil)
```

### 3. 조건부 렌더링
```python
# expander 확장 상태에 따라 콘텐츠 로드
if show_detail:
    content = get_content(param)
    render_expander(content)
```

---

## 에러 핸들링

```python
try:
    content = get_sangsin_compliment_content(sangsin)
    if content:
        render_content(content)
    else:
        st.info("콘텐츠를 찾을 수 없습니다.")
except FileNotFoundError:
    st.warning(f"{sangsin}에 대한 콘텐츠 파일이 없습니다.")
except Exception as e:
    st.error(f"콘텐츠 로드 중 오류 발생: {e}")
```

---

## 파일 경로 구조

```
resources/testResult/
├── contents_sangsin_compliment.json
├── contents_gusin_gisin.json
├── contents_jisok/
│   ├── contents_jisok유.json
│   ├── contents_joonghwa유.json
│   └── contents_hwakjang유.json
├── contents_hapchung/
│   ├── contents_충.json
│   ├── contents_형.json
│   └── ...
├── contents_ilgan_hw/
│   ├── 갑_인/
│   ├── 을_인/
│   └── ...
├── contents_ilgan_love/
│   ├── contents_갑.json
│   └── ...
├── contents_bestfriend/
│   ├── contents_비견.json
│   └── ...
├── contents_old_young/
│   ├── 갑_인/
│   └── ...
└── contents_light_question/
    ├── q1/
    ├── q7/
    │   ├── sengYes_sulNo/
    │   └── ...
    └── q8/
```

---

**버전**: SPEC-UI-005 v1.0
**최종 업데이트**: 2026-03-12
**유지보수**: MoAI expert-frontend
