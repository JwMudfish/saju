# SPEC-UI-003 인수 기준

## TAG: SPEC-UI-003

---

## 완료 정의 (Definition of Done)

- [ ] 기존 테스트 452개 전체 통과
- [ ] 신규 테스트 커버리지 85% 이상 유지
- [ ] `uv run ruff check .` 오류 없음
- [ ] `uv run mypy app/ core/` 타입 오류 없음
- [ ] API 응답에 `yongshin` 필드 포함 확인
- [ ] Streamlit 앱에 6번째 탭 "나의 정체성" 표시

---

## 인수 테스트 시나리오

### TC-001: ContentLoader - 일간 매핑 정확성

```
Given: ContentLoader가 초기화됨
When: get_ilgan_content("갑") 호출
Then:
  - 반환값이 None이 아님
  - 반환값["ilgan"] == "갑목일간"
  - 반환값["ilganDesciption"] == "실수는없다"
  - 반환값["subtitle"]이 "#실수는_없다" 포함
  - 반환값["contents"]가 비어 있지 않음
```

```
Given: ContentLoader가 초기화됨
When: 10개 일간(갑/을/병/정/무/기/경/신/임/계) 각각에 대해 get_ilgan_content() 호출
Then: 모든 호출이 None이 아닌 dict를 반환함
```

```
Given: ContentLoader가 초기화됨
When: get_ilgan_content("존재하지않는값") 호출
Then: None을 반환함 (예외 발생하지 않음)
```

### TC-002: ContentLoader - 용신 매핑 정확성

```
Given: ContentLoader가 초기화됨
When: get_yongsin_content("계") 호출
Then:
  - 반환값이 None이 아님
  - 반환값["title"] == "yongsin_1"
  - 반환값["subtitle"]에 "癸" 포함
  - 반환값["contents"]가 비어 있지 않음
```

```
Given: ContentLoader가 초기화됨
When: 8개 용신(갑/을/병/정/경/신/임/계) 각각에 대해 get_yongsin_content() 호출
Then: 모든 호출이 None이 아닌 dict를 반환함
```

```
Given: ContentLoader가 초기화됨
When: get_yongsin_content("무") 호출 (매핑 없는 값)
Then: None을 반환함 (예외 발생하지 않음)
```

### TC-003: SajuService - yongshin 필드 포함

```
Given: SajuService 인스턴스
When: calculate(birth_year=1984, birth_month=4, birth_day=15,
                birth_hour=12, is_lunar=False, is_leap_month=False,
                gender="male") 호출
Then:
  - 반환된 SajuResult의 yongshin이 None이 아님
  - yongshin.dang_ryeong이 갑/을/병/정/경/신/임/계 중 하나임
  - yongshin.heuisin이 갑/을/병/정/경/신/임/계 중 하나임
```

```
Given: SajuService 인스턴스
When: calculate(birth_year=1990, birth_month=1, birth_day=1,
                birth_hour=None, is_lunar=False, is_leap_month=False,
                gender="female") 호출 (시각 미상)
Then:
  - 예외가 발생하지 않음
  - 반환된 SajuResult의 yongshin이 None이 아님
  - yongshin.dang_ryeong이 유효한 천간 문자임
```

### TC-004: API 엔드포인트 - 응답 스키마 호환성

```
Given: FastAPI 테스트 클라이언트
When: POST /api/v1/saju 요청 (유효한 입력값)
Then:
  - HTTP 200 응답
  - 응답 JSON에 "yongshin" 키가 존재함
  - response["yongshin"]["dang_ryeong"]이 존재함
  - response["yongshin"]["heuisin"]이 존재함
  - 기존 필드(year_pillar, month_pillar, day_pillar, deun 등) 모두 유지됨
```

### TC-005: Streamlit UI - 탭 구조

```
Given: Streamlit 앱에 사주 계산 결과가 로딩됨
When: 탭 목록을 확인함
Then:
  - 탭 수가 6개임
  - 6번째 탭 레이블이 "🌟 나의 정체성"을 포함함
```

### TC-006: Streamlit UI - 일간 카드 표시

```
Given: 1984년 4월 15일생 남성의 사주 결과가 로딩됨
When: "🌟 나의 정체성" 탭을 클릭함
Then:
  - 일간 섹션이 표시됨
  - 해당 일간에 맞는 ilganDesciption이 제목으로 표시됨
  - subtitle (해시태그들)이 표시됨
  - contents 본문이 표시됨
```

### TC-007: Streamlit UI - 용신 카드 표시

```
Given: 사주 계산 결과에 yongshin.dang_ryeong 값이 있음
When: "🌟 나의 정체성" 탭이 활성화됨
Then:
  - 용신 섹션이 표시됨
  - 용신에 맞는 subtitle(유형명/능력/한자)이 표시됨
  - tag(해시태그)가 표시됨
  - contents 본문이 표시됨
```

### TC-008: Streamlit UI - 데이터 없음 안전 처리

```
Given: yongshin 데이터가 API 응답에 없는 경우 (yongshin=None)
When: "🌟 나의 정체성" 탭이 렌더링됨
Then:
  - 예외/오류 없이 렌더링됨
  - 용신 섹션에 안내 메시지가 표시됨
  - 앱이 정상 작동을 유지함
```

```
Given: ContentLoader에서 매핑 결과가 None인 경우
When: "🌟 나의 정체성" 탭이 렌더링됨
Then:
  - 예외/오류 없이 렌더링됨
  - 해당 섹션에 안내 메시지가 표시됨
```

### TC-009: 회귀 테스트 - 기존 기능 유지

```
Given: 기존 5개 탭이 정상 동작하던 상태
When: SPEC-UI-003 변경 사항 적용 후 앱 실행
Then:
  - 탭 1~5 (사주 원국, 십성 분석, 운의 흐름, 세부 지표, AI 해석) 정상 동작
  - 기존 API 응답 필드 모두 유지
  - 기존 테스트 452개 전체 통과
```

---

## 품질 게이트 기준

| 기준 | 목표값 | 측정 방법 |
|------|--------|----------|
| 전체 테스트 통과율 | 100% | `uv run pytest tests/ -q` |
| 코드 커버리지 | 85% 이상 | `uv run pytest tests/ --cov=core --cov=app` |
| Ruff lint 오류 | 0개 | `uv run ruff check .` |
| 타입 체크 오류 | 0개 | `uv run mypy app/ core/` |

---

## 검증 방법

### 수동 검증 절차

1. 백엔드 서버 시작: `uv run uvicorn app.main:app --reload`
2. Streamlit 앱 시작: `uv run streamlit run streamlit_app.py`
3. 사이드바에 생년월일 입력 후 "사주 계산" 버튼 클릭
4. "🌟 나의 정체성" 탭 클릭
5. 일간 카드와 용신 카드가 정확히 표시되는지 확인
6. 시각 미상 체크박스 선택 후 재계산하여 용신 카드 표시 확인

### 자동 검증 명령

```bash
# 전체 테스트 실행
uv run pytest tests/ -q --no-cov

# 커버리지 포함 실행
uv run pytest tests/ --cov=core --cov=app --cov-report=term-missing

# 린트 검사
uv run ruff check .

# 포맷 검사
uv run ruff format --check .
```
