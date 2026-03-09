"""일간(日干) 및 용신(用神) 콘텐츠 로더 서비스."""

from __future__ import annotations

import json
import logging
import pathlib
from typing import Any, cast

logger = logging.getLogger(__name__)

# 한자 -> 한글 천간(天干) 변환 테이블
HANJA_TO_HAN: dict[str, str] = {
    "甲": "갑",
    "乙": "을",
    "丙": "병",
    "丁": "정",
    "庚": "경",
    "辛": "신",
    "壬": "임",
    "癸": "계",
}

# 일간 한글 -> JSON ilgan 필드값 변환 테이블
# contents_ilgan.json의 ilgan 필드: "갑목일간", "을목일간", ...
GAN_TO_ILGAN: dict[str, str] = {
    "갑": "갑목일간",
    "을": "을목일간",
    "병": "병화일간",
    "정": "정화일간",
    "무": "무토일간",
    "기": "기토일간",
    "경": "경금일간",
    "신": "신금일간",
    "임": "임수일간",
    "계": "계수일간",
}

# GAN_TO_ILGAN 역방향 조회: "갑목일간" -> "갑"
_ILGAN_TO_GAN: dict[str, str] = {v: k for k, v in GAN_TO_ILGAN.items()}

_BASE_DIR = pathlib.Path(__file__).parent.parent.parent
_ILGAN_PATH = _BASE_DIR / "manse_ori" / "testResult" / "contents_ilgan.json"
_YONGSIN_PATH = _BASE_DIR / "manse_ori" / "testResult" / "contents_yongsin.json"
_GYOUK_PATH = _BASE_DIR / "manse_ori" / "testResult" / "contents_gyouk.json"
_HISIN_BASE = _BASE_DIR / "manse_ori" / "testResult" / "contents_Hisin10"
_HISIN_GISIN_PATH = (
    _BASE_DIR / "manse_ori" / "testResult" / "contents_hisin_gisin.json"
)
_SALARY_PATH = _BASE_DIR / "manse_ori" / "testResult" / "contents_salary.json"
_SANGSIN_PATH = _BASE_DIR / "manse_ori" / "testResult" / "contents_sangsin.json"
_GUSIN_PATH = _BASE_DIR / "manse_ori" / "testResult" / "contents_gusin.json"
_SHGJ_GILHUNG_BASE = (
    _BASE_DIR / "manse_ori" / "testResult" / "contents_shgjGilHung"
)

# 당령 -> Hisin10 디렉토리명 매핑 테이블
_DANG_RYEONG_TO_HISIN10_DIR: dict[str, str] = {
    "갑": "contents_gapmuk",
    "을": "contents_ulmok",
    "병": "content_byeongHwa",
    "정": "contents_jungHwa",
    "경": "contents_GyeongGum",
    "신": "content_sinGum",
    "임": "content_Limsu",
    "계": "contents_gyesu",
}

# 육신(十星) -> 격국(格局)명 변환 테이블
YUKSIN_TO_GYOUK: dict[str, str] = {
    "비견": "건록격",
    "겁재": "양인격",
    "편인": "편인격",
    "정인": "정인격",
    "편재": "편재격",
    "정재": "정재격",
    "식신": "식신격",
    "상관": "상관격",
    "정관": "정관격",
    "편관": "편관격",
}


def _load_json_file(path: pathlib.Path, label: str) -> dict[str, Any]:
    """JSON 파일을 로드하여 딕셔너리로 반환한다.

    파일이 없거나 파싱 오류가 발생하면 빈 딕셔너리를 반환한다.

    Args:
        path: JSON 파일 경로
        label: 오류 메시지에 포함될 파일 레이블

    Returns:
        파싱된 JSON 딕셔너리 또는 빈 딕셔너리
    """
    try:
        return cast(dict[str, Any], json.loads(path.read_text(encoding="utf-8")))
    except (FileNotFoundError, OSError, json.JSONDecodeError) as exc:
        logger.warning("%s 콘텐츠 파일 로드 실패: %s", label, exc)
        return {}


def _extract_hanja_key(subtitle: str) -> str | None:
    """subtitle 문자열에서 한자 천간을 추출하여 한글로 변환한다.

    subtitle은 슬래시(/)로 구분된 여러 토큰을 포함한다.
    예: "호기심 많은 사색가/사고력/ 癸" -> "계"
        "당라이벌은 어제의 나/생산력/ 庚" -> "경"

    Args:
        subtitle: 용신 항목의 subtitle 필드 문자열

    Returns:
        한글 천간 문자열 또는 None (한자를 찾지 못한 경우)
    """
    for part in reversed(subtitle.split("/")):
        for char in part.strip():
            if char in HANJA_TO_HAN:
                return HANJA_TO_HAN[char]
    return None


class ContentLoader:
    """일간, 용신, 격국, 희신, 희기신, 연봉 콘텐츠를 JSON 파일에서 로드하는 서비스.

    Args:
        ilgan_path: 일간 콘텐츠 JSON 파일 경로 (기본값: 프로젝트 루트 기준 경로)
        yongsin_path: 용신 콘텐츠 JSON 파일 경로 (기본값: 프로젝트 루트 기준 경로)
        gyouk_path: 격국 콘텐츠 JSON 파일 경로 (기본값: 프로젝트 루트 기준 경로)
        hisin_base: 희신 Hisin10 디렉토리 기본 경로 (기본값: 프로젝트 루트 기준 경로)
        hisin_gisin_path: 희기신 콘텐츠 JSON 파일 경로 (기본값: 프로젝트 루트 기준 경로)
        salary_path: 연봉 콘텐츠 JSON 파일 경로 (기본값: 프로젝트 루트 기준 경로)
    """

    def __init__(
        self,
        ilgan_path: pathlib.Path | None = None,
        yongsin_path: pathlib.Path | None = None,
        gyouk_path: pathlib.Path | None = None,
        hisin_base: pathlib.Path | None = None,
        hisin_gisin_path: pathlib.Path | None = None,
        salary_path: pathlib.Path | None = None,
        sangsin_path: pathlib.Path | None = None,
        gusin_path: pathlib.Path | None = None,
        shgj_gilhung_base: pathlib.Path | None = None,
    ) -> None:
        self._ilgan_path = ilgan_path if ilgan_path is not None else _ILGAN_PATH
        self._yongsin_path = yongsin_path if yongsin_path is not None else _YONGSIN_PATH
        self._gyouk_path = gyouk_path if gyouk_path is not None else _GYOUK_PATH
        self._hisin_base = hisin_base if hisin_base is not None else _HISIN_BASE
        self._hisin_gisin_path = (
            hisin_gisin_path if hisin_gisin_path is not None else _HISIN_GISIN_PATH
        )
        self._salary_path = salary_path if salary_path is not None else _SALARY_PATH
        self._sangsin_path = (
            sangsin_path if sangsin_path is not None else _SANGSIN_PATH
        )
        self._gusin_path = gusin_path if gusin_path is not None else _GUSIN_PATH
        self._shgj_gilhung_base = (
            shgj_gilhung_base
            if shgj_gilhung_base is not None
            else _SHGJ_GILHUNG_BASE
        )
        self._ilgan_map: dict[str, dict[str, Any]] = self._build_ilgan_map()
        self._yongsin_map: dict[str, dict[str, Any]] = self._build_yongsin_map()
        self._gyouk_map: dict[str, dict[str, Any]] = self._build_gyouk_map()

    def _build_ilgan_map(self) -> dict[str, dict[str, Any]]:
        """일간 JSON을 파싱하여 한글 일간 -> 항목 딕셔너리를 구성한다.

        Returns:
            한글 천간(갑~계) -> contentsList 항목 딕셔너리
        """
        raw = _load_json_file(self._ilgan_path, "일간")
        result: dict[str, dict[str, Any]] = {}
        for item in raw.get("contentsList", []):
            gan = _ILGAN_TO_GAN.get(item.get("ilgan", ""))
            if gan:
                result[gan] = item
        return result

    def _build_yongsin_map(self) -> dict[str, dict[str, Any]]:
        """용신 JSON을 파싱하여 한글 천간 -> 항목 딕셔너리를 구성한다.

        subtitle 필드의 한자에서 천간을 추출한다.
        예: "호기심 많은 사색가/사고력/ 癸" -> "계"

        Returns:
            한글 천간(갑/을/병/정/경/신/임/계) -> contentsList 항목 딕셔너리
        """
        raw = _load_json_file(self._yongsin_path, "용신")
        result: dict[str, dict[str, Any]] = {}
        for item in raw.get("contentsList", []):
            han_key = _extract_hanja_key(item.get("subtitle", ""))
            if han_key:
                result[han_key] = item
        return result

    def get_ilgan_content(self, gan: str) -> dict[str, Any] | None:
        """일간(日干)에 해당하는 콘텐츠 항목을 반환한다.

        Args:
            gan: 한글 천간 (갑, 을, 병, 정, 무, 기, 경, 신, 임, 계)

        Returns:
            콘텐츠 항목 딕셔너리 또는 None (찾지 못한 경우)
        """
        return self._ilgan_map.get(gan)

    def get_yongsin_content(self, dang_ryeong: str) -> dict[str, Any] | None:
        """당령(堂令)에 해당하는 용신 콘텐츠 항목을 반환한다.

        Args:
            dang_ryeong: 한글 천간 (갑, 을, 병, 정, 경, 신, 임, 계)

        Returns:
            콘텐츠 항목 딕셔너리 또는 None (찾지 못한 경우)
        """
        return self._yongsin_map.get(dang_ryeong)

    def _build_gyouk_map(self) -> dict[str, dict[str, Any]]:
        """격국 JSON을 파싱하여 격국명(subtitle) -> 항목 딕셔너리를 구성한다.

        Returns:
            격국명(건록격, 양인격, ...) -> contentsList 항목 딕셔너리
        """
        raw = _load_json_file(self._gyouk_path, "격국")
        result: dict[str, dict[str, Any]] = {}
        for item in raw.get("contentsList", []):
            subtitle = item.get("subtitle", "")
            if subtitle:
                result[subtitle] = item
        return result

    def get_gyouk_content(self, gyouk_name: str) -> dict[str, Any] | None:
        """격국명에 해당하는 콘텐츠 항목을 반환한다.

        Args:
            gyouk_name: 격국명 (건록격, 양인격, 상관격, 식신격, 정인격,
                        편인격, 정재격, 편재격, 정관격, 편관격)

        Returns:
            콘텐츠 항목 딕셔너리 또는 None (찾지 못한 경우)
        """
        return self._gyouk_map.get(gyouk_name)

    def get_hisin_content(
        self, dang_ryeong: str, hisin_yes: bool = True
    ) -> dict[str, Any] | None:
        """당령에 해당하는 희신 콘텐츠 전체를 반환한다.

        Args:
            dang_ryeong: 한글 천간 (갑, 을, 병, 정, 경, 신, 임, 계)
            hisin_yes: True이면 희신있음(HisinYes), False이면 희신없음(HisinNo)

        Returns:
            콘텐츠 JSON 딕셔너리 또는 None (찾지 못한 경우)
        """
        dir_name = _DANG_RYEONG_TO_HISIN10_DIR.get(dang_ryeong)
        if dir_name is None:
            return None
        filename = "contents_HisinYes.json" if hisin_yes else "contents_HisinNo.json"
        file_path = self._hisin_base / dir_name / filename
        raw = _load_json_file(file_path, f"희신({dang_ryeong})")
        return raw if raw else None

    def get_hisin_gisin_content(self) -> dict[str, Any] | None:
        """희기신 콘텐츠 전체를 반환한다.

        Returns:
            희기신 콘텐츠 JSON 딕셔너리 또는 None (파일 로드 실패 시)
        """
        raw = _load_json_file(self._hisin_gisin_path, "희기신")
        return raw if raw else None

    def get_salary_content(self) -> dict[str, Any] | None:
        """연봉 콘텐츠 전체를 반환한다.

        Returns:
            연봉 콘텐츠 JSON 딕셔너리 또는 None (파일 로드 실패 시)
        """
        raw = _load_json_file(self._salary_path, "연봉")
        return raw if raw else None

    def get_sangsin_content(self, sangsin: str) -> dict[str, Any] | None:
        """상신(Sangsin) 설명 컨텐츠를 로드한다.

        Args:
            sangsin: 상신 식별자 (예: "Sangsin_1", "Sangsin_2", "Sangsin_3", "Sangsin_4")

        Returns:
            상신 콘텐츠 항목 딕셔너리 또는 None (찾지 못한 경우)
        """
        raw = _load_json_file(self._sangsin_path, "상신")
        if not raw:
            return None

        for item in raw.get("contentsList", []):
            if item.get("title") == sangsin:
                return cast("dict[str, Any]", item)
        return None

    def get_gusin_content(self, gusin: str) -> dict[str, Any] | None:
        """구신(Gusin) 설명 컨텐츠를 로드한다.

        Args:
            gusin: 구신 식별자 (예: "gusin_1", "gusin_2", "gusin_3", "gusin_4")

        Returns:
            구신 콘텐츠 항목 딕셔너리 또는 None (찾지 못한 경우)
        """
        raw = _load_json_file(self._gusin_path, "구신")
        if not raw:
            return None

        for item in raw.get("contentsList", []):
            if item.get("title") == gusin:
                return cast("dict[str, Any]", item)
        return None

    def get_shgj_gilhung_content(
        self, gyouk_name: str, is_gil: bool
    ) -> dict[str, Any] | None:
        """신격 길흉(Shgj Gilhung) 컨텐츠를 로드한다.

        Args:
            gyouk_name: 격국명 (건록격, 양인격, 상관격, 식신격, 정인격,
                        편인격, 정재격, 편재격, 정관격, 편관격)
            is_gil: True면 길(gil) 신격, False면 흉(hung) 신격

        Returns:
            길흉 콘텐츠 JSON 딕셔너리 또는 None (파일 로드 실패 시)
        """
        # 격국명을 파일명으로 변환 (카멜케이스)
        gyouk_to_filename = {
            "건록격": "gunLok",
            "양인격": "yangIn",
            "상관격": "sangGuan",
            "식신격": "siksin",
            "정인격": "jungIn",
            "편인격": "pyeonIn",
            "정재격": "jungje",
            "편재격": "pyeonje",
            "정관격": "jungGuan",
            "편관격": "pyeonGuan",
        }

        filename_key = gyouk_to_filename.get(gyouk_name)
        if filename_key is None:
            return None

        subdir = "gil" if is_gil else "hung"
        file_path = self._shgj_gilhung_base / subdir / f"contents_{filename_key}.json"
        raw = _load_json_file(file_path, f"신격길흉({gyouk_name})")
        return raw if raw else None


# 모듈 레벨 싱글톤 (캐시된 접근)
_loader: ContentLoader | None = None


def _get_loader() -> ContentLoader:
    """모듈 레벨 ContentLoader 싱글톤을 반환한다."""
    global _loader
    if _loader is None:
        _loader = ContentLoader()
    return _loader


def get_ilgan_content(gan: str) -> dict[str, Any] | None:
    """일간(日干)에 해당하는 콘텐츠를 반환하는 편의 함수.

    Args:
        gan: 한글 천간 (갑, 을, 병, 정, 무, 기, 경, 신, 임, 계)

    Returns:
        콘텐츠 항목 딕셔너리 또는 None
    """
    return _get_loader().get_ilgan_content(gan)


def get_yongsin_content(dang_ryeong: str) -> dict[str, Any] | None:
    """당령(堂令)에 해당하는 용신 콘텐츠를 반환하는 편의 함수.

    Args:
        dang_ryeong: 한글 천간 (갑, 을, 병, 정, 경, 신, 임, 계)

    Returns:
        콘텐츠 항목 딕셔너리 또는 None
    """
    return _get_loader().get_yongsin_content(dang_ryeong)


def get_gyouk_content(gyouk_name: str) -> dict[str, Any] | None:
    """격국명에 해당하는 콘텐츠를 반환하는 편의 함수.

    Args:
        gyouk_name: 격국명 (건록격, 양인격, 상관격, 식신격, 정인격,
                    편인격, 정재격, 편재격, 정관격, 편관격)

    Returns:
        콘텐츠 항목 딕셔너리 또는 None
    """
    return _get_loader().get_gyouk_content(gyouk_name)


def get_hisin_content(
    dang_ryeong: str, hisin_yes: bool = True
) -> dict[str, Any] | None:
    """당령에 해당하는 희신 콘텐츠를 반환하는 편의 함수.

    Args:
        dang_ryeong: 한글 천간 (갑, 을, 병, 정, 경, 신, 임, 계)
        hisin_yes: True이면 희신있음, False이면 희신없음

    Returns:
        콘텐츠 JSON 딕셔너리 또는 None
    """
    return _get_loader().get_hisin_content(dang_ryeong, hisin_yes)


def get_hisin_gisin_content() -> dict[str, Any] | None:
    """희기신 콘텐츠 전체를 반환하는 편의 함수.

    Returns:
        희기신 콘텐츠 JSON 딕셔너리 또는 None
    """
    return _get_loader().get_hisin_gisin_content()


def get_salary_content() -> dict[str, Any] | None:
    """연봉 콘텐츠 전체를 반환하는 편의 함수.

    Returns:
        연봉 콘텐츠 JSON 딕셔너리 또는 None
    """
    return _get_loader().get_salary_content()


def get_sangsin_content(sangsin: str) -> dict[str, Any] | None:
    """상신(Sangsin) 설명 컨텐츠를 반환하는 편의 함수.

    Args:
        sangsin: 상신 식별자 (예: "Sangsin_1", "Sangsin_2", "Sangsin_3", "Sangsin_4")

    Returns:
        상신 콘텐츠 항목 딕셔너리 또는 None
    """
    return _get_loader().get_sangsin_content(sangsin)


def get_gusin_content(gusin: str) -> dict[str, Any] | None:
    """구신(Gusin) 설명 컨텐츠를 반환하는 편의 함수.

    Args:
        gusin: 구신 식별자 (예: "gusin_1", "gusin_2", "gusin_3", "gusin_4")

    Returns:
        구신 콘텐츠 항목 딕셔너리 또는 None
    """
    return _get_loader().get_gusin_content(gusin)


def get_shgj_gilhung_content(gyouk_name: str, is_gil: bool) -> dict[str, Any] | None:
    """신격 길흉(Shgj Gilhung) 컨텐츠를 반환하는 편의 함수.

    Args:
        gyouk_name: 격국명 (건록격, 양인격, 상관격, 식신격, 정인격,
                    편인격, 정재격, 편재격, 정관격, 편관격)
        is_gil: True면 길(gil) 신격, False면 흉(hung) 신격

    Returns:
        길흉 콘텐츠 JSON 딕셔너리 또는 None
    """
    return _get_loader().get_shgj_gilhung_content(gyouk_name, is_gil)
