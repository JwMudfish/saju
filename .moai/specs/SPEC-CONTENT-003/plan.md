# SPEC-CONTENT-003: 구현 계획

## 마일스톤

### Primary Goal (Phase 1)
쉬운 연동 콘텐츠 파일들(상신 보완, 영격령)을 `ContentLoader`에 통합한다.

### Secondary Goal (Phase 2)
중간 난이도 콘텐츠 파일들(합충, 일간 화월, 일간 연애, 베프)을 연동한다.

### Final Goal (Phase 3)
복잡한 로직이 필요한 콘텐츠 파일들(노소 유형, 경운 질문)을 연동한다.

---

## 기술 접근 방법

### 1. 단계별 구현 전략

#### Phase 1: 기본 연동 (1-2일)

**파일 분석**:
1. `contents_sangsin_compliment.json` 구조 분석
2. `contents_jisok.json`, `contents_joonghwa.json`, `contents_hwakjang.json` 구조 분석

**구현 항목**:
```python
# ContentLoader 메서드 추가
def get_sangsin_compliment(self, sangsin: str) -> dict[str, Any] | None
def get_yeonggeukryeong_content(self, yeonggeuk_type: str) -> dict[str, Any] | None

# 편의 함수 추가
def get_sangsin_compliment(sangsin: str) -> dict[str, Any] | None
def get_yeonggeukryeong_content(yeonggeuk_type: str) -> dict[str, Any] | None
```

**API 통합**:
- `/api/v1/saju/identity` 응답 모델에 필드 추가
- 테스트 케이스 작성

#### Phase 2: 중간 난이도 연동 (2-3일)

**파일 분석**:
1. `contents_hapChung/` 디렉토리 구조 분석
2. `contents_ilgan_hw.json` 구조 분석
3. `contents_ilgan_love.json` 구조 분석
4. `contents_bestFriend.json` 구조 분석

**구현 항목**:
```python
# 합충 관계
def get_hapchung_content(self, hapchung_type: str) -> dict[str, Any] | None

# 일간 화월
def get_ilgan_hw_content(self, gan: str, month: int) -> dict[str, Any] | None

# 일간 연애
def get_ilgan_love_content(self, gan: str) -> dict[str, Any] | None

# 베프 유형
def get_best_friend_content(self, friend_type: str) -> dict[str, Any] | None
```

**API 통합**:
- 응답 모델 확장
- 복합 키 처리 로직 구현

#### Phase 3: 복잡한 로직 연동 (3-4일)

**파일 분석**:
1. `contents_old_young.json` 구조 분석
2. `contents_light_question/` 디렉토리 내 다중 파일 분석

**구현 항목**:
```python
# 노소 유형
def get_old_young_content(self, age_type: str) -> dict[str, Any] | None

# 경운 질문 (다중 파일)
def get_light_question_content(self, question_type: str) -> dict[str, Any] | None
```

**특별 고려사항**:
- 경운 질문은 파일이 많을 수 있으므로 별도 서브클래스 고려
- 동적 로딩 전략으로 메모리 최적화

### 2. 아키텍처 설계

#### 클래스 확장

```python
class ContentLoader:
    def __init__(self, ...):
        # 기존 초기화 코드
        # Phase 1 경로 추가
        self._sangsin_compliment_path = ...
        self._yeonggeukryeong_paths = {
            "jisok": ...,
            "joonghwa": ...,
            "hwakjang": ...,
        }

        # Phase 2 경로 추가
        self._hapchung_base = ...
        self._ilgan_hw_path = ...
        self._ilgan_love_path = ...
        self._best_friend_path = ...

        # Phase 3 경로 추가
        self._old_young_path = ...
        self._light_question_base = ...

        # 캐싱을 위한 내부 맵
        self._sangsin_compliment_map = self._build_sangsin_compliment_map()
        self._yeonggeukryeong_map = self._build_yeonggeukryeong_map()
        # ... 등
```

#### 응답 모델 확장

```python
class IdentityResponse(BaseModel):
    # 기존 필드
    ilgan: dict[str, Any] | None = None
    yongsin: dict[str, Any] | None = None
    gyouk: dict[str, Any] | None = None

    # Phase 1 필드
    sangsin_compliment: dict[str, Any] | None = None
    yeonggeukryeong: dict[str, Any] | None = None

    # Phase 2 필드
    hapchung: dict[str, Any] | None = None
    ilgan_hw: dict[str, Any] | None = None
    ilgan_love: dict[str, Any] | None = None
    best_friend: dict[str, Any] | None = None

    # Phase 3 필드
    old_young: dict[str, Any] | None = None
    light_question: dict[str, Any] | None = None
```

### 3. 파일 경로 구조

```
resources/testResult/
├── contents_sangsin_compliment.json          # Phase 1
├── contents_jisok.json                        # Phase 1
├── contents_joonghwa.json                     # Phase 1
├── contents_hwakjang.json                     # Phase 1
├── contents_hapChung/                         # Phase 2
│   ├── no/contents_no.json
│   ├── samhapYes/contents_samhap.json
│   ├── banghapYes/contents_banghap.json
│   └── onlyChung/contents_onlyChung.json
├── contents_ilgan_hw.json                     # Phase 2
├── contents_ilgan_love.json                   # Phase 2
├── contents_bestFriend.json                   # Phase 2
├── contents_old_young.json                    # Phase 3
└── contents_light_question/                   # Phase 3
    ├── question_type_1.json
    ├── question_type_2.json
    └── ...
```

### 4. 데이터 흐름

```
API Request (/api/v1/saju/identity)
    ↓
SajuService.calculate()
    ↓
ContentLoader 메서드 호출
    ↓
JSON 파일 로드 및 파싱
    ↓
데이터 변환 및 필터링
    ↓
IdentityResponse 모델 구성
    ↓
JSON 응답 반환
```

---

## 위험 관리

### 1. 기술적 위험

| 위험 | 완화 전략 |
|------|-----------|
| JSON 구조 불일치 | 파일 구조 사전 분석, 유연한 파싱 로직 |
| 메모리 과다 사용 | 지연 로딩, 필요한 파일만 로드 |
| 성능 저하 | 캐싱 전략, 비동기 로드 고려 |
| 기존 기능 파괴 | 추가만 수행, 기존 코드 수정 최소화 |

### 2. 일정 위험

| 위험 | 완화 전략 |
|------|-----------|
| 파일 분석 시간 초과 | Phase별 우선순위 조정 |
| 경운 질문 파일 다수 | 별도 SPEC으로 분리 가능 |
| 테스트 작업 시간 | 기존 테스트 패턴 재사용 |

---

## 성공 기준

### 1. 기능 기준

- [ ] Phase 1: 4개 콘텐츠 파일 연동 완료
- [ ] Phase 2: 8개 콘텐츠 파일(합충 4개 포함) 연동 완료
- [ ] Phase 3: 노소/경운 질문 콘텐츠 연동 완료
- [ ] API 엔드포인트에서 모든 콘텐츠 확인 가능

### 2. 품질 기준

- [ ] 단위 테스트 100% 통과
- [ ] 코드 커버리지 85% 이상
- [ ] ruff/black 린팅 통과
- [ ] API 응답 시간 500ms 이내

### 3. 문서 기준

- [ ] 모든 새로운 메서드에 독스트링 제공
- [ ] API 문서(Swagger) 자동 생성 확인
- [ ] README 업데이트
