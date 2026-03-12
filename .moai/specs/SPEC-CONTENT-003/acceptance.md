# SPEC-CONTENT-003: 완료 기준

## Given-When-Then 테스트 시나리오

### Phase 1: 기본 연동 테스트

#### Scenario 1.1: 상신 보완 콘텐츠 로드

**Given**:
- `contents_sangsin_compliment.json` 파일이 존재한다
- 상신 타입이 "Sangsin_1"이다

**When**:
- 사용자가 `get_sangsin_compliment("Sangsin_1")`를 호출한다

**Then**:
- 해당 상신 타입에 맞는 보완 설명 콘텐츠가 반환되어야 한다
- 반환된 딕셔너리에는 `title`, `content`, `subtitle` 필드가 포함되어야 한다
- 콘텐츠가 없으면 `None`이 반환되어야 한다

#### Scenario 1.2: 영격령 지속 콘텐츠 로드

**Given**:
- `contents_jisok.json` 파일이 존재한다
- 영격령 타입이 "jisok"이다

**When**:
- 사용자가 `get_yeonggeukryeong_content("jisok")`를 호출한다

**Then**:
- 지속(持續)에 대한 설명 콘텐츠가 반환되어야 한다
- 콘텐츠에는 영격령의 특징과 해설이 포함되어야 한다

#### Scenario 1.3: 영격령 중화 콘텐츠 로드

**Given**:
- `contents_joonghwa.json` 파일이 존재한다
- 영격령 타입이 "joonghwa"이다

**When**:
- 사용자가 `get_yeonggeukryeong_content("joonghwa")`를 호출한다

**Then**:
- 중화(中和)에 대한 설명 콘텐츠가 반환되어야 한다

#### Scenario 1.4: 영격령 확장 콘텐츠 로드

**Given**:
- `contents_hwakjang.json` 파일이 존재한다
- 영격령 타입이 "hwakjang"이다

**When**:
- 사용자가 `get_yeonggeukryeong_content("hwakjang")`를 호출한다

**Then**:
- 확장(擴張)에 대한 설명 콘텐츠가 반환되어야 한다

#### Scenario 1.5: 존재하지 않는 영격령 타입

**Given**:
- 영격령 타입이 "invalid_type"이다

**When**:
- 사용자가 `get_yeonggeukryeong_content("invalid_type")`를 호출한다

**Then**:
- `None`이 반환되어야 한다
- 경고 로그가 기록되어야 한다

### Phase 2: 중간 난이도 테스트

#### Scenario 2.1: 삼합 콘텐츠 로드

**Given**:
- `contents_hapChung/samhapYes/contents_samhap.json` 파일이 존재한다
- 합충 타입이 "samhap"이다

**When**:
- 사용자가 `get_hapchung_content("samhap")`를 호출한다

**Then**:
- 삼합(三合)에 대한 설명 콘텐츠가 반환되어야 한다
- 콘텐츠에는 삼합의 종류와 의미가 포함되어야 한다

#### Scenario 2.2: 충만 콘텐츠 로드

**Given**:
- `contents_hapChung/onlyChung/contents_onlyChung.json` 파일이 존재한다
- 합충 타입이 "onlyChung"이다

**When**:
- 사용자가 `get_hapchung_content("onlyChung")`를 호출한다

**Then**:
- 충(沖)만 있는 경우의 설명 콘텐츠가 반환되어야 한다

#### Scenario 2.3: 합충 없음 콘텐츠 로드

**Given**:
- `contents_hapChung/no/contents_no.json` 파일이 존재한다
- 합충 타입이 "no"이다

**When**:
- 사용자가 `get_hapchung_content("no")`를 호출한다

**Then**:
- 합충이 없는 경우의 설명 콘텐츠가 반환되어야 한다

#### Scenario 2.4: 일간 화월 콘텐츠 로드

**Given**:
- `contents_ilgan_hw.json` 파일이 존재한다
- 일간이 "병"(丙)이고, 월이 5월이다

**When**:
- 사용자가 `get_ilgan_hw_content("병", 5)`를 호출한다

**Then**:
- 해당 조건에 맞는 화월 일간 콘텐츠가 반환되어야 한다
- 콘텐츠에는 화월의 특성과 해설이 포함되어야 있다

#### Scenario 2.5: 일간 연애 콘텐츠 로드

**Given**:
- `contents_ilgan_love.json` 파일이 존재한다
- 일간이 "갑"(甲)이다

**When**:
- 사용자가 `get_ilgan_love_content("갑")`를 호출한다

**Then**:
- 갑목일간의 연애운 콘텐츠가 반환되어야 한다
- 콘텐츠에는 연애 성향과 조언이 포함되어야 한다

#### Scenario 2.6: 베프 유형 콘텐츠 로드

**Given**:
- `contents_bestFriend.json` 파일이 존재한다
- 베프 유형이 "type_1"이다

**When**:
- 사용자가 `get_best_friend_content("type_1")`를 호출한다

**Then**:
- 해당 베프 유형의 성격 설명 콘텐츠가 반환되어야 한다

### Phase 3: 복잡한 로직 테스트

#### Scenario 3.1: 노소 유형 콘텐츠 로드

**Given**:
- `contents_old_young.json` 파일이 존재한다
- 노소 유형이 "old"이다

**When**:
- 사용자가 `get_old_young_content("old")`를 호출한다

**Then**:
- 노년 유형에 대한 설명 콘텐츠가 반환되어야 한다
- 콘텐츠에는 해당 유형의 특징이 포함되어야 한다

#### Scenario 3.2: 소년 유형 콘텐츠 로드

**Given**:
- 노소 유형이 "young"이다

**When**:
- 사용자가 `get_old_young_content("young")`를 호출한다

**Then**:
- 소년 유형에 대한 설명 콘텐츠가 반환되어야 한다

#### Scenario 3.3: 경운 질문 콘텐츠 로드

**Given**:
- `contents_light_question/` 디렉토리에 질문 타입별 파일이 존재한다
- 질문 타입이 "career"이다

**When**:
- 사용자가 `get_light_question_content("career")`를 호출한다

**Then**:
- 커리어 관련 경운 질문 콘텐츠가 반환되어야 한다
- 질문과 해설이 적절히 구성되어 있어야 한다

### API 통합 테스트

#### Scenario 4.1: identity 엔드포인트 Phase 1 필드

**Given**:
- `/api/v1/saju/identity` 엔드포인트가 존재한다
- 유효한 사주 요청 데이터가 있다

**When**:
- 클라이언트가 POST `/api/v1/saju/identity`를 호출한다

**Then**:
- 응답 JSON에 `sangsin_compliment` 필드가 포함되어야 한다
- 응답 JSON에 `yeonggeukryeong` 필드가 포함되어야 한다
- 필드 값은 `None`이거나 적절한 콘텐츠 딕셔너리여야 한다

#### Scenario 4.2: identity 엔드포인트 Phase 2 필드

**Given**:
- 사주 분석 결과에 합충 관계가 포함되어 있다

**When**:
- 클라이언트가 POST `/api/v1/saju/identity`를 호출한다

**Then**:
- 응답 JSON에 `hapchung` 필드가 포함되어야 한다
- 응답 JSON에 `ilgan_hw`, `ilgan_love`, `best_friend` 필드가 포함되어야 한다
- 합충이 있는 경우 `hapchung` 필드에 해당 콘텐츠가 반환되어야 한다

#### Scenario 4.3: identity 엔드포인트 Phase 3 필드

**Given**:
- 사주 분석 결과에 노소 유형 분석이 포함되어 있다

**When**:
- 클라이언트가 POST `/api/v1/saju/identity`를 호출한다

**Then**:
- 응답 JSON에 `old_young` 필드가 포함되어야 한다
- 응답 JSON에 `light_question` 필드가 포함되어야 한다

### 에러 처리 테스트

#### Scenario 5.1: 파일이 존재하지 않는 경우

**Given**:
- 콘텐츠 파일이 삭제되거나 이동되었다

**When**:
- 사용자가 어떤 콘텐츠 로드 메서드를 호출한다

**Then**:
- `None`이 반환되어야 한다
- 경고 로그가 기록되어야 한다
- 예외가 발생하지 않아야 한다

#### Scenario 5.2: 잘못된 파라미터

**Given**:
- 사용자가 잘못된 타입의 파라미터를 전달한다

**When**:
- 콘텐츠 로드 메서드를 호출한다

**Then**:
- `None`이 반환되거나 적절한 기본값이 반환되어야 한다
- 예외가 발생하지 않아야 한다

### 성능 테스트

#### Scenario 6.1: 콘텐츠 로드 응답 시간

**Given**:
- 모든 콘텐츠 파일이 정상적으로 존재한다

**When**:
- 콘텐츠 로드 메서드를 호출한다

**Then**:
- 응답 시간이 100ms 이내여야 한다

#### Scenario 6.2: API 엔드포인트 응답 시간

**Given**:
- 모든 콘텐츠가 로드된다

**When**:
- `/api/v1/saju/identity` 엔드포인트를 호출한다

**Then**:
- 전체 응답 시간이 500ms 이내여야 한다

---

## 품질 게이트

### 1. TRUST 5 기준

**Tested**:
- [ ] 모든 새로운 메서드에 대한 단위 테스트 작성
- [ ] 최소 85% 코드 커버리지
- [ ] 경계 조건 테스트 (None, 빈 문자열, 잘못된 타입)

**Readable**:
- [ ] 명확한 메서드 명명 (get_xxx_content 패턴)
- [ ] 모든 메서드에 독스트링 제공
- [ ] ruff 린팅 통과

**Unified**:
- [ ] 기존 ContentLoader 패턴과 일관성
- [ ] black 포맷팅 통과
- [ ] 타입 힌트 정확성

**Secured**:
- [ ] 파일 경로 조작 방지
- [ ] 적절한 예외 처리
- [ ] 입력 검증

**Trackable**:
- [ ] Git 커밋 메시지 규칙
- [ ] SPEC-CONTENT-003 참조 포함
- [ ] 변경 로그 기록

### 2. 기능 기준

- [ ] Phase 1: 4개 콘텐츠 파일 연동
- [ ] Phase 2: 8개 콘텐츠 파일 연동
- [ ] Phase 3: 노소/경운 질문 콘텐츠 연동
- [ ] API 엔드포인트에서 모든 콘텐츠 확인 가능
- [ ] 기존 기능과의 호환성 유지

### 3. 성능 기준

- [ ] 콘텐츠 로드: 100ms 이내
- [ ] API 응답: 500ms 이내
- [ ] 메모리 사용: 기존 대비 20% 이내 증가
