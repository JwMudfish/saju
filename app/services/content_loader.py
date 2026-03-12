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

_BASE_DIR = pathlib.Path(__file__).resolve().parents[2]
_RESOURCES_BASE = _BASE_DIR / "resources" / "testResult"

_ILGAN_PATH = _RESOURCES_BASE / "contents_ilgan.json"
_YONGSIN_PATH = _RESOURCES_BASE / "contents_yongsin.json"
_GYOUK_PATH = _RESOURCES_BASE / "contents_gyouk.json"
_HISIN_BASE = _RESOURCES_BASE / "contents_Hisin10"
_HISIN_GISIN_PATH = _RESOURCES_BASE / "contents_hisin_gisin.json"
_SALARY_PATH = _RESOURCES_BASE / "contents_salary.json"
_SANGSIN_PATH = _RESOURCES_BASE / "contents_sangsin.json"
_GUSIN_PATH = _RESOURCES_BASE / "contents_gusin.json"
_SHGJ_GILHUNG_BASE = _RESOURCES_BASE / "contents_shgjGilHung"

# Phase 1: 상신 보완, 구신 기신, 영격령 설명 파일 경로
_SANGSIN_COMP_PATH = _RESOURCES_BASE / "contents_sangsin_compliment.json"
_GUSIN_GISIN_PATH = _RESOURCES_BASE / "contents_gusin_gisin.json"
_JISOK_PATH = _RESOURCES_BASE / "contents_jisok.json"
_JOONGHWA_PATH = _RESOURCES_BASE / "contents_joonghwa.json"
_HWAKJANG_PATH = _RESOURCES_BASE / "contents_hwakjang.json"

# Phase 2: 합충 관계, 일간 화월, 일간 연애, 베프 유형 경로
_HAPCHUNG_BASE = _RESOURCES_BASE / "contents_hapChung"
_ILGAN_HW_PATH = _RESOURCES_BASE / "contents_ilgan_hw.json"
_ILGAN_LOVE_PATH = _RESOURCES_BASE / "contents_ilgan_love.json"
_BESTFRIEND_PATH = _RESOURCES_BASE / "contents_bestFriend.json"

# Phase 3: 노소 유형, 경운 질문 파일 경로
_OLD_YOUNG_PATH = _RESOURCES_BASE / "contents_old_young.json"
_LIGHT_QUESTION_BASE = _RESOURCES_BASE / "contents_light_question"

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
        sangsin_comp_path: pathlib.Path | None = None,
        gusin_gisin_path: pathlib.Path | None = None,
        jisok_path: pathlib.Path | None = None,
        joonghwa_path: pathlib.Path | None = None,
        hwakjang_path: pathlib.Path | None = None,
        hapchung_base: pathlib.Path | None = None,
        ilgan_hw_path: pathlib.Path | None = None,
        ilgan_love_path: pathlib.Path | None = None,
        bestfriend_path: pathlib.Path | None = None,
        old_young_path: pathlib.Path | None = None,
        light_question_base: pathlib.Path | None = None,
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
        self._sangsin_comp_path = (
            sangsin_comp_path
            if sangsin_comp_path is not None
            else _SANGSIN_COMP_PATH
        )
        self._gusin_gisin_path = (
            gusin_gisin_path if gusin_gisin_path is not None else _GUSIN_GISIN_PATH
        )
        self._jisok_path = jisok_path if jisok_path is not None else _JISOK_PATH
        self._joonghwa_path = (
            joonghwa_path if joonghwa_path is not None else _JOONGHWA_PATH
        )
        self._hwakjang_path = (
            hwakjang_path if hwakjang_path is not None else _HWAKJANG_PATH
        )
        self._hapchung_base = (
            hapchung_base if hapchung_base is not None else _HAPCHUNG_BASE
        )
        self._ilgan_hw_path = (
            ilgan_hw_path if ilgan_hw_path is not None else _ILGAN_HW_PATH
        )
        self._ilgan_love_path = (
            ilgan_love_path if ilgan_love_path is not None else _ILGAN_LOVE_PATH
        )
        self._bestfriend_path = (
            bestfriend_path if bestfriend_path is not None else _BESTFRIEND_PATH
        )
        self._old_young_path = (
            old_young_path if old_young_path is not None else _OLD_YOUNG_PATH
        )
        self._light_question_base = (
            light_question_base
            if light_question_base is not None
            else _LIGHT_QUESTION_BASE
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

    def get_sangsin_compliment_content(self, sangsin: str) -> dict[str, Any] | None:
        """상신 보완(Sangsin Compliment) 컨텐츠를 로드한다.

        Args:
            sangsin: 상신 식별자 (예: "Sangsin_1", "Sangsin_2", "Sangsin_3", "Sangsin_4")

        Returns:
            상신 보완 콘텐츠 항목 딕셔너리 또는 None (찾지 못한 경우)
        """
        raw = _load_json_file(self._sangsin_comp_path, "상신 보완")
        if not raw:
            return None

        for item in raw.get("contentsList", []):
            if item.get("title") == sangsin:
                return cast("dict[str, Any]", item)
        return None

    def get_gusin_gisin_content(self, gusin: str) -> dict[str, Any] | None:
        """구신 기신(Gusin Gisin) 컨텐츠를 로드한다.

        Args:
            gusin: 구신 식별자 (예: "gusin_1", "gusin_2", "gusin_3", "gusin_4")

        Returns:
            구신 기신 콘텐츠 항목 딕셔너리 또는 None (찾지 못한 경우)
        """
        raw = _load_json_file(self._gusin_gisin_path, "구신 기신")
        if not raw:
            return None

        for item in raw.get("contentsList", []):
            if item.get("title") == gusin:
                return cast("dict[str, Any]", item)
        return None

    def get_jisok_content(self, jisok: str) -> dict[str, Any] | None:
        """지속(Jisok) 설명 컨텐츠를 로드한다.

        Args:
            jisok: 지속 식별자 (예: "jisok_1", "jisok_2", "jisok_3", "jisok_4")

        Returns:
            지속 설명 콘텐츠 항목 딕셔너리 또는 None (찾지 못한 경우)
        """
        raw = _load_json_file(self._jisok_path, "지속")
        if not raw:
            return None

        for item in raw.get("contentsList", []):
            if item.get("title") == jisok:
                return cast("dict[str, Any]", item)
        return None

    def get_joonghwa_content(self, joonghwa: str) -> dict[str, Any] | None:
        """중화(Joonghwa) 설명 컨텐츠를 로드한다.

        Args:
            joonghwa: 중화 식별자 (예: "joonghwa_1", "joonghwa_2", "joonghwa_3", "joonghwa_4")

        Returns:
            중화 설명 콘텐츠 항목 딕셔너리 또는 None (찾지 못한 경우)
        """
        raw = _load_json_file(self._joonghwa_path, "중화")
        if not raw:
            return None

        for item in raw.get("contentsList", []):
            if item.get("title") == joonghwa:
                return cast("dict[str, Any]", item)
        return None

    def get_hwakjang_content(self, hwakjang: str) -> dict[str, Any] | None:
        """확장(Hwakjang) 설명 컨텐츠를 로드한다.

        Args:
            hwakjang: 확장 식별자 (예: "hwakjang_1", "hwakjang_2", "hwakjang_3", "hwakjang_4")

        Returns:
            확장 설명 콘텐츠 항목 딕셔너리 또는 None (찾지 못한 경우)
        """
        raw = _load_json_file(self._hwakjang_path, "확장")
        if not raw:
            return None

        for item in raw.get("contentsList", []):
            if item.get("title") == hwakjang:
                return cast("dict[str, Any]", item)
        return None

    def get_hapchung_content(self, hapchung_type: str) -> dict[str, Any] | None:
        """합충(Hapchung) 관계 컨텐츠를 로드한다.

        Args:
            hapchung_type: 합충 유형 ('onlyChung', 'samhapYes', 'banghapYes', 'no')

        Returns:
            합충 콘텐츠 JSON 딕셔너리 또는 None (파일 로드 실패 시)
        """
        # 합충 유형을 하위 디렉토리와 파일명으로 변환
        type_to_subdir = {
            "onlyChung": "onlyChung",
            "samhapYes": "samhapYes",
            "banghapYes": "banghapYes",
            "no": "no",
        }

        subdir = type_to_subdir.get(hapchung_type)
        if subdir is None:
            logger.warning("알 수 없는 합충 유형: %s", hapchung_type)
            return None

        # 파일명 매핑
        filename_map = {
            "onlyChung": "contents_onlyChung.json",
            "samhapYes": "contents_samhap.json",
            "banghapYes": "contents_banghap.json",
            "no": "contents_no.json",
        }

        filename = filename_map.get(hapchung_type)
        if filename is None:
            return None

        file_path = self._hapchung_base / subdir / filename
        raw = _load_json_file(file_path, f"합충({hapchung_type})")
        return raw if raw else None

    def get_ilgan_hw_content(self, ilgan: str, month_ji: str) -> dict[str, Any] | None:
        """일간 화월(Ilgan Hwawol) 컨텐츠를 로드한다.

        Args:
            ilgan: 일간 천간 (갑, 을, 병, 정, 무, 기, 경, 신, 임, 계)
            month_ji: 월지 (자, 축, 인, 묘, 진, 사, 오, 미, 신, 유, 술, 해)

        Returns:
            일간 화월 콘텐츠 JSON 딕셔너리 또는 None (파일 로드 실패 시)
        """
        # 현재는 단일 JSON 파일에서 전체를 로드
        # 향후 ilgan과 month_ji 조합에 따라 필터링 가능
        raw = _load_json_file(self._ilgan_hw_path, "일간 화월")
        return raw if raw else None

    def get_ilgan_love_content(self, ilgan: str) -> dict[str, Any] | None:
        """일간 연애(Ilgan Love) 컨텐츠를 로드한다.

        Args:
            ilgan: 일간 천간 (갑, 을, 병, 정, 무, 기, 경, 신, 임, 계)

        Returns:
            일간 연애 콘텐츠 JSON 딕셔너리 또는 None (파일 로드 실패 시)
        """
        # 현재는 단일 JSON 파일에서 전체를 로드
        # 향후 ilgan에 따라 필터링 가능
        raw = _load_json_file(self._ilgan_love_path, "일간 연애")
        return raw if raw else None

    def get_bestfriend_content(self, yuksin: str) -> dict[str, Any] | None:
        """베프 유형(Best Friend) 컨텐츠를 로드한다.

        Args:
            yuksin: 육신 (비견, 겁재, 편인, 정인, 편재, 정재, 식신, 상관, 정관, 편관)

        Returns:
            베프 유형 콘텐츠 JSON 딕셔너리 또는 None (파일 로드 실패 시)
        """
        # 현재는 단일 JSON 파일에서 전체를 로드
        # 향후 육신 조합에 따라 필터링 가능
        raw = _load_json_file(self._bestfriend_path, "베프 유형")
        return raw if raw else None



    def get_old_young_content(
        self, ilgan: str, month_ji: str
    ) -> dict[str, Any] | None:
        """노소 유형(Old Young) 컨텐츠를 로드한다.

        일간(天干)과 월지(月支) 조합에 해당하는 콘텐츠를 반환한다.
        일간(1-10)과 월지(자축인묘진사오미신유술)의 조합으로 120개 콘텐츠 중 하나를 선택.

        Args:
            ilgan: 한글 천간 (갑, 을, 병, 정, 무, 기, 경, 신, 임, 계)
            month_ji: 한글 지지 (자, 축, 인, 묘, 진, 사, 오, 미, 신, 유, 술, 해)

        Returns:
            노소 유형 콘텐츠 항목 딕셔너리 또는 None (찾지 못한 경우)
        """
        # 일간을 인덱스로 변환 (갑=0, 을=1, ..., 계=9)
        ilgan_to_index = {
            "갑": 0, "을": 1, "병": 2, "정": 3, "무": 4,
            "기": 5, "경": 6, "신": 7, "임": 8, "계": 9
        }
        # 월지를 인덱스로 변환 (자=0, 축=1, ..., 해=11)
        ji_to_index = {
            "자": 0, "축": 1, "인": 2, "묘": 3, "진": 4, "사": 5,
            "오": 6, "미": 7, "신": 8, "유": 9, "술": 10, "해": 11
        }

        ilgan_idx = ilgan_to_index.get(ilgan)
        ji_idx = ji_to_index.get(month_ji)

        if ilgan_idx is None or ji_idx is None:
            return None

        # old_young_N 인덱스 계산: (일간 인덱스 * 12 + 월지 인덱스) + 1
        # 예: 갑(0) + 자(0) = 0 * 12 + 0 + 1 = 1 -> old_young_1
        #     계(9) + 해(11) = 9 * 12 + 11 + 1 = 120 -> old_young_120
        content_index = (ilgan_idx * 12 + ji_idx) + 1
        title_key = f"old_young_{content_index}"

        raw = _load_json_file(self._old_young_path, "노소 유형")
        if not raw:
            return None

        for item in raw.get("contentsList", []):
            if item.get("title") == title_key:
                return cast("dict[str, Any]", item)
        return None

    def get_light_question_content(
        self,
        question_id: str,
        gyouk_name: str | None = None,
        sanghwa: str | None = None,
        sulhwa: str | None = None,
    ) -> dict[str, Any] | None:
        """경운 질문(Light Question) 컨텐츠를 로드한다.

        Args:
            question_id: 질문 ID ('q1', 'q7', 'q8')
            gyouk_name: 격국명 (q8용, 예: "정재", "편재", "정관", "편관", etc.)
            sanghwa: 상화 여부 ('sengYes', 'sengNo', None)
            sulhwa: 설화 여부 ('sulYes', 'sulNo', None)

        Returns:
            경운 질문 콘텐츠 JSON 딕셔너리 또는 None (파일 로드 실패 시)

        Examples:
            # Q1: 용신 기반 질문
            get_light_question_content('q1', 'yongsin')

            # Q7: 정재/편재 기반 질문 (상화/설화)
            get_light_question_content('q7', 'jungJe', 'sengYes', 'sulNo')

            # Q8: 격국별 상화/설화 질문
            get_light_question_content('q8', 'siksin', 'sengYes', 'sulNo')
        """
        if question_id == "q1":
            # Q1: 용신 기반 질문
            if gyouk_name == "yongsin":
                file_path = self._light_question_base / "q1" / "q1_yongsin.json"
            elif gyouk_name == "gyouk":
                file_path = self._light_question_base / "q1" / "q1_gyouk.json"
            else:
                return None

        elif question_id == "q7":
            # Q7: 정재/편재 기반 질문 (상화/설화)
            if not gyouk_name or gyouk_name not in ["jungJe", "pyeonje"]:
                return None
            if not sanghwa or not sulhwa:
                return None

            subdir = f"{sanghwa}_{sulhwa}"
            file_path = (
                self._light_question_base / "q7" / gyouk_name / subdir / "sangGuk.json"
            )

        elif question_id == "q8":
            # Q8: 격국별 상화/설화 질문 (10개 격국)
            valid_gyouks = [
                "jungJe", "pyeonje", "jungGuan", "pyeonGuan",
                "jungIn", "pyeonIn", "siksin", "sangGwan",
                "pyeonIn", "yangIn"
            ]
            if not gyouk_name or gyouk_name not in valid_gyouks:
                return None

            # 상세지표(상성)이 있으면 sangSeng.json, 없으면 상화/설화 조합
            if sanghwa == "sangSeng" and sulhwa == "sangSeng":
                file_path = (
                    self._light_question_base / "q8" / gyouk_name / "sangSeng.json"
                )
            else:
                if not sanghwa or not sulhwa:
                    return None
                subdir = f"{sanghwa}_{sulhwa}"
                file_path = (
                    self._light_question_base / "q8" / gyouk_name / subdir / "sangGuk.json"
                )
        else:
            return None

        raw = _load_json_file(file_path, f"경운 질문({question_id})")
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


def get_sangsin_compliment_content(sangsin: str) -> dict[str, Any] | None:
    """상신 보완(Sangsin Compliment) 컨텐츠를 반환하는 편의 함수.

    Args:
        sangsin: 상신 식별자 (예: "Sangsin_1", "Sangsin_2", "Sangsin_3", "Sangsin_4")

    Returns:
        상신 보완 콘텐츠 항목 딕셔너리 또는 None
    """
    return _get_loader().get_sangsin_compliment_content(sangsin)


def get_gusin_gisin_content(gusin: str) -> dict[str, Any] | None:
    """구신 기신(Gusin Gisin) 컨텐츠를 반환하는 편의 함수.

    Args:
        gusin: 구신 식별자 (예: "gusin_1", "gusin_2", "gusin_3", "gusin_4")

    Returns:
        구신 기신 콘텐츠 항목 딕셔너리 또는 None
    """
    return _get_loader().get_gusin_gisin_content(gusin)


def get_jisok_content(jisok: str) -> dict[str, Any] | None:
    """지속(Jisok) 설명 컨텐츠를 반환하는 편의 함수.

    Args:
        jisok: 지속 식별자 (예: "jisok_1", "jisok_2", "jisok_3", "jisok_4")

    Returns:
        지속 설명 콘텐츠 항목 딕셔너리 또는 None
    """
    return _get_loader().get_jisok_content(jisok)


def get_joonghwa_content(joonghwa: str) -> dict[str, Any] | None:
    """중화(Joonghwa) 설명 컨텐츠를 반환하는 편의 함수.

    Args:
        joonghwa: 중화 식별자 (예: "joonghwa_1", "joonghwa_2", "joonghwa_3", "joonghwa_4")

    Returns:
        중화 설명 콘텐츠 항목 딕셔너리 또는 None
    """
    return _get_loader().get_joonghwa_content(joonghwa)


def get_hwakjang_content(hwakjang: str) -> dict[str, Any] | None:
    """확장(Hwakjang) 설명 컨텐츠를 반환하는 편의 함수.

    Args:
        hwakjang: 확장 식별자 (예: "hwakjang_1", "hwakjang_2", "hwakjang_3", "hwakjang_4")

    Returns:
        확장 설명 콘텐츠 항목 딕셔너리 또는 None
    """
    return _get_loader().get_hwakjang_content(hwakjang)


def get_hapchung_content(hapchung_type: str) -> dict[str, Any] | None:
    """합충(Hapchung) 관계 컨텐츠를 반환하는 편의 함수.

    Args:
        hapchung_type: 합충 유형 ('onlyChung', 'samhapYes', 'banghapYes', 'no')

    Returns:
        합충 콘텐츠 JSON 딕셔너리 또는 None
    """
    return _get_loader().get_hapchung_content(hapchung_type)


def get_ilgan_hw_content(ilgan: str, month_ji: str) -> dict[str, Any] | None:
    """일간 화월(Ilgan Hwawol) 컨텐츠를 반환하는 편의 함수.

    Args:
        ilgan: 일간 천간 (갑, 을, 병, 정, 무, 기, 경, 신, 임, 계)
        month_ji: 월지 (자, 축, 인, 묘, 진, 사, 오, 미, 신, 유, 술, 해)

    Returns:
        일간 화월 콘텐츠 JSON 딕셔너리 또는 None
    """
    return _get_loader().get_ilgan_hw_content(ilgan, month_ji)


def get_ilgan_love_content(ilgan: str) -> dict[str, Any] | None:
    """일간 연애(Ilgan Love) 컨텐츠를 반환하는 편의 함수.

    Args:
        ilgan: 일간 천간 (갑, 을, 병, 정, 무, 기, 경, 신, 임, 계)

    Returns:
        일간 연애 콘텐츠 JSON 딕셔너리 또는 None
    """
    return _get_loader().get_ilgan_love_content(ilgan)


def get_bestfriend_content(yuksin: str) -> dict[str, Any] | None:
    """베프 유형(Best Friend) 컨텐츠를 반환하는 편의 함수.

    Args:
        yuksin: 육신 (비견, 겁재, 편인, 정인, 편재, 정재, 식신, 상관, 정관, 편관)

    Returns:
        베프 유형 콘텐츠 JSON 딕셔너리 또는 None
    """
    return _get_loader().get_bestfriend_content(yuksin)


def get_old_young_content(ilgan: str, month_ji: str) -> dict[str, Any] | None:
    """노소 유형(Old Young) 컨텐츠를 반환하는 편의 함수.

    Args:
        ilgan: 한글 천간 (갑, 을, 병, 정, 무, 기, 경, 신, 임, 계)
        month_ji: 한글 지지 (자, 축, 인, 묘, 진, 사, 오, 미, 신, 유, 술, 해)

    Returns:
        노소 유형 콘텐츠 항목 딕셔너리 또는 None
    """
    return _get_loader().get_old_young_content(ilgan, month_ji)


def get_light_question_content(
    question_id: str,
    gyouk_name: str | None = None,
    sanghwa: str | None = None,
    sulhwa: str | None = None,
) -> dict[str, Any] | None:
    """경운 질문(Light Question) 컨텐츠를 반환하는 편의 함수.

    Args:
        question_id: 질문 ID ('q1', 'q7', 'q8')
        gyouk_name: 격국명 (q8용, 예: "정재", "편재", "정관", "편관", etc.)
        sanghwa: 상화 여부 ('sengYes', 'sengNo', None)
        sulhwa: 설화 여부 ('sulYes', 'sulNo', None)

    Returns:
        경운 질문 콘텐츠 JSON 딕셔너리 또는 None
    """
    return _get_loader().get_light_question_content(question_id, gyouk_name, sanghwa, sulhwa)
