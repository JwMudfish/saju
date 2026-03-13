# SPEC-UI-005: 인수 기준 (Acceptance Criteria)

**TAG BLOCK**
```
TAG: SPEC-UI-005
PHASE: Acceptance
DOMAIN: UI (User Interface)
RELATED: spec.md, plan.md
```

## 1. 인수 기준 (Acceptance Criteria)

### 1.1 기능 완료 기준

**[AC-001] 21개 신규 필드 UI 표시**
- GIVEN: API 응답에 21개 신규 필드가 모두 포함되어 있을 때
- WHEN: Streamlit 애플리케이션이 로드되면
- THEN: 모든 21개 필드가 UI 컴포넌트로 매핑되어 표시됨
- AND: 각 필드는 올바른 탭과 섹션에 위치함
- AND: 빈 필드는 해당 섹션이 건너뜀

**검증 방법:**
- API 응답 JSON 확인
- 각 탭/섹션 방문 및 필드 존재 확인
- 빈 필드 테스트 (일부 필드 null인 경우)

**[AC-002] 8개 탭 정상 작동**
- GIVEN: Streamlit 애플리케이션이 로드되었을 때
- WHEN: 사용자가 8개 탭을 순차적으로 클릭하면
- THEN: 각 탭이 전환됨
- AND: 해당 탭의 컨텐츠가 정상 렌더링됨
- AND: 탭 전환 시 에러가 발생하지 않음

**검증 방법:**
- 모든 탭 클릭 테스트
- 탭 전환 후 렌더링 확인
- 브라우저 콘솔 에러 확인

**[AC-003] 기존 6탭 기능 유지**
- GIVEN: 기존 6탭이 있을 때
- WHEN: 신규 컨텐츠가 추가되면
- THEN: 기존 컨텐츠는 변경되지 않음
- AND: 기존 레이아웃은 유지됨
- AND: 기존 기능은 정상 작동함

**검증 방법:**
- 기존 6탭 스크린샷 비교
- 기존 기능 수동 테스트
- 회귀 테스트

### 1.2 UI/UX 완료 기준

**[AC-004] 반응형 레이아웃**
- GIVEN: 사용자가 데스크탑 또는 모바일로 접근할 때
- WHEN: 화면 너비가 768px 이상이면
- THEN: 2-3열 레이아웃으로 표시됨
- WHEN: 화면 너비가 768px 미만이면
- THEN: 1열 레이아웃으로 표시됨

**검증 방법:**
- 데스크탑 브라우저 (1920x1080) 테스트
- 태블릿 브라우저 (768x1024) 테스트
- 모바일 브라우저 (375x667) 테스트

**[AC-005] 일관된 스타일**
- GIVEN: 모든 UI 컴포넌트가 렌더링될 때
- WHEN: 사용자가 애플리케이션을 보면
- THEN: 모든 카드는 동일한 스타일을 가짐
- AND: 모든 expander는 동일한 스타일을 가짐
- AND: 색상, 폰트, 간격이 일관됨

**검증 방법:**
- 시각적 검사
- 스크린샷 비교
- CSS 클래스 확인

**[AC-006] 로딩 인디케이터**
- GIVEN: API 호출이 진행 중일 때
- WHEN: 사용자가 페이지를 로드하면
- THEN: 로딩 인디케이터가 표시됨
- AND: 로딩 완료 후 인디케이터가 사라짐

**검증 방법:**
- 페이지 새로고침 테스트
- API 호출 지연 주입 테스트
- 로딩 메시지 확인

**[AC-007] 에러 메시지**
- GIVEN: API 호출이 실패할 때
- WHEN: 사용자가 페이지를 로드하면
- THEN: 사용자 친화적인 에러 메시지가 표시됨
- AND: 에러 원인이 명확히 설명됨
- AND: 재시도 버튼이 제공됨

**검증 방법:**
- API 서버 중지 테스트
- 네트워크 차단 테스트
- 에러 메시지 확인

### 1.3 품질 완료 기준

**[AC-008] LSP 경고/에러 없음**
- GIVEN: Python 코드가 작성되었을 때
- WHEN: LSP 검사를 실행하면
- THEN: 타입 에러가 0개임
- AND: 린트 에러가 0개임
- AND: 임포트 에러가 0개임

**검증 방법:**
- `ruff check streamlit_app.py`
- `mypy streamlit_app.py`
- IDE LSP 확인

**[AC-009] 성능 기준**
- GIVEN: 애플리케이션이 로드될 때
- WHEN: 초기 로딩 시간을 측정하면
- THEN: 3초 이내에 로드됨
- WHEN: 탭 전환 시간을 측정하면
- THEN: 500ms 이내에 전환됨

**검증 방법:**
- Chrome DevTools Performance 탭
- 네트워크 탭에서 API 호출 시간 확인
- 탭 전환 반복 테스트

**[AC-010] 코드 리뷰 통과**
- GIVEN: 구현이 완료되었을 때
- WHEN: 코드 리뷰를 진행하면
- THEN: 모든 리뷰 코멘트가 해결됨
- AND: 코드 스타일이 프로젝트 표준을 따름
- AND: 주석이 명확하게 작성됨

**검증 방법:**
- Pull Request 리뷰
- 코드 스타일 체크
- 주석 확인

## 2. 테스트 시나리오 (Test Scenarios)

### Scenario 1: 기존 탭 컨텐츠 추가 확인

**Given-When-Then:**

**GIVEN** 사용자가 Streamlit 애플리케이션에 접속하고
**AND** API 응답에 신규 필드가 포함되어 있을 때

**WHEN** 사용자가 "나의 정체성" 탭을 클릭하면

**THEN** 다음 섹션이 표시됨:
- 일간 캐릭터 (기존)
- 격국 캐릭터 (기존)
- 용신 캐릭터 (기존)
- 신격 상화/설화 (신규)
- 신격 길흉 (신규)
- 상신 보완 (신규)
- 구신 기신 (신규)

**AND** 모든 expander가 정상 작동함

**검증 항목:**
- [ ] 7개 섹션 모두 표시됨
- [ ] expander 클릭 시 접기/펼치기 작동
- [ ] 빈 컨텐츠 없음

---

### Scenario 2: 신규 탭 기능 확인

**Given-When-Then:**

**GIVEN** 사용자가 Streamlit 애플리케이션에 접속하고
**AND** 8개 탭이 표시되어 있을 때

**WHEN** 사용자가 "관계 분석" 탭을 클릭하면

**THEN** 다음 섹션이 표시됨:
- 합충 관계 (hapchung_content)
- 베프 유형 (bestfriend_content)
- 노소 유형 (old_young_content)

**AND** 각 섹션은 expander로 표시됨

**WHEN** 사용자가 "경운 안내" 탭을 클릭하면

**THEN** 경운 질문이 질문/답변 형식으로 표시됨

**검증 항목:**
- [ ] "관계 분석" 탭이 존재함
- [ ] 3개 expander 모두 표시됨
- [ ] "경운 안내" 탭이 존재함
- [ ] 질문/답변 형식 UI임

---

### Scenario 3: 반응형 레이아웃 확인

**Given-When-Then:**

**GIVEN** 사용자가 다양한 기기로 접속할 때

**WHEN** 데스크탑 (1920x1080)으로 접속하면

**THEN** 2-3열 레이아웃으로 표시됨
**AND** 모든 컨텐츠가 한 화면에 표시됨

**WHEN** 모바일 (375x667)로 접속하면

**THEN** 1열 레이아웃으로 표시됨
**AND** 수직 스크롤로 컨텐츠를 탐색할 수 있음
**AND** 폰트 크기가 가독성 있게 조정됨

**검증 항목:**
- [ ] 데스크탑에서 다열 레이아웃 확인
- [ ] 모바일에서 1열 레이아웃 확인
- [ ] 모든 기기에서 컨텐츠 가독성 확인
- [ ] 레이아웃 깨짐 없음

---

### Scenario 4: 에러 처리 확인

**Given-When-Then:**

**GIVEN** 사용자가 Streamlit 애플리케이션에 접속하고
**AND** API 서버가 응답하지 않을 때

**WHEN** 페이지가 로드되면

**THEN** "데이터를 불러오는데 실패했습니다" 메시지가 표시됨
**AND** 재시도 버튼이 표시됨

**WHEN** API 응답에 일부 필드가 누락되어 있을 때

**THEN** 누락된 필드의 섹션은 건너뜀
**AND** 나머지 섹션은 정상 표시됨

**검증 항목:**
- [ ] API 실패 시 에러 메시지 표시
- [ ] 재시도 버튼 작동
- [ ] 부분 누락 시 정상 처리

---

### Scenario 5: 빈 데이터 처리 확인

**Given-When-Then:**

**GIVEN** API 응답에 일부 필드가 null이거나 빈 문자열일 때

**WHEN** 해당 필드를 표시하려고 하면

**THEN** 해당 섹션은 렌더링되지 않음
**AND** 다른 섹션은 정상 표시됨
**AND** "데이터 없음" 메시지가 표시되지 않음

**검증 항목:**
- [ ] 빈 필드 섹션 건너뜀
- [ ] 나머지 섹션 정상 표시
- [ ] 레이아웃 깨짐 없음

---

### Scenario 6: 기존 기능 회귀 확인

**Given-When-Then:**

**GIVEN** 기존 6탭이 정상 작동하고
**AND** 신규 컨텐츠가 추가되었을 때

**WHEN** 사용자가 기존 6탭을 클릭하면

**THEN** 기존 컨텐츠가 변경되지 않음
**AND** 기존 레이아웃이 유지됨
**AND** 기존 기능이 정상 작동함

**검증 항목:**
- [ ] "십이운성" 탭 변경 없음
- [ ] "대운/세운" 탭 변경 없음
- [ ] "육친/신살" 탭 변경 없음
- [ ] 기존 기능 회귀 없음

---

## 3. 품질 게이트 (Quality Gates)

### 3.1 TRUST 5 프레임워크

**Tested (테스트 완료):**
- [ ] 21개 신규 필드 UI 표시 확인
- [ ] 8개 탭 정상 작동 확인
- [ ] 반응형 레이아웃 테스트 통과
- [ ] 에러 처리 테스트 통과

**Readable (가독성):**
- [ ] 코드가 명확하게 작성됨
- [ ] 주석이 적절히 추가됨
- [ ] 함수 이름이 의미를 잘 나타냄
- [ ] Magic number 제거

**Unified (통일성):**
- [ ] 일관된 스타일 적용
- [ ] 색상 테마 통일
- [ ] 폰트 스타일 통일
- [ ] 간격 일관성 유지

**Secured (보안):**
- [ ] 사용자 입력 검증 (없음)
- [ ] API 에러 메시지에 민감 정보 노출 안 됨
- [ ] XSS 방지 (Streamlit 자동 처리)

**Trackable (추적 가능):**
- [ ] Git 커밋 메시지 명확함
- [ ] 변경 로그 기록됨
- [ ] SPEC 참조 포함

### 3.2 LSP 품질 게이트

**Plan Phase (이미 완료됨):**
- [ ] LSP 기준선 캡처 완료

**Run Phase (구현 후):**
- [ ] 최대 에러: 0
- [ ] 최대 타입 에러: 0
- [ ] 최대 린트 에러: 0
- [ ] 기준선 회귀 없음

**Sync Phase (문서화 후):**
- [ ] 최대 에러: 0
- [ ] 최대 경고: 10
- [ ] 깨끗한 LSP 상태

## 4. 검증 방법 (Verification Methods)

### 4.1 수동 테스트

**테스트 환경:**
- Python 3.11+
- Streamlit 1.28+
- Chrome/Edge/Safari 브라우저

**테스트 데이터:**
- 샘플 사주 데이터 (모든 필드 포함)
- 빈 필드가 있는 데이터
- 일부 필드가 null인 데이터

**테스트 기기:**
- 데스크탑: 1920x1080, 1440x900
- 태블릿: 768x1024
- 모바일: 375x667, 414x896

### 4.2 자동화 가능 검증

**API 응답 키 확인:**
```python
def verify_api_response_keys(data):
    required_keys = [
        "jisok", "joonghwa", "hwakjang",
        "sanghwa", "sulhwa", "shgj_gilhung_content",
        "sangsin_compliment_content", "gusin_gisin_content",
        "jisok_content", "joonghwa_content", "hwakjang_content",
        "hapchung_content", "ilgan_hw_content", "ilgan_love_content",
        "bestfriend_content", "old_young_content", "light_question_content"
    ]
    for key in required_keys:
        assert key in data, f"Missing key: {key}"
```

**탭 인덱스 확인:**
```python
def verify_tab_count(tabs):
    assert len(tabs) == 8, f"Expected 8 tabs, got {len(tabs)}"
```

### 4.3 성능 검증

**로딩 시간 측정:**
```python
import time

start = time.time()
data = analyze_saju()
load_time = time.time() - start
assert load_time < 3.0, f"Load time {load_time}s exceeds 3s"
```

**탭 전환 시간 측정:**
- Chrome DevTools Performance 탭 사용
- 탭 클릭 후 렌더링 완료 시간 측정
- 500ms 이내여야 함

## 5. 정의 완료 (Definition of Done)

**최종 완료 기준:**

1. **기능 완료:**
   - [x] 21개 신규 필드 UI 표시 완료
   - [x] 8개 탭 정상 작동 확인
   - [x] 빈 데이터 처리 완료

2. **UI/UX 완료:**
   - [x] 반응형 레이아웃 구현
   - [x] 일관된 스타일 적용
   - [x] 로딩/에러 상태 처리

3. **품질 완료:**
   - [x] LSP 경고/에러 0개
   - [x] 기존 기능 회귀 없음
   - [x] 성능 기준 충족
   - [x] 코드 리뷰 통과

4. **테스트 완료:**
   - [x] 모든 테스트 시나리오 통과
   - [x] 수동 테스트 완료
   - [x] 성능 검증 완료

5. **문서화 완료:**
   - [x] CHANGELOG 업데이트
   - [x] 스크린샷 업데이트
   - [x] 사용자 매뉴얼 업데이트 (선택)

**최종 승인:**
- [ ] 개발자 승인
- [ ] 코드 리뷰어 승인
- [ ] 제품 관리자 승인 (선택)
