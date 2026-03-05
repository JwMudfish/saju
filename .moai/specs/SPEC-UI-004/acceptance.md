# SPEC-UI-004: 인수 기준

## 메타데이터

| 항목 | 내용 |
|------|------|
| SPEC ID | SPEC-UI-004 |
| TAG | SPEC-UI-004 |

---

## 품질 게이트

- 테스트 커버리지: 85% 이상 (신규/수정 코드 기준)
- LSP 오류: 0개 (`uv run mypy app/services/content_loader.py`)
- Lint 오류: 0개 (`uv run ruff check .`)
- 기존 테스트 회귀: 0개

---

## 시나리오 1: ContentLoader 격국 콘텐츠 로드

### TC-UI-004-01: 유효한 격국명으로 콘텐츠 조회 성공

```gherkin
Given ContentLoader가 초기화되어 있고
  And contents_gyouk.json 파일이 존재하며
  And 파일에 10개의 격국 항목이 있을 때
When get_gyouk_content("식신격")이 호출되면
Then 반환값은 None이 아니어야 한다
  And 반환값["subtitle"]은 "식신격"이어야 한다
  And 반환값["titleDescription"]은 "마이웨이 나르시스트"이어야 한다
  And 반환값["contents"]는 비어 있지 않아야 한다
```

### TC-UI-004-02: 전체 10개 격국명 조회 성공

```gherkin
Given ContentLoader가 초기화되어 있을 때
When 다음 격국명 각각으로 get_gyouk_content()가 호출되면:
  | 건록격 | 양인격 | 상관격 | 식신격 | 정인격 |
  | 편인격 | 정재격 | 편재격 | 정관격 | 편관격 |
Then 모든 호출의 반환값은 None이 아니어야 한다
```

### TC-UI-004-03: 존재하지 않는 격국명 조회 시 None 반환

```gherkin
Given ContentLoader가 초기화되어 있을 때
When get_gyouk_content("존재하지않는격국")이 호출되면
Then 반환값은 None이어야 한다
  And 예외가 발생하지 않아야 한다
```

### TC-UI-004-04: 파일 없음 시 경고 로그 출력 및 빈 결과 반환

```gherkin
Given contents_gyouk.json 파일이 존재하지 않을 때
When ContentLoader(gyouk_path=없는_경로)가 초기화되면
Then get_gyouk_content("식신격")의 반환값은 None이어야 한다
  And 경고 로그가 출력되어야 한다
  And 예외가 발생하지 않아야 한다
```

### TC-UI-004-05: 기존 인터페이스 하위 호환성

```gherkin
Given ContentLoader가 초기화되어 있을 때
When get_ilgan_content("갑")이 호출되면
Then 기존과 동일한 결과가 반환되어야 한다
When get_yongsin_content("갑")이 호출되면
Then 기존과 동일한 결과가 반환되어야 한다
```

---

## 시나리오 2: 격국명 도출

### TC-UI-004-06: yuksin_list에서 격국명 도출 성공

```gherkin
Given SajuResult에 yuksin_list가 포함되어 있고
  And yuksin_list에 target="월지", yuksin="식신"인 항목이 있을 때
When calc_gyouk_from_result(result)가 호출되면
Then 반환값은 "식신격"이어야 한다
```

### TC-UI-004-07: 모든 육신-격국 매핑 검증

```gherkin
Given yuksin_list에 target="월지"인 항목이 있을 때
When yuksin이 다음 값이면:
  | 비견 → 건록격 | 겁재 → 양인격 | 편인 → 편인격 |
  | 정인 → 정인격 | 편재 → 편재격 | 정재 → 정재격 |
  | 식신 → 식신격 | 상관 → 상관격 | 정관 → 정관격 |
  | 편관 → 편관격 |
Then 각 격국명이 정확히 반환되어야 한다
```

### TC-UI-004-08: yuksin_list 없을 때 None 반환

```gherkin
Given SajuResult에 yuksin_list가 None이거나 빈 배열일 때
When calc_gyouk_from_result(result)가 호출되면
Then 반환값은 None이어야 한다
  And 예외가 발생하지 않아야 한다
```

---

## 시나리오 3: Streamlit 3-컬럼 레이아웃

### TC-UI-004-09: 3-컬럼 레이아웃 렌더링

```gherkin
Given 유효한 SajuResult가 존재하고
  And 일간이 "갑"이며
  And 월지가 "오"여서 격국이 "정화일간" 계열이고
  And 용신이 존재할 때
When render_tab_identity(result)가 호출되면
Then 3개의 컬럼이 생성되어야 한다
  And col1에 "일간 (日干)" 헤더가 있어야 한다
  And col2에 "격국 (格局)" 헤더가 있어야 한다
  And col3에 "용신 재능 (用神)" 헤더가 있어야 한다
```

### TC-UI-004-10: 격국 카드 정상 표시

```gherkin
Given 유효한 SajuResult가 존재하고
  And 격국명이 "식신격"으로 계산될 때
When render_tab_identity(result)가 호출되면
Then col2에 "격국: 식신격" st.info가 표시되어야 한다
  And "마이웨이 나르시스트" titleDescription이 표시되어야 한다
  And "성격 자세히 보기" expander가 존재해야 한다
```

### TC-UI-004-11: 격국 계산 불가 시 안내 메시지 표시

```gherkin
Given SajuResult에 yuksin_list가 없거나 비어 있어서 격국 계산이 불가능할 때
When render_tab_identity(result)가 호출되면
Then col2에 "격국 정보를 불러올 수 없습니다." 메시지가 표시되어야 한다
  And col1(일간 카드)은 정상적으로 표시되어야 한다
  And col3(용신 카드)은 정상적으로 표시되어야 한다
```

### TC-UI-004-12: 격국 콘텐츠 없을 때 격리 처리

```gherkin
Given 격국명은 계산되었지만 contents_gyouk.json에 해당 항목이 없을 때
When render_tab_identity(result)가 호출되면
Then col2에 "격국 정보를 불러올 수 없습니다." 메시지가 표시되어야 한다
  And col1, col3은 영향받지 않아야 한다
```

---

## 시나리오 4: 기존 기능 회귀 방지

### TC-UI-004-13: 기존 일간 카드 정상 동작

```gherkin
Given 기존 SajuResult가 존재하고 일간이 "갑"일 때
When render_tab_identity(result)가 호출되면
Then col1에 일간 콘텐츠가 기존과 동일하게 표시되어야 한다
  And col1의 일간 카드 내용은 SPEC-UI-003 기준과 일치해야 한다
```

### TC-UI-004-14: 기존 용신 카드 정상 동작

```gherkin
Given 기존 SajuResult가 존재하고 용신이 존재할 때
When render_tab_identity(result)가 호출되면
Then col3에 용신 콘텐츠가 기존과 동일하게 표시되어야 한다
  And col2(格局)으로 인해 용신 카드가 숨겨지거나 오류가 발생하지 않아야 한다
```

---

## 정의된 완료 기준 (Definition of Done)

- [ ] `ContentLoader.get_gyouk_content()` 구현 완료
- [ ] 모듈 레벨 `get_gyouk_content()` 편의 함수 구현 완료
- [ ] `calc_gyouk_from_result()` 또는 동등 함수 구현 완료
- [ ] `render_tab_identity` 3-컬럼으로 수정 완료
- [ ] 격국 카드 렌더링 코드 구현 완료
- [ ] TC-UI-004-01 ~ TC-UI-004-14 모든 테스트 통과
- [ ] `uv run ruff check . --fix` 이후 lint 오류 0개
- [ ] `uv run pytest tests/ -q --no-cov` 기존 테스트 모두 통과 (회귀 없음)
- [ ] `uv run mypy app/services/content_loader.py` 오류 0개
