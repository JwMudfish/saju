# SPEC-API-002: 사주 기능별 개별 REST API 엔드포인트 분리

## 메타데이터

| 항목 | 내용 |
|------|------|
| SPEC ID | SPEC-API-002 |
| 제목 | 사주 기능별 개별 REST API 엔드포인트 분리 |
| 상태 | completed |
| 우선순위 | High |
| 관련 SPEC | SPEC-API-001, SPEC-CORE-001, SPEC-CALC-001, SPEC-CALC-002 |
| 작성일 | 2026-03-05 |
| 작성자 | jw |

---

## 환경 (Environment)

### 기술 스택

- Python 3.11 (uv 가상환경)
- FastAPI (기존 `app/` 확장)
- Pydantic v2 (`core/models/response.py`)
- 기존 서비스 레이어 (`app/services/saju_service.py`)

### 현재 API 구조 (as-is)

```
POST /api/v1/saju           → 사주 전체 계산 (모든 데이터 포함)
POST /api/v1/saju/interpret → LLM 해석
GET  /health                → 헬스 체크
POST /api/v1/calendar/convert → 음양력 변환
```

### 목표 API 구조 (to-be)

```
# 기존 엔드포인트 (하위 호환, 유지)
POST /api/v1/saju           → 전체 계산 (변경 없음)
POST /api/v1/saju/interpret → LLM 해석 (변경 없음)

# 신규 개별 엔드포인트
POST /api/v1/saju/pillars   → 사주팔자 4기둥 + 8글자만
POST /api/v1/saju/analysis  → 육신·합충형해파·오행 분석
POST /api/v1/saju/fortune   → 대운·세운 정보
POST /api/v1/saju/identity  → 일간·격국·용신 카드 콘텐츠
```

### 공통 요청 모델

모든 신규 엔드포인트는 동일한 `SajuAPIRequest` 를 입력으로 받는다.

```python
class SajuAPIRequest(BaseModel):
    birth_year: int      # 출생 연도 (1600~2100)
    birth_month: int     # 출생 월 (1~12)
    birth_day: int       # 출생 일 (1~31)
    birth_hour: int | None  # 출생 시 (0~23), None=시각 미상
    is_lunar: bool       # 음력 여부
    is_leap_month: bool  # 윤달 여부
    gender: Literal["male", "female"]
```

---

## 가정 (Assumptions)

1. 기존 `POST /api/v1/saju` 엔드포인트는 그대로 유지된다 (하위 호환성 보장).
2. 신규 엔드포인트는 `SajuService.calculate()`의 계산 결과를 부분적으로 추출한다.
3. 성능 최적화(개별 계산)는 이 SPEC의 범위 외이다; 전체 계산 후 필터링 방식을 사용한다.
4. 인증/인가는 이 SPEC의 범위 외이다.
5. `POST /api/v1/saju/identity`는 SPEC-UI-004에서 구현될 격국 계산 로직에 의존한다.
6. Streamlit 앱은 필요에 따라 신규 엔드포인트를 활용할 수 있으나, 기존 `/api/v1/saju` 사용도 유지된다.

---

## 요구사항 (Requirements)

### R1: 하위 호환성

**R1-1 (Ubiquitous)**
시스템은 항상 기존 `POST /api/v1/saju` 엔드포인트를 동일한 요청/응답 스키마로 유지해야 한다.

**R1-2 (Ubiquitous)**
시스템은 항상 기존 `POST /api/v1/saju/interpret` 엔드포인트를 변경 없이 유지해야 한다.

**R1-3 (Unwanted)**
시스템은 기존 엔드포인트의 응답 모델 구조를 변경해서는 안 된다.

### R2: 사주팔자 엔드포인트 (`/pillars`)

**R2-1 (Event-Driven)**
WHEN `POST /api/v1/saju/pillars`가 호출되면 THEN 사주팔자 4기둥(년/월/일/시)과 기본 메타 정보만 반환해야 한다.

**R2-2 (Ubiquitous)**
`/pillars` 응답은 항상 `year_pillar`, `month_pillar`, `day_pillar`, `hour_pillar`, `pillar_meanings`를 포함해야 한다.

**R2-3 (State-Driven)**
IF `birth_hour`가 `None`이면 THEN `hour_pillar`는 `null`이어야 한다.

### R3: 분석 엔드포인트 (`/analysis`)

**R3-1 (Event-Driven)**
WHEN `POST /api/v1/saju/analysis`가 호출되면 THEN 육신(십성) 목록, 합충형해파 관계, 오행 비율, 지장간, 십이운성, 신살 정보를 반환해야 한다.

**R3-2 (Ubiquitous)**
`/analysis` 응답은 항상 `yuksin_list`, `hapchung`, `ohang_ratio`, `jijanggan`, `sibiunsung`, `shinsal`을 포함해야 한다.

**R3-3 (State-Driven)**
IF 계산 가능한 항목이 없으면 THEN 해당 필드는 `null` 또는 빈 배열 `[]`을 반환해야 한다.

### R4: 운세 엔드포인트 (`/fortune`)

**R4-1 (Event-Driven)**
WHEN `POST /api/v1/saju/fortune`이 호출되면 THEN 대운(大運) 목록과 세운(歲運) 목록을 반환해야 한다.

**R4-2 (Ubiquitous)**
`/fortune` 응답은 항상 `deun`과 `sewun`을 포함해야 한다.

**R4-3 (State-Driven)**
IF 대운 계산 실패 시 THEN `deun`은 `null`을 반환하고 HTTP 500 없이 응답해야 한다.

### R5: 정체성 엔드포인트 (`/identity`)

**R5-1 (Event-Driven)**
WHEN `POST /api/v1/saju/identity`가 호출되면 THEN 일간 카드 콘텐츠, 격국명 및 카드 콘텐츠, 용신 카드 콘텐츠를 반환해야 한다.

**R5-2 (Ubiquitous)**
`/identity` 응답은 항상 `day_gan`, `yongshin`, `ilgan_content`, `gyouk_name`, `gyouk_content`, `yongsin_content` 필드를 포함해야 한다.

**R5-3 (State-Driven)**
IF 해당 콘텐츠 JSON 파일에서 항목을 찾을 수 없으면 THEN 해당 `*_content` 필드는 `null`을 반환해야 한다.

**R5-4 (Unwanted)**
시스템은 콘텐츠 로딩 실패 시 HTTP 오류를 반환해서는 안 되며, `null` 콘텐츠와 함께 HTTP 200을 반환해야 한다.

### R6: 에러 처리

**R6-1 (Event-Driven)**
WHEN 잘못된 생년월일로 요청이 들어오면 THEN HTTP 400과 상세 오류 메시지를 반환해야 한다.

**R6-2 (Event-Driven)**
WHEN 서버 내부 오류가 발생하면 THEN HTTP 500과 적절한 오류 메시지를 반환해야 한다.

**R6-3 (Unwanted)**
시스템은 민감한 내부 오류 세부 정보를 응답에 포함해서는 안 된다.

### R7: API 문서화

**R7-1 (Ubiquitous)**
모든 신규 엔드포인트는 항상 FastAPI 자동 생성 OpenAPI 문서(`/docs`)에 표시되어야 한다.

**R7-2 (Ubiquitous)**
각 엔드포인트는 항상 명확한 `summary`, `description`, `tags`를 포함해야 한다.

---

## 명세 (Specifications)

### API 엔드포인트 계층 구조

```
app/api/endpoints/
├── health.py           # 기존 (변경 없음)
├── calendar.py         # 기존 (변경 없음)
└── saju.py             # 기존 엔드포인트 + 신규 엔드포인트 추가

또는 (선택적 분리)

app/api/endpoints/
├── health.py
├── calendar.py
├── saju.py             # 기존 /saju, /saju/interpret
└── saju_detail.py      # 신규 /saju/pillars, /saju/analysis, /saju/fortune, /saju/identity
```

### 응답 모델 명세

#### `PillarsResponse`

```python
class PillarsResponse(BaseModel):
    """사주팔자 엔드포인트 응답 모델."""
    year_pillar: GanJi
    month_pillar: GanJi
    day_pillar: GanJi
    hour_pillar: GanJi | None
    pillar_meanings: list[PillarMeaning] | None
```

#### `AnalysisResponse`

```python
class AnalysisResponse(BaseModel):
    """사주 분석 엔드포인트 응답 모델."""
    yuksin_list: list[YuksinItem] | None
    hapchung: list[HapchungRelation] | None
    ohang_ratio: OHangRatio | None
    jijanggan: dict[str, HiddenStems] | None
    sibiunsung: list[SibiUnsungItem] | None
    shinsal: list[ShinsalItem] | None
```

#### `FortuneResponse`

```python
class FortuneResponse(BaseModel):
    """운세 엔드포인트 응답 모델."""
    deun: DeunResult | None
    sewun: list[SewunItem] | None
```

#### `IdentityResponse`

```python
class IdentityContent(BaseModel):
    """개별 카드 콘텐츠."""
    title: str | None = None
    subtitle: str | None = None
    description: str | None = None
    contents: str | None = None
    tags: dict[str, str] | None = None  # {"zoryun": "#...", "angry": "#..."}
    extras: dict[str, Any] | None = None  # 추가 필드

class IdentityResponse(BaseModel):
    """정체성 엔드포인트 응답 모델."""
    day_gan: str                    # 일간 천간 (갑/을/병/...)
    yongshin: YongshinResult | None # 용신(당령, 희신)
    gyouk_name: str | None          # 격국명 (식신격, 정관격, ...)
    ilgan_content: IdentityContent | None
    gyouk_content: IdentityContent | None
    yongsin_content: IdentityContent | None
```

### 엔드포인트 구현 패턴

```python
# app/api/endpoints/saju.py (신규 섹션 추가)

@router.post("/saju/pillars", response_model=PillarsResponse)
async def get_saju_pillars(
    request: SajuAPIRequest,
    service: SajuService = Depends(get_saju_service),
) -> PillarsResponse:
    """사주팔자 4기둥만 반환."""
    try:
        result = service.calculate(...)
        return PillarsResponse(
            year_pillar=result.year_pillar,
            month_pillar=result.month_pillar,
            day_pillar=result.day_pillar,
            hour_pillar=result.hour_pillar,
            pillar_meanings=result.pillar_meanings,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e


@router.post("/saju/analysis", response_model=AnalysisResponse)
async def get_saju_analysis(
    request: SajuAPIRequest,
    service: SajuService = Depends(get_saju_service),
) -> AnalysisResponse:
    """육신·합충형해파·오행 분석 반환."""
    ...


@router.post("/saju/fortune", response_model=FortuneResponse)
async def get_saju_fortune(
    request: SajuAPIRequest,
    service: SajuService = Depends(get_saju_service),
) -> FortuneResponse:
    """대운·세운 반환."""
    ...


@router.post("/saju/identity", response_model=IdentityResponse)
async def get_saju_identity(
    request: SajuAPIRequest,
    service: SajuService = Depends(get_saju_service),
) -> IdentityResponse:
    """일간·격국·용신 카드 콘텐츠 반환."""
    ...
```

### 라우터 등록

```python
# app/api/router.py (변경 없음, 기존 saju.router에 새 엔드포인트 포함됨)
api_router.include_router(saju.router)
```

### OpenAPI 태그 구성

| 태그 | 엔드포인트 | 설명 |
|------|-----------|------|
| Saju | POST /saju | 전체 사주 계산 (기존) |
| Saju | POST /saju/interpret | LLM 해석 (기존) |
| Saju Pillars | POST /saju/pillars | 사주팔자 기둥 |
| Saju Analysis | POST /saju/analysis | 분석 데이터 |
| Saju Fortune | POST /saju/fortune | 운세 데이터 |
| Saju Identity | POST /saju/identity | 정체성 카드 |

---

## 추적성 태그

- TAG: SPEC-API-002
- 관련 파일: `app/api/endpoints/saju.py`, `app/api/router.py`, `core/models/response.py`, `app/services/content_loader.py`
- 관련 테스트: `tests/test_api_saju.py`, `tests/test_api_saju_detail.py` (신규)
- 의존성: SPEC-UI-004 (격국 계산 로직, `/identity` 엔드포인트에 필요)
