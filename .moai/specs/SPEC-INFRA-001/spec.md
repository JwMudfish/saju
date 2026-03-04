# SPEC-INFRA-001: 패키지 관리자 uv 도입 및 Python 3.11 고정

---
id: "SPEC-INFRA-001"
version: "1.0.0"
status: "completed"
created: "2026-02-27"
updated: "2026-02-27"
author: "jw"
priority: "High"
domain: "INFRA"
tags: ["infrastructure", "package-manager", "python-version", "uv", "build-system"]
---

## 1. 환경 (Environment)

### 1.1 현재 상태

**빌드 시스템:**
- 도구: `setuptools>=68.0.0`
- 백엔드: `setuptools.backends.legacy:build`
- 의존성 관리: `pyproject.toml` 기반

**Python 버전 요구사항:**
- 최소: `>=3.9`
- ruff 타겟: `py39`
- mypy 타겟: `3.9`

**현재 문제점:**
1. **느린 의존성 해석**: setuptools는 의존성 해석 속도가 uv 대비 10~100배 느림
2. **Lock 파일 부재**: 재현 가능한 빌드를 위한 lock 파일이 없음
3. **Python 버전 범위 과도**: 3.9~3.13 범위 지원으로 테스트 행렬 증가
4. **가상환경 관리**: venv는 uv에 비해 2~3배 느림

### 1.2 대상 환경

**운영 환경:**
- OS: macOS, Linux (Ubuntu 20.04+)
- Python: 3.11 (단일 버전 고정)
- 배포: PyPI 패키지 및 Docker 컨테이너

**개발 환경:**
- 로컬 개발: macOS, Linux, Windows (WSL2)
- CI/CD: GitHub Actions (ubuntu-latest)
- IDE: VS Code, PyCharm

---

## 2. 가정 (Assumptions)

### 2.1 기술적 가정

**uv 안정성:**
- uv는 Astral 출시의 안정적인 패키지 관리자임
- Python 3.11 호환성이 완벽하게 지원됨
- PyPI 통합이 표준 pip과 동등하게 작동함

**Python 3.11 선택 이유:**
- 성능: 3.10 대비 10~60% 향상된 CPython 최적화
- 타입 힌트: `str | None` 유니온 타입 단축 문법 지원
- 데이터클래스: `KW_ONLY` 지원으로 도메인 모델 작성 용이
- 생태계: 2026년 2월 기준 가장 안정적인 Python 버전

### 2.2 운영적 가정

**개발자 영향:**
- 팀은 uv 사용법을 빠르게 습득할 수 있음
- 기존 venv 환경과의 공존이 가능함
- IDE 통합(virtualenvwrapper, poetry 대체)이 원활할 것임

**CI/CD 영향:**
- GitHub Actions에서 uv 설치가 빠르게 완료됨
- Docker 이미지 빌드 시간이 단축될 것임
- 의존성 캐싱 효율이 개선될 것임

### 2.3 호환성 가정

**의존성 호환성:**
- pydantic>=2.6.0: Python 3.11 완벽 지원
- python-dateutil>=2.9.0: Python 3.11 완벽 지원
- korean-lunar-calendar>=0.3.1: Python 3.11 지원 확인 필요

---

## 3. 요구사항 (Requirements)

### 3.1 Ubiquitous Requirements (항상 활성)

**REQ-INFRA-001:** 시스템은 **항상** Python 3.11을 최소 버전으로 요구해야 한다.

**REQ-INFRA-002:** 시스템은 **항상** uv.lock 파일을 통한 재현 가능한 빌드를 지원해야 한다.

**REQ-INFRA-003:** 시스템은 **항상** `.venv` 가상환경을 사용해야 한다.

### 3.2 Event-Driven Requirements (이벤트 기반)

**REQ-INFRA-004:** **WHEN** 개발자가 `uv sync`를 실행하면, 시스템은 **SHALL** uv.lock을 기반으로 의존성을 설치해야 한다.

**REQ-INFRA-005:** **WHEN** 개발자가 `uv add <package>`를 실행하면, 시스템은 **SHALL** pyproject.toml과 uv.lock을 동기화해야 한다.

**REQ-INFRA-006:** **WHEN** 개발자가 `uv run pytest`를 실행하면, 시스템은 **SHALL** 가상환경 없이 명령을 실행해야 한다.

**REQ-INFRA-007:** **WHEN** CI/CD 파이프라인이 실행되면, 시스템은 **SHALL** uv 캐시를 활용하여 빠른 의존성 설치를 제공해야 한다.

### 3.3 State-Driven Requirements (상태 기반)

**REQ-INFRA-008:** **IF** setuptools 백엔드가 존재하면, 시스템은 **SHALL** 이를 uv-based 백엔드로 변환해야 한다.

**REQ-INFRA-009:** **IF** `requires-python = ">=3.9"` 설정이 존재하면, 시스템은 **SHALL** 이를 `"3.11"`으로 고정해야 한다.

**REQ-INFRA-010:** **IF** ruff/mypy 타겟 버전이 `py39`이면, 시스템은 **SHALL** 이를 `py311`로 변경해야 한다.

### 3.4 Unwanted Requirements (금지 사항)

**REQ-INFRA-011:** 시스템은 setuptools 빌드 백엔드를 **사용하지 않아야 한다**.

**REQ-INFRA-012:** 시스템은 Poetry, Pipenv를 **사용하지 않아야 한다**.

**REQ-INFRA-013:** 시스템은 Python 3.9, 3.10, 3.12, 3.13에 대한 **공식 지원을 제공하지 않아야 한다**.

**REQ-INFRA-014:** 시스템은 `python -m venv`로 생성된 가상환경을 **사용하지 않아야 한다**.

### 3.5 Optional Requirements (선택 사항)

**REQ-INFRA-015:** **가능하면** uv의 병렬 의존성 다운로드를 활용하여 설치 속도를 향상시켜야 한다.

**REQ-INFRA-016:** **가능하면** uv의 네이티브 TLS 백엔드를 사용하여 보안 연결을 개선해야 한다.

---

## 4. 상세 명세 (Specifications)

### 4.1 pyproject.toml 변경 사항

**빌드 시스템 변경:**

```toml
# 기존
[build-system]
requires = ["setuptools>=68.0.0"]
build-backend = "setuptools.backends.legacy:build"

# 변경 후
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

**Python 버전 고정:**

```toml
# 기존
requires-python = ">=3.9"

# 변경 후
requires-python = ">=3.11"
```

**툴 설정 변경:**

```toml
# 기존
[tool.ruff]
target-version = "py39"

[tool.mypy]
python_version = "3.9"

# 변경 후
[tool.ruff]
target-version = "py311"

[tool.mypy]
python_version = "3.11"
```

**의존성 정리:**

```toml
# 제거
eval_type_backport>=0.1.0;python_version<'3.10'

# 이유: Python 3.11+에서는 typing_extensions로 대체됨
```

### 4.2 uv.lock 생성

**Lock 파일 구조:**
- 해시 알고리즘: SHA256
- 의존성 트리: 전이적 의존성 포함
- 메타데이터: 패키지 버전, URL, 해시값

**생성 명령:**
```bash
uv lock
```

**주요 이점:**
1. 재현 가능한 빌드: 동일 lock 파일로 동일 의존성 트리 재현
2. 빠른 설치: 해시 검증으로 중복 다운로드 방지
3. 보안: 의존성 스푸핑 방지

### 4.3 가상환경 관리

**생성:**
```bash
# 기존 방식
python3.11 -m venv .venv
source .venv/bin/activate

# uv 방식
uv venv --python 3.11
source .venv/bin/activate  # 또는 uv가 자동 활성화
```

**의존성 설치:**
```bash
# 기존 방식
pip install -e ".[dev]"
pip install -r requirements.txt

# uv 방식
uv sync
# 또는 개발 의존성만
uv sync --extra dev
```

### 4.4 CI/CD 통합

**GitHub Actions 예시:**

```yaml
- name: Install uv
  run: |
    curl -LsSf https://astral.sh/uv/install.sh | sh
    echo "$HOME/.cargo/bin" >> $GITHUB_PATH

- name: Set up Python
  run: uv venv --python 3.11

- name: Install dependencies
  run: uv sync

- name: Run tests
  run: uv run pytest
```

### 4.5 Docker 통합

**Dockerfile 예시:**

```dockerfile
FROM python:3.11-slim

# uv 설치
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# 작업 디렉토리
WORKDIR /app

# 의존성 복사 및 설치
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

# 소스 코드 복사
COPY . .

# 실행
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0"]
```

### 4.6 개발자 워크플로우

**초기 설정:**
```bash
# uv 설치
curl -LsSf https://astral.sh/uv/install.sh | sh

# 프로젝트 클론
git clone <repo>
cd saju

# 가상환경 생성 및 의존성 설치
uv venv --python 3.11
uv sync
```

**패키지 추가:**
```bash
# 프로덕션 의존성
uv add fastapi

# 개발 의존성
uv add --dev pytest-cov
```

**스크립트 실행:**
```bash
# 가상환경 활성화 없이 실행
uv run pytest
uv run ruff check .
uv run mypy app/
```

---

## 5. 추적성 (Traceability)

### 5.1 요구사항-구현 매핑

| 요구사항 ID | 관련 파일 | 구현 위치 |
|------------|----------|----------|
| REQ-INFRA-001 | pyproject.toml | requires-python = ">=3.11" |
| REQ-INFRA-002 | uv.lock | 자동 생성 |
| REQ-INFRA-003 | .venv/ | uv venv으로 생성 |
| REQ-INFRA-004 | CLI | uv sync 명령 |
| REQ-INFRA-005 | CLI | uv add 명령 |
| REQ-INFRA-006 | CLI | uv run 명령 |
| REQ-INFRA-007 | .github/workflows/ | CI/CD 설정 |
| REQ-INFRA-008 | pyproject.toml | build-backend = "hatchling.build" |
| REQ-INFRA-009 | pyproject.toml | requires-python = ">=3.11" |
| REQ-INFRA-010 | pyproject.toml | target-version = "py311" |
| REQ-INFRA-011 | pyproject.toml | setuptools 제거 |
| REQ-INFRA-012 | - | Poetry/Pipenv 사용 금지 |
| REQ-INFRA-013 | pyproject.toml | Python 3.11 고정 |
| REQ-INFRA-014 | - | venv 대신 uv venv 사용 |

### 5.2 테스트 매핑

| 테스트 ID | 검증 요구사항 | 테스트 방법 |
|----------|-------------|-----------|
| TC-INFRA-001 | REQ-INFRA-001 | pyproject.toml 파싱 확인 |
| TC-INFRA-002 | REQ-INFRA-002 | uv.lock 존재 및 유효성 검증 |
| TC-INFRA-003 | REQ-INFRA-004 | uv sync 실행 후 설치 확인 |
| TC-INFRA-004 | REQ-INFRA-005 | uv add 후 파일 동기화 확인 |
| TC-INFRA-005 | REQ-INFRA-006 | uv run pytest 실행 확인 |
| TC-INFRA-006 | REQ-INFRA-008 | 빌드 백엔드 변경 확인 |

---

## 6. 참고 자료 (References)

### 6.1 공식 문서

- uv 공식 문서: https://docs.astral.sh/uv/
- Python 3.11 릴리스 노트: https://docs.python.org/3.11/whatsnew/3.11.html
- Hatchling 백엔드: https://hatch.pypa.io/latest/config/

### 6.2 기술 비교

| 도구 | 설치 속도 | Lock 파일 | Python 버전 관리 |
|------|----------|----------|-----------------|
| setuptools | 기준 | 없음 | 미지원 |
| Poetry | 2~3배 느림 | 있음 | 지원 |
| uv | 10~100배 빠름 | 있음 | 지원 |

### 6.3 관련 SPEC

- SPEC-CORE-001: 사주팔자 Python 순수 계산 엔진 구현
- 향후 SPEC-API-001: FastAPI REST API 구현 (예정)
