# SPEC-CONTENT-002: Phase 2 - 신격(Shgj) 코어 로직 포팅 및 컨텐츠 연동

## 개요

`manse_ori`의 JavaScript 신격(Shgj) 계산 로직을 Python으로 포팅하여 `saju/core/shgj.py` 모듈을 신규 개발한다. 이를 통해 현재 미구현된 **상신(Sangsin), 구신(Gusin), 국국분(Gukgubun), 상화(Sanghwa), 설화(Sulhwa)** 지표를 계산하고, 관련 JSON 컨텐츠를 API 및 UI에 노출한다.

동시에 `core/yongshin.py`를 확장하여 **사령(Saryeong), 중화(Junghwa), 지속(Jisok), 확장(Hwakjang)** 영격령 세부지표를 추가한다.

## 현재 상태

### 미구현 코어 로직

| 지표 그룹 | 개별 지표 | JS 소스 | Python 모듈 | 상태 |
|---|---|---|---|---|
| 신격(Shgj) | 상신(Sangsin) | `manse/dayUnse/todayShgj/shgj.js` | `core/shgj.py` | **미존재** |
| 신격(Shgj) | 구신(Gusin) | `manse/manseSSSG/noryeongShgj/` | `core/shgj.py` | **미존재** |
| 신격(Shgj) | 국국분(Gukgubun) | `manse/manseSSSG/noryeongShgj/` | `core/shgj.py` | **미존재** |
| 신격(Shgj) | 상화(Sanghwa) | `manse/manseSSSG/getSangSengSangGuk.js` | `core/shgj.py` | **미존재** |
| 신격(Shgj) | 설화(Sulhwa) | `manse/manseSSSG/getSangSengSangGuk.js` | `core/shgj.py` | **미존재** |
| 영격령 | 사령(Saryeong) | `manse/ryeong/ryeong.js` | `core/yongshin.py` | **미구체화** |
| 영격령 | 중화(Junghwa) | `manse/ryeong/ryeong.js` | `core/yongshin.py` | **미구체화** |
| 영격령 | 지속(Jisok) | `manse/ryeong/ryeong.js` | `core/yongshin.py` | **미구체화** |
| 영격령 | 확장(Hwakjang) | `manse/ryeong/ryeong.js` | `core/yongshin.py` | **미구체화** |

### 미연동 JSON 컨텐츠

| JSON 파일 | 컨텐츠 | 의존 코어 로직 |
|---|---|---|
| `contents_sangsin.json` | 상신 설명 | `shgj.py - calc_sangsin()` |
| `contents_gusin.json` | 구신 설명 | `shgj.py - calc_gusin()` |
| `contents_sangsin_compliment.json` | 상신 보완 | `shgj.py - calc_sangsin()` |
| `contents_gusin_gisin.json` | 구신 기신 | `shgj.py - calc_gusin()` |
| `contents_shgjGilHung/gil/*.json` | 길신 격국별 | `shgj.py - calc_shgj_gilhung()` |
| `contents_shgjGilHung/hung/*.json` | 흉신 격국별 | `shgj.py - calc_shgj_gilhung()` |

## 목표

1. `saju/core/shgj.py` 신규 모듈 개발 (JS 포팅)
2. `core/yongshin.py` 영격령 세부지표 추가
3. `ContentLoader`에 신격/영격령 컨텐츠 연동
4. `SajuResult` 및 관련 Response 모델 확장
5. API 및 UI에 신격 지표 노출

## 선행 조건

- SPEC-CONTENT-001 완료 (ContentLoader 확장 패턴 확립)
- `manse_ori/manse/manseSSSG/` 및 `manse/dayUnse/todayShgj/` JS 로직 분석 완료

## 요구사항 (EARS 형식)

### 신격(Shgj) 코어 모듈

- WHEN 사주팔자와 격국(gyouk)이 주어질 때 THEN `calc_shgj(pillars, gyouk_name, yuksin_list)`가 `ShgjResult`를 반환한다
- WHERE `ShgjResult`는 `sangsin`, `gusin`, `gukgubun`, `sanghwa`, `sulhwa` 필드를 포함한다
- WHEN 상신(Sangsin) 계산 시 THEN 격국과 오행 생극제화를 분석하여 용신을 돕는 천간을 도출한다
- WHEN 구신(Gusin) 계산 시 THEN 용신을 극하거나 방해하는 천간을 도출한다
- WHEN 상화(Sanghwa)/설화(Sulhwa) 계산 시 THEN `getSangSengSangGuk.js` 로직 기반으로 계산한다
- IF JS 로직 분석이 불충분할 때 THEN 해당 지표는 `None` 반환, 나머지 지표는 정상 반환

### 영격령 세부지표

- WHEN `YongshinResult` 계산 시 THEN `dang_ryeong`, `heuisin` 외에 다음 필드가 추가된다:
  - `saryeong: str | None` — 사령(Saryeong)
  - `junghwa: str | None` — 중화(Junghwa)
  - `jisok: str | None` — 지속(Jisok)
  - `hwakjang: str | None` — 확장(Hwakjang)
- WHEN 월지와 절기 데이터가 주어질 때 THEN 영격령 세부지표가 계산된다
- WHERE `core/yongshin.py`의 `calc_yongshin()` 함수가 확장된 `YongshinResult`를 반환한다

### ContentLoader 확장

- WHEN `ShgjResult.sangsin`이 주어질 때 THEN `ContentLoader.get_sangsin_content(sangsin)` 이 해당 컨텐츠를 반환한다
- WHEN `ShgjResult.gusin`이 주어질 때 THEN `ContentLoader.get_gusin_content(gusin)` 이 해당 컨텐츠를 반환한다
- WHEN 격국의 길흉(gilhung) 분류가 주어질 때 THEN `ContentLoader.get_shgj_gilhung_content(gyouk_name, is_gil)` 이 컨텐츠를 반환한다

### API 확장

- WHEN `POST /api/v1/saju/identity` 요청 시 THEN 기존 응답에 다음 필드가 추가된다:
  - `shgj: ShgjResult | None`
  - `sangsin_content: dict | None`
  - `gusin_content: dict | None`
  - `shgj_gilhung_content: dict | None`
- WHERE `IdentityResponse` Pydantic 모델이 확장된다

### Streamlit UI

- WHEN "나의 정체성" 탭 표시 시 THEN 신격 지표 섹션이 추가된다
- WHERE 상신/구신은 설명 카드 형태로, 길흉 컨텐츠는 별도 expander로 표시한다

## 기술 접근 방법

### 1단계: JS 로직 분석 (선행)

```
분석 대상:
- manse_ori/manse/dayUnse/todayShgj/shgj.js
- manse_ori/manse/manseSSSG/noryeongShgj/no.js
- manse_ori/manse/manseSSSG/getSangSengSangGuk.js
- manse_ori/manse/manseSSSG/noryeongShgj/noShgjFuncYuksin.js
```

### 2단계: core/shgj.py 신규 개발 (DDD 방법론)

```python
# 신규 파일: saju/core/shgj.py
class ShgjResult(BaseModel):
    sangsin: str | None = None       # 상신 천간
    gusin: str | None = None         # 구신 천간
    gukgubun: str | None = None      # 국국분
    sanghwa: str | None = None       # 상화 관계
    sulhwa: str | None = None        # 설화 관계

def calc_shgj(
    pillars: FourPillars,
    gyouk_name: str,
    yuksin_list: list[YuksinItem],
    dang_ryeong: str,
) -> ShgjResult: ...
```

### 3단계: core/yongshin.py 확장

```python
# YongshinResult에 영격령 세부지표 필드 추가 (하위 호환성 유지)
class YongshinResult(BaseModel):
    dang_ryeong: str
    heuisin: str
    saryeong: str | None = None     # 신규
    junghwa: str | None = None      # 신규
    jisok: str | None = None        # 신규
    hwakjang: str | None = None     # 신규
```

### 4단계: SajuResult 및 도메인 모델 확장

```
core/models/domain.py: ShgjResult 추가
core/models/response.py: IdentityResponse에 shgj 및 컨텐츠 필드 추가
app/services/saju_service.py: calc_shgj() 통합
```

## 수정/생성 대상 파일

| 파일 | 변경 유형 |
|---|---|
| `saju/core/shgj.py` | **신규 생성** |
| `saju/core/models/domain.py` | 수정 (ShgjResult 추가) |
| `saju/core/yongshin.py` | 수정 (영격령 세부지표 추가) |
| `saju/core/models/response.py` | 수정 (IdentityResponse 확장) |
| `saju/app/services/content_loader.py` | 수정 (상신/구신/길흉 메서드 추가) |
| `saju/app/services/saju_service.py` | 수정 (shgj 계산 통합) |
| `saju/app/api/endpoints/saju.py` | 수정 (신규 필드 응답) |
| `saju/streamlit_app.py` | 수정 (신격 지표 UI 추가) |
| `saju/tests/core/test_shgj.py` | **신규 생성** |
| `saju/tests/core/test_yongshin_extended.py` | 수정 |

## 위험 요소 및 완화 방안

| 위험 | 설명 | 완화 |
|---|---|---|
| JS 포팅 복잡도 | 신격 계산 로직이 복잡한 생극제화 판단 포함 | 단계별 구현, 불명확한 부분은 None 반환 |
| 하위 호환성 | YongshinResult 확장 시 기존 API 응답 변경 | 신규 필드 모두 Optional(None 기본값) |
| 테스트 데이터 | 신격 계산 기준값 확인 필요 | manse_ori 결과 JSON 파일 활용 |

## 완료 기준

- [ ] `core/shgj.py` 신규 모듈: 상신/구신 최소 구현 완료
- [ ] `YongshinResult`에 영격령 세부지표 필드 추가 (Optional)
- [ ] `ContentLoader`에 상신/구신/길흉 컨텐츠 로드 메서드 추가
- [ ] `/saju/identity` API가 `shgj` 필드 포함하여 응답
- [ ] 기존 테스트 전체 통과 (하위 호환성 유지)
- [ ] `shgj.py` 단위 테스트 추가, 전체 95%+ 커버리지 유지
- [ ] mypy strict mode 통과

## 참조

- JS 소스: `manse_ori/manse/manseSSSG/noryeongShgj/no.js`
- JS 소스: `manse_ori/manse/dayUnse/todayShgj/shgj.js`
- JSON 컨텐츠: `manse_ori/testResult/contents_sangsin.json`
- JSON 컨텐츠: `manse_ori/testResult/contents_shgjGilHung/`
- 기존 유사 구현: `core/yongshin.py` (당령 계산 패턴 참조)
