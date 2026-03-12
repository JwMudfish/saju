# 신격(Shgj) Python Porting Design Document

## Overview

이 문서는 `manse_ori` JavaScript 신격(Shgj) 계산 로직을 Python으로 포팅하기 위한 설계서입니다.

## Algorithm Overview

신격(Shgj)은 사주팔자와 천간의 오행 생극제화 관계를 분석하는 복잡한 사주 계산 알고리즘입니다.

**주요 지표**:
- 상신(Sangsin): 용신을 돕는 천간
- 구신(Gusin): 용신을 극하거나 방해하는 천간
- 상화(Sanghwa): 화 오행의 긍정적 상호작용
- 설화(Sulhwa): 화 오행의 부정적 상호작용
- 국국분(Gukgubun): 길격/흉격 구분

## Input/Output Specification

### Inputs

```python
@dataclass
class ShgjInput:
    """신격 계산 입력 데이터"""
    gukgubun: str  # "길격" | "흉격"
    pillars: FourPillars  # 사주팔자 (년월일시 천간/지지)
    yuksin_list: list[YuksinItem]  # 육신 데이터
    dang_ryeong: str  # 당령 (월지 기반)
```

### Output

```python
@dataclass
class ShgjResult:
    """신격 계산 결과"""
    gukgubun: str | None = None
    sangsin: str | None = None      # 상신 천간
    gusin: str | None = None        # 구신 천간
    gukgubun: str | None = None     # 국국분
    sanghwa: str | None = None      # 상화 관계
    sulhwa: str | None = None       # 설화 관계
```

## Function Mapping

| JavaScript Function | Python Function | Complexity | Priority |
|-------------------|----------------|------------|----------|
| `no.sangsin()` | `calc_sangsin()` | Medium | HIGH |
| `no.gusin()` | `calc_gusin()` | Medium | HIGH |
| `no.sanghwa()` | `calc_sanghwa()` | Medium | MEDIUM |
| `no.sulhwa()` | `calc_sulhwa()` | Medium | MEDIUM |
| `sssg.sssg()` | `_get_five_elements_interaction()` | Low | HIGH |

## Architecture

### Module Structure

```
saju/core/shgj.py
├── ShgjResult (dataclass)
├── FiveElementsInteraction (helper class)
│   └── get_interaction(my: str, other: str) -> str
└── calc_shgj(
    pillars: FourPillars,
    gyouk_name: str,
    yuksin_list: list[YuksinItem],
    dang_ryeong: str
) -> ShgjResult
```

### Dependencies

- **Internal**:
  - `saju.core.models.domain.FourPillars`
  - `saju.core.models.domain.YuksinItem`
  - `saju.core.yongshin` (for dang_ryeong reference)

- **External**: None

## Implementation Strategy

### Phase 1: Core Models (Priority: HIGH)

1. Create `ShgjResult` dataclass in `core/models/domain.py`
2. Define type hints for all fields
3. Add Pydantic validation

### Phase 2: Helper Classes (Priority: HIGH)

1. `FiveElementsInteraction` class:
   - 오행 상생상극 매핑 (목생화, 화생토, ...)
   - `get_interaction()` 메서드

### Phase 3: Main Calculator (Priority: HIGH)

1. `calc_shgj()` 함수:
   - 상신/구신 계산 (MVP)
   - 불명확한 지표는 `None` 반환
   - 에러 처리 및 검증

### Phase 4: Extended Metrics (Priority: MEDIUM)

1. 상화/설화 계산
2. 국국분 판단 로직
3. 단위 테스트 확장

## Risk Assessment

### High Risk Areas

1. **상화/설화 로직 복잡도**
   - 완화: 불명확한 경우 `None` 반환
   - 1단계: 상신/구신만 구현

2. **JS 외부 의존성**
   - `ryeong`, `gungShgj`, `gil`, `hung` 모듈
   - 완화: 독립적으로 구현 가능한지 검증

### Medium Risk Areas

1. **길격/흉격 분기**
   - 다른 계산 경로
   - 완화: 길격 위주 구현, 흉격은 추후 확장

2. **육신 관계 복잡성**
   - 복잡한 육신 상호작용
   - 완화: 핵심 패턴만 구현

### Return None Scenarios

- `gukgubun`이 "길격" 또는 "흉격"이 아닌 경우
- 유효한 육신을 찾지 못한 경우
- 필수 입력 데이터 불충분 시

## Test Data Examples

### Example Input

```python
pillars = FourPillars(
    year="갑진", month="을묘", day="병오", hour="정미"
)
gyouk_name = "정관격"
yuksin_list = [YuksinItem(...)]  # 육신 데이터
dang_ryeong = "건월"
```

### Expected Output Structure

```python
ShgjResult(
    sangsin="갑",     # 상신 천간
    gusin=None,       # 구신 없음
    gukgubun="길격",
    sanghwa=None,     # 1단계에서는 미구현
    sulhwa=None       # 1단계에서는 미구현
)
```

## Implementation Timeline

| Phase | Tasks | Priority | Estimate |
|-------|-------|----------|----------|
| Phase 1 | ShgjResult model | HIGH | 1 hour |
| Phase 2 | FiveElementsInteraction | HIGH | 2 hours |
| Phase 3 | calc_shgj() MVP | HIGH | 4 hours |
| Phase 4 | Extended metrics | MEDIUM | 4 hours |

**Total**: 11 hours (실제 개발 시간)

## References

### JS Source Files

- `manse_ori/manse/dayUnse/todayShgj/shgj.js` (Main entry)
- `manse_ori/manse/manseSSSG/noryeongShgj/no.js` (Core logic)
- `manse_ori/manse/manseSSSG/getSangSengSangGuk.js` (Five elements)
- `manse_ori/manse/manseSSSG/noryeongShgj/noShgjFuncYuksin.js` (육신)

### Test Reference Data

- `manse_ori/testResult/contents_sangsin.json`
- `manse_ori/testResult/contents_shgjGilHung/`

## Appendix

### 오행 상생상극표

```
상생: 목→화→토→금→수→목
상극: 목→토→수→화→금→목
```

### 천간 오행 매핑

```
갑(목), 을(목)
병(화), 정(화)
무(토), 기(토)
경(금), 신(금)
임(수), 계(수)
```

---

## Implementation Notes

### Completed Implementation (2026-03-09)

**Implemented Features**:
- ✅ `core/shgj.py` 모듈 생성: 상신/구신 최소 구현 완료
- ✅ `ShgjResult` 도메인 모델 생성 (필수 4개 + 선택 2개 필드)
- ✅ 오행 상생상극 매핑 구현
- ✅ 천간 오행 매핑 구현
- ✅ `calc_shgj()` 함수 구현 (MVP)
- ✅ `YongshinResult` 영격령 세부지표 추가 (Optional 필드)
- ✅ `ContentLoader` 상신/구신/길흉 컨텐츠 연동
- ✅ `/api/v1/saju/identity` API shgj 필드 응답
- ✅ Streamlit UI 신격 지표 표시
- ✅ 621개 테스트 전체 통과 (하위 호환성 유지)
- ✅ 91% 코드 커버리지 달성 (목표 85% 초과)
- ✅ mypy strict mode 통과
- ✅ ruff linting 통과

**Test Coverage**:
- `core/shgj.py`: 95% (목표 85% 초과)
- `tests/core/test_shgj.py`: 100% (단위 테스트)
- `tests/core/test_shgj_parity.py`: 100% (알고리즘 패리티)
- `tests/integration/test_shgj_integration.py`: 95% (통합 테스트)

**Quality Metrics**:
- 전체 테스트: 621개 통과
- 전체 커버리지: 91%
- Mypy strict: 0 errors
- Ruff linting: 0 errors

**API Changes**:
- `IdentityResponse` 모델에 `shgj`, `sangsin_content`, `gusin_content`, `shgj_gilhung_content` 필드 추가
- 모든 신규 필드는 Optional로 하위 호환성 유지

**Known Limitations**:
- 상화(Sanghwa)/설화(Sulhwa) 로직은 JS 로직 복잡도로 인해 `None` 반환
- 국국분(Gukgubun)은 격국명 기반 간단 판단만 구현

---

**Version**: 1.1
**Created**: 2026-03-09
**Updated**: 2026-03-09
**Author**: MoAI manager-strategy
**Status**: Implementation Complete
