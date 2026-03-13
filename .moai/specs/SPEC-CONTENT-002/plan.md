# SPEC-CONTENT-002 실행 계획

## 코드 스타일 기준

> 모든 구현은 아래 공통 컨벤션 문서를 준수해야 합니다.
> @.moai/project/coding-conventions.md

## 선행 작업: JS 로직 분석

SPEC 실행 전 반드시 다음 JS 파일을 분석하여 Python 포팅 설계서를 작성해야 한다:

1. `manse_ori/manse/manseSSSG/noryeongShgj/no.js` — 신격 메인 로직
2. `manse_ori/manse/manseSSSG/noryeongShgj/noShgjFuncYuksin.js` — 육신 기반 판단
3. `manse_ori/manse/manseSSSG/getSangSengSangGuk.js` — 상화/설화 계산
4. `manse_ori/manse/dayUnse/todayShgj/shgj.js` — 일별 신격 계산

## 구현 순서

### Step 1: JS 분석 및 설계 (Explore 에이전트)
- 위 4개 JS 파일 분석
- Python 알고리즘 설계서 작성
- 불명확한 부분 명시 (None 반환 처리 목록)

### Step 2: core/models/domain.py 수정
- `ShgjResult` BaseModel 추가 (모든 필드 Optional)
- `YongshinResult` 영격령 세부지표 필드 추가

### Step 3: core/shgj.py 신규 생성
- `calc_shgj()` 함수 구현
- JS 로직 Python 포팅
- 명확하지 않은 로직은 None 반환

### Step 4: core/yongshin.py 수정
- `calc_yongshin()`에 영격령 세부지표 계산 추가
- 하위 호환성 유지 (기존 반환값 변경 없음)

### Step 5: ContentLoader 확장
- 상신/구신/길흉 컨텐츠 로드 메서드 추가

### Step 6: SajuService 통합
- `saju_service.py`의 `calculate()` 메서드에 `calc_shgj()` 통합

### Step 7: API 및 UI 수정
- `IdentityResponse` 확장
- `get_identity()` 엔드포인트 수정
- Streamlit 탭 수정

### Step 8: 테스트 작성
- `tests/core/test_shgj.py` 신규
- 기존 테스트 전체 통과 확인

## 의존성

- SPEC-CONTENT-001 완료 필요 (ContentLoader 확장 패턴)
- manse_ori JS 로직 분석 완료 필요
- manse_ori 결과 JSON 파일 → 기준값 확인
