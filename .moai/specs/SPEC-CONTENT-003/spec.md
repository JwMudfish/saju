# SPEC-CONTENT-003: 남은 콘텐츠 파일 연동

## 메타데이터

| 항목 | 내용 |
|------|------|
| SPEC ID | SPEC-CONTENT-003 |
| 제목 | 남은 콘텐츠 파일 연동 |
| 생성일 | 2026-03-12 |
| 상태 | Planned |
| 우선순위 | Medium |
| 담당자 | - |

## 개요

### 목표

`resources/testResult/` 디렉토리 내의 아직 연동되지 않은 콘텐츠 JSON 파일들을 `ContentLoader` 서비스에 통합하여 API 엔드포인트에서 활용 가능하게 한다.

### 배경

현재 `ContentLoader` 서비스는 일간, 용신, 격국, 희신 등 기본 콘텐츠만 지원한다. 하지만 `resources/testResult/`에는 아직 연동되지 않은 136개의 콘텐츠 파일이 존재한다. 이 파일들을 단계적으로 연동하여 서비스의 콘텐츠 품질을 높여야 한다.

---

## 현재 상태

### 연동된 콘텐츠 (ContentLoader)

1. **일간(日干) 콘텐츠**: `contents_ilgan.json` - 일간별 성격 해설
2. **용신(用神) 콘텐츠**: `contents_yongsin.json` - 용신별 운세 해설
3. **격국(格局) 콘텐츠**: `contents_gyouk.json` - 격국별 특징 설명
4. **희신(喜神) 콘텐츠**: `contents_Hisin10/` - 당령별 희신 유무에 따른 해설
5. **희기신 콘텐츠**: `contents_hisin_gisin.json` - 희신과 기신 조합
6. **연봉 콘텐츠**: `contents_salary.json` - 연봉 관련 운세
7. **상신(上神) 콘텐츠**: `contents_sangsin.json` - 상신 4가지 유형
8. **구신(九神) 콘텐츠**: `contents_gusin.json` - 구신 4가지 유형
9. **신격길흉 콘텐츠**: `contents_shgjGilHung/` - 격국별 길흉 신격

### 미연동 콘텐츠 파일 (136개)

#### Phase 1: 쉬운 연동 (별도 코어 로직 불필요)

1. **상신 보완 콘텐츠**:
   - `contents_sangsin_compliment.json` - 상신별 칭찬/보완 설명

2. **구신 기신 콘텐츠**:
   - `contents_hisin_gisin.json` - 구신과 기신 관계 (이미 연동됨)

3. **영격령(靈格令) 설명 콘텐츠** (3개):
   - `contents_jisok.json` - 지속 (持續)
   - `contents_joonghwa.json` - 중화 (中和)
   - `contents_hwakjang.json` - 확장 (擴張)

#### Phase 2: 중간 난이도

4. **합충(合沖) 관계 콘텐츠** (4개 파일):
   - `contents_hapChung/no/contents_no.json` - 합충 없음
   - `contents_hapChung/samhapYes/contents_samhap.json` - 삼합(三合)
   - `contents_hapChung/banghapYes/contents_banghap.json` - 방합(方合)
   - `contents_hapChung/onlyChung/contents_onlyChung.json` - 충만(沖만)

5. **일간 화월(日間火月) 콘텐츠**:
   - `contents_ilgan_hw.json` - 일간이 화(火)인 달의 운세

6. **일간 연애(日間戀愛) 콘텐츠**:
   - `contents_ilgan_love.json` - 일간별 연애운

7. **베프(Best Friend) 유형 콘텐츠**:
   - `contents_bestFriend.json` - 베프 유형별 성격

#### Phase 3: 복잡한 로직

8. **노소(老少) 유형 콘텐츠**:
   - `contents_old_young.json` - 노소 유형별 설명

9. **경운(鏡運) 질문 콘텐츠** (다중 파일):
   - `contents_light_question/` 디렉토리 내 다수 JSON 파일
   - 경운 질문 유형별 콘텐츠

10. **기타 콘텐츠**:
    - `contents_latte_is_horse.json` - 특정 조건 콘텐츠
    - `contents_hiYongGun.json` - 희용운(喜用運) 콘텐츠
    - `contents_gyoukSimple.json` - 격국 간단 설명
    - `contents_opponent_hearing.json` - 대립관 청각 콘텐츠

---

## 요구사항 (EARS 형식)

### 1. 시스템 초기화 요구사항

**[Ubiquitous]**
- 시스템은 모든 콘텐츠 파일을 UTF-8 인코딩으로 로드해야 한다
- 시스템은 존재하지 않는 콘텐츠 파일에 대해 빈 딕셔너리를 반환해야 한다
- 시스템은 콘텐츠 로드 실패 시 경고 로그를 기록해야 한다

### 2. Phase 1 요구사항 (쉬운 연동)

**[Event-Driven] WHEN** 사용자가 상신 보완 콘텐츠를 요청하면, 시스템은 해당 상신 타입에 맞는 칭찬/보완 설명을 반환해야 한다

**[Event-Driven] WHEN** 사용자가 영격령 설명을 요청하면, 시스템은 지속/중화/확장 중 해당하는 설명을 반환해야 한다

**[State-Driven] IF** 상신 타입이 "Sangsin_1"~"Sangsin_4" 범위 내에 있으면, 시스템은 해당 상신의 보완 콘텐츠를 제공해야 한다

### 3. Phase 2 요구사항 (중간 난이도)

**[Event-Driven] WHEN** 사주 분석 결과에 합충 관계가 포함되면, 시스템은 해당 합충 유형(삼합/방합/충만/없음)에 맞는 콘텐츠를 반환해야 한다

**[Event-Driven] WHEN** 사용자의 일간이 화(火)이고 해당 달이면, 시스템은 화월 일간 콘텐츠를 제공해야 한다

**[Event-Driven] WHEN** 사용자가 연애운을 요청하면, 시스템은 일간별 연애 콘텐츠를 반환해야 한다

**[Event-Driven] WHEN** 사용자가 베프 유형을 조회하면, 시스템은 해당 베프 유형의 성격 설명을 제공해야 한다

### 4. Phase 3 요구사항 (복잡한 로직)

**[Event-Driven] WHEN** 사용자의 사주에 노소 유형 분석이 필요하면, 시스템은 노소 유형별 콘텐츠를 반환해야 한다

**[Event-Driven] WHEN** 사용자가 경운 질문을 생성하면, 시스템은 해당 질문 유형에 맞는 콘텐츠를 제공해야 한다

**[State-Driven] IF** 경운 질문 유형이 다중 카테고리로 구성되어 있으면, 시스템은 각 카테고리별 콘텐츠를 개별 로드해야 한다

### 5. API 통합 요구사항

**[Ubiquitous]**
- 시스템은 모든 새로운 콘텐츠 로드 메서드를 `ContentLoader` 클래스에 통합해야 한다
- 시스템은 편의 함수(wrapper function)를 모듈 레벨에 제공해야 한다
- 시스템은 기존 API 엔드포인트(`/api/v1/saju/identity` 등)와의 호환성을 유지해야 한다

---

## 기술 접근 방법

### 1. ContentLoader 확장

기존 `ContentLoader` 클래스에 새로운 메서드를 추가한다:

```python
class ContentLoader:
    # 기존 메서드 유지

    # Phase 1 메서드
    def get_sangsin_compliment(self, sangsin: str) -> dict[str, Any] | None
    def get_yeonggeukryeong_content(self, type: str) -> dict[str, Any] | None

    # Phase 2 메서드
    def get_hapchung_content(self, hapchung_type: str) -> dict[str, Any] | None
    def get_ilgan_hw_content(self, gan: str, month: int) -> dict[str, Any] | None
    def get_ilgan_love_content(self, gan: str) -> dict[str, Any] | None
    def get_best_friend_content(self, friend_type: str) -> dict[str, Any] | None

    # Phase 3 메서드
    def get_old_young_content(self, age_type: str) -> dict[str, Any] | None
    def get_light_question_content(self, question_type: str) -> dict[str, Any] | None
```

### 2. 파일 경로 상수 추가

```python
# Phase 1 경로
_SANGSIN_COMPLIMENT_PATH = _RESOURCES_BASE / "contents_sangsin_compliment.json"
_JISOK_PATH = _RESOURCES_BASE / "contents_jisok.json"
_JOONGHWA_PATH = _RESOURCES_BASE / "contents_joonghwa.json"
_HWAKJANG_PATH = _RESOURCES_BASE / "contents_hwakjang.json"

# Phase 2 경로
_HAPCHUNG_BASE = _RESOURCES_BASE / "contents_hapChung"
_ILGAN_HW_PATH = _RESOURCES_BASE / "contents_ilgan_hw.json"
_ILGAN_LOVE_PATH = _RESOURCES_BASE / "contents_ilgan_love.json"
_BEST_FRIEND_PATH = _RESOURCES_BASE / "contents_bestFriend.json"

# Phase 3 경로
_OLD_YOUNG_PATH = _RESOURCES_BASE / "contents_old_young.json"
_LIGHT_QUESTION_BASE = _RESOURCES_BASE / "contents_light_question"
```

### 3. 모듈 레벨 편의 함수

기존 패턴을 따라 모듈 레벨 편의 함수를 제공한다:

```python
def get_sangsin_compliment(sangsin: str) -> dict[str, Any] | None
def get_yeonggeukryeong_content(type: str) -> dict[str, Any] | None
def get_hapchung_content(hapchung_type: str) -> dict[str, Any] | None
# ... 등
```

### 4. API 엔드포인트 통합

`/api/v1/saju/identity` 엔드포인트 응답 모델에 새로운 필드를 추가한다:

```python
class IdentityResponse(BaseModel):
    # 기존 필드
    ilgan: dict[str, Any] | None
    yongsin: dict[str, Any] | None
    gyouk: dict[str, Any] | None

    # Phase 1 추가 필드
    sangsin_compliment: dict[str, Any] | None
    yeonggeukryeong: dict[str, Any] | None

    # Phase 2 추가 필드
    hapchung: dict[str, Any] | None
    ilgan_hw: dict[str, Any] | None
    ilgan_love: dict[str, Any] | None
    best_friend: dict[str, Any] | None

    # Phase 3 추가 필드
    old_young: dict[str, Any] | None
    light_question: dict[str, Any] | None
```

### 5. 데이터 구조 분석

각 JSON 파일의 내부 구조를 분석하여 적절한 키 추출 로직을 구현한다:

- `contentsList` 배열 기반 구조: 기존 패턴과 동일
- 중첩 디렉토리 구조: `contents_hapChung/` 등은 서브디렉토리 처리
- 복합 키 구조: 여러 키 조합으로 데이터 식별

---

## 수정 대상 파일

### 1. 주요 수정 파일

| 파일 경로 | 수정 내용 |
|-----------|----------|
| `app/services/content_loader.py` | 새로운 콘텐츠 로드 메서드 추가 |
| `app/models/analysis.py` | 응답 모델에 새로운 필드 추가 |
| `app/api/endpoints/saju.py` | identity 엔드포인트 로직 수정 |
| `tests/services/test_content_loader.py` | 새로운 메서드 테스트 추가 |

### 2. 새로운 테스트 케이스

```python
# Phase 1 테스트
def test_get_sangsin_compliment()
def test_get_yeonggeukryeong_content()

# Phase 2 테스트
def test_get_hapchung_content()
def test_get_ilgan_hw_content()
def test_get_ilgan_love_content()
def test_get_best_friend_content()

# Phase 3 테스트
def test_get_old_young_content()
def test_get_light_question_content()
```

### 3. 문서 업데이트

- `README.md`: 새로운 콘텐츠 기능 추가
- API 문서: Swagger UI 자동 업데이트 (Pydantic 모델 통해)

---

## 완료 기준

### 1. 기능 완료 기준

- [ ] Phase 1: 상신 보완, 영격령 콘텐츠 로드 메서드 구현
- [ ] Phase 2: 합충, 일간 화월, 일간 연애, 베프 콘텐츠 로드 메서드 구현
- [ ] Phase 3: 노소 유형, 경운 질문 콘텐츠 로드 메서드 구현
- [ ] 모든 새로운 메서드에 대한 편의 함수 제공
- [ ] API 엔드포인트 응답 모델에 새로운 필드 통합

### 2. 품질 기준 (TRUST 5)

**Tested (테스트)**:
- [ ] 모든 새로운 메서드에 대한 단위 테스트 작성
- [ ] 존재하지 않는 파일 처리 테스트
- [ ] 잘못된 파라미터 처리 테스트
- [ ] 최소 85% 코드 커버리지 유지

**Readable (가독성)**:
- [ ] 명확한 메서드 명명 규칙 준수
- [ ] 적절한 주석과 독스트링 제공
- [ ] ruff 린팅 통과

**Unified (일관성)**:
- [ ] 기존 `ContentLoader` 패턴과 일관성 유지
- [ ] black 포맷팅 통과

**Secured (보안)**:
- [ ] 파일 경로 조작 방지 (pathlib 사용)
- [ ] 적절한 예외 처리

**Trackable (추적가능성)**:
- [ ] Git 커밋 메시지 규칙 준수
- [ ] SPEC 참조 포함

### 3. 성능 기준

- [ ] 콘텐츠 로드 응답 시간: 100ms 이내
- [ ] 메모리 사용량: 기존 대비 20% 이내 증가
- [ ] API 엔드포인트 전체 응답 시간: 500ms 이내 유지

---

## 위험 및 완화 계획

### 1. 위험 요소

| 위험 | 영향 | 확률 | 완화 계획 |
|------|------|------|-----------|
| JSON 파일 구조 불일치 | 로드 실패 | 중간 | 파일 구조 사전 분석 및 유연한 파싱 로직 |
| 너무 많은 파일 로드로 인한 메모리 증가 | 성능 저하 | 낮음 | 지연 로딩(Lazy Loading) 패턴 적용 |
| 기존 API 호환성 파괴 | 클라이언트 오류 | 낮음 | 추가 필드는 Optional로 선언 |
| 경운 질문 다중 파일 복잡성 | 구현 복잡 | 높음 | 별도 서브클래스로 분리 |

### 2. 롤백 계획

- 기존 `ContentLoader` 메서드는 수정하지 않고 추가만 수행
- 새로운 메서드는 독립적으로 동작하도록 설계
- 문제 발생 시 해당 Phase만 롤백 가능

---

## 참고 자료

### 1. 관련 SPEC

- SPEC-CONTENT-001: 콘텐츠 로더 기본 구조
- SPEC-CONTENT-002: API 엔드포인트 설계

### 2. 기술 문서

- `app/services/content_loader.py`: 기존 구조 참조
- `resources/testResult/`: 콘텐츠 파일 구조

### 3. 테스트 참조

- `tests/services/test_content_loader.py`: 기존 테스트 패턴
