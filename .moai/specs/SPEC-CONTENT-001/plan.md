# SPEC-CONTENT-001 실행 계획

## 코드 스타일 기준

> 모든 구현은 아래 공통 컨벤션 문서를 준수해야 합니다.
> @.moai/project/coding-conventions.md

## 구현 순서

### Step 1: ContentLoader 확장 (core)
- `content_loader.py`에 경로 상수 추가
- `DANG_RYEONG_TO_HISIN10_DIR` 매핑 테이블 추가
- `get_hisin_content()`, `get_hisin_gisin_content()`, `get_salary_content()` 메서드 추가
- 모듈 수준 편의 함수 추가

### Step 2: IdentityResponse 확장
- `core/models/response.py`의 `IdentityResponse`에 Optional 필드 3개 추가

### Step 3: API 엔드포인트 수정
- `saju.py`의 `get_identity()`에서 신규 ContentLoader 메서드 호출

### Step 4: Streamlit UI 수정
- "나의 정체성" 탭에 희신 컨텐츠 섹션 추가

### Step 5: 테스트 추가
- `tests/services/test_content_loader.py` 신규 메서드 테스트
- `tests/api/` 엔드포인트 응답 필드 테스트

## 의존성

- 기존 `ContentLoader` 패턴 재사용 (신규 패턴 없음)
- `calc_heuisin()` 결과(희신 천간) → Hisin10 디렉토리 매핑
- `yuksin_list` → salary 키 매핑 (JSON 구조 확인 필요)
