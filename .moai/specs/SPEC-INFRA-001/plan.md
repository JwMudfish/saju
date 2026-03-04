# SPEC-INFRA-001 구현 계획

---
id: "SPEC-INFRA-001"
version: "1.0.0"
status: "Planned"
created: "2026-02-27"
updated: "2026-02-27"
author: "jw"
priority: "High"
domain: "INFRA"
phase: "Plan"
related-specs: ["SPEC-CORE-001"]
---

## 1. 구현 개요

이 문서는 SPEC-INFRA-001(패키지 관리자 uv 도입 및 Python 3.11 고정)의 구현 계획을 설명합니다.

**구현 목표:**
1. setuptools 기반 빌드 시스템을 uv 기반으로 전환
2. Python 버전을 3.11로 고정하여 개발/테스트 행렬 단순화
3. uv.lock 도입으로 재현 가능한 빌드 보장
4. CI/CD 파이프라인과 개발자 워크플로우 최적화

---

## 2. 마일스톤 (Milestones)

### 2.1 1차 마일스톤: 기반 구축 (Priority High)

**목표:** uv 기반 빌드 시스템 기반 구축

**작업 항목:**
- [ ] uv 설치 및 설정
- [ ] pyproject.toml 빌드 시스템 변경
- [ ] Python 3.11 버전 고정
- [ ] 툴 설정(ruff, mypy) 타겟 변경
- [ ] uv.lock 초기 생성

**완료 기준:**
- `uv sync`로 의존성 설치 성공
- `uv run pytest`로 테스트 실행 가능
- 기존 테스트 통과 (100% 회귀 방지)

**예상 복잡도:** 낮음 (단일 파일 수정)

### 2.2 2차 마일스톤: 가상환경 마이그레이션 (Priority High)

**목표:** 기존 venv 환경을 uv 기반으로 전환

**작업 항목:**
- [ ] .venv 디렉토리 재생성 (uv venv)
- [ ] 개발자 문서 업데이트 (README.md)
- [ ] IDE 설정 업데이트 (.vscode/settings.json)
- [ ] 기존 의존성 제거 (eval_type_backport)

**완료 기준:**
- 기존 .venv 삭제 후 uv 기반 재생성 가능
- IDE가 uv 가상환경을 자동 인식
- 개발자가 새로운 워크플로우 따를 수 있음

**예상 복잡도:** 낮음 (문서 업데이트 중심)

### 2.3 3차 마일스톤: CI/CD 통합 (Priority Medium)

**목표:** GitHub Actions 파이프라인 uv 통합

**작업 항목:**
- [ ] .github/workflows/ci.yml uv 통합
- [ ] 의존성 캐싱 최적화
- [ ] Dockerfile uv 기반으로 변경
- [ ] 배포 파이프라인 업데이트

**완료 기준:**
- CI 실행 시간 30% 이상 단축
- Docker 이미지 빌드 속도 향상
- 모든 CI 테스트 통과

**예상 복잡도:** 중간 (여러 파일 수정)

### 2.4 4차 마일스톤: 검증 및 최적화 (Priority Low)

**목표:** 안정성 검증 및 성능 최적화

**작업 항목:**
- [ ] uv 병렬 다운로드 성능 측정
- [ ] 보안 감사 (의존성 취약점)
- [ ] 롤백 계획 문서화
- [ ] 개발자 교육 자료 작성

**완료 기준:**
- 성능 향상 지표 보고
- 보안 취약점 없음
- 롤백 절차 문서화 완료

**예상 복잡도:** 낮음 (검증 및 문서화)

---

## 3. 기술적 접근 (Technical Approach)

### 3.1 빌드 시스템 전환 전략

**단계 1: setuptools → hatchling**

이유:
- hatchling은 uv 공식 지원 백엔드
- 최신 Python 표준 준수 (PEP 517)
- 성능 우수

변경 내용:
```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

**단계 2: 의존성 정리**

제거 항목:
- `eval_type_backport`: Python 3.11+에서 불필요

### 3.2 Python 버전 고정 전략

**현재:** `>=3.9` (3.9, 3.10, 3.11, 3.12, 3.13)
**변경 후:** `>=3.11` (3.11, 3.12, 3.13)

이유:
- 타입 힌트 완성도 (Python 3.11+)
- 테스트 행렬 감소 (CI 시간 단축)
- 성능 향상 (3.11은 3.9 대비 10~60% 빠름)

타겟: 향후 6개월 간 3.11 고정, 이후 3.12로 업그레이드 고려

### 3.3 가상환경 관리 전략

**uv 가상환경 이점:**
1. 속도: venv 대비 2~3배 빠른 생성
2. 통합: `uv run`으로 별도 활성화 불필요
3. Python 관리: 버전별 자동 다운로드 및 관리

**마이그레이션 절차:**
```bash
# 1. 기존 환경 백업 (선택)
mv .venv .venv.backup

# 2. uv 가상환경 생성
uv venv --python 3.11

# 3. 의존성 설치
uv sync

# 4. 검증
uv run pytest

# 5. 백업 제거
rm -rf .venv.backup
```

### 3.4 Lock 파일 관리 전략

**uv.lock 특징:**
- uv 전용 바이너리 형식 (빠른 파싱)
- SHA256 해시 기반 무결점 검증
- 전이적 의존성 포함

**Commit 정책:**
- uv.lock은 버전 관리에 포함 (재현 가능성 보장)
- 의존성 업데이트 시 함께 커밋

**PR 정책:**
- 의존성 추가: `uv add` 후 PR에 uv.lock 포함
- 보안 업데이트: `uv lock --upgrade` 후 PR

---

## 4. 영향 분석 (Impact Analysis)

### 4.1 긍정적 영향

**성능:**
- 의존성 설치 속도: 10~100배 향상
- 가상환경 생성 속도: 2~3배 향상
- CI 실행 시간: 30% 이상 단축 예상

**개발자 경험:**
- `uv run`으로 별도 활성화 불필요
- 명령어 단순화 (`uv add` vs `pip install` + `requirements.txt` 수정)
- 빠른 피드백 루프

**안정성:**
- Lock 파일로 재현 가능한 빌드
- 해시 기반 무결점 검증
- 네이티브 TLS 백엔드로 보안 강화

### 4.2 잠재적 위험

**학습 곡선:**
- 팀원이 uv 명령어 학습 필요
- 기존 워크플로우와의 차이 이해 필요

**완화 방안:**
- README.md에 명확한 가이드 제공
- 팀 교육 세션 1시간
- IDE 설정 자동화 (.vscode/settings.json)

**호환성:**
- 일부 레거시 패키지는 uv와 호환성 문제 가능

**완화 방안:**
- korean-lunar-calendar 패키지 호환성 사전 검증
- 문제 시 pip 폴백 계획 준비
- 테스트 커버리지 85% 유지로 회귀 방지

### 4.3 롤백 계획

**트리거:**
- 치명적인 호환성 문제 발생
- CI/CD 파이프라인 장애
- 팀원 다수가 심각한 어려움 겪음

**절차:**
```bash
# 1. Git 이전 커밋으로 복귀
git revert <commit-hash>

# 2. setuptools 복원
# pyproject.toml 복구

# 3. 기존 가상환경 복원
python3.11 -m venv .venv
pip install -e ".[dev]"

# 4. 검증
pytest
```

**RTO (복구 목표 시간):** 1시간 이내

---

## 5. 리스크 관리 (Risk Management)

### 5.1 리스크 식별

| 리스크 | 확률 | 영향 | 점수 | 완화 전략 |
|-------|------|------|------|----------|
| korean-lunar-calendar 호환성 문제 | 낮음 (20%) | 높음 | 4 | 사전 테스트, pip 폴백 |
| 팀원 저항/학습 곡선 | 중간 (40%) | 중간 | 6 | 문서화, 교육 세션 |
| CI 파이프라인 장애 | 낮음 (10%) | 높음 | 3 | 테스트 환경에서 사전 검증 |
| Docker 이미지 빌드 실패 | 낮음 (15%) | 중간 | 3 | 로컬 빌드 테스트 |
| 의존성 해석 오류 | 낮음 (10%) | 중간 | 2 | uv.lock 검증 |

### 5.2 완화 조치

**korean-lunar-calendar 호환성:**
- 사전 테스트: `uv add korean-lunar-calendar` 후 임포트 테스트
- 문제 시: pip로 해당 패키지만 설치하는 하이브리드 방식

**팀원 저항:**
- benefits 강조 (성능 데이터 공유)
- 점진적 도입 (선택적 사용 가능)
- 지원 가이드 제공

---

## 6. 테스트 전략 (Testing Strategy)

### 6.1 단위 테스트

```python
# tests/test_infra/test_uv_config.py
def test_pyproject_python_version():
    """Python 3.11 고정 검증"""
    import tomli
    with open("pyproject.toml", "rb") as f:
        config = tomli.load(f)
    assert config["project"]["requires-python"] == ">=3.11"

def test_build_backend_is_hatchling():
    """빌드 백엔드 변경 검증"""
    import tomli
    with open("pyproject.toml", "rb") as f:
        config = tomli.load(f)
    assert config["build-system"]["build-backend"] == "hatchling.build"
```

### 6.2 통합 테스트

```bash
# uv 기반 빌드 테스트
uv sync
uv run pytest --cov=core

# CI 환경 시뮬레이션
docker build -t saju-test .
docker run saju-test uv run pytest
```

### 6.3 성능 테스트

```bash
# 의존성 설치 속도 측정
time uv sync  # uv 기반
# vs
time pip install -e ".[dev]"  # setuptools 기반

# 예상: uv가 10~100배 빠름
```

---

## 7. 배포 계획 (Deployment Plan)

### 7.1 단계적 배포

**Phase 1: 개발 환경 (1주차)**
- 로컬 개발 환경 uv 도입
- 팀원 피드백 수집
- 문서 및 가이드 업데이트

**Phase 2: CI/CD (2주차)**
- GitHub Actions uv 통합
- Docker 이미지 빌드 테스트
- CI 실행 시간 모니터링

**Phase 3: 운영 환경 (3주차)**
- PyPI 패키지 배포 (uv 기반)
- 운영 서버 배포 (uv 사용)
- 모니터링 및 안정화

### 7.2 커뮤니케이션 계획

**팀 공지:**
- Slack: 이번 주 변경 사항 공유
- Wiki: uv 사용 가이드 작성
- 미팅: 15분 스탠드업으로 질의응답

**문서 업데이트:**
- README.md: 설치 및 실행 섹션
- CONTRIBUTING.md: 개발 환경 설정
- .vscode/settings.json: IDE 통합

---

## 8. 성공 지표 (Success Metrics)

### 8.1 정량 지표

| 지표 | 현재 | 목표 | 측정 방법 |
|------|------|------|----------|
| 의존성 설치 시간 | ~30s | <5s | time uv sync |
| CI 실행 시간 | ~5m | <3.5m | GitHub Actions 로그 |
| 가상환경 생성 시간 | ~10s | <3s | time uv venv |
| 테스트 회귀율 | 0% | 0% | pytest 결과 |

### 8.2 정성 지표

- 팀원 만족도: 설문조사 (5점 만점에 4점 이상)
- 개발자 워크플로우 단순화: 피드백 수집
- 문서 완성도: README 업데이트 확인

---

## 9. 다음 단계 (Next Steps)

### 9.1 즉시 실행

1. **uv 설치:** `curl -LsSf https://astral.sh/uv/install.sh | sh`
2. **테스트 실행:** `uv sync && uv run pytest`
3. **문서 검토:** 이 계획서 검토 및 승인

### 9.2 1주차 목표

- [ ] pyproject.toml 수정 완료
- [ ] uv.lock 생성 및 커밋
- [ ] .venv 재생성
- [ ] README.md 업데이트

### 9.3 승인 필요

- [ ] 기술 리더 승인: uv 도입 전략
- [ ] 팀 합의: Python 3.11 고정
- [ ] CI/CD 담당자: 파이프라인 변경 승인

---

**문서 버전:** 1.0.0
**마지막 업데이트:** 2026-02-27
**승인 상태:** 대기 중
