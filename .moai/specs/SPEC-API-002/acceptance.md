# SPEC-API-002: 인수 기준

## 메타데이터

| 항목 | 내용 |
|------|------|
| SPEC ID | SPEC-API-002 |
| TAG | SPEC-API-002 |

---

## 품질 게이트

- 테스트 커버리지: 85% 이상 (신규/수정 코드 기준)
- LSP 오류: 0개
- Lint 오류: 0개
- 기존 `POST /api/v1/saju` 회귀: 0개

---

## 시나리오 1: 하위 호환성 보장

### TC-API-002-01: 기존 /saju 엔드포인트 유지

```gherkin
Given API 서버가 실행 중이고
  And 유효한 SajuAPIRequest 페이로드가 있을 때
When POST /api/v1/saju 요청을 보내면
Then HTTP 200 응답이 반환되어야 한다
  And 응답 본문은 SajuResult 스키마와 일치해야 한다
  And 응답에 year_pillar, month_pillar, day_pillar, deun, yuksin_list 필드가 포함되어야 한다
```

### TC-API-002-02: 기존 /saju/interpret 엔드포인트 유지

```gherkin
Given API 서버가 실행 중이고
  And 유효한 InterpretRequest 페이로드가 있을 때
When POST /api/v1/saju/interpret 요청을 보내면
Then HTTP 200 응답이 반환되어야 한다
  And 응답 스키마는 변경 전과 동일해야 한다
```

---

## 시나리오 2: /saju/pillars 엔드포인트

### TC-API-002-03: 유효한 요청으로 4기둥 반환

```gherkin
Given API 서버가 실행 중이고
  And birth_year=1990, birth_month=5, birth_day=15, birth_hour=14
  And is_lunar=false, gender="male" 페이로드가 있을 때
When POST /api/v1/saju/pillars 요청을 보내면
Then HTTP 200 응답이 반환되어야 한다
  And 응답에 year_pillar, month_pillar, day_pillar, hour_pillar 필드가 포함되어야 한다
  And 각 pillar는 gan, ji 필드를 가져야 한다
  And 응답에 pillar_meanings 필드가 포함되어야 한다
```

### TC-API-002-04: 시각 미상 (birth_hour=null) 요청

```gherkin
Given birth_hour=null인 페이로드가 있을 때
When POST /api/v1/saju/pillars 요청을 보내면
Then HTTP 200 응답이 반환되어야 한다
  And 응답의 hour_pillar는 null이어야 한다
```

### TC-API-002-05: pillars 응답에 analysis 필드 미포함 확인

```gherkin
Given 유효한 요청 페이로드가 있을 때
When POST /api/v1/saju/pillars 요청을 보내면
Then 응답에 yuksin_list, hapchung, ohang_ratio, deun 필드가 없어야 한다
```

### TC-API-002-06: 잘못된 날짜로 HTTP 400 반환

```gherkin
Given birth_month=13인 잘못된 페이로드가 있을 때
When POST /api/v1/saju/pillars 요청을 보내면
Then HTTP 422 또는 HTTP 400 응답이 반환되어야 한다
  And 오류 메시지가 응답 본문에 포함되어야 한다
```

---

## 시나리오 3: /saju/analysis 엔드포인트

### TC-API-002-07: 분석 데이터 반환

```gherkin
Given 유효한 SajuAPIRequest 페이로드가 있을 때
When POST /api/v1/saju/analysis 요청을 보내면
Then HTTP 200 응답이 반환되어야 한다
  And 응답에 yuksin_list, hapchung, ohang_ratio, jijanggan, sibiunsung, shinsal 필드가 포함되어야 한다
```

### TC-API-002-08: yuksin_list 내용 검증

```gherkin
Given 유효한 요청 페이로드가 있을 때
When POST /api/v1/saju/analysis 요청을 보내면
Then yuksin_list의 각 항목은 target, yuksin 필드를 가져야 한다
  And yuksin 값은 비견/겁재/식신/상관/정재/편재/정관/편관/정인/편인 중 하나여야 한다
```

### TC-API-002-09: ohang_ratio 합계 검증

```gherkin
Given 유효한 요청 페이로드가 있을 때
When POST /api/v1/saju/analysis 요청을 보내면
Then ohang_ratio의 mok+hwa+to+geum+su 합계는 100.0(±0.01)이어야 한다
```

### TC-API-002-10: analysis 응답에 pillars 필드 미포함

```gherkin
Given 유효한 요청 페이로드가 있을 때
When POST /api/v1/saju/analysis 요청을 보내면
Then 응답에 year_pillar, month_pillar, day_pillar, deun 필드가 없어야 한다
```

---

## 시나리오 4: /saju/fortune 엔드포인트

### TC-API-002-11: 대운/세운 데이터 반환

```gherkin
Given 유효한 SajuAPIRequest 페이로드가 있을 때
When POST /api/v1/saju/fortune 요청을 보내면
Then HTTP 200 응답이 반환되어야 한다
  And 응답에 deun, sewun 필드가 포함되어야 한다
  And deun은 banghyang, deun_su, deun_list 필드를 가져야 한다
  And sewun은 배열이어야 한다
```

### TC-API-002-12: 대운 목록 검증

```gherkin
Given 유효한 요청 페이로드가 있을 때
When POST /api/v1/saju/fortune 요청을 보내면
Then deun.deun_list의 각 항목은 age, ganji 필드를 가져야 한다
  And ganji는 gan, ji 필드를 가져야 한다
```

### TC-API-002-13: fortune 응답에 분석 필드 미포함

```gherkin
Given 유효한 요청 페이로드가 있을 때
When POST /api/v1/saju/fortune 요청을 보내면
Then 응답에 yuksin_list, hapchung, ohang_ratio, year_pillar 필드가 없어야 한다
```

---

## 시나리오 5: /saju/identity 엔드포인트

### TC-API-002-14: 정체성 카드 콘텐츠 반환

```gherkin
Given 유효한 SajuAPIRequest 페이로드가 있을 때
When POST /api/v1/saju/identity 요청을 보내면
Then HTTP 200 응답이 반환되어야 한다
  And 응답에 day_gan, yongshin, gyouk_name, ilgan_content, gyouk_content, yongsin_content 필드가 포함되어야 한다
```

### TC-API-002-15: 일간 콘텐츠 포함 확인

```gherkin
Given 유효한 요청 페이로드가 있을 때
When POST /api/v1/saju/identity 요청을 보내면
Then ilgan_content는 null이 아니어야 한다
  And ilgan_content.contents는 비어 있지 않아야 한다
```

### TC-API-002-16: 콘텐츠 없을 때 null 반환 및 HTTP 200

```gherkin
Given contents_gyouk.json이 비어 있거나 해당 격국 항목이 없을 때
When POST /api/v1/saju/identity 요청을 보내면
Then HTTP 200 응답이 반환되어야 한다
  And gyouk_content는 null이어야 한다
  And 다른 콘텐츠 필드(ilgan_content, yongsin_content)는 영향받지 않아야 한다
```

---

## 시나리오 6: 에러 처리

### TC-API-002-17: 잘못된 Pydantic 모델로 검증 오류

```gherkin
Given birth_year=999 (유효 범위 1600-2100 외)인 페이로드가 있을 때
When 신규 엔드포인트 중 하나에 요청을 보내면
Then HTTP 422 Unprocessable Entity 응답이 반환되어야 한다
  And 응답 본문에 어떤 필드가 잘못되었는지 명시되어야 한다
```

### TC-API-002-18: 음력 날짜 범위 외 요청

```gherkin
Given is_lunar=true이고 유효하지 않은 음력 날짜가 있을 때
When 신규 엔드포인트에 요청을 보내면
Then HTTP 400 응답이 반환되어야 한다
  And 오류 메시지에 날짜 오류 내용이 포함되어야 한다
```

---

## 시나리오 7: OpenAPI 문서화

### TC-API-002-19: 신규 엔드포인트 OpenAPI 문서 포함

```gherkin
Given API 서버가 실행 중일 때
When GET /openapi.json 요청을 보내면
Then 응답에 /api/v1/saju/pillars 경로가 포함되어야 한다
  And 응답에 /api/v1/saju/analysis 경로가 포함되어야 한다
  And 응답에 /api/v1/saju/fortune 경로가 포함되어야 한다
  And 응답에 /api/v1/saju/identity 경로가 포함되어야 한다
```

---

## 정의된 완료 기준 (Definition of Done)

- [ ] `PillarsResponse`, `AnalysisResponse`, `FortuneResponse`, `IdentityResponse` 모델 구현 완료
- [ ] `POST /api/v1/saju/pillars` 구현 완료
- [ ] `POST /api/v1/saju/analysis` 구현 완료
- [ ] `POST /api/v1/saju/fortune` 구현 완료
- [ ] `POST /api/v1/saju/identity` 구현 완료
- [ ] TC-API-002-01 ~ TC-API-002-19 모든 테스트 통과
- [ ] `uv run ruff check . --fix` 이후 lint 오류 0개
- [ ] `uv run pytest tests/ -q --no-cov` 기존 테스트 모두 통과 (회귀 없음)
- [ ] GET /openapi.json에 4개 신규 엔드포인트 포함 확인
- [ ] SPEC-UI-004 격국 계산 로직과 `/identity` 엔드포인트 연동 확인
