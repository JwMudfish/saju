# SPEC-API-002: 구현 계획

## 메타데이터

| 항목 | 내용 |
|------|------|
| SPEC ID | SPEC-API-002 |
| TAG | SPEC-API-002 |
| 우선순위 | High |

---

## 기술 접근 방식

### 전략: 기존 SajuService 재사용 + 응답 모델 분해

신규 엔드포인트는 `SajuService.calculate()`를 그대로 호출하여 전체 결과를 받은 후,
각 엔드포인트에 맞는 필드만 추출하여 반환한다.

**장점:**
- 기존 비즈니스 로직 변경 불필요
- 중복 코드 최소화
- 테스트 용이성 (기존 서비스 테스트 그대로 활용)

**단점:**
- 요청마다 전체 계산 수행 (성능 최적화 미실시)
- 향후 개선: 엔드포인트별 경량 계산 서비스 분리 가능

---

## 구현 마일스톤

### 우선순위 1: 응답 모델 정의

**파일:** `core/models/response.py`

**작업 목록:**
1. `PillarsResponse` 모델 추가
   - 필드: `year_pillar`, `month_pillar`, `day_pillar`, `hour_pillar`, `pillar_meanings`
2. `AnalysisResponse` 모델 추가
   - 필드: `yuksin_list`, `hapchung`, `ohang_ratio`, `jijanggan`, `sibiunsung`, `shinsal`
3. `FortuneResponse` 모델 추가
   - 필드: `deun`, `sewun`
4. `IdentityContent` 모델 추가 (카드 콘텐츠 래퍼)
5. `IdentityResponse` 모델 추가
   - 필드: `day_gan`, `yongshin`, `gyouk_name`, `ilgan_content`, `gyouk_content`, `yongsin_content`

**의존성:** 없음 (독립적)

---

### 우선순위 2: 신규 엔드포인트 구현

**파일:** `app/api/endpoints/saju.py`

**작업 목록:**
1. `POST /api/v1/saju/pillars` 엔드포인트 구현
   - `SajuService.calculate()` 호출
   - `PillarsResponse` 로 변환하여 반환
2. `POST /api/v1/saju/analysis` 엔드포인트 구현
   - `SajuService.calculate()` 호출
   - `AnalysisResponse` 로 변환하여 반환
3. `POST /api/v1/saju/fortune` 엔드포인트 구현
   - `SajuService.calculate()` 호출
   - `FortuneResponse` 로 변환하여 반환
4. `POST /api/v1/saju/identity` 엔드포인트 구현
   - `SajuService.calculate()` 호출
   - `ContentLoader` 에서 일간/격국/용신 콘텐츠 조회
   - `IdentityResponse` 로 변환하여 반환

**의존성:**
- 우선순위 1 (응답 모델) 완료 후 진행
- SPEC-UI-004 (격국 계산 로직, `/identity` 엔드포인트)

---

### 우선순위 3: 의존성 주입 확장

**파일:** `app/api/deps.py`

**작업 목록:**
1. `get_content_loader()` 의존성 함수 추가
2. `/identity` 엔드포인트에서 `ContentLoader` 싱글톤 주입

**의존성:** 우선순위 2 진행 중 병행 가능

---

### 우선순위 4: 테스트

**파일:** `tests/test_api_saju.py` (기존 확장), `tests/test_api_saju_detail.py` (신규)

**작업 목록:**
1. `POST /api/v1/saju/pillars` 테스트
   - 정상 케이스: 4기둥 반환 확인
   - 에러 케이스: 잘못된 날짜 → HTTP 400
2. `POST /api/v1/saju/analysis` 테스트
   - 정상 케이스: 육신/오행/합충 포함 확인
3. `POST /api/v1/saju/fortune` 테스트
   - 정상 케이스: 대운/세운 포함 확인
4. `POST /api/v1/saju/identity` 테스트
   - 정상 케이스: 일간/격국/용신 콘텐츠 확인
   - 콘텐츠 없음: null 필드 포함 HTTP 200
5. 기존 `POST /api/v1/saju` 하위 호환성 회귀 테스트

**의존성:** 우선순위 1~3 완료 후 진행

---

## 기술 리스크 및 대응

| 리스크 | 확률 | 영향도 | 대응 방안 |
|--------|------|--------|---------|
| URL 패턴 충돌 (`/saju` vs `/saju/pillars`) | 낮 | 중 | FastAPI는 구체적 경로 우선 처리, 순서 확인 |
| 성능 저하 (전체 계산 후 필터링) | 중 | 낮 | 이 SPEC 범위에서는 허용, 향후 최적화 |
| `/identity` SPEC-UI-004 미완료 | 중 | 중 | 격국 계산 없이도 일간/용신만 먼저 반환 가능 |
| 응답 모델 중복 (`SajuResult` 부분집합) | 낮 | 낮 | 새 모델로 명확하게 분리 |

---

## 아키텍처 의사결정

### ADR-001: 엔드포인트 파일 구조

- **결정:** 기존 `saju.py`에 신규 엔드포인트를 추가 (별도 파일 분리 없음)
- **이유:** 라우터 등록 변경 최소화, 파일 수 증가 방지
- **트레이드오프:** saju.py 파일 크기 증가 (허용 범위 내)
- **향후:** 100줄 이상 증가 시 `saju_detail.py`로 분리 검토

### ADR-002: 전체 계산 후 필터링

- **결정:** 모든 신규 엔드포인트는 `SajuService.calculate()` 전체 호출 후 필드 추출
- **이유:** 코드 중복 없이 빠른 구현 가능, 기존 서비스 테스트 재사용
- **트레이드오프:** 불필요한 계산 포함 (성능 최적화 안 됨)

### ADR-003: `IdentityContent` 래퍼 모델

- **결정:** 각 카드 콘텐츠를 `IdentityContent` 표준 모델로 래핑
- **이유:** 일간/격국/용신 콘텐츠가 서로 다른 JSON 구조를 가지므로 통일된 인터페이스 제공
- **필드 매핑:** `title`=제목, `subtitle`=격국명/특징, `description`=짧은 설명, `contents`=본문, `tags`=해시태그

---

## 파일 변경 요약

| 파일 | 변경 유형 | 주요 변경 내용 |
|------|---------|--------------|
| `core/models/response.py` | 수정 | PillarsResponse, AnalysisResponse, FortuneResponse, IdentityResponse 추가 |
| `app/api/endpoints/saju.py` | 수정 | 4개 신규 엔드포인트 추가 |
| `app/api/deps.py` | 수정 | get_content_loader 의존성 추가 |
| `tests/test_api_saju.py` | 수정 | 기존 테스트 유지 + 회귀 테스트 |
| `tests/test_api_saju_detail.py` | 신규 | 4개 신규 엔드포인트 테스트 |

---

## 연관 SPEC

- SPEC-API-001: 기존 사주 API (하위 호환 대상)
- SPEC-UI-004: 격국 계산 로직 (`/identity` 엔드포인트에 필요)
- SPEC-CALC-001, SPEC-CALC-002: 계산 엔진 (기존, 변경 없음)
