# SPEC-UI-004: 구현 계획

## 메타데이터

| 항목 | 내용 |
|------|------|
| SPEC ID | SPEC-UI-004 |
| TAG | SPEC-UI-004 |
| 우선순위 | High |

---

## 기술 접근 방식

### 전략: 점진적 확장 (Additive)

기존 `ContentLoader`와 `render_tab_identity`를 최소 변경으로 확장한다. 새 기능을 추가하는 방식으로 하위 호환성을 유지한다.

### 격국 계산 방식 결정

manse_ori의 격국 계산은 복잡하지만 (생지/왕지/고지 분기, 투간 조건),
**1차 구현**에서는 단순화된 접근 방식을 사용한다:

- `yuksin_list`에서 `target == "월지"`인 항목의 `yuksin`을 격국 결정 기준으로 사용
- 이 방식은 고지(辰戌丑未)와 왕지(子午卯酉)에서 대부분 정확하다
- 생지(寅申巳亥)의 경우 지장간 중기(m_jangan3)를 사용해야 하나, 1차에서는 정기(main) 기반으로 통일

**향후 개선 (이 SPEC 범위 외):** manse_ori chiguk.js의 전체 로직을 Python으로 포팅하는 `core/gyouk.py` 모듈 추가.

---

## 구현 마일스톤

### 우선순위 1: ContentLoader 확장

**파일:** `app/services/content_loader.py`

**작업 목록:**
1. `_GYOUK_PATH` 상수 추가 (`manse_ori/testResult/contents_gyouk.json`)
2. `ContentLoader.__init__` 에 `gyouk_path` 파라미터 추가 (기본값 None)
3. `_build_gyouk_map()` 메서드 구현 (subtitle → item 딕셔너리)
4. `get_gyouk_content(gyouk_name: str)` 메서드 구현
5. 모듈 레벨 `get_gyouk_content()` 편의 함수 추가

**의존성:** 없음 (독립적)

---

### 우선순위 2: 격국명 도출 함수

**파일:** `app/services/content_loader.py` 또는 `core/gyouk.py` (신규)

**작업 목록:**
1. `YUKSIN_TO_GYOUK` 매핑 딕셔너리 정의
2. `calc_gyouk_from_result(result: dict) -> str | None` 함수 구현
   - `result["yuksin_list"]`에서 `target == "월지"` 항목 조회
   - 해당 yuksin을 격국명으로 변환
3. `streamlit_app.py`에서 사용 가능하도록 import 경로 확인

**의존성:** 우선순위 1 완료 후 진행

---

### 우선순위 3: Streamlit UI 3-컬럼 확장

**파일:** `streamlit_app.py`

**작업 목록:**
1. `get_gyouk_content` import 추가 (`app/services/content_loader.py`)
2. `render_tab_identity` 함수 수정:
   - `col1, col2 = st.columns(2)` → `col1, col2, col3 = st.columns(3)`
   - 격국명 계산: `gyouk_name = _calc_gyouk_from_result(result)`
   - `col2`에 격국 카드 렌더링 코드 삽입
   - `col2` 내용(용신 카드)을 `col3`으로 이동
3. 내부 헬퍼 함수 `_calc_gyouk_from_result(result: dict) -> str | None` 추가

**의존성:** 우선순위 1, 2 완료 후 진행

---

### 우선순위 4: 테스트

**파일:** `tests/test_content_loader.py` (기존 확장), `tests/test_streamlit_gyouk.py` (신규)

**작업 목록:**
1. `ContentLoader.get_gyouk_content()` 단위 테스트
   - 정상 케이스: 10개 격국명 각각 조회 성공
   - 에러 케이스: 없는 격국명 → None 반환
   - 에러 케이스: 파일 없음 → 빈 딕셔너리, 경고 로그
2. `calc_gyouk_from_result()` 단위 테스트
   - 각 월지별 격국명 도출 테스트
   - `yuksin_list` 없는 케이스 → None 반환
3. `render_tab_identity` 통합 테스트 (선택)

**의존성:** 우선순위 1~3 완료 후 진행

---

## 기술 리스크 및 대응

| 리스크 | 확률 | 영향도 | 대응 방안 |
|--------|------|--------|---------|
| 격국 계산 부정확 (생지 경계 케이스) | 중 | 중 | 1차에서는 단순화 허용, TODO 주석으로 표시 |
| `contents_gyouk.json` 필드 누락 | 낮 | 낮 | `.get()` 방어 코드, None 처리 |
| Streamlit 3-컬럼 레이아웃 좁아짐 | 낮 | 낮 | 모바일 미지원 명시, 데스크탑 우선 |
| `_calc_gyouk_from_result` 의존성 | 낮 | 중 | streamlit_app.py에 내부 함수로 우선 구현 |

---

## 아키텍처 의사결정

### ADR-001: 격국 계산 위치

- **결정:** 1차 구현은 `streamlit_app.py` 내부 헬퍼 함수로 구현
- **이유:** `SajuResult`의 `yuksin_list` 필드로 간단히 도출 가능
- **향후:** `core/gyouk.py` 모듈로 분리하여 API에서도 활용 가능하게 (SPEC-API-002 의존)

### ADR-002: ContentLoader 싱글톤 확장

- **결정:** 기존 `_loader` 싱글톤을 재사용하고 `gyouk_map`을 초기화 시 로드
- **이유:** 파일 I/O 비용을 최소화하고 기존 패턴 유지
- **트레이드오프:** 격국 파일도 항상 로드되어 메모리 사용량 소폭 증가

---

## 파일 변경 요약

| 파일 | 변경 유형 | 주요 변경 내용 |
|------|---------|--------------|
| `app/services/content_loader.py` | 수정 | gyouk_path 파라미터, _build_gyouk_map, get_gyouk_content 추가 |
| `streamlit_app.py` | 수정 | render_tab_identity 3-컬럼 확장, 격국 카드 렌더링 |
| `tests/test_content_loader.py` | 수정 | 격국 콘텐츠 로더 테스트 추가 |

---

## 연관 SPEC

- SPEC-UI-003: 일간/용신 카드 구현 기준 (이번 SPEC의 패턴 참조)
- SPEC-API-002: 격국 계산 로직을 API 엔드포인트에서도 활용 (의존 관계)
