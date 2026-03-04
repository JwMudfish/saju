---
id: SPEC-CORE-001
version: 1.0.0
status: draft
created: 2026-02-27
updated: 2026-02-27
author: jw
---

## HISTORY

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0.0 | 2026-02-27 | jw | 최초 작성 |

---

## 인수 기준 개요 (Acceptance Criteria Overview)

본 문서는 SPEC-CORE-001의 인수 기준을 Given/When/Then 형식으로 정의한다. 모든 기준은 pytest 테스트로 자동화되어야 하며, `manse_ori` 레퍼런스 케이스와의 100% 일치를 최종 목표로 한다.

---

## AC-001: 기본 4주 계산 - 갑자년 남성

**관련 요구사항**: FR-006, FR-004

```
Given 생년월일시: 1984년 4월 15일 10시, 남성, 양력
      is_lunar = False

When  calc_four_pillars(SajuRequest(
          year=1984, month=4, day=15, hour=10, gender="male"
      )) 호출

Then  year_pillar == GanJi(gan="갑", ji="자")
And   month_pillar == GanJi(gan="병", ji="진")
And   day_pillar == GanJi(gan="경", ji="술")
And   hour_pillar == GanJi(gan="무", ji="오")
```

**테스트 파일**: `tests/test_pillar.py::test_basic_four_pillars_1984`

**검증 포인트**:
- 1984년 = 갑자년 (60갑자 인덱스 0번)
- 4월 15일 = 절입 기준으로 진월(辰月) → 월간 병(丙)
- 일주 계산의 기준일 기준 경과일수 정확성
- 오전 10시 = 사시(巳時) → 무(戊) 천간

---

## AC-002: 음력 입력 처리

**관련 요구사항**: FR-011, FR-006

```
Given 생년월일: 음력 1990년 1월 1일
      is_lunar = True, is_leap_month = False

When  calc_four_pillars(SajuRequest(
          year=1990, month=1, day=1, hour=None,
          gender="male", is_lunar=True
      )) 호출

Then  내부적으로 lunar_to_solar(1990, 1, 1, False) 가 먼저 호출됨
And   반환된 양력 날짜로 4주 계산 수행
And   올바른 GanJi 결과 반환 (양력 1990년 1월 27일 기준)
And   hour_pillar == None
```

**테스트 파일**: `tests/test_calendar.py::test_lunar_to_solar_1990_jan`

**검증 포인트**:
- 음력 1990년 1월 1일 = 양력 1990년 1월 27일 (일반적인 경우)
- 실제 값은 `manse_ori` 변환 결과와 대조하여 확인
- 윤달 플래그가 정상적으로 무시됨 (is_leap_month=False)

---

## AC-003: 절입 시각 기준 월주 결정

**관련 요구사항**: FR-007

```
Given  절입 직전 출생: 절입 시각 - 30분 (예: 특정 달 절입 2024년 3월 5일 17:22)
       출생 시각 = 2024년 3월 5일 16:52 (절입 전 30분)

When   calc_month_pillar(datetime(2024, 3, 5, 16, 52)) 호출

Then   이전 달(2월 기준) 월주 천간 반환
       (2월의 천간이 "갑"이면 "갑" 반환)


Given  절입 직후 출생: 절입 시각 + 30분
       출생 시각 = 2024년 3월 5일 17:52 (절입 후 30분)

When   calc_month_pillar(datetime(2024, 3, 5, 17, 52)) 호출

Then   현재 달(3월 기준) 월주 천간 반환
       (3월의 천간이 "을"이면 "을" 반환)
```

**테스트 파일**: `tests/test_solar_term.py::test_month_pillar_boundary_cases`

**검증 포인트**:
- `julgi.json`에서 해당 연월의 절입 시각 정확히 로드
- 시각 비교 시 분(minute) 단위까지 정확히 처리
- 경계값 케이스: 절입 시각과 정확히 동일한 분에 태어난 경우 처리 방식

---

## AC-004: 지장간 추출

**관련 요구사항**: FR-008

```
Given 지지: "자(子)"

When  get_hidden_stems("자") 호출

Then  HiddenStems(
          initial="임",   # 여기(餘氣)
          middle=None,    # 중기 없음
          main="계"       # 정기(正氣)
      ) 반환


Given 지지: "축(丑)"

When  get_hidden_stems("축") 호출

Then  HiddenStems(
          initial="계",   # 여기
          middle="신",    # 중기
          main="기"       # 정기
      ) 반환


Given 지지: "오(午)"

When  get_hidden_stems("오") 호출

Then  HiddenStems(
          initial="병",   # 여기
          middle=None,    # 중기 없음 (오는 중기 없음)
          main="정"       # 정기
      ) 반환
```

**테스트 파일**: `tests/test_jijanggan.py::test_hidden_stems_all_12_ji`

**검증 포인트**:
- 12지지 전체 테스트 (자·축·인·묘·진·사·오·미·신·유·술·해)
- `manse_ori/jijanggan.js` 테이블과 100% 일치 확인
- `None` 중기 정확히 처리

---

## AC-005: 육신 계산

**관련 요구사항**: FR-009

```
Given 일간: "병(丙)" - 火 陽
      대상 천간: "임(壬)" - 水 陽

When  calc_yuksin(day_gan="병", target_gan="임") 호출

Then  result == "편관"
      # 이유: 壬水가 丙火를 극(水克火) → 관성(官星)
      #       丙(陽)과 壬(陽)은 동성 → 편(偏)
      # ∴ 편관


Given 일간: "병(丙)" - 火 陽
      대상 천간: "계(癸)" - 水 陰

When  calc_yuksin(day_gan="병", target_gan="계") 호출

Then  result == "정관"
      # 이유: 癸水가 丙火를 극 → 관성
      #       丙(陽)과 癸(陰)는 이성 → 정(正)
      # ∴ 정관


Given 일간: "갑(甲)" - 木 陽
      대상 천간: "갑(甲)" - 木 陽

When  calc_yuksin(day_gan="갑", target_gan="갑") 호출

Then  result == "비견"
      # 이유: 같은 木 → 비겁(比劫)
      #       甲(陽)과 甲(陽) 동성 → 비견(比肩)
```

**테스트 파일**: `tests/test_yuksin.py::test_yuksin_all_combinations`

**검증 포인트**:
- 10 × 10 = 100가지 천간 조합 전체 테스트
- `manse_ori/yuksin.js` 결과와 100% 일치
- 오행 상생·상극 관계 정확성
- 음양 동일성 판별 정확성

---

## AC-006: 합충 분석 - 삼합

**관련 요구사항**: FR-010

```
Given 사주 지지 목록: ["자", "진", "신"] (申子辰 水局)

When  find_samhap(["자", "진", "신"]) 호출

Then  [
          HapResult(
              type="삼합",
              jis=["신", "자", "진"],
              result_ohang="수",
              result_guk="수국"
          )
      ] 반환


Given 사주 지지 목록: ["인", "오", "술"] (寅午戌 火局)

When  find_samhap(["인", "오", "술"]) 호출

Then  [
          HapResult(
              type="삼합",
              jis=["인", "오", "술"],
              result_ohang="화",
              result_guk="화국"
          )
      ] 반환


Given 사주 지지 목록: ["자", "묘", "오", "유"]  (삼합 없음)

When  find_samhap(["자", "묘", "오", "유"]) 호출

Then  [] (빈 리스트) 반환
```

**테스트 파일**: `tests/test_hapchung.py::test_samhap_detection`

**검증 포인트**:
- 4가지 삼합 전체 테스트: 신자진(水), 해묘미(木), 인오술(火), 사유축(金)
- 지지 순서 무관 (입력 순서에 상관없이 감지)
- 반삼합(半三合) 처리 방식 확인 (manse_ori 동작 기준)

---

## AC-007: 대운 계산 (순행)

**관련 요구사항**: FR-012

```
Given 1984년생 남성 (갑자년 = 甲 陽年)
      양력 생일: 4월 15일
      (甲 陽干 + 男性 = 순행)

When  calc_deun_direction(year_gan="갑", gender="male") 호출

Then  "forward" (순행) 반환


When  calc_deun_number(
          birth_dt=datetime(1984, 4, 15),
          gender="male",
          julgi_cache=julgi_cache
      ) 호출

Then  deun_number 반환 (manse_ori 기준 정확한 값)
      # 계산: 다음 절기(입하, 1984년 5월 5일경)까지의 일수 ÷ 3


When  calc_deun_list(
          month_pillar=GanJi(gan="병", ji="진"),
          direction="forward",
          deun_number=deun_number
      ) 호출

Then  [
          DeunItem(age=deun_number,     ganji=GanJi(gan="정", ji="사")),
          DeunItem(age=deun_number+10,  ganji=GanJi(gan="무", ji="오")),
          DeunItem(age=deun_number+20,  ganji=GanJi(gan="기", ji="미")),
          # ...
      ] 반환
      # 순행: 진(辰) → 사(巳) → 오(午) → 미(未) → ...
```

**테스트 파일**: `tests/test_deun.py::test_deun_forward_1984_male`

**검증 포인트**:
- 대운수 계산값이 `manse_ori` 결과와 일치
- 순행 시 지지 진행 방향 정확성 (자→축→인→...→해→자)
- 천간도 함께 순행 진행

---

## AC-008: 대운 계산 (역행)

**관련 요구사항**: FR-013

```
Given 1985년생 여성 (을축년 = 乙 陰年)
      양력 생일: 6월 20일
      (乙 陰干 + 女性 = 역행)

When  calc_deun_direction(year_gan="을", gender="female") 호출

Then  "reverse" (역행) 반환


When  calc_deun_number(
          birth_dt=datetime(1985, 6, 20),
          gender="female",
          julgi_cache=julgi_cache
      ) 호출

Then  대운수 반환
      # 계산: 이전 절기(망종, 1985년 6월 6일경)까지의 역산 일수 ÷ 3
```

**테스트 파일**: `tests/test_deun.py::test_deun_reverse_1985_female`

---

## AC-009: 지원 범위 외 날짜 처리

**관련 요구사항**: FR-015, FR-005

```
Given 생년: 1599 (지원 범위 미만)

When  calc_four_pillars(SajuRequest(
          year=1599, month=1, day=1, gender="male"
      )) 호출

Then  ValueError 발생
And   str(error)에 "1600" 포함
And   str(error)에 "2100" 포함
And   str(error)에 "1599" 포함 (입력값 포함)


Given 생년: 2101 (지원 범위 초과)

When  calc_four_pillars(SajuRequest(
          year=2101, month=1, day=1, gender="male"
      )) 호출

Then  ValueError 발생
```

**테스트 파일**: `tests/test_pillar.py::test_year_range_validation`

---

## AC-010: 시주 없음 처리

**관련 요구사항**: FR-014

```
Given 출생 시각 미입력
      SajuRequest(year=1990, month=5, day=20, hour=None, gender="female")

When  calc_four_pillars(request) 호출

Then  result.four_pillars.year_pillar is not None   # 년주 계산됨
And   result.four_pillars.month_pillar is not None  # 월주 계산됨
And   result.four_pillars.day_pillar is not None    # 일주 계산됨
And   result.four_pillars.hour_pillar is None       # 시주 없음
And   result 나머지 필드 (yuksin 등) 는 3주 기준으로 계산됨
```

**테스트 파일**: `tests/test_pillar.py::test_no_birth_hour`

---

## AC-011: 성능 기준

**관련 요구사항**: FR-003 (캐시), 제약사항 5.1

```
Given julgi.json이 이미 캐시에 로드된 상태
      유효한 SajuRequest (1984년, 양력)

When  calc_four_pillars(request) 실행 시간 측정 (timeit 10회 평균)

Then  실행 시간 < 500ms
And   메모리 증가량 < 100MB per 단일 요청


Given 서버 최초 시작 (julgi.json 미캐시 상태)

When  get_julgi_cache() 최초 호출

Then  로드 시간 < 2,000ms
And   두 번째 호출 시 캐시에서 반환 (동일 객체)
```

**테스트 파일**: `tests/test_solar_term.py::test_julgi_cache_singleton`
**테스트 파일**: `tests/test_integration.py::test_performance_benchmark`

---

## AC-012: 오행 비율 계산

**관련 요구사항**: FR-006 (4주 계산 완료 후 분석)

```
Given 계산된 4주 (8간지)
      year_pillar = GanJi(gan="갑", ji="자")   # 갑=木, 자=水
      month_pillar = GanJi(gan="병", ji="진")  # 병=火, 진=土
      day_pillar = GanJi(gan="경", ji="술")    # 경=金, 술=土
      hour_pillar = GanJi(gan="무", ji="오")   # 무=土, 오=火

When  calc_ohang_ratio(four_pillars) 호출

Then  ratio.total == 100.0  (합계 100%)
And   0.0 <= ratio.mok <= 100.0   # 목(木) 비율
And   0.0 <= ratio.hwa <= 100.0   # 화(火) 비율
And   0.0 <= ratio.to <= 100.0    # 토(土) 비율
And   0.0 <= ratio.geum <= 100.0  # 금(金) 비율
And   0.0 <= ratio.su <= 100.0    # 수(水) 비율
And   sum([ratio.mok, ratio.hwa, ratio.to, ratio.geum, ratio.su]) == pytest.approx(100.0)
```

**테스트 파일**: `tests/test_ohang.py::test_ohang_ratio_sum_100`

---

## AC-013: manse_ori 레퍼런스 케이스 100% 일치

**관련 요구사항**: FR-006, FR-007, FR-008, FR-009, FR-010

```
Given manse_ori 레퍼런스 케이스 60개 이상
      각 케이스 형식:
      {
          "input": {
              "year": 1984,
              "month": 4,
              "day": 15,
              "hour": 10,
              "gender": "male",
              "is_lunar": false
          },
          "expected": {
              "year_pillar": {"gan": "갑", "ji": "자"},
              "month_pillar": {"gan": "병", "ji": "진"},
              "day_pillar": {"gan": "경", "ji": "술"},
              "hour_pillar": {"gan": "무", "ji": "오"}
          }
      }

When  @pytest.mark.parametrize("case", reference_cases)
      def test_reference_case(case):
          request = SajuRequest(**case["input"])
          result = calc_four_pillars(request)
          ...

Then  모든 60+ 케이스에서 4주 계산 결과 100% 일치
And   pytest 결과: PASSED (0 failed)
```

**테스트 파일**: `tests/test_integration.py::test_all_reference_cases`

**통과 기준**: 이 테스트가 통과해야만 프로덕션 배포 가능

---

## AC-014: SolarTermNotFoundError 처리

**관련 요구사항**: FR-016

```
Given julgi.json에 1599년 데이터 없음

When  get_solar_term_entry(year=1599, month=3) 호출

Then  SolarTermNotFoundError 발생
And   error.year == 1599
And   error.message에 "절기 데이터" 포함
```

**테스트 파일**: `tests/test_solar_term.py::test_solar_term_not_found`

---

## AC-015: 음력 윤달 처리

**관련 요구사항**: FR-011

```
Given 음력 1984년 윤10월 1일
      is_lunar = True, is_leap_month = True

When  lunar_to_solar(year=1984, month=10, day=1, is_leap=True) 호출

Then  올바른 양력 날짜 반환 (manse_ori 기준값과 동일)
And   윤달이 아닌 음력 10월 1일과 다른 양력 날짜


Given 음력 1984년 10월 1일 (윤달 아님)

When  lunar_to_solar(year=1984, month=10, day=1, is_leap=False) 호출

Then  윤달(is_leap=True) 결과와 다른 날짜 반환
```

**테스트 파일**: `tests/test_calendar.py::test_leap_month_distinction`

---

## AC-016: InvalidLunarDateError 처리

**관련 요구사항**: FR-017

```
Given 음력 2000년 2월 30일 (2월은 최대 29일)

When  lunar_to_solar(year=2000, month=2, day=30, is_leap=False) 호출

Then  InvalidLunarDateError 발생
And   error.message에 "유효 범위" 또는 "최대" 포함
```

**테스트 파일**: `tests/test_calendar.py::test_invalid_lunar_date`

---

## 완료 조건 (Definition of Done)

모든 인수 기준이 통과되기 위한 필수 조건:

### 기능적 완료 조건

| 조건 | 검증 방법 |
|------|----------|
| AC-001 ~ AC-016 전체 pytest 통과 | `pytest tests/ -v` |
| `manse_ori` 60+ 레퍼런스 케이스 100% 일치 | `pytest tests/test_integration.py -v` |
| 음력 변환 정확도 (manse_ori 동일) | `pytest tests/test_calendar.py -v` |

### 품질 완료 조건

| 조건 | 검증 명령 |
|------|---------|
| 테스트 커버리지 ≥ 85% | `pytest --cov=core --cov-report=term-missing` |
| `mypy --strict` 오류 0건 | `mypy core/` |
| `ruff check` 오류 0건 | `ruff check core/ tests/` |
| `ruff format --check` 통과 | `ruff format --check .` |

### 성능 완료 조건

| 조건 | 기준값 |
|------|--------|
| 단일 사주 계산 시간 | < 500ms (캐시 후) |
| `julgi.json` 최초 로드 시간 | < 2,000ms |
| 메모리 증가량 | < 100MB per 요청 |
