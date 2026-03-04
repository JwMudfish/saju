# SPEC-UI-003: 일간 캐릭터 카드 + 용신 재능 해설 UI

## 메타데이터

| 항목 | 내용 |
|------|------|
| SPEC ID | SPEC-UI-003 |
| 제목 | 일간 캐릭터 카드 + 용신 재능 해설 Streamlit UI |
| 상태 | completed |
| 우선순위 | High |
| 관련 SPEC | SPEC-UI-001, SPEC-UI-002, SPEC-API-001 |

---

## 환경 (Environment)

### 기술 스택

- Python 3.11 (uv 가상환경)
- Streamlit (기존 `streamlit_app.py` 확장)
- FastAPI 백엔드 (`app/services/saju_service.py` 확장)
- Pydantic v2 모델 (`core/models/`)

### 데이터 파일

| 파일 | 항목 수 | 용도 |
|------|---------|------|
| `manse_ori/testResult/contents_ilgan.json` | 10개 (갑목 ~ 계수) | 일간 성격 카드 |
| `manse_ori/testResult/contents_yongsin.json` | 8개 (甲乙丙丁庚辛壬癸) | 용신 재능/진로 카드 |

### 일간 매핑 테이블

| 일간(gan) | ilgan 필드 값 | JSON title |
|-----------|--------------|------------|
| 갑 | 갑목일간 | ilgan_1 |
| 을 | 을목일간 | ilgan_2 |
| 병 | 병화일간 | ilgan_3 |
| 정 | 정화일간 | ilgan_4 |
| 무 | 무토일간 | ilgan_5 |
| 기 | 기토일간 | ilgan_6 |
| 경 | 경금일간 | ilgan_7 |
| 신 | 신금일간 | ilgan_8 |
| 임 | 임수일간 | ilgan_9 |
| 계 | 계수일간 | ilgan_10 |

### 용신 매핑 테이블

contents_yongsin.json의 subtitle 필드에 포함된 한자(甲乙丙丁庚辛壬癸)로 매핑:

| 용신(dang_ryeong) | subtitle 한자 | JSON title |
|-------------------|--------------|------------|
| 갑 | 甲 | yongsin_2 |
| 을 | 乙 | yongsin_3 |
| 병 | 丙 | yongsin_4 |
| 정 | 丁 | yongsin_5 |
| 경 | 庚 | yongsin_6 |
| 신 | 辛 | yongsin_7 |
| 임 | 壬 | yongsin_8 |
| 계 | 癸 | yongsin_1 |

---

## 가정 (Assumptions)

1. `SajuResult.day_pillar.gan` 필드는 항상 천간 한 글자(갑/을/병/정/무/기/경/신/임/계)를 반환한다.
2. 현재 `calc_yongshin()` 함수가 `core/yongshin.py`에 존재하지만, `SajuResult` 응답 모델에는 `yongshin` 필드가 포함되지 않는다. 이를 추가해야 한다.
3. 시각 미상(`birth_hour=None`) 경우에도 일간 카드는 표시 가능하다 (일주는 시간 무관하게 계산됨).
4. 시각 미상의 경우 용신 계산은 중기 판별이 불가하므로 기본값(중기 이전, smallJunggi)을 사용한다.
5. JSON 데이터 파일은 애플리케이션 시작 시 한 번만 로딩하여 메모리에 캐시한다.
6. 용신 데이터는 총 8가지 유형(무토/기토 제외)이며, 무토(무)/기토(기) 일간의 용신은 JSON에 없는 값(예: 을/병)이 될 수 있다.

---

## 요구사항 (Requirements)

### R1: 백엔드 - YongshinResult를 SajuResult에 포함

**Event-Driven:**
WHEN 사용자가 `/api/v1/saju` 엔드포인트를 호출하면,
THEN 시스템은 `SajuResult` 응답에 `yongshin` 필드(dang_ryeong, heuisin)를 포함해야 한다.

**Ubiquitous:**
시스템은 항상 `yongshin.dang_ryeong`을 `contents_yongsin.json` 매핑의 키로 사용할 수 있는 형태(갑/을/병/정/경/신/임/계)로 반환해야 한다.

**If-Then (Unwanted):**
만약 `birth_hour`가 None이면, 시스템은 중기 이전(smallJunggi) 기본값으로 용신을 계산하고 오류를 발생시키지 않아야 한다.

### R2: 백엔드 - JSON 콘텐츠 로더 서비스

**Ubiquitous:**
시스템은 `contents_ilgan.json`과 `contents_yongsin.json`을 애플리케이션 시작 시 한 번 로딩하고 메모리에 캐시해야 한다.

**Event-Driven:**
WHEN 일간 문자열(갑/을/...)이 주어지면,
THEN 시스템은 해당 일간에 대응하는 `contents_ilgan.json` 항목을 반환해야 한다.

**Event-Driven:**
WHEN 용신 천간 문자열(갑/을/...)이 주어지면,
THEN 시스템은 해당 용신에 대응하는 `contents_yongsin.json` 항목을 반환해야 한다.

**If-Then (Unwanted):**
만약 일간이나 용신 값이 JSON에 존재하지 않으면, 시스템은 예외를 발생시키지 않고 `None`을 반환해야 한다.

### R3: 프론트엔드 - "나의 정체성" 탭 추가

**Event-Driven:**
WHEN 사주 계산 결과가 표시되면,
THEN 시스템은 기존 5개 탭 외에 "🌟 나의 정체성" 탭을 6번째 탭으로 추가해야 한다.

**Ubiquitous:**
시스템은 항상 "나의 정체성" 탭 내에 두 개의 섹션(일간 카드, 용신 카드)을 표시해야 한다.

### R4: 프론트엔드 - 일간 캐릭터 카드 표시

**Event-Driven:**
WHEN "나의 정체성" 탭이 활성화되면,
THEN 시스템은 `SajuResult.day_pillar.gan`에 해당하는 일간 캐릭터 카드를 표시해야 한다.

일간 카드 표시 요소:
- 제목: `ilganDesciption` 값 (예: "실수는없다")
- 부제: `subtitle` 값 (예: "#실수는_없다 / #준비와_계획")
- 본문: `contents` 값 (줄바꿈 처리)
- 일간 레이블: `ilgan` 값 (예: "갑목일간")

### R5: 프론트엔드 - 용신 재능/진로 카드 표시

**Event-Driven:**
WHEN "나의 정체성" 탭이 활성화되면,
THEN 시스템은 `SajuResult.yongshin.dang_ryeong`에 해당하는 용신 재능 카드를 표시해야 한다.

용신 카드 표시 요소:
- 제목: `subtitle` 값 (예: "호기심 많은 사색가/사고력/ 癸")
- 태그: `tag` 값 (해시태그 목록)
- 본문: `contents` 값 중 진로 정보 파싱하여 표시

### R6: 프론트엔드 - 데이터 없음 처리

**If-Then (Unwanted):**
만약 `yongshin` 데이터가 API 응답에 없거나 매핑이 실패하면,
THEN 시스템은 사용자에게 "용신 정보를 불러올 수 없습니다" 안내 메시지를 표시하고 오류를 발생시키지 않아야 한다.

**If-Then (Unwanted):**
만약 `contents_ilgan.json`에서 일간 매핑이 없으면,
THEN 시스템은 "일간 캐릭터 정보를 불러올 수 없습니다" 안내 메시지를 표시하고 오류를 발생시키지 않아야 한다.

---

## 명세 (Specifications)

### S1: SajuResult 모델 확장

`core/models/response.py`의 `SajuResult` 클래스에 필드 추가:
```python
yongshin: YongshinResult | None = None
```

`YongshinResult`는 이미 `core/models/domain.py`에 정의되어 있음:
```python
class YongshinResult(BaseModel):
    dang_ryeong: str  # 당령(용신) 천간 문자
    heuisin: str      # 희신 천간 문자
```

### S2: SajuService 확장

`app/services/saju_service.py`의 `calculate()` 메서드에 용신 계산 추가:

1. `core.yongshin` 모듈의 `calc_yongshin()` 함수 import
2. `birth_hour`가 None인 경우 기본 datetime(정오 12시)으로 계산
3. `SajuResult` 반환 시 `yongshin` 필드 포함

계산에 필요한 파라미터:
- `birth_dt`: datetime(solar_year, solar_month, solar_day, birth_hour or 12, 0)
- `month_ji`: `pillars.month_pillar.ji`
- `month`: solar_month
- `year`: solar_year

### S3: ContentLoader 서비스 생성

`app/services/content_loader.py` 신규 생성:

```
class ContentLoader:
    - 초기화 시 JSON 파일 경로 기반으로 데이터 로딩
    - _ilgan_map: dict[str, dict] - 일간 문자 -> 콘텐츠 항목
    - _yongsin_map: dict[str, dict] - 용신 천간 문자 -> 콘텐츠 항목
    - get_ilgan_content(gan: str) -> dict | None
    - get_yongsin_content(dang_ryeong: str) -> dict | None
```

일간 매핑 키: `갑목일간`에서 앞 글자 `갑` 추출 (또는 `ilgan` 필드의 첫 글자)
용신 매핑 키: `subtitle` 필드의 한자(甲乙丙丁庚辛壬癸)를 한글로 역매핑

한자-한글 역매핑 테이블:
```python
HANJA_TO_HAN = {"甲": "갑", "乙": "을", "丙": "병", "丁": "정",
                "庚": "경", "辛": "신", "壬": "임", "癸": "계"}
```

### S4: Streamlit 탭 확장

`streamlit_app.py`의 `main()` 함수에서:

1. 탭 정의를 6개로 확장:
   ```python
   tab1, tab2, tab3, tab4, tab5, tab6 = st.tabs([
       "📜 사주 원국", "⭐ 십성 분석", "🔄 운의 흐름",
       "📊 세부 지표", "🤖 AI 해석", "🌟 나의 정체성"
   ])
   ```

2. `render_tab_identity(result)` 함수 신규 추가:
   - `result["yongshin"]` 에서 `dang_ryeong` 추출
   - `result["day_pillar"]["gan"]`에서 일간 추출
   - ContentLoader를 통해 각 콘텐츠 로딩
   - 두 컬럼 레이아웃으로 카드 표시

### S5: UI 레이아웃 설계

"나의 정체성" 탭 레이아웃:
```
st.subheader("나의 정체성 분석")
col1, col2 = st.columns(2)

[col1] 나의 일간 (日干)
  - st.info(f"일간: {ilgan_label}")
  - st.markdown(f"### {title}")
  - st.caption(subtitle)
  - st.write(contents)  # 줄바꿈 처리

[col2] 나의 용신 재능 (用神)
  - st.info(f"용신: {dang_ryeong}({heuisin})")
  - st.markdown(f"### {yongsin_title}")
  - st.caption(yongsin_tags)
  - st.write(yongsin_contents)  # 진로 설명
```

### S6: 데이터 파일 경로 처리

JSON 파일은 프로젝트 루트 기준 상대 경로로 접근:
- `manse_ori/testResult/contents_ilgan.json`
- `manse_ori/testResult/contents_yongsin.json`

ContentLoader는 `__file__` 기반 절대 경로 사용:
```python
_BASE_DIR = pathlib.Path(__file__).parent.parent.parent
_ILGAN_PATH = _BASE_DIR / "manse_ori" / "testResult" / "contents_ilgan.json"
_YONGSIN_PATH = _BASE_DIR / "manse_ori" / "testResult" / "contents_yongsin.json"
```

Streamlit에서는 `pathlib.Path(__file__).parent`를 기준으로 경로 계산.

---

## 추적성 태그 (Traceability)

- TAG: SPEC-UI-003
- 관련 모듈: `streamlit_app.py`, `app/services/saju_service.py`, `core/models/response.py`, `core/yongshin.py`
- 신규 파일: `app/services/content_loader.py`
- 데이터 파일: `manse_ori/testResult/contents_ilgan.json`, `manse_ori/testResult/contents_yongsin.json`

---

## 구현 노트 (Implementation Notes)

커밋: `9584b87` (2026-03-05)

### 구현 완료 항목

- `core/models/response.py`: `SajuResult`에 `yongshin: YongshinResult | None = None` 필드 추가 (하위 호환성 유지)
- `app/services/saju_service.py`: `calculate()` 메서드에 `calc_yongshin()` 통합, `birth_hour=None` 시 12시 기본값 처리
- `app/services/content_loader.py`: JSON 캐시 서비스 신규 생성 — 앱 시작 시 한 번 로딩, `get_ilgan_content()` / `get_yongsin_content()` O(1) 조회 제공
- `streamlit_app.py`: 6번째 탭 "나의 정체성" 추가, `render_tab_identity()` 함수 구현 (일간 캐릭터 카드 + 용신 재능 카드 2열 레이아웃)
- `tests/services/test_content_loader.py`: `ContentLoader` 서비스 단위 테스트 14개 추가

### 테스트 결과

- 총 테스트: **466개** (기존 452개 → +14개)
- 커버리지: **95%** 유지
- ruff lint: 경고 없음
- mypy: 타입 오류 없음
