---
id: SPEC-CALC-001
type: acceptance
version: 1.0.0
---

# SPEC-CALC-001 인수 기준

## 1. 인수 시나리오

### 시나리오 AC-001: 갑(甲) 일간 기준 십이운성 정상 계산

**Given** 일간이 갑(甲, 양목)인 사주 계산 요청이 주어지고
**When** `calc_sibiunsung(day_gan="갑", target_ji=ji)` 를 각 지지에 대해 호출하면
**Then** 다음 결과가 반환되어야 한다:

| 지지 | 기대 십이운성 |
|------|------------|
| 해(亥) | 장생 |
| 자(子) | 목욕 |
| 축(丑) | 관대 |
| 인(寅) | 건록 |
| 묘(卯) | 제왕 |
| 진(辰) | 쇠 |
| 사(巳) | 병 |
| 오(午) | 사 |
| 미(未) | 묘 |
| 신(申) | 절 |
| 유(酉) | 태 |
| 술(戌) | 양 |

### 시나리오 AC-002: 을(乙) 일간 기준 십이운성 역방향 계산

**Given** 일간이 을(乙, 음목)인 사주 계산 요청이 주어지고
**When** `calc_sibiunsung(day_gan="을", target_ji=ji)` 를 각 지지에 대해 호출하면
**Then** 갑 일간의 역순 결과가 반환되어야 한다:

| 지지 | 기대 십이운성 |
|------|------------|
| 오(午) | 장생 |
| 사(巳) | 목욕 |
| 진(辰) | 관대 |
| 묘(卯) | 건록 |
| 인(寅) | 제왕 |
| 축(丑) | 쇠 |
| 자(子) | 병 |
| 해(亥) | 사 |
| 술(戌) | 묘 |
| 유(酉) | 절 |
| 신(申) | 태 |
| 미(未) | 양 |

> 근거: 음간은 양간의 장생 시작 지지와 반대되는 지지(해↔오)에서 장생하고 역방향으로 순환한다.

### 시나리오 AC-003: 역마살 판별 - 해당 케이스

**Given** 연지가 인(寅)이고 사주 내 신(申)이 포함된 계산 요청이 주어지면
**When** `calc_shinsal(year_ji="인", ...)` 를 호출하면
**Then** 결과 목록에 `name="역마살"` 항목이 포함되어야 한다

### 시나리오 AC-004: 역마살 판별 - 미해당 케이스

**Given** 연지가 인(寅)이고 사주 내 신(申)이 포함되지 않은 계산 요청이 주어지면
**When** `calc_shinsal(year_ji="인", ...)` 를 호출하면
**Then** 결과 목록에 `name="역마살"` 항목이 포함되지 않아야 한다

### 시나리오 AC-005: 도화살 판별

**Given** 연지가 자(子)이고 사주 내 유(酉)가 포함된 계산 요청이 주어지면
**When** `calc_shinsal(year_ji="자", ...)` 를 호출하면
**Then** 결과 목록에 `name="도화살"` 항목이 포함되어야 한다

### 시나리오 AC-006: 신살 없음 케이스

**Given** 연지가 자(子)이고 사주 내 역마살·도화살·화개살 해당 지지가 모두 없는 계산 요청이 주어지면
**When** `calc_shinsal(...)` 을 호출하면
**Then** 결과 목록이 빈 리스트(`[]`)로 반환되어야 한다

### 시나리오 AC-007: 세운 목록 생성 - 개수 및 현재 연도 마킹

**Given** `current_year=2026` 을 기준으로 세운 계산을 요청하면
**When** `calc_sewun(current_year=2026)` 을 호출하면
**Then** 다음 조건이 모두 충족되어야 한다:
- 반환된 목록의 길이가 11이어야 한다
- 2021년부터 2031년까지 각 연도에 대한 `SewunItem`이 포함되어야 한다
- `year=2026`인 항목의 `is_current` 값이 `True`이어야 한다
- 나머지 10개 항목의 `is_current` 값이 모두 `False`이어야 한다

### 시나리오 AC-008: 세운 60갑자 검증 - 병오(丙午)년

**Given** `current_year=2026` 을 기준으로 세운 계산을 요청하면
**When** `calc_sewun(current_year=2026)` 결과에서 `year=2026` 항목을 조회하면
**Then** `ganji.gan="병"`, `ganji.ji="오"` 이어야 한다 (2026년 = 병오년)

### 시나리오 AC-009: SajuResult 확장 필드 포함 검증

**Given** 유효한 생년월일시 및 성별 정보가 포함된 사주 계산 요청이 주어지면
**When** `SajuService.calculate(...)` 를 호출하면
**Then** 반환된 `SajuResult` 객체에 다음 필드가 모두 존재해야 한다:
- `jijanggan` - None이 아닌 딕셔너리
- `yuksin` - None이 아닌 리스트
- `ohang_ratio` - None이 아닌 `OHangRatio` 객체
- `sibiunsung` - None이 아닌 리스트
- `shinsal` - 리스트 (빈 리스트 허용)
- `sewun` - 11개 항목의 리스트
- `pillar_meanings` - 4개 항목의 리스트

### 시나리오 AC-010: 시주 없음 시 시주 십이운성 생략

**Given** 시주(时柱)를 입력하지 않은(hour=None) 사주 계산 요청이 주어지면
**When** `SajuService.calculate(hour=None, ...)` 를 호출하면
**Then** `SajuResult.sibiunsung` 목록의 길이가 3이어야 하고 (시주 항목 없음)
**And** `SajuResult.hour_pillar` 가 None이어야 한다

### 시나리오 AC-011: 기존 응답 필드 하위 호환성 유지

**Given** 유효한 사주 계산 요청이 주어지면
**When** `SajuService.calculate(...)` 를 호출하면
**Then** 기존 필드(`year_pillar`, `month_pillar`, `day_pillar`, `hour_pillar`, `deun`)가 변경 없이 정상 반환되어야 한다

### 시나리오 AC-012: 기둥별 의미 내용 검증

**Given** 유효한 사주 계산 요청이 주어지면
**When** `SajuResult.pillar_meanings` 를 조회하면
**Then** 다음 4개 기둥 의미가 포함되어야 한다:
- `pillar="연주"`, `meaning` 에 "조상" 또는 "어린시절" 포함
- `pillar="월주"`, `meaning` 에 "부모" 또는 "직업" 포함
- `pillar="일주"`, `meaning` 에 "나" 또는 "배우자" 포함
- `pillar="시주"`, `meaning` 에 "자녀" 또는 "말년" 포함

### 시나리오 AC-013: 오행비율 합계 검증

**Given** 유효한 사주 계산 요청이 주어지면
**When** `SajuResult.ohang_ratio` 를 조회하면
**Then** `mok + hwa + to + geum + su` 의 합이 100.0 (±0.01 오차 허용)이어야 한다

---

## 2. 엣지 케이스

### EC-001: 토 오행 음간 (기己) 십이운성

**Given** 일간이 기(己, 음토)인 사주
**When** 십이운성 계산 시
**Then** 토 오행 역방향(양토와 반대) 계산이 적용되어야 한다

### EC-002: 60갑자 경계 - 갑자(甲子)년 직전/직후 세운

**Given** `current_year=2044` (갑자년)
**When** `calc_sewun(current_year=2044)` 호출 시
**Then** 2039년(갑신)부터 2049년(기사)까지 간지 오류 없이 반환되어야 한다

### EC-003: 여러 신살이 동시에 해당되는 사주

**Given** 역마살과 도화살이 동시에 해당되는 연지·지지 조합
**When** `calc_shinsal(...)` 호출 시
**Then** 두 신살이 모두 결과 목록에 포함되어야 한다

### EC-004: 육신 계산 - 일간과 동일 오행

**Given** 일간이 갑(甲)이고 대상 천간도 갑(甲)인 경우
**When** 육신 계산 시
**Then** "비견"이 반환되어야 한다

---

## 3. 성능 기준

| 항목 | 기준 |
|------|------|
| 전체 사주 계산 응답 시간 (신규 필드 포함) | 기존 대비 +200ms 이내 |
| 단독 십이운성 계산 (`calc_sibiunsung` 1회) | 1ms 이내 |
| 단독 신살 계산 (`calc_shinsal` 1회) | 5ms 이내 |
| 단독 세운 계산 (`calc_sewun` 1회) | 5ms 이내 |

---

## 4. 품질 게이트 (Definition of Done)

다음 조건이 모두 충족되어야 SPEC-CALC-001이 완료된 것으로 간주한다:

- [ ] `uv run pytest tests/ -q` 실행 결과 기존 231개 테스트 모두 통과
- [ ] `uv run pytest tests/ --cov=core` 결과 신규 모듈 커버리지 85% 이상
- [ ] `uv run ruff check .` 오류 0건
- [ ] `uv run mypy core/ app/` 오류 0건
- [ ] AC-001 ~ AC-013 시나리오 모두 통과
- [ ] EC-001 ~ EC-004 엣지 케이스 테스트 통과
- [ ] `SajuResult` 스키마 변경이 기존 API 응답 직렬화를 파손하지 않음 확인
- [ ] 모든 신규 공개 함수에 docstring 작성 완료
