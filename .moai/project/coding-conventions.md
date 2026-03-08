# Saju 프로젝트 코딩 컨벤션

실제 프로젝트 코드(`saju/core/`, `saju/app/`)에서 추출한 컨벤션입니다.
모든 SPEC 구현 시 이 문서를 기준으로 코드 스타일을 통일합니다.

---

## 1. 파일 구조 순서

모든 Python 파일은 아래 순서를 따릅니다.

```python
"""모듈 설명 (English).

JS 포팅 시: 원본 파일 경로 명시.
Logic based on manse_ori xxx/yyy.js functionName().
"""

from __future__ import annotations  # 항상 첫 번째

# stdlib imports (알파벳 순)
import json
import logging
import pathlib
from typing import Any

# 로컬 imports
from core.models.domain import SomeModel

# 모듈 레벨 상수 (private: 언더스코어 접두사)
_SOME_TABLE: dict[str, str] = { ... }
_SOME_PATH = pathlib.Path(__file__).parent / "data" / "file.json"

# 클래스 / 함수 정의
```

---

## 2. 타입 애너테이션

- mypy strict mode 준수 (에러 0개 유지)
- `Optional[X]` 대신 `X | None` 사용
- `Union[X, Y]` 대신 `X | Y` 사용
- 반환 타입 항상 명시
- 컬렉션 타입: `list[str]`, `dict[str, Any]` (소문자)

```python
# 올바른 예
def get_content(key: str) -> dict[str, Any] | None: ...
result: dict[str, str] = {}
cache: dict[tuple[int, int], datetime] | None = None

# 잘못된 예
def get_content(key: str) -> Optional[dict]: ...  # X
```

---

## 3. Docstring 규칙

### 모듈 docstring

- **영어**로 작성
- JS 포팅 모듈은 원본 파일 경로 및 함수명 참조 명시

```python
"""Yongshin (용신, Dominant Stem) calculation module.

Logic based on manse_ori manse/ryeong/ryeong.js smallJunggi() / bigJunggi().
"""
```

### 클래스 docstring

- **한국어** 1줄 설명
- `Args:` 있으면 영어 필드명 + 한국어 설명

```python
class ContentLoader:
    """일간, 용신, 격국 콘텐츠를 JSON 파일에서 로드하는 서비스.

    Args:
        ilgan_path: 일간 콘텐츠 JSON 파일 경로
    """
```

### 함수/메서드 docstring

- **한국어** 1줄 요약
- `Args:`, `Returns:`, `Raises:` 섹션 (해당하는 경우)

```python
def calc_dang_ryeong(month_ji: str, is_before_junggi: bool) -> str:
    """월지와 중기 이전/이후 여부로 당령(dang_ryeong/yongsin)을 계산합니다.

    Based on manse_ori manse/ryeong/ryeong.js smallJunggi() / bigJunggi().

    Args:
        month_ji: 월지 문자 (인/묘/진/사/오/미/신/유/술/해/자/축)
        is_before_junggi: True = 중기 이전, False = 중기 이후

    Returns:
        당령 천간 문자 (갑/을/병/정/경/신/임/계)
    """
```

### 짧은 private 메서드

- 1줄 한국어 요약만 허용 (Args/Returns 생략 가능)

```python
def _build_ilgan_map(self) -> dict[str, dict[str, Any]]:
    """일간 JSON을 파싱하여 한글 일간 -> 항목 딕셔너리를 구성한다."""
```

---

## 4. 상수 네이밍

- 모듈 private 상수: `_UPPER_SNAKE_CASE` (언더스코어 접두사)
- 공개 상수: `UPPER_SNAKE_CASE`
- 인라인 설명은 한국어, 영어 병기

```python
# 한자 -> 한글 천간(天干) 변환 테이블
HANJA_TO_HAN: dict[str, str] = { ... }

# 당령 테이블 - smallJunggi (중기 이전)
# Based on manse_ori manse/ryeong/ryeong.js smallJunggi()
_SMALL_JUNGGI_TABLE: dict[str, str] = { ... }
```

---

## 5. 인라인 주석

- 비즈니스 로직 설명: **한국어**
- JS 원본 참조: `# Based on manse_ori path/file.js functionName()`
- 섹션 구분: `# 동사 + 명사` 형태

```python
# 음력 → 양력 변환
if is_lunar:
    ...

# 용신(당령) 계산 - 실패 시 None 반환하여 메인 계산 보호
try:
    yongshin_result = calc_yongshin(...)
except Exception:
    yongshin_result = None
```

---

## 6. Pydantic 모델

- `BaseModel` 상속
- 필드 주석: 한국어 설명 + 영어 용어 병기
- Optional 필드: `= None` 기본값, `X | None` 타입
- 한국어 의미 + 영어 원어 쌍으로 표현

```python
class YongshinResult(BaseModel):
    """용신(당령) 분석 결과."""

    dang_ryeong: str  # 당령 (yongsin) - 지배적 천간
    heuisin: str      # 희신 - 당령으로부터 유도된 길신
    new_field: str | None = None  # 신규 Optional 필드
```

---

## 7. 에러 처리

### 코어 모듈 (core/)

- 실패 가능성이 있는 JSON 로드: `try/except` → 빈 컨테이너 반환 + `logger.warning`
- 비즈니스 로직 실패: `SajuError` 또는 `ValueError` raise

### 서비스 레이어 (app/services/)

- 핵심이 아닌 부가 기능 (컨텐츠 로드 등): 실패 시 `None` 반환, HTTP 200 유지
- 계산 실패: `ValueError` → API에서 HTTP 400

### API 레이어 (app/api/)

- `ValueError` → `HTTPException(400)`
- `RuntimeError` → `HTTPException(500)`

```python
# JSON 로드 실패 허용 패턴
try:
    return cast(dict[str, Any], json.loads(path.read_text(encoding="utf-8")))
except (FileNotFoundError, OSError, json.JSONDecodeError) as exc:
    logger.warning("%s 콘텐츠 파일 로드 실패: %s", label, exc)
    return {}

# 부가 기능 실패 허용 패턴 (saju_service.py 스타일)
try:
    result = calc_something(...)
except Exception:
    result = None
```

---

## 8. 싱글톤 패턴 (ContentLoader)

모듈 레벨 캐싱은 아래 패턴을 따릅니다.

```python
# 모듈 레벨 싱글톤 (캐시된 접근)
_loader: ContentLoader | None = None


def _get_loader() -> ContentLoader:
    """모듈 레벨 ContentLoader 싱글톤을 반환한다."""
    global _loader
    if _loader is None:
        _loader = ContentLoader()
    return _loader


def get_some_content(key: str) -> dict[str, Any] | None:
    """편의 함수 - 모듈 외부에서 직접 호출하는 진입점.

    Args:
        key: 조회 키

    Returns:
        콘텐츠 항목 딕셔너리 또는 None
    """
    return _get_loader().get_some_content(key)
```

---

## 9. JSON 파일 경로 관리

```python
# pathlib.Path 사용, __file__ 기준 상대 경로
_BASE_DIR = pathlib.Path(__file__).parent.parent.parent
_SOME_PATH = _BASE_DIR / "manse_ori" / "testResult" / "contents_xxx.json"

# 서브디렉토리 구조 (동적 경로)
_HISIN_BASE = _BASE_DIR / "manse_ori" / "testResult" / "contents_Hisin10"
# 런타임에: _HISIN_BASE / dir_name / "contents_HisinYes.json"
```

---

## 10. 테스트 파일 구조

- 파일명: `test_{모듈명}.py` (단수, 소문자 snake_case)
- 클래스명: `class Test{기능명}:` (PascalCase)
- 메서드명: `test_{입력조건}_{기대결과}()` 패턴

```python
"""Tests for xxx (한국어 설명) calculation module.

한국어 도메인 설명 및 테이블 등 상세 컨텍스트.
"""

from __future__ import annotations


class TestCalcSomething:
    """something 계산 테스트."""

    def test_input_a_returns_x(self) -> None:
        """입력 A일 때 X를 반환한다."""
        from core.module import calc_something  # 테스트 메서드 내부에서 import

        result = calc_something("a")
        assert result == "x"

    def test_invalid_input_returns_none(self) -> None:
        """잘못된 입력 시 None을 반환한다."""
        from core.module import calc_something

        result = calc_something("invalid")
        assert result is None
```

**주의**: import는 각 테스트 메서드 내부에서 수행 (모듈 상단 X)

---

## 11. 명리학 용어 로마자 표기 (프로젝트 내 통일)

| 한국어     | 변수명/파일명              |
| ---------- | -------------------------- |
| 당령       | `dang_ryeong`            |
| 희신       | `heuisin`                |
| 용신       | `yongshin` / `yongsin` |
| 격국       | `gyouk`                  |
| 육신/십성  | `yuksin`                 |
| 합충형해파 | `hapchung`               |
| 지장간     | `jijanggan`              |
| 신살       | `shinsal`                |
| 대운       | `deun`                   |
| 세운       | `sewun`                  |
| 상신       | `sangsin`                |
| 구신       | `gusin`                  |
| 신격       | `shgj`                   |

---

## 12. 도구 및 빌드

```bash
# 포맷
uv run ruff format .

# 린트
uv run ruff check .

# 타입 체크
uv run mypy core/ app/

# 테스트 (커버리지)
uv run pytest --cov=core --cov=app --cov-report=term-missing

# 패키지 추가
uv add <package>
```

- 커버리지 목표: **95% 이상** 유지
- mypy strict: **에러 0개** 유지
