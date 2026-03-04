# SPEC-INFRA-001 인수 조건

---
id: "SPEC-INFRA-001"
version: "1.0.0"
status: "Planned"
created: "2026-02-27"
updated: "2026-02-27"
author: "jw"
priority: "High"
domain: "INFRA"
phase: "Acceptance"
traceability: ["spec.md", "plan.md"]
---

## 1. 인수 개요

이 문서는 SPEC-INFRA-001(패키지 관리자 uv 도입 및 Python 3.11 고정)의 인수 조건을 정의합니다.

**인수 기준:**
- 모든 EARS 요구사항 충족
- 테스트 시나리오 100% 통과
- 기능 회귀 없음 (기존 테스트 100% 통과)
- 성능 목표 달성

---

## 2. 정의 (Definitions)

### 2.1 용어 정의

| 용어 | 정의 |
|------|------|
| uv | Astral에서 개발한 Python 패키지 관리자 (Rust로 작성) |
| uv.lock | uv가 생성하는 의존성 lock 파일 (재현 가능한 빌드 보장) |
| hatchling | 현대적인 Python 빌드 백엔드 (uv 공식 지원) |
| setuptools | 기존 Python 빌드 백엔드 (대상 제거) |
| 가상환경 | Python 프로젝트별 격리된 실행 환경 |

### 2.2 약어

| 약어 | 전체 |
|------|------|
| REQ | Requirement (요구사항) |
| TC | Test Case (테스트 케이스) |
| GWT | Given-When-Then (테스트 시나리오 형식) |

---

## 3. 인수 조건 (Acceptance Criteria)

### 3.1 기능적 요구사항 (Functional Requirements)

**AC-INFRA-001: Python 3.11 고정**
- **Given:** pyproject.toml 파일이 존재
- **When:** 개발자가 파일을 확인
- **Then:** `requires-python = ">=3.11"` 설정이 존재해야 한다
- **And:** ruff 타겟이 `py311`이어야 한다
- **And:** mypy 타겟이 `3.11`이어야 한다

**AC-INFRA-002: 빌드 백엔드 전환**
- **Given:** pyproject.toml 파일이 존재
- **When:** 개발자가 빌드 시스템을 확인
- **Then:** `build-backend = "hatchling.build"` 설정이 존재해야 한다
- **And:** setuptools에 대한 참조가 없어야 한다

**AC-INFRA-003: Lock 파일 존재**
- **Given:** 프로젝트 루트 디렉토리
- **When:** 개발자가 파일 목록을 확인
- **Then:** uv.lock 파일이 존재해야 한다
- **And:** uv.lock이 최신 상태여야 한다 (pyproject.toml과 동기화)

**AC-INFRA-004: 가상환경 생성**
- **Given:** uv가 설치된 상태
- **When:** 개발자가 `uv venv --python 3.11`을 실행
- **Then:** .venv 디렉토리가 생성되어야 한다
- **And:** Python 3.11이 사용되어야 한다 (`uv run python --version` 확인)

**AC-INFRA-005: 의존성 설치**
- **Given:** uv.lock 파일이 존재
- **When:** 개발자가 `uv sync`를 실행
- **Then:** 모든 의존성이 설치되어야 한다
- **And:** `uv run pytest` 실행 시 모든 테스트가 통과해야 한다

**AC-INFRA-006: 패키지 추가**
- **Given:** 개발 환경이 설정된 상태
- **When:** 개발자가 `uv add <package>`를 실행
- **Then:** pyproject.toml에 패키지가 추가되어야 한다
- **And:** uv.lock이 업데이트되어야 한다

**AC-INFRA-007: 의존성 제거**
- **Given:** eval_type_backport가 pyproject.toml에 존재
- **When:** 개발자가 Python 3.11 전환을 완료
- **Then:** eval_type_backport가 제거되어야 한다
- **And:** 테스트가 여전히 통과해야 한다 (Python 3.11에서 불필요)

### 3.2 비기능적 요구사항 (Non-Functional Requirements)

**AC-INFRA-008: 성능 - 의존성 설치**
- **Given:** 비어있는 가상환경
- **When:** 개발자가 `uv sync`를 실행
- **Then:** 5초 이내에 완료되어야 한다 (기존 pip 기반 30s 대비)

**AC-INFRA-009: 성능 - 가상환경 생성**
- **Given:** 프로젝트 루트 디렉토리
- **When:** 개발자가 `uv venv`를 실행
- **Then:** 3초 이내에 완료되어야 한다 (기존 venv 기반 10s 대비)

**AC-INFRA-010: 호환성 - 기존 테스트**
- **Given:** 기존 테스트 스위트가 존재
- **When:** 개발자가 `uv run pytest`를 실행
- **Then:** 모든 기존 테스트가 통과해야 한다 (100% 회귀 방지)
- **And:** 커버리지가 85% 이상 유지되어야 한다

**AC-INFRA-011: 보안 - Lock 파일 무결점**
- **Given:** uv.lock 파일이 존재
- **When:** 개발자가 `uv lock --verify`를 실행
- **Then:** 무결점 검증이 통과해야 한다
- **And:** SHA256 해시가 유효해야 한다

**AC-INFRA-012: CI/CD 통합**
- **Given:** GitHub Actions 워크플로우가 존재
- **When:** CI 파이프라인이 실행
- **Then:** uv로 의존성 설치가 수행되어야 한다
- **And:** 전체 실행 시간이 30% 이상 단축되어야 한다

### 3.3 사용자 경험 요구사항 (User Experience Requirements)

**AC-INFRA-013: 명령어 단순화**
- **Given:** 새로운 팀원이 프로젝트에 참여
- **When:** 팀원이 README.md의 설치 가이드를 따름
- **Then:** 3단계 이내로 개발 환경 설정이 완료되어야 한다
- **And:** 추가적인 troubleshooting이 불필요해야 한다

**AC-INFRA-014: 문화 완화**
- **Given:** 팀원이 setuptools에서 uv로 전환
- **When:** 팀원이 새로운 명령어를 학습
- **Then:** README.md에 명확한 가이드가 제공되어야 한다
- **And:** 치트 시트(cheat sheet)가 제공되어야 한다

---

## 4. 테스트 시나리오 (Test Scenarios)

### 4.1 기본 기능 테스트

**TC-INFRA-001: Python 버전 고정 검증**

```gherkin
Feature: Python 버전 고정

  Scenario: pyproject.toml에 Python 3.11 설정이 존재
    Given 프로젝트 루트 디렉토리에 있음
    When pyproject.toml 파일을 읽음
    Then requires-python 필드가 ">=3.11"이어야 함
    And ruff 타겟 버전이 "py311"이어야 함
    And mypy 타겟 버전이 "3.11"이어야 함
```

**TC-INFRA-002: 빌드 백엔드 전환 검증**

```gherkin
Feature: 빌드 백엔드 전환

  Scenario: setuptools이 hatchling으로 대체됨
    Given pyproject.toml 파일이 존재
    When build-system 섹션을 확인
    Then build-backend가 "hatchling.build"이어야 함
    And setuptools 관련 설정이 없어야 함
```

**TC-INFRA-003: Lock 파일 생성 및 유효성**

```gherkin
Feature: uv.lock 파일 관리

  Scenario: uv.lock이 존재하고 유효함
    Given 프로젝트 루트 디렉토리
    When 파일 목록을 확인
    Then uv.lock 파일이 존재해야 함
    And uv lock --verify 명령이 통과해야 함
```

**TC-INFRA-004: 가상환경 생성 및 검증**

```gherkin
Feature: uv 가상환경 관리

  Scenario: .venv가 uv로 생성되고 Python 3.11 사용
    Given uv가 설치된 상태
    When uv venv --python 3.11 명령을 실행
    Then .venv 디렉토리가 생성되어야 함
    And uv run python --version이 "Python 3.11"를 출력해야 함
```

**TC-INFRA-005: 의존성 설치 및 테스트 실행**

```gherkin
Feature: 의존성 동기화

  Scenario: uv sync로 모든 의존성 설치
    Given uv.lock 파일이 존재
    When uv sync 명령을 실행
    Then 모든 패키지가 설치되어야 함
    And uv run pytest가 모든 테스트 통과해야 함
    And 커버리지가 85% 이상이어야 함
```

### 4.2 워크플로우 테스트

**TC-INFRA-006: 패키지 추가 워크플로우**

```gherkin
Feature: 패키지 의존성 관리

  Scenario: 개발자가 새로운 패키지 추가
    Given 프로젝트가 uv로 초기화된 상태
    When uv add httpx 명령을 실행
    Then pyproject.toml에 httpx가 추가되어야 함
    And uv.lock이 업데이트되어야 함
    And uv run python -c "import httpx"가 성공해야 함
```

**TC-INFRA-007: 개발 의존성 분리**

```gherkin
Feature: 개발/운영 의존성 분리

  Scenario: dev extra 그룹이 별도로 관리됨
    Given pyproject.toml에 [project.optional-dependencies]가 존재
    When uv sync --extra dev 명령을 실행
    Then dev 그룹 패키지만 설치되어야 함
    And pytest, ruff, mypy를 실행할 수 있어야 함
```

**TC-INFRA-008: uv run으로 명령 실행**

```gherkin
Feature: 가상환경 없는 명령 실행

  Scenario: uv run으로 별도 활성화 없이 명령 실행
    Given .venv가 활성화되지 않은 상태
    When uv run pytest 명령을 실행
    Then 테스트가 성공적으로 실행되어야 함
    And venv 활성화 오류가 발생하지 않아야 함
```

### 4.3 성능 테스트

**TC-INFRA-009: 의존성 설치 속도**

```gherkin
Feature: uv의 빠른 의존성 설치

  Scenario: uv sync가 5초 이내에 완료
    Given 깨끗한 .venv 디렉토리
    When time uv sync 명령을 실행
    Then 실제 시간이 5초 이내여야 함
    And 기존 pip 방식(30s) 대비 6배 이상 빨라야 함
```

**TC-INFRA-010: 가상환경 생성 속도**

```gherkin
Feature: uv의 빠른 가상환경 생성

  Scenario: uv venv가 3초 이내에 완료
    Given .venv가 존재하지 않는 상태
    When time uv venv 명령을 실행
    Then 실제 시간이 3초 이내여야 함
    And 기존 venv 방식(10s) 대비 3배 이상 빨라야 함
```

### 4.4 회귀 테스트

**TC-INFRA-011: 기존 기능 회귀 방지**

```gherkin
Feature: 기존 테스트 스위트 유지

  Scenario: 모든 기존 테스트가 여전히 통과
    Given SPEC-CORE-001 테스트 스위트가 존재
    When uv run pytest -v 명령을 실행
    Then 모든 60+ 테스트 케이스가 통과해야 함
    And 사주 계산 결과가 동일해야 함
    And 커버리지가 85% 이상 유지되어야 함
```

**TC-INFRA-012: 의존성 호환성**

```gherkin
Feature: 제3자 패키지 호환성

  Scenario: korean-lunar-calendar가 정상 작동
    Given uv가 설치된 상태
    When uv sync 및 uv run python 실행
    And from korean_lunar_calendar import KoreanLunarCalendar 수행
    Then 모듈 임포트가 성공해야 함
    And 기존 기능이 정상 작동해야 함
```

### 4.5 CI/CD 통합 테스트

**TC-INFRA-013: GitHub Actions 동작**

```gherkin
Feature: CI 파이프라인 uv 통합

  Scenario: GitHub Actions가 uv로 의존성 설치
    Given .github/workflows/ci.yml이 존재
    When CI 파이프라인이 트리거됨
    Then uv install 단계가 실행되어야 함
    And uv run pytest가 성공해야 함
    And 전체 실행 시간이 이전 대비 30% 단축되어야 함
```

**TC-INFRA-014: Docker 빌드**

```gherkin
Feature: Docker 이미지 빌드

  Scenario: Dockerfile이 uv를 사용
    Given uv 기반 Dockerfile이 존재
    When docker build -t saju-test 명령을 실행
    Then 이미지 빌드가 성공해야 함
    And 컨테이너 내에서 uv run pytest가 실행 가능해야 함
```

---

## 5. 품질 게이트 (Quality Gates)

### 5.1 정의 완료 (Definition of Done)

**필수 조건 (모두 충족):**
- [ ] 모든 EARS 요구사항이 구현됨
- [ ] 모든 테스트 시나리오(14개)가 통과
- [ ] 기존 테스트 회귀율 0%
- [ ] 코드 커버리지 85% 이상 유지
- [ ] README.md 업데이트 완료
- [ ] CI/CD 파이프라인 통합 완료
- [ ] 성능 목표 달성 (설치 5s, 가상환경 3s)
- [ ] 보안 검증 통과 (uv.lock 무결점)

### 5.2 품질 지표

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| 기능 완성도 | 100% | 요구사항 체크리스트 |
| 테스트 통과율 | 100% | pytest 결과 |
| 커버리지 | ≥85% | pytest-cov |
| 성능 향상 | ≥30% | CI 실행 시간 비교 |
| 회귀율 | 0% | 기존 테스트 결과 |
| 보안 취약점 | 0 | uv lock --verify |

---

## 6. 검증 방법 (Verification Methods)

### 6.1 자동화된 검증

**스크립트:**

```bash
#!/bin/bash
# verify_spec.sh - SPEC-INFRA-001 검증 스크립트

set -e

echo "=== SPEC-INFRA-001 검증 ==="

# 1. Python 버전 확인
echo "[1/7] Python 3.11 고정 확인..."
grep -q 'requires-python = ">=3.11"' pyproject.toml || exit 1

# 2. 빌드 백엔드 확인
echo "[2/7] 빌드 백엔드 확인..."
grep -q 'build-backend = "hatchling.build"' pyproject.toml || exit 1

# 3. Lock 파일 존재 확인
echo "[3/7] uv.lock 존재 확인..."
test -f uv.lock || exit 1

# 4. 가상환경 생성
echo "[4/7] 가상환경 생성..."
uv venv --python 3.11

# 5. 의존성 설치
echo "[5/7] 의존성 설치..."
time uv sync

# 6. 테스트 실행
echo "[6/7] 테스트 실행..."
uv run pytest --cov=core --cov-report=term-missing

# 7. Lock 파일 무결점
echo "[7/7] Lock 파일 무결점 검증..."
uv lock --verify

echo "=== 모든 검증 통과 ==="
```

### 6.2 수동 검증

**체크리스트:**

- [ ] README.md의 설치 가이드가 업데이트됨
- [ ] 새로운 팀원이 가이드를 따라 환경 설정 성공
- [ ] IDE(.vscode/settings.json)가 uv를 인식
- [ ] Docker 이미지 빌드 및 실행 성공
- [ ] CI 파이프라인 실행 시간 단축 확인

---

## 7. 롤백 기준 (Rollback Criteria)

다음 경우 이 SPEC을 롤백해야 합니다:

1. **치명적 호환성 문제:** korean-lunar-calendar 등 핵심 의존성이 uv와 호환되지 않음
2. **CI/CD 장애:** 파이프라인이 24시간 이상 복구 불가능한 상태
3. **성능 저하:** 기존 대비 성능이 10% 이상 저하됨
4. **팀원 심각한 어려움:** 다수의 팀원이 일상 작업에 심각한 어려움 겪음

---

## 8. 추적성 매트릭스 (Traceability Matrix)

| 요구사항 | 인수 조건 | 테스트 케이스 |
|----------|----------|--------------|
| REQ-INFRA-001 | AC-INFRA-001 | TC-INFRA-001 |
| REQ-INFRA-002 | AC-INFRA-003 | TC-INFRA-003 |
| REQ-INFRA-003 | AC-INFRA-004 | TC-INFRA-004 |
| REQ-INFRA-004 | AC-INFRA-005 | TC-INFRA-005 |
| REQ-INFRA-005 | AC-INFRA-006 | TC-INFRA-006 |
| REQ-INFRA-006 | AC-INFRA-007 | TC-INFRA-008 |
| REQ-INFRA-007 | AC-INFRA-012 | TC-INFRA-013, TC-INFRA-014 |
| REQ-INFRA-008 | AC-INFRA-002 | TC-INFRA-002 |
| REQ-INFRA-009 | AC-INFRA-001 | TC-INFRA-001 |
| REQ-INFRA-010 | AC-INFRA-001 | TC-INFRA-001 |
| REQ-INFRA-011 | AC-INFRA-002 | TC-INFRA-002 |
| REQ-INFRA-013 | AC-INFRA-008 | TC-INFRA-009 |
| REQ-INFRA-014 | AC-INFRA-009 | TC-INFRA-010 |

---

**문서 버전:** 1.0.0
**마지막 업데이트:** 2026-02-27
**인수 상태:** 대기 중
**승인자:** ___
