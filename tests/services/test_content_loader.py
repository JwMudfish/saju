"""ContentLoader 서비스 스펙 테스트 - RED phase."""

from __future__ import annotations

import pathlib

import pytest

from app.services.content_loader import ContentLoader


class TestContentLoaderIlgan:
    """일간(日干) 콘텐츠 로딩 테스트."""

    def test_get_ilgan_content_all_gan(self) -> None:
        """10개 일간 모두 콘텐츠를 반환한다."""
        loader = ContentLoader()
        for gan in ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"]:
            result = loader.get_ilgan_content(gan)
            assert result is not None, f"Missing ilgan content for {gan}"
            assert "contentsList" in result or "contents" in result, (
                f"ilgan content for {gan} must have contentsList or contents key"
            )

    def test_get_ilgan_content_unknown_returns_none(self) -> None:
        """알 수 없는 일간은 None을 반환한다 (예외를 발생시키지 않는다)."""
        loader = ContentLoader()
        assert loader.get_ilgan_content("unknown") is None

    def test_get_ilgan_content_empty_string_returns_none(self) -> None:
        """빈 문자열은 None을 반환한다."""
        loader = ContentLoader()
        assert loader.get_ilgan_content("") is None

    def test_get_ilgan_content_returns_dict(self) -> None:
        """반환값은 dict 타입이다."""
        loader = ContentLoader()
        result = loader.get_ilgan_content("갑")
        assert isinstance(result, dict)

    def test_get_ilgan_content_갑_has_correct_ilgan_field(self) -> None:
        """갑 일간 콘텐츠의 ilgan 필드가 '갑목일간'을 포함한다."""
        loader = ContentLoader()
        result = loader.get_ilgan_content("갑")
        assert result is not None
        assert result.get("ilgan") == "갑목일간"


class TestContentLoaderYongsin:
    """용신(用神) 콘텐츠 로딩 테스트."""

    def test_get_yongsin_content_all_dang_ryeong(self) -> None:
        """8개 당령(堂令) 모두 용신 콘텐츠를 반환한다."""
        loader = ContentLoader()
        # 용신 subtitle의 한자: 癸(계), 甲(갑), 乙(을), 丙(병), 丁(정), 庚(경), 辛(신), 壬(임)
        for dang_ryeong in ["갑", "을", "병", "정", "경", "신", "임", "계"]:
            result = loader.get_yongsin_content(dang_ryeong)
            assert result is not None, f"Missing yongsin content for {dang_ryeong}"

    def test_get_yongsin_content_unknown_returns_none(self) -> None:
        """알 수 없는 당령은 None을 반환한다 (예외를 발생시키지 않는다)."""
        loader = ContentLoader()
        assert loader.get_yongsin_content("unknown") is None

    def test_get_yongsin_content_empty_string_returns_none(self) -> None:
        """빈 문자열은 None을 반환한다."""
        loader = ContentLoader()
        assert loader.get_yongsin_content("") is None

    def test_get_yongsin_content_returns_dict(self) -> None:
        """반환값은 dict 타입이다."""
        loader = ContentLoader()
        result = loader.get_yongsin_content("갑")
        assert isinstance(result, dict)

    def test_get_yongsin_content_has_contents(self) -> None:
        """용신 콘텐츠에 contents 필드가 존재한다."""
        loader = ContentLoader()
        result = loader.get_yongsin_content("갑")
        assert result is not None
        assert "contents" in result


class TestModuleLevelFunctions:
    """모듈 레벨 편의 함수 테스트."""

    def test_module_level_get_ilgan_content(self) -> None:
        """모듈 레벨 get_ilgan_content 함수가 동작한다."""
        from app.services.content_loader import get_ilgan_content

        result = get_ilgan_content("갑")
        assert result is not None

    def test_module_level_get_yongsin_content(self) -> None:
        """모듈 레벨 get_yongsin_content 함수가 동작한다."""
        from app.services.content_loader import get_yongsin_content

        result = get_yongsin_content("갑")
        assert result is not None

    def test_module_level_unknown_returns_none(self) -> None:
        """모듈 레벨 함수에서 알 수 없는 키는 None을 반환한다."""
        from app.services.content_loader import get_ilgan_content, get_yongsin_content

        assert get_ilgan_content("unknown") is None
        assert get_yongsin_content("unknown") is None


class TestContentLoaderGyouk:
    """격국(格局) 콘텐츠 로딩 테스트."""

    def test_get_gyouk_content_all_gyouk(self) -> None:
        """10개 격국명 모두 콘텐츠를 반환한다."""
        loader = ContentLoader()
        for gyouk_name in [
            "건록격",
            "양인격",
            "상관격",
            "식신격",
            "정인격",
            "편인격",
            "정재격",
            "편재격",
            "정관격",
            "편관격",
        ]:
            result = loader.get_gyouk_content(gyouk_name)
            assert result is not None, f"Missing gyouk content for {gyouk_name}"

    def test_get_gyouk_content_unknown_returns_none(self) -> None:
        """알 수 없는 격국명은 None을 반환한다 (예외를 발생시키지 않는다)."""
        loader = ContentLoader()
        assert loader.get_gyouk_content("unknown") is None

    def test_get_gyouk_content_empty_string_returns_none(self) -> None:
        """빈 문자열은 None을 반환한다."""
        loader = ContentLoader()
        assert loader.get_gyouk_content("") is None

    def test_get_gyouk_content_returns_dict(self) -> None:
        """반환값은 dict 타입이다."""
        loader = ContentLoader()
        result = loader.get_gyouk_content("건록격")
        assert isinstance(result, dict)

    def test_get_gyouk_content_건록격_has_required_fields(self) -> None:
        """건록격 콘텐츠에 필수 필드들이 존재한다."""
        loader = ContentLoader()
        result = loader.get_gyouk_content("건록격")
        assert result is not None
        assert result.get("subtitle") == "건록격"
        assert "titleDescription" in result
        assert "contents" in result

    def test_get_gyouk_content_has_tag_fields(self) -> None:
        """격국 콘텐츠에 태그 필드들이 존재한다."""
        loader = ContentLoader()
        result = loader.get_gyouk_content("식신격")
        assert result is not None
        assert "tagZoryun" in result
        assert "tagAngry" in result

    def test_module_level_get_gyouk_content(self) -> None:
        """모듈 레벨 get_gyouk_content 함수가 동작한다."""
        from app.services.content_loader import get_gyouk_content

        result = get_gyouk_content("정관격")
        assert result is not None

    def test_module_level_get_gyouk_content_unknown_returns_none(self) -> None:
        """모듈 레벨 함수에서 알 수 없는 격국명은 None을 반환한다."""
        from app.services.content_loader import get_gyouk_content

        assert get_gyouk_content("없는격국") is None


class TestGyoukMapping:
    """YUKSIN_TO_GYOUK 매핑 테이블 테스트."""

    def test_yuksin_to_gyouk_mapping_has_all_ten_entries(self) -> None:
        """10개 육신-격국 매핑이 정의되어 있다."""
        from app.services.content_loader import YUKSIN_TO_GYOUK

        assert len(YUKSIN_TO_GYOUK) == 10

    def test_yuksin_to_gyouk_비견_maps_to_건록격(self) -> None:
        """비견은 건록격에 매핑된다."""
        from app.services.content_loader import YUKSIN_TO_GYOUK

        assert YUKSIN_TO_GYOUK["비견"] == "건록격"

    def test_yuksin_to_gyouk_겁재_maps_to_양인격(self) -> None:
        """겁재는 양인격에 매핑된다."""
        from app.services.content_loader import YUKSIN_TO_GYOUK

        assert YUKSIN_TO_GYOUK["겁재"] == "양인격"


class TestContentLoaderFileNotFound:
    """파일 미존재 상황에서의 동작 테스트."""

    def test_loader_with_missing_ilgan_file_returns_empty_map(
        self, tmp_path: pytest.TempPathFactory
    ) -> None:
        """일간 파일이 없을 때 빈 맵을 반환하고 충돌하지 않는다."""
        # ContentLoader가 존재하지 않는 경로를 받아도 충돌 없이 동작해야 한다
        loader = ContentLoader(
            ilgan_path=tmp_path / "nonexistent_ilgan.json",  # type: ignore[arg-type]
            yongsin_path=tmp_path / "nonexistent_yongsin.json",  # type: ignore[arg-type]
            gyouk_path=tmp_path / "nonexistent_gyouk.json",  # type: ignore[arg-type]
        )
        assert loader.get_ilgan_content("갑") is None
        assert loader.get_yongsin_content("갑") is None
        assert loader.get_gyouk_content("건록격") is None


class TestContentLoaderHisin:
    """희신(希神) Hisin10 콘텐츠 로딩 테스트."""

    def test_get_hisin_content_갑_hisin_yes_returns_content(
        self, tmp_path: pathlib.Path
    ) -> None:
        """갑 당령 희신있음 콘텐츠를 반환한다."""
        import json as _json

        from app.services.content_loader import ContentLoader

        hisin_dir = tmp_path / "contents_gapmuk"
        hisin_dir.mkdir()
        data = {"contentsList": [{"title": "hisinYes", "contents": "갑목 희신 내용"}]}
        (hisin_dir / "contents_HisinYes.json").write_text(
            _json.dumps(data, ensure_ascii=False), encoding="utf-8"
        )
        loader = ContentLoader(hisin_base=tmp_path)
        result = loader.get_hisin_content("갑", hisin_yes=True)
        assert result is not None

    def test_get_hisin_content_갑_hisin_no_returns_content(
        self, tmp_path: pathlib.Path
    ) -> None:
        """갑 당령 희신없음 콘텐츠를 반환한다."""
        import json as _json

        from app.services.content_loader import ContentLoader

        hisin_dir = tmp_path / "contents_gapmuk"
        hisin_dir.mkdir()
        data = {"contentsList": [{"title": "hisinNo", "contents": "갑목 비희신 내용"}]}
        (hisin_dir / "contents_HisinNo.json").write_text(
            _json.dumps(data, ensure_ascii=False), encoding="utf-8"
        )
        loader = ContentLoader(hisin_base=tmp_path)
        result = loader.get_hisin_content("갑", hisin_yes=False)
        assert result is not None

    def test_get_hisin_content_unknown_dang_ryeong_returns_none(
        self, tmp_path: pathlib.Path
    ) -> None:
        """매핑 없는 당령(무)은 None을 반환한다."""
        from app.services.content_loader import ContentLoader

        loader = ContentLoader(hisin_base=tmp_path)
        result = loader.get_hisin_content("무")
        assert result is None

    def test_get_hisin_content_file_not_found_returns_none(
        self, tmp_path: pathlib.Path
    ) -> None:
        """파일 없으면 None을 반환한다."""
        from app.services.content_loader import ContentLoader

        # 디렉토리 없이 hisin_base만 지정 (파일 없음)
        loader = ContentLoader(hisin_base=tmp_path)
        result = loader.get_hisin_content("갑")
        assert result is None

    def test_get_hisin_content_returns_dict(self, tmp_path: pathlib.Path) -> None:
        """반환값은 dict 타입이다."""
        import json as _json

        from app.services.content_loader import ContentLoader

        hisin_dir = tmp_path / "contents_gapmuk"
        hisin_dir.mkdir()
        data = {"contentsList": [{"title": "hisinYes", "contents": "내용"}]}
        (hisin_dir / "contents_HisinYes.json").write_text(
            _json.dumps(data, ensure_ascii=False), encoding="utf-8"
        )
        loader = ContentLoader(hisin_base=tmp_path)
        result = loader.get_hisin_content("갑")
        assert isinstance(result, dict)


class TestContentLoaderHisinGisin:
    """희기신 콘텐츠 로딩 테스트."""

    def test_get_hisin_gisin_content_returns_content(
        self, tmp_path: pathlib.Path
    ) -> None:
        """희기신 콘텐츠를 반환한다."""
        import json as _json

        from app.services.content_loader import ContentLoader

        data = {
            "name": "contents_hisin_gisin",
            "contentsList": [
                {
                    "number": 1,
                    "title": "hisin_gisin_1",
                    "subtitle": "희신있음/조건/있음/없음",
                    "contents": "희기신 설명",
                }
            ],
        }
        gisin_file = tmp_path / "contents_hisin_gisin.json"
        gisin_file.write_text(_json.dumps(data, ensure_ascii=False), encoding="utf-8")
        loader = ContentLoader(hisin_gisin_path=gisin_file)
        result = loader.get_hisin_gisin_content()
        assert result is not None

    def test_get_hisin_gisin_content_file_not_found_returns_none(
        self, tmp_path: pathlib.Path
    ) -> None:
        """파일 없으면 None을 반환한다."""
        from app.services.content_loader import ContentLoader

        loader = ContentLoader(
            hisin_gisin_path=tmp_path / "nonexistent_hisin_gisin.json"
        )
        result = loader.get_hisin_gisin_content()
        assert result is None


class TestContentLoaderSalary:
    """연봉 콘텐츠 로딩 테스트."""

    def test_get_salary_content_returns_content(self, tmp_path: pathlib.Path) -> None:
        """연봉 콘텐츠를 반환한다."""
        import json as _json

        from app.services.content_loader import ContentLoader

        data = {
            "contentsList": [
                {
                    "title": "salary_1",
                    "titleDescription": "연봉 유형 1",
                    "subtitle": "유형A",
                    "contents": "연봉 설명",
                }
            ]
        }
        salary_file = tmp_path / "contents_salary.json"
        salary_file.write_text(_json.dumps(data, ensure_ascii=False), encoding="utf-8")
        loader = ContentLoader(salary_path=salary_file)
        result = loader.get_salary_content()
        assert result is not None

    def test_get_salary_content_file_not_found_returns_none(
        self, tmp_path: pathlib.Path
    ) -> None:
        """파일 없으면 None을 반환한다."""
        from app.services.content_loader import ContentLoader

        loader = ContentLoader(salary_path=tmp_path / "nonexistent_salary.json")
        result = loader.get_salary_content()
        assert result is None


class TestModuleLevelHisinFunctions:
    """모듈 레벨 편의 함수 테스트."""

    def test_module_get_hisin_content_갑(self) -> None:
        """모듈 레벨 get_hisin_content 함수가 갑 당령 콘텐츠를 반환한다."""
        from app.services.content_loader import get_hisin_content

        result = get_hisin_content("갑")
        assert result is not None

    def test_module_get_hisin_gisin_content(self) -> None:
        """모듈 레벨 get_hisin_gisin_content 함수가 동작한다."""
        from app.services.content_loader import get_hisin_gisin_content

        result = get_hisin_gisin_content()
        assert result is not None

    def test_module_get_salary_content(self) -> None:
        """모듈 레벨 get_salary_content 함수가 동작한다."""
        from app.services.content_loader import get_salary_content

        result = get_salary_content()
        assert result is not None


class TestContentLoaderSangsin:
    """상신(Sangsin) 콘텐츠 로딩 테스트."""

    def test_get_sangsin_content_all_types(self) -> None:
        """4개 상신 유형 모두 콘텐츠를 반환한다."""
        loader = ContentLoader()
        for sangsin in ["Sangsin_1", "Sangsin_2", "Sangsin_3", "Sangsin_4"]:
            result = loader.get_sangsin_content(sangsin)
            assert result is not None, f"Missing sangsin content for {sangsin}"
            assert "contents" in result, f"sangsin content for {sangsin} must have contents"

    def test_get_sangsin_content_unknown_returns_none(self) -> None:
        """알 수 없는 상신은 None을 반환한다."""
        loader = ContentLoader()
        assert loader.get_sangsin_content("unknown") is None

    def test_get_sangsin_content_returns_dict(self) -> None:
        """반환값은 dict 타입이다."""
        loader = ContentLoader()
        result = loader.get_sangsin_content("Sangsin_1")
        assert isinstance(result, dict)

    def test_get_sangsin_content_has_required_fields(self) -> None:
        """상신 콘텐츠에 필수 필드들이 존재한다."""
        loader = ContentLoader()
        result = loader.get_sangsin_content("Sangsin_1")
        assert result is not None
        assert result.get("title") == "Sangsin_1"
        assert "subtitle" in result
        assert "contents" in result


class TestContentLoaderGusin:
    """구신(Gusin) 콘텐츠 로딩 테스트."""

    def test_get_gusin_content_all_types(self) -> None:
        """4개 구신 유형 모두 콘텐츠를 반환한다."""
        loader = ContentLoader()
        for gusin in ["gusin_1", "gusin_2", "gusin_3", "gusin_4"]:
            result = loader.get_gusin_content(gusin)
            assert result is not None, f"Missing gusin content for {gusin}"
            assert "contents" in result, f"gusin content for {gusin} must have contents"

    def test_get_gusin_content_unknown_returns_none(self) -> None:
        """알 수 없는 구신은 None을 반환한다."""
        loader = ContentLoader()
        assert loader.get_gusin_content("unknown") is None

    def test_get_gusin_content_returns_dict(self) -> None:
        """반환값은 dict 타입이다."""
        loader = ContentLoader()
        result = loader.get_gusin_content("gusin_1")
        assert isinstance(result, dict)

    def test_get_gusin_content_has_required_fields(self) -> None:
        """구신 콘텐츠에 필수 필드들이 존재한다."""
        loader = ContentLoader()
        result = loader.get_gusin_content("gusin_1")
        assert result is not None
        assert result.get("title") == "gusin_1"
        assert "subtitle" in result
        assert "contents" in result


class TestContentLoaderShgjGilhung:
    """신격 길흝(Shgj Gilhung) 콘텐츠 로딩 테스트."""

    def test_get_shgj_gilhung_content_gil_정인격(self) -> None:
        """정인격 길신 콘텐츠를 반환한다."""
        loader = ContentLoader()
        result = loader.get_shgj_gilhung_content("정인격", is_gil=True)
        assert result is not None
        assert "contentsList" in result or "contents" in result

    def test_get_shgj_gilhung_content_hung_양인격(self) -> None:
        """양인격 흉신 콘텐츠를 반환한다."""
        loader = ContentLoader()
        result = loader.get_shgj_gilhung_content("양인격", is_gil=False)
        assert result is not None
        assert "contentsList" in result or "contents" in result

    def test_get_shgj_gilhung_content_unknown_gyouk_returns_none(self) -> None:
        """알 수 없는 격국명은 None을 반환한다."""
        loader = ContentLoader()
        assert loader.get_shgj_gilhung_content("unknown", is_gil=True) is None

    def test_get_shgj_gilhung_content_returns_dict(self) -> None:
        """반환값은 dict 타입이다."""
        loader = ContentLoader()
        result = loader.get_shgj_gilhung_content("양인격", is_gil=False)
        assert isinstance(result, dict)

    def test_get_shgj_gilhung_content_all_gyouk_gil(self) -> None:
        """길신 디렉토리의 모든 격국 파일을 로드한다."""
        loader = ContentLoader()
        for gyouk in [
            "건록격",
            "양인격",
            "상관격",
            "식신격",
            "정인격",
            "편인격",
            "정재격",
            "편재격",
            "정관격",
            "편관격",
        ]:
            result = loader.get_shgj_gilhung_content(gyouk, is_gil=True)
            # Some 격국 may not have gil files, so we just check it doesn't crash
            assert result is None or isinstance(result, dict)

    def test_get_shgj_gilhung_content_all_gyouk_hung(self) -> None:
        """흉신 디렉토리의 모든 격국 파일을 로드한다."""
        loader = ContentLoader()
        for gyouk in [
            "건록격",
            "양인격",
            "상관격",
            "식신격",
            "정인격",
            "편인격",
            "정재격",
            "편재격",
            "정관격",
            "편관격",
        ]:
            result = loader.get_shgj_gilhung_content(gyouk, is_gil=False)
            # Some 격국 may not have hung files, so we just check it doesn't crash
            assert result is None or isinstance(result, dict)


class TestModuleLevelShgjFunctions:
    """모듈 레벨 신격 편의 함수 테스트."""

    def test_module_get_sangsin_content(self) -> None:
        """모듈 레벨 get_sangsin_content 함수가 동작한다."""
        from app.services.content_loader import get_sangsin_content

        result = get_sangsin_content("Sangsin_1")
        assert result is not None

    def test_module_get_gusin_content(self) -> None:
        """모듈 레벨 get_gusin_content 함수가 동작한다."""
        from app.services.content_loader import get_gusin_content

        result = get_gusin_content("gusin_1")
        assert result is not None

    def test_module_get_shgj_gilhung_content(self) -> None:
        """모듈 레벨 get_shgj_gilhung_content 함수가 동작한다."""
        from app.services.content_loader import get_shgj_gilhung_content

        result = get_shgj_gilhung_content("정인격", is_gil=True)
        assert result is not None

    def test_module_level_shgj_unknown_returns_none(self) -> None:
        """모듈 레벨 함수에서 알 수 없는 키는 None을 반환한다."""
        from app.services.content_loader import (
            get_gusin_content,
            get_sangsin_content,
            get_shgj_gilhung_content,
        )

        assert get_sangsin_content("unknown") is None
        assert get_gusin_content("unknown") is None
        assert get_shgj_gilhung_content("unknown", is_gil=True) is None
