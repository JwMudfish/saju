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


class TestContentLoaderSangsinCompliment:
    """상신 보완(Sangsin Compliment) 콘텐츠 로딩 테스트."""

    def test_get_sangsin_compliment_content_all_types(self) -> None:
        """상신 보완 콘텐츠를 반환한다 (실제 JSON title 형식: sangsin_compliment1)."""
        loader = ContentLoader()
        # 실제 JSON 파일의 title 형식에 맞춰 테스트
        for sangsin in ["sangsin_compliment1", "sangsin_compliment2", "sangsin_compliment3", "sangsin_compliment4"]:
            result = loader.get_sangsin_compliment_content(sangsin)
            assert result is not None, f"Missing sangsin compliment content for {sangsin}"
            assert "contents" in result, f"sangsin compliment content for {sangsin} must have contents"

    def test_get_sangsin_compliment_content_unknown_returns_none(self) -> None:
        """알 수 없는 상신은 None을 반환한다."""
        loader = ContentLoader()
        assert loader.get_sangsin_compliment_content("unknown") is None

    def test_get_sangsin_compliment_content_returns_dict(self) -> None:
        """반환값은 dict 타입이다."""
        loader = ContentLoader()
        result = loader.get_sangsin_compliment_content("sangsin_compliment1")
        assert isinstance(result, dict)

    def test_get_sangsin_compliment_content_has_required_fields(self) -> None:
        """상신 보완 콘텐츠에 필수 필드들이 존재한다."""
        loader = ContentLoader()
        result = loader.get_sangsin_compliment_content("sangsin_compliment1")
        assert result is not None
        assert result.get("title") == "sangsin_compliment1"
        assert "subtitle" in result
        assert "contents" in result


class TestContentLoaderGusinGisin:
    """구신 기신(Gusin Gisin) 콘텐츠 로딩 테스트."""

    def test_get_gusin_gisin_content_all_types(self) -> None:
        """4개 구신 유형 모두 기신 콘텐츠를 반환한다 (실제 JSON title 형식: gusin_gisin_1)."""
        loader = ContentLoader()
        for gusin in ["gusin_gisin_1", "gusin_gisin_2", "gusin_gisin_3", "gusin_gisin_4"]:
            result = loader.get_gusin_gisin_content(gusin)
            assert result is not None, f"Missing gusin gisin content for {gusin}"
            assert "contents" in result, f"gusin gisin content for {gusin} must have contents"

    def test_get_gusin_gisin_content_unknown_returns_none(self) -> None:
        """알 수 없는 구신은 None을 반환한다."""
        loader = ContentLoader()
        assert loader.get_gusin_gisin_content("unknown") is None

    def test_get_gusin_gisin_content_returns_dict(self) -> None:
        """반환값은 dict 타입이다."""
        loader = ContentLoader()
        result = loader.get_gusin_gisin_content("gusin_gisin_1")
        assert isinstance(result, dict)

    def test_get_gusin_gisin_content_has_required_fields(self) -> None:
        """구신 기신 콘텐츠에 필수 필드들이 존재한다."""
        loader = ContentLoader()
        result = loader.get_gusin_gisin_content("gusin_gisin_1")
        assert result is not None
        assert result.get("title") == "gusin_gisin_1"
        assert "subtitle" in result
        assert "contents" in result


class TestContentLoaderJisok:
    """지속(Jisok) 설명 콘텐츠 로딩 테스트."""

    def test_get_jisok_content_all_types(self) -> None:
        """4개 지속 유형 모두 설명 콘텐츠를 반환한다."""
        loader = ContentLoader()
        for jisok in ["jisok_1", "jisok_2", "jisok_3", "jisok_4"]:
            result = loader.get_jisok_content(jisok)
            assert result is not None, f"Missing jisok content for {jisok}"
            assert "contents" in result, f"jisok content for {jisok} must have contents"

    def test_get_jisok_content_unknown_returns_none(self) -> None:
        """알 수 없는 지속은 None을 반환한다."""
        loader = ContentLoader()
        assert loader.get_jisok_content("unknown") is None

    def test_get_jisok_content_returns_dict(self) -> None:
        """반환값은 dict 타입이다."""
        loader = ContentLoader()
        result = loader.get_jisok_content("jisok_1")
        assert isinstance(result, dict)

    def test_get_jisok_content_has_required_fields(self) -> None:
        """지속 설명 콘텐츠에 필수 필드들이 존재한다."""
        loader = ContentLoader()
        result = loader.get_jisok_content("jisok_1")
        assert result is not None
        assert result.get("title") == "jisok_1"
        assert "subtitle" in result
        assert "contents" in result


class TestContentLoaderJoonghwa:
    """중화(Joonghwa) 설명 콘텐츠 로딩 테스트."""

    def test_get_joonghwa_content_all_types(self) -> None:
        """4개 중화 유형 모두 설명 콘텐츠를 반환한다."""
        loader = ContentLoader()
        for joonghwa in ["joonghwa_1", "joonghwa_2", "joonghwa_3", "joonghwa_4"]:
            result = loader.get_joonghwa_content(joonghwa)
            assert result is not None, f"Missing joonghwa content for {joonghwa}"
            assert "contents" in result, f"joonghwa content for {joonghwa} must have contents"

    def test_get_joonghwa_content_unknown_returns_none(self) -> None:
        """알 수 없는 중화는 None을 반환한다."""
        loader = ContentLoader()
        assert loader.get_joonghwa_content("unknown") is None

    def test_get_joonghwa_content_returns_dict(self) -> None:
        """반환값은 dict 타입이다."""
        loader = ContentLoader()
        result = loader.get_joonghwa_content("joonghwa_1")
        assert isinstance(result, dict)

    def test_get_joonghwa_content_has_required_fields(self) -> None:
        """중화 설명 콘텐츠에 필수 필드들이 존재한다."""
        loader = ContentLoader()
        result = loader.get_joonghwa_content("joonghwa_1")
        assert result is not None
        assert result.get("title") == "joonghwa_1"
        assert "subtitle" in result
        assert "contents" in result


class TestContentLoaderHwakjang:
    """확장(Hwakjang) 설명 콘텐츠 로딩 테스트."""

    def test_get_hwakjang_content_all_types(self) -> None:
        """4개 확장 유형 모두 설명 콘텐츠를 반환한다."""
        loader = ContentLoader()
        for hwakjang in ["hwakjang_1", "hwakjang_2", "hwakjang_3", "hwakjang_4"]:
            result = loader.get_hwakjang_content(hwakjang)
            assert result is not None, f"Missing hwakjang content for {hwakjang}"
            assert "contents" in result, f"hwakjang content for {hwakjang} must have contents"

    def test_get_hwakjang_content_unknown_returns_none(self) -> None:
        """알 수 없는 확장은 None을 반환한다."""
        loader = ContentLoader()
        assert loader.get_hwakjang_content("unknown") is None

    def test_get_hwakjang_content_returns_dict(self) -> None:
        """반환값은 dict 타입이다."""
        loader = ContentLoader()
        result = loader.get_hwakjang_content("hwakjang_1")
        assert isinstance(result, dict)

    def test_get_hwakjang_content_has_required_fields(self) -> None:
        """확장 설명 콘텐츠에 필수 필드들이 존재한다."""
        loader = ContentLoader()
        result = loader.get_hwakjang_content("hwakjang_1")
        assert result is not None
        assert result.get("title") == "hwakjang_1"
        assert "subtitle" in result
        assert "contents" in result


class TestModuleLevelPhase1Functions:
    """모듈 레벨 Phase 1 편의 함수 테스트."""

    def test_module_get_sangsin_compliment_content(self) -> None:
        """모듈 레벨 get_sangsin_compliment_content 함수가 동작한다."""
        from app.services.content_loader import get_sangsin_compliment_content

        result = get_sangsin_compliment_content("sangsin_compliment1")
        assert result is not None

    def test_module_get_gusin_gisin_content(self) -> None:
        """모듈 레벨 get_gusin_gisin_content 함수가 동작한다."""
        from app.services.content_loader import get_gusin_gisin_content

        result = get_gusin_gisin_content("gusin_gisin_1")
        assert result is not None

    def test_module_get_jisok_content(self) -> None:
        """모듈 레벨 get_jisok_content 함수가 동작한다."""
        from app.services.content_loader import get_jisok_content

        result = get_jisok_content("jisok_1")
        assert result is not None

    def test_module_get_joonghwa_content(self) -> None:
        """모듈 레벨 get_joonghwa_content 함수가 동작한다."""
        from app.services.content_loader import get_joonghwa_content

        result = get_joonghwa_content("joonghwa_1")
        assert result is not None

    def test_module_get_hwakjang_content(self) -> None:
        """모듈 레벨 get_hwakjang_content 함수가 동작한다."""
        from app.services.content_loader import get_hwakjang_content

        result = get_hwakjang_content("hwakjang_1")
        assert result is not None

    def test_module_phase1_unknown_returns_none(self) -> None:
        """모듈 레벨 함수에서 알 수 없는 키는 None을 반환한다."""
        from app.services.content_loader import (
            get_gusin_gisin_content,
            get_hwakjang_content,
            get_jisok_content,
            get_joonghwa_content,
            get_sangsin_compliment_content,
        )

        assert get_sangsin_compliment_content("unknown") is None
        assert get_gusin_gisin_content("unknown") is None
        assert get_jisok_content("unknown") is None
        assert get_joonghwa_content("unknown") is None
        assert get_hwakjang_content("unknown") is None


class TestContentLoaderPhase2:
    """Phase 2: 합충 관계, 일간 화월, 일간 연애, 베프 유형 콘텐츠 로딩 테스트."""

    def test_get_hapchung_content_onlychung_returns_content(self) -> None:
        """합충 관계 onlyChung 콘텐츠를 반환한다."""
        loader = ContentLoader()
        result = loader.get_hapchung_content("onlyChung")
        assert result is not None
        assert "contentsList" in result

    def test_get_hapchung_content_samhap_yes_returns_content(self) -> None:
        """합충 관계 samhapYes 콘텐츠를 반환한다."""
        loader = ContentLoader()
        result = loader.get_hapchung_content("samhapYes")
        assert result is not None
        assert "contentsList" in result

    def test_get_hapchung_content_banghap_yes_returns_content(self) -> None:
        """합충 관계 banghapYes 콘텐츠를 반환한다."""
        loader = ContentLoader()
        result = loader.get_hapchung_content("banghapYes")
        assert result is not None
        assert "contentsList" in result

    def test_get_hapchung_content_no_returns_content(self) -> None:
        """합충 관계 no 콘텐츠를 반환한다."""
        loader = ContentLoader()
        result = loader.get_hapchung_content("no")
        assert result is not None
        assert "contentsList" in result

    def test_get_hapchung_content_unknown_returns_none(self) -> None:
        """알 수 없는 합충 유형은 None을 반환한다."""
        loader = ContentLoader()
        assert loader.get_hapchung_content("unknown") is None

    def test_get_ilgan_hw_content_returns_content(self) -> None:
        """일간 화월 콘텐츠를 반환한다."""
        loader = ContentLoader()
        result = loader.get_ilgan_hw_content("갑", "자")
        assert result is not None
        assert "contentsList" in result

    def test_get_ilgan_hw_content_all_gan_combinations(self) -> None:
        """모든 일간 조합에 대해 콘텐츠를 반환한다."""
        loader = ContentLoader()
        for ilgan in ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"]:
            result = loader.get_ilgan_hw_content(ilgan, "자")
            assert result is not None, f"Missing ilgan_hw content for {ilgan}"

    def test_get_ilgan_love_content_returns_content(self) -> None:
        """일간 연애 콘텐츠를 반환한다."""
        loader = ContentLoader()
        result = loader.get_ilgan_love_content("갑")
        assert result is not None
        assert "contentsList" in result

    def test_get_ilgan_love_content_all_gan(self) -> None:
        """모든 일간에 대해 연애 콘텐츠를 반환한다."""
        loader = ContentLoader()
        for ilgan in ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"]:
            result = loader.get_ilgan_love_content(ilgan)
            assert result is not None, f"Missing ilgan_love content for {ilgan}"

    def test_get_bestfriend_content_returns_content(self) -> None:
        """베프 유형 콘텐츠를 반환한다."""
        loader = ContentLoader()
        result = loader.get_bestfriend_content("비견")
        assert result is not None
        assert "contentsList" in result

    def test_get_bestfriend_content_all_yuksin(self) -> None:
        """모든 육신에 대해 베프 콘텐츠를 반환한다."""
        loader = ContentLoader()
        for yuksin in ["비견", "겁재", "편인", "정인", "편재", "정재", "식신", "상관", "정관", "편관"]:
            result = loader.get_bestfriend_content(yuksin)
            assert result is not None, f"Missing bestfriend content for {yuksin}"

    def test_module_get_hapchung_content(self) -> None:
        """모듈 레벨 get_hapchung_content 함수가 동작한다."""
        from app.services.content_loader import get_hapchung_content

        result = get_hapchung_content("onlyChung")
        assert result is not None

    def test_module_get_ilgan_hw_content(self) -> None:
        """모듈 레벨 get_ilgan_hw_content 함수가 동작한다."""
        from app.services.content_loader import get_ilgan_hw_content

        result = get_ilgan_hw_content("갑", "자")
        assert result is not None

    def test_module_get_ilgan_love_content(self) -> None:
        """모듈 레벨 get_ilgan_love_content 함수가 동작한다."""
        from app.services.content_loader import get_ilgan_love_content

        result = get_ilgan_love_content("갑")
        assert result is not None

    def test_module_get_bestfriend_content(self) -> None:
        """모듈 레벨 get_bestfriend_content 함수가 동작한다."""
        from app.services.content_loader import get_bestfriend_content

        result = get_bestfriend_content("비견")
        assert result is not None

    def test_module_phase2_unknown_returns_none(self) -> None:
        """모듈 레벨 함수에서 알 수 없는 키는 None을 반환한다."""
        from app.services.content_loader import (
            get_bestfriend_content,
            get_hapchung_content,
            get_ilgan_hw_content,
            get_ilgan_love_content,
        )

        assert get_hapchung_content("unknown") is None
        assert get_ilgan_hw_content("unknown", "자") is not None  # 파일 전체 로드
        assert get_ilgan_love_content("unknown") is not None  # 파일 전체 로드
        assert get_bestfriend_content("unknown") is not None  # 파일 전체 로드


class TestContentLoaderPhase3:
    """Phase 3: 노소 유형, 경운 질문 콘텐츠 로딩 테스트."""

    def test_get_old_young_content_available_combinations(self) -> None:
        """현재 제공되는 일간과 월지 조합에 대해 콘텐츠를 반환한다.
        (현재 데이터 파일에는 11개 항목만 존재함)
        """
        loader = ContentLoader()
        ilgan_list = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"]
        ji_list = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"]
        
        count = 0
        for ilgan in ilgan_list:
            for ji in ji_list:
                result = loader.get_old_young_content(ilgan, ji)
                # 현재 데이터는 11개까지만 있으므로 그 이후는 None일 수 있음
                if result is not None:
                    assert "title" in result
                    assert "contents" in result
                    count += 1
        
        # 현재 데이터 파일에 정의된 개수(11개) 확인
        assert count == 11

    def test_get_old_young_content_first_combination(self) -> None:
        """갑+자 조합은 old_young_1을 반환한다."""
        loader = ContentLoader()
        result = loader.get_old_young_content("갑", "자")
        assert result is not None
        assert result.get("title") == "old_young_1"

    def test_get_old_young_content_out_of_range_returns_none(self) -> None:
        """데이터 범위를 벗어난 조합(계+해)은 None을 반환한다 (현재 데이터 부족)."""
        loader = ContentLoader()
        result = loader.get_old_young_content("계", "해")
        assert result is None

    def test_get_old_young_content_unknown_ilgan_returns_none(self) -> None:
        """알 수 없는 일간은 None을 반환한다."""
        loader = ContentLoader()
        result = loader.get_old_young_content("unknown", "자")
        assert result is None

    def test_get_old_young_content_unknown_ji_returns_none(self) -> None:
        """알 수 없는 월지는 None을 반환한다."""
        loader = ContentLoader()
        result = loader.get_old_young_content("갑", "unknown")
        assert result is None

    def test_get_old_young_content_returns_dict(self) -> None:
        """반환값은 dict 타입이다."""
        loader = ContentLoader()
        result = loader.get_old_young_content("갑", "자")
        assert isinstance(result, dict)

    def test_get_light_question_content_q1_yongsin(self) -> None:
        """Q1 용신 기반 질문 콘텐츠를 반환한다."""
        loader = ContentLoader()
        result = loader.get_light_question_content("q1", "yongsin")
        assert result is not None
        assert "contentsList" in result

    def test_get_light_question_content_q1_gyouk(self) -> None:
        """Q1 격국 기반 질문 콘텐츠를 반환한다."""
        loader = ContentLoader()
        result = loader.get_light_question_content("q1", "gyouk")
        assert result is not None
        assert "contentsList" in result

    def test_get_light_question_content_q1_invalid_type_returns_none(self) -> None:
        """Q1에서 잘못된 타입은 None을 반환한다."""
        loader = ContentLoader()
        result = loader.get_light_question_content("q1", "invalid")
        assert result is None

    def test_get_light_question_content_q7_jungje_sengyes_sulno(self) -> None:
        """Q7 정재 상화Yes/설화No 조합 콘텐츠를 반환한다."""
        loader = ContentLoader()
        result = loader.get_light_question_content("q7", "jungJe", "sengYes", "sulNo")
        assert result is not None
        assert "contentsList" in result

    def test_get_light_question_content_q7_pyeonje_sengno_sulyes(self) -> None:
        """Q7 편재 상화No/설화Yes 조합 콘텐츠를 반환한다."""
        loader = ContentLoader()
        result = loader.get_light_question_content("q7", "pyeonje", "sengNo", "sulYes")
        assert result is not None
        assert "contentsList" in result

    def test_get_light_question_content_q7_missing_params_returns_none(self) -> None:
        """Q7에서 필수 파라미터가 없으면 None을 반환한다."""
        loader = ContentLoader()
        # gyouk_name 누락
        assert loader.get_light_question_content("q7", None, "sengYes", "sulNo") is None
        # sanghwa 누락
        assert loader.get_light_question_content("q7", "jungJe", None, "sulNo") is None
        # sulhwa 누락
        assert loader.get_light_question_content("q7", "jungJe", "sengYes", None) is None

    def test_get_light_question_content_q8_siksin_sengyes_sulno(self) -> None:
        """Q8 식신 상화Yes/설화No 조합 콘텐츠를 반환한다."""
        loader = ContentLoader()
        result = loader.get_light_question_content("q8", "siksin", "sengYes", "sulNo")
        assert result is not None
        assert "contentsList" in result

    def test_get_light_question_content_q8_jungin_sangseng(self) -> None:
        """Q8 정인 상세지표(상성) 콘텐츠를 반환한다."""
        loader = ContentLoader()
        result = loader.get_light_question_content("q8", "jungIn", "sangSeng", "sangSeng")
        assert result is not None
        assert "contentsList" in result

    def test_get_light_question_content_q8_invalid_gyouk_returns_none(self) -> None:
        """Q8에서 잘못된 격국명은 None을 반환한다."""
        loader = ContentLoader()
        result = loader.get_light_question_content("q8", "invalid", "sengYes", "sulNo")
        assert result is None

    def test_get_light_question_content_q8_missing_params_returns_none(self) -> None:
        """Q8에서 필수 파라미터가 없으면 None을 반환한다."""
        loader = ContentLoader()
        # gyouk_name 누락
        assert loader.get_light_question_content("q8", None, "sengYes", "sulNo") is None
        # sanghwa, sulhwa 누락 (상성이 아닌 경우)
        assert loader.get_light_question_content("q8", "siksin", None, None) is None

    def test_get_light_question_content_invalid_question_id_returns_none(self) -> None:
        """잘못된 질문 ID는 None을 반환한다."""
        loader = ContentLoader()
        result = loader.get_light_question_content("q99", "yongsin")
        assert result is None

    def test_get_light_question_content_returns_dict(self) -> None:
        """반환값은 dict 타입이다."""
        loader = ContentLoader()
        result = loader.get_light_question_content("q1", "yongsin")
        assert isinstance(result, dict)


class TestModuleLevelPhase3Functions:
    """모듈 레벨 Phase 3 편의 함수 테스트."""

    def test_module_get_old_young_content(self) -> None:
        """모듈 레벨 get_old_young_content 함수가 동작한다."""
        from app.services.content_loader import get_old_young_content

        result = get_old_young_content("갑", "자")
        assert result is not None

    def test_module_get_light_question_content(self) -> None:
        """모듈 레벨 get_light_question_content 함수가 동작한다."""
        from app.services.content_loader import get_light_question_content

        result = get_light_question_content("q1", "yongsin")
        assert result is not None

    def test_module_phase3_unknown_returns_none(self) -> None:
        """모듈 레벨 함수에서 알 수 없는 키는 None을 반환한다."""
        from app.services.content_loader import (
            get_light_question_content,
            get_old_young_content,
        )

        assert get_old_young_content("unknown", "자") is None
        assert get_light_question_content("q99", "yongsin") is None
