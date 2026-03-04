# SPEC-UI-003 구현 계획

## TAG: SPEC-UI-003

---

## 변경 범위 요약

| 파일 | 변경 유형 | 내용 |
|------|----------|------|
| `core/models/response.py` | 수정 | `SajuResult`에 `yongshin: YongshinResult | None` 필드 추가 |
| `app/services/saju_service.py` | 수정 | `calculate()` 메서드에 용신 계산 및 `yongshin` 필드 포함 |
| `app/services/content_loader.py` | 신규 | JSON 콘텐츠 로더 서비스 구현 |
| `streamlit_app.py` | 수정 | 6번째 탭 추가 및 `render_tab_identity()` 함수 구현 |
| `tests/` | 추가 | ContentLoader, 용신 매핑, UI 렌더링 테스트 |

---

## 우선순위 기반 마일스톤

### Primary Goal: 백엔드 확장

**M1. SajuResult 모델 확장**

- `core/models/response.py` 수정
- `SajuResult`에 `yongshin: YongshinResult | None = None` 필드 추가
- 기존 응답 하위 호환성 유지 (기본값 None)
- 기존 테스트 통과 확인

**M2. SajuService 용신 계산 통합**

- `app/services/saju_service.py` 수정
- `calc_yongshin()` 호출 추가
- `birth_hour=None` 예외 처리 (정오 12:00 기본값 사용)
- 음력→양력 변환 이후의 solar_year/month/day 사용

구현 세부사항:
```python
from core.yongshin import calc_yongshin
from datetime import datetime

# calculate() 메서드 내부
birth_dt = datetime(solar_year, solar_month, solar_day,
                    birth_hour if birth_hour is not None else 12, 0)
yongshin_result = calc_yongshin(
    birth_dt=birth_dt,
    month_ji=pillars.month_pillar.ji,
    month=solar_month,
    year=solar_year,
)
```

**M3. ContentLoader 서비스 구현**

신규 파일 `app/services/content_loader.py`:
- 모듈 레벨에서 JSON 데이터 로딩 (import 시 1회)
- 일간 매핑: `gan` -> `contents_ilgan.json` 항목
- 용신 매핑: `dang_ryeong` -> `contents_yongsin.json` 항목
- 한자(甲乙丙丁庚辛壬癸) <-> 한글(갑을병정경신임계) 역매핑 테이블 내장
- `get_ilgan_content(gan: str) -> dict | None`
- `get_yongsin_content(dang_ryeong: str) -> dict | None`

ContentLoader 설계 원칙:
- 파일 로딩 실패 시 빈 딕셔너리로 폴백 (앱 시작 실패 방지)
- 매핑 키 없음 시 None 반환 (UI에서 처리)
- `pathlib.Path` 기반 절대 경로 사용

---

### Secondary Goal: 프론트엔드 UI 구현

**M4. `render_tab_identity()` 함수 구현**

`streamlit_app.py`에 추가:
- `result` dict에서 `day_pillar.gan`과 `yongshin` 추출
- ContentLoader 인스턴스(또는 모듈 레벨 캐시)에서 콘텐츠 조회
- 2컬럼 레이아웃으로 일간 카드 / 용신 카드 표시
- contents 텍스트의 `\\n` 처리 및 `/` 구분자 처리

**M5. 탭 구조 확장**

`main()` 함수 수정:
- 6탭으로 확장 (`tab6 = 🌟 나의 정체성`)
- `render_tab_identity(result)` 호출 추가

---

### Final Goal: 테스트 및 품질 보증

**M6. 단위 테스트 작성**

테스트 대상:
- `tests/services/test_content_loader.py`: 매핑 정확성 검증
  - 10개 일간 매핑 전체 확인
  - 8개 용신 매핑 전체 확인
  - 존재하지 않는 키 입력 시 None 반환
- `tests/services/test_saju_service.py`: `yongshin` 필드 포함 확인
  - `birth_hour=None` 케이스 처리
  - `SajuResult.yongshin is not None` 확인

**M7. 통합 테스트 및 회귀 검증**

- 기존 452개 테스트 전체 통과 확인
- API 응답 스키마 호환성 확인 (`yongshin` 필드 추가로 인한 파괴적 변경 없음)

---

## 기술적 접근 방식

### 데이터 흐름

```
사용자 입력 (생년월일/시간/성별)
    |
    v
SajuService.calculate()
    ├── calc_four_pillars() -> pillars
    ├── calc_yongshin(birth_dt, month_ji, ...) -> YongshinResult
    └── SajuResult(... yongshin=yongshin_result)
    |
    v
API 응답: SajuResult (yongshin.dang_ryeong 포함)
    |
    v
Streamlit render_tab_identity()
    ├── ContentLoader.get_ilgan_content(day_pillar.gan)
    ├── ContentLoader.get_yongsin_content(yongshin.dang_ryeong)
    └── UI 카드 렌더링
```

### ContentLoader 설계

```python
# app/services/content_loader.py

HANJA_TO_HAN: dict[str, str] = {
    "甲": "갑", "乙": "을", "丙": "병", "丁": "정",
    "庚": "경", "辛": "신", "壬": "임", "癸": "계"
}

GAN_TO_ILGAN: dict[str, str] = {
    "갑": "갑목일간", "을": "을목일간", "병": "병화일간",
    "정": "정화일간", "무": "무토일간", "기": "기토일간",
    "경": "경금일간", "신": "신금일간", "임": "임수일간", "계": "계수일간"
}
```

### 역방향 호환성

`yongshin: YongshinResult | None = None` 필드를 기본값 None으로 추가하면:
- 기존 테스트는 `yongshin` 필드 없이도 통과
- 클라이언트 측에서 `result.get("yongshin")` or None 처리로 안전하게 사용 가능

---

## 리스크 및 대응 방안

| 리스크 | 가능성 | 대응 방안 |
|--------|--------|----------|
| julgi.json 데이터 범위 초과(연도) | 낮음 | `get_junggi_dt()` 반환 None 시 smallJunggi 기본값 사용 (기존 로직 유지) |
| contents_yongsin.json에 없는 용신 값 | 낮음 | `ContentLoader.get_yongsin_content()` None 반환, UI에서 안내 메시지 표시 |
| Streamlit 컬럼 레이아웃 긴 텍스트 overflow | 중간 | `st.expander()` 사용하여 긴 contents 접기 처리 |
| birth_hour=None 시 용신 계산 부정확 | 중간 | 12시(정오) 기본값 사용, UI에서 "시각 미상으로 인한 추정치" 안내 |

---

## 구현 순서 (의존성 기반)

```
M1 (모델 확장)
    ↓
M2 (SajuService 확장)  →  M3 (ContentLoader 신규)
    ↓
M4 (UI 함수 구현)
    ↓
M5 (탭 구조 확장)
    ↓
M6 (단위 테스트)
    ↓
M7 (통합 테스트 및 회귀)
```

M2와 M3는 병렬 진행 가능.
