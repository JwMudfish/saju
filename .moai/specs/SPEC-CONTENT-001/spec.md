# SPEC-CONTENT-001: Phase 1 - 즉시 구현 가능 컨텐츠 확장

## 개요

`manse_ori/testResult/`에 이미 존재하는 JSON 컨텐츠 파일 중, `saju/core/`에 계산 로직이 구현되어 있어 **추가 코어 개발 없이 즉시 연동 가능한 컨텐츠**를 `ContentLoader`에 추가하고 REST API 및 Streamlit UI에 노출한다.

현재 `ContentLoader`는 3종(일간/용신/격국)만 지원하며, 이를 **희신(Hisin10), 희기신(hisin_gisin), 연봉(salary)** 으로 확장한다.

## 현재 상태

| 컨텐츠 | JSON 파일 | 코어 로직 | ContentLoader | API | UI |
|---|---|---|---|---|---|
| 일간 캐릭터 | `contents_ilgan.json` | 완료 | 완료 | 완료 | 완료 |
| 용신(당령) | `contents_yongsin.json` | 완료 | 완료 | 완료 | 완료 |
| 격국 캐릭터 | `contents_gyouk.json` | 완료 | 완료 | 완료 | 완료 |
| 희신 컨텐츠(10종) | `contents_Hisin10/*/contents_HisinYes.json` | 완료 | **미구현** | **미구현** | **미구현** |
| 희기신 판정 | `contents_hisin_gisin.json` | 완료 | **미구현** | **미구현** | **미구현** |
| 연봉 컨텐츠 | `contents_salary.json` | 완료(육신) | **미구현** | **미구현** | **미구현** |

## 목표

1. `ContentLoader`에 희신/희기신/연봉 컨텐츠 로드 메서드 추가
2. `/saju/identity` API 응답에 신규 컨텐츠 필드 포함
3. Streamlit "나의 정체성" 탭에 희신 컨텐츠 카드 추가

## 요구사항 (EARS 형식)

### 희신(Hisin10) 컨텐츠 연동

- WHEN 사주 계산 완료 시 THEN `yongshin.heuisin` (희신 천간) 기준으로 `contents_Hisin10/{dang_ryeong_dir}/contents_HisinYes.json` 파일을 로드한다
- WHEN 당령별 디렉토리 매핑이 필요할 때 THEN 다음 규칙을 따른다:
  - 갑(gapmuk), 을(ulmok), 병(byeongHwa), 정(jungHwa), 경(GyeongGum), 신(sinGum), 임(Limsu), 계(gyesu)
- WHERE `ContentLoader.get_hisin_content(dang_ryeong, hisin_yes=True)` 메서드가 구현되어야 한다
- IF 파일 로드 실패 시 THEN None 반환 (HTTP 200 유지)

### 희기신 판정 컨텐츠 연동

- WHEN `yongshin.dang_ryeong`과 `yongshin.heuisin`이 주어질 때 THEN `contents_hisin_gisin.json`에서 매칭 항목을 반환한다
- WHERE `ContentLoader.get_hisin_gisin_content(dang_ryeong)` 메서드가 구현되어야 한다

### 연봉 컨텐츠 연동

- WHEN 육신 목록(`yuksin_list`)이 주어질 때 THEN `contents_salary.json`에서 해당 육신 기반 연봉 컨텐츠를 반환한다
- WHERE `ContentLoader.get_salary_content(yuksin_key)` 메서드가 구현되어야 한다

### API 확장

- WHEN `POST /api/v1/saju/identity` 요청 시 THEN 기존 응답에 다음 필드가 추가된다:
  - `hisin_content: dict | None`
  - `hisin_gisin_content: dict | None`
  - `salary_content: dict | None`
- WHERE `IdentityResponse` Pydantic 모델에 신규 필드가 추가되어야 한다

### Streamlit UI

- WHEN "나의 정체성" 탭 표시 시 THEN 희신 컨텐츠 카드가 기존 3컬럼(일간|격국|용신) 아래에 추가로 표시된다
- WHERE 연봉 컨텐츠는 별도 섹션 또는 expander로 표시한다

## 기술 접근 방법

### 1. ContentLoader 확장

```
app/services/content_loader.py
- DANG_RYEONG_TO_HISIN10_DIR: dict[str, str] 매핑 테이블 추가
- _HISIN_BASE_PATH: manse_ori/testResult/contents_Hisin10/
- _HISIN_GISIN_PATH: manse_ori/testResult/contents_hisin_gisin.json
- _SALARY_PATH: manse_ori/testResult/contents_salary.json
- ContentLoader.get_hisin_content(dang_ryeong, hisin_yes=True) 추가
- ContentLoader.get_hisin_gisin_content(dang_ryeong) 추가
- ContentLoader.get_salary_content(yuksin_key) 추가
- 모듈 수준 편의 함수 3개 추가
```

### 2. IdentityResponse 확장

```
core/models/response.py
- IdentityResponse에 hisin_content, hisin_gisin_content, salary_content 필드 추가
```

### 3. API 엔드포인트 수정

```
app/api/endpoints/saju.py
- get_identity()에서 새 ContentLoader 메서드 호출 추가
```

### 4. Streamlit UI 수정

```
streamlit_app.py
- "나의 정체성" 탭에 희신 컨텐츠 섹션 추가
```

## 수정 대상 파일

| 파일 | 변경 유형 |
|---|---|
| `saju/app/services/content_loader.py` | 수정 (메서드 추가) |
| `saju/core/models/response.py` | 수정 (필드 추가) |
| `saju/app/api/endpoints/saju.py` | 수정 (호출 추가) |
| `saju/streamlit_app.py` | 수정 (UI 추가) |
| `saju/tests/services/test_content_loader.py` | 수정 (테스트 추가) |
| `saju/tests/api/test_saju_identity.py` | 수정 (테스트 추가) |

## 완료 기준

- [ ] `ContentLoader`에 희신/희기신/연봉 get 메서드 3개 추가
- [ ] `IdentityResponse`에 신규 필드 3개 추가
- [ ] `/saju/identity` API가 신규 필드를 포함하여 응답
- [ ] Streamlit "나의 정체성" 탭에 희신 컨텐츠 표시
- [ ] 신규 메서드에 대한 단위 테스트 추가
- [ ] 전체 테스트 95%+ 커버리지 유지
- [ ] mypy strict mode 통과

## 참조

- 기존 구현: `app/services/content_loader.py:101` - ContentLoader 클래스
- 희신 계산: `core/yongshin.py:161` - `calc_heuisin()`
- 기존 API: `app/api/endpoints/saju.py:185` - `get_identity()`
- JSON 소스: `manse_ori/testResult/contents_Hisin10/`

---

## 구현 완료 (2026-03-08)

**상태**: 완료 (v1.0.0)
**커밋**: f675305
**테스트**: 515개 통과 (+14 신규)
**커버리지**: 94% (신규 코드 99%)

### 실제 구현 요약
- SPEC 요구사항 FR-01~FR-06 전체 구현 완료
- 수락 기준 AC-01~AC-05 전체 통과
- AC-06 커버리지: 94% (기준 95%, 기존 코드 미커버 1% 미달, 신규 코드 99%)
- 무/기 당령 Hisin10 매핑 없음 → None 반환 정상 동작 확인
