# SPEC-UI-004: 격국 캐릭터 카드 + 나의 정체성 탭 3-컬럼 확장

## 메타데이터

| 항목 | 내용 |
|------|------|
| SPEC ID | SPEC-UI-004 |
| 제목 | 격국(格局) 캐릭터 카드 추가 및 나의 정체성 탭 3-컬럼 레이아웃 |
| 상태 | completed |
| 우선순위 | High |
| 관련 SPEC | SPEC-UI-003, SPEC-CORE-001, SPEC-API-001 |
| 작성일 | 2026-03-05 |
| 작성자 | jw |

---

## 환경 (Environment)

### 기술 스택

- Python 3.11 (uv 가상환경)
- Streamlit (기존 `streamlit_app.py` 확장)
- FastAPI 백엔드 (`app/services/` 확장)
- Pydantic v2 모델 (`core/models/`)
- `core/` 계산 엔진 (격국 계산 로직 추가)

### 데이터 파일

| 파일 | 항목 수 | 용도 |
|------|---------|------|
| `manse_ori/testResult/contents_ilgan.json` | 10개 | 일간 성격 카드 (기존) |
| `manse_ori/testResult/contents_yongsin.json` | 8개 | 용신 재능/진로 카드 (기존) |
| `manse_ori/testResult/contents_gyouk.json` | 10개 | 격국 캐릭터 카드 (신규) |

### 격국 JSON 구조 (`contents_gyouk.json`)

```json
{
  "contentsList": [
    {
      "title": "gyouk_1",
      "subtitle": "건록격",
      "titleDescription": "팩트폭력 평화비둘기",
      "tagZoryun": "#모범시민상 #롤모델이야",
      "tagAngry": "#너_아싸야 #악플러 #트라우마",
      "contents": "프로불편러...",
      "good": "뇌피셜 교수/정인격",
      "bad": "원리원칙주의자/정관격",
      "tagGunmu": "#헌신적 #자상함 #너_좀_챙겨",
      "contentsGunmu": "...",
      "tagDonggi": "#철저한_준비 #이제_날개를_달아보자",
      "contentsDonggi": "..."
    }
  ]
}
```

### 격국 subtitle → title 매핑 테이블

| subtitle (격국명) | title | gyouk_index |
|------------------|-------|-------------|
| 건록격 | gyouk_1 | 1 |
| 양인격 | gyouk_2 | 2 |
| 상관격 | gyouk_3 | 3 |
| 식신격 | gyouk_4 | 4 |
| 정인격 | gyouk_5 | 5 |
| 편인격 | gyouk_6 | 6 |
| 정재격 | gyouk_7 | 7 |
| 편재격 | gyouk_8 | 8 |
| 정관격 | gyouk_9 | 9 |
| 편관격 | gyouk_10 | 10 |

### 격국 계산 원리 (manse_ori 역공학 기반)

격국(格局)은 월지(月支)의 지장간 중 사령(司令) 천간의 육신으로 결정된다.

**월지별 격국 분류 (manse_ori/manse/chiguk/chiguk.js 기반):**

| 월지 유형 | 해당 월지 | 격국 결정 방식 |
|----------|---------|--------------|
| 생지(生支) | 인·신·사·해 | 지장간 중기 (m_jangan3) 육신 |
| 왕지(旺支) | 자·오·묘·유 | 월간 투간 여부에 따라 결정 |
| 고지(庫支) | 진·술·축·미 | 지장간 정기 육신 |

**육신 → 격국명 변환 규칙:**

| 월지 지장간 육신 | 격국명 |
|---------------|-------|
| 비견 | 건록격 |
| 겁재 | 양인격 |
| 편인 | 편인격 |
| 정인 | 정인격 |
| 편재 | 편재격 |
| 정재 | 정재격 |
| 식신 | 식신격 |
| 상관 | 상관격 |
| 정관 | 정관격 |
| 편관 | 편관격 |

---

## 가정 (Assumptions)

1. `contents_gyouk.json` 파일은 `manse_ori/testResult/` 경로에 위치하며 변경되지 않는다.
2. 격국 계산은 `SajuResult`의 기존 필드(월지, 지장간, 육신 목록)에서 파생 가능하다 (새 계산 엔진 없이도 구현 가능).
3. `render_tab_identity` 함수는 `streamlit_app.py` 내에서 독립적으로 수정 가능하다.
4. `ContentLoader` 클래스는 새 JSON 파일 경로를 추가 파라미터로 확장 가능하다.
5. 격국명 조회는 `subtitle` 필드를 키로 사용한다 (subtitle이 격국명과 정확히 일치).
6. 시간 정보가 없는 사주(시간 미상)에서도 격국 계산이 가능하다.

---

## 요구사항 (Requirements)

### R1: 격국 계산 모듈

**R1-1 (Ubiquitous)**
시스템은 항상 `SajuResult`의 기존 데이터(월지, 지장간, 육신 목록)로부터 격국명을 도출할 수 있어야 한다.

**R1-2 (Event-Driven)**
WHEN 사주 계산이 완료되고 `SajuResult`에 `yuksin_list`와 `jijanggan`이 포함되면 THEN 시스템은 격국명(str)을 반환할 수 있어야 한다.

**R1-3 (State-Driven)**
IF 월지가 생지(인·신·사·해)이면 THEN 지장간 중기(m_jangan3 = 정기)의 육신으로 격국을 결정한다.

**R1-4 (State-Driven)**
IF 월지가 왕지(자·오·묘·유)이면 THEN 투간 조건(wal_togan)에 따라 지장간 정기의 육신으로 격국을 결정한다.

**R1-5 (State-Driven)**
IF 월지가 고지(진·술·축·미)이면 THEN 지장간 정기(main)의 육신으로 격국을 결정한다.

**R1-6 (Unwanted)**
시스템은 격국 계산 실패 시 오류를 발생시키지 않아야 하며 `None`을 반환해야 한다.

### R2: ContentLoader 확장

**R2-1 (Ubiquitous)**
`ContentLoader` 클래스는 항상 `contents_gyouk.json`을 로드하고 격국명 기반 조회를 지원해야 한다.

**R2-2 (Event-Driven)**
WHEN `get_gyouk_content(gyouk_name: str)` 메서드가 호출되면 THEN 해당 격국명의 `contentsList` 항목 딕셔너리를 반환해야 한다.

**R2-3 (State-Driven)**
IF `contents_gyouk.json` 파일이 존재하지 않거나 파싱 오류가 발생하면 THEN 빈 딕셔너리 `{}`를 반환하고 경고 로그를 출력해야 한다.

**R2-4 (Ubiquitous)**
`ContentLoader`는 항상 기존 `get_ilgan_content`, `get_yongsin_content` 인터페이스를 유지해야 한다 (하위 호환성).

### R3: 나의 정체성 탭 UI 확장

**R3-1 (Ubiquitous)**
`render_tab_identity` 함수는 항상 3-컬럼 레이아웃(일간 카드 | 격국 카드 | 용신 카드)을 렌더링해야 한다.

**R3-2 (Event-Driven)**
WHEN 사주 계산 결과가 존재하면 THEN 격국 카드는 중간 컬럼(col2)에 표시되어야 한다.

**R3-3 (State-Driven)**
IF 격국명이 `contents_gyouk.json`에서 조회되면 THEN 카드는 다음을 표시해야 한다:
- 격국명 (subtitle 필드)
- 캐릭터 제목 (titleDescription 필드)
- 성격 설명 (contents 필드, 접기/펼치기 가능)
- 궁합 태그 (tagZoryun, tagAngry 필드)

**R3-4 (State-Driven)**
IF 격국명을 계산할 수 없거나 콘텐츠를 찾을 수 없으면 THEN "격국 정보를 불러올 수 없습니다." 안내 메시지를 표시해야 한다.

**R3-5 (Unwanted)**
시스템은 격국 카드 로딩 실패 시 다른 카드(일간, 용신) 표시를 방해해서는 안 된다.

**R3-6 (Ubiquitous)**
기존 2-컬럼 레이아웃(`col1`, `col2`)은 3-컬럼(`col1`, `col2`, `col3`)으로 마이그레이션되어야 한다.

---

## 명세 (Specifications)

### 데이터 흐름 다이어그램

```
SajuResult
  ├── month_pillar.ji  → 월지 (인/묘/.../축)
  ├── jijanggan["month"] → HiddenStems(initial, middle, main)
  └── yuksin_list → [YuksinItem(target, yuksin), ...]
         ↓
calc_gyouk(month_ji, jijanggan_month, yuksin_list)
         ↓
gyouk_name: str  (예: "식신격")
         ↓
ContentLoader.get_gyouk_content(gyouk_name)
         ↓
gyouk_item: dict[str, Any]  (titleDescription, contents, ...)
         ↓
render_tab_identity(result) → 3-컬럼 Streamlit UI
```

### 격국명 도출 로직 (Python 구현 명세)

```python
# app/services/content_loader.py 또는 core/ 내 신규 함수

WANGJI = {"자", "오", "묘", "유"}   # 왕지(旺支)
SAENGJI = {"인", "신", "사", "해"}  # 생지(生支)
GOJI = {"진", "술", "축", "미"}     # 고지(庫支)

YUKSIN_TO_GYOUK = {
    "비견": "건록격",
    "겁재": "양인격",
    "편인": "편인격",
    "정인": "정인격",
    "편재": "편재격",
    "정재": "정재격",
    "식신": "식신격",
    "상관": "상관격",
    "정관": "정관격",
    "편관": "편관격",
}

def calc_gyouk(
    month_ji: str,
    jijanggan_month: HiddenStems,
    yuksin_list: list[YuksinItem],
) -> str | None:
    """월지와 지장간 정기로부터 격국명을 반환한다."""
    # 月支 정기(正氣)의 육신 조회
    main_gan = jijanggan_month.main
    # yuksin_list에서 월지 정기에 해당하는 육신 조회
    for item in yuksin_list:
        if item.target == "월지":
            return YUKSIN_TO_GYOUK.get(item.yuksin)
    return None
```

**주의:** 실제 구현에서는 manse_ori chiguk.js의 생지/왕지/고지 분기 로직을 반영해야 한다. 단순 구현(월지 정기 육신)을 우선 적용하고, 복잡한 투간 조건은 이후 개선한다.

### `ContentLoader` 확장 명세

```python
# app/services/content_loader.py

_GYOUK_PATH = _BASE_DIR / "manse_ori" / "testResult" / "contents_gyouk.json"

class ContentLoader:
    def __init__(
        self,
        ilgan_path=None,
        yongsin_path=None,
        gyouk_path=None,  # 신규 파라미터
    ):
        self._gyouk_path = gyouk_path if gyouk_path is not None else _GYOUK_PATH
        self._gyouk_map = self._build_gyouk_map()

    def _build_gyouk_map(self) -> dict[str, dict[str, Any]]:
        """격국 JSON을 파싱하여 격국명(subtitle) -> 항목 딕셔너리를 구성한다."""
        raw = _load_json_file(self._gyouk_path, "격국")
        result = {}
        for item in raw.get("contentsList", []):
            subtitle = item.get("subtitle", "")
            if subtitle:
                result[subtitle] = item
        return result

    def get_gyouk_content(self, gyouk_name: str) -> dict[str, Any] | None:
        """격국명에 해당하는 콘텐츠 항목을 반환한다."""
        return self._gyouk_map.get(gyouk_name)
```

### Streamlit UI 명세 (`render_tab_identity` 수정)

```python
def render_tab_identity(result: dict[str, Any]) -> None:
    """Tab 6: 나의 정체성 - 일간 카드 | 격국 카드 | 용신 카드 (3-컬럼)."""
    st.subheader("나의 정체성 분석")

    # 일간(日干) 추출
    day_pillar = result.get("day_pillar", {})
    gan = day_pillar.get("gan", "") if isinstance(day_pillar, dict) else getattr(day_pillar, "gan", "")

    # 격국(格局) 계산
    gyouk_name = _calc_gyouk_from_result(result)

    # 용신(用神) 추출
    yongshin = ...  # 기존 로직 유지

    col1, col2, col3 = st.columns(3)  # 2컬럼 → 3컬럼

    with col1:
        # 일간 카드 (기존 col1 내용 유지)
        st.markdown("#### 나의 일간 (日干)")
        ...

    with col2:
        # 격국 카드 (신규)
        st.markdown("#### 나의 격국 (格局)")
        gyouk_content = get_gyouk_content(gyouk_name) if gyouk_name else None
        if gyouk_content:
            st.info(f"격국: {gyouk_name}")
            title_desc = gyouk_content.get("titleDescription", "")
            if title_desc:
                st.markdown(f"**{title_desc}**")
            tag_zoryun = gyouk_content.get("tagZoryun", "")
            if tag_zoryun:
                st.caption(f"베스트 조합: {tag_zoryun}")
            contents = gyouk_content.get("contents", "")
            if contents:
                with st.expander("성격 자세히 보기", expanded=True):
                    st.write(contents.replace("\\n", "\n"))
        else:
            st.info("격국 정보를 불러올 수 없습니다.")

    with col3:
        # 용신 카드 (기존 col2 내용 → col3으로 이동)
        st.markdown("#### 나의 용신 재능 (用神)")
        ...
```

### 신규 모듈 레벨 편의 함수

```python
# app/services/content_loader.py

def get_gyouk_content(gyouk_name: str) -> dict[str, Any] | None:
    """격국명에 해당하는 콘텐츠를 반환하는 편의 함수."""
    return _get_loader().get_gyouk_content(gyouk_name)
```

---

## 추적성 태그

- TAG: SPEC-UI-004
- 관련 파일: `streamlit_app.py`, `app/services/content_loader.py`, `manse_ori/testResult/contents_gyouk.json`
- 관련 테스트: `tests/test_content_loader.py`, `tests/test_streamlit_app.py` (신규)
