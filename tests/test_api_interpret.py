"""사주 해석 API 통합 테스트."""

from __future__ import annotations

from unittest.mock import MagicMock, patch

import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture
def client() -> TestClient:
    """FastAPI TestClient."""
    return TestClient(app)


@pytest.fixture
def minimal_saju_payload() -> dict:
    """최소 SajuResult JSON (year/month/day_pillar만)."""
    return {
        "saju_result": {
            "year_pillar": {"gan": "갑", "ji": "자"},
            "month_pillar": {"gan": "을", "ji": "축"},
            "day_pillar": {"gan": "병", "ji": "인"},
        }
    }


@pytest.fixture
def full_saju_payload() -> dict:
    """모든 필드를 포함한 SajuResult JSON."""
    return {
        "saju_result": {
            "year_pillar": {"gan": "갑", "ji": "자"},
            "month_pillar": {"gan": "을", "ji": "축"},
            "day_pillar": {"gan": "병", "ji": "인"},
            "hour_pillar": {"gan": "정", "ji": "묘"},
            "deun": {
                "banghyang": "순행",
                "deun_su": 7,
                "deun_list": [
                    {"age": 7, "ganji": {"gan": "병", "ji": "진"}},
                    {"age": 17, "ganji": {"gan": "정", "ji": "사"}},
                ],
            },
            "yuksin_list": [
                {"target": "을", "yuksin": "겁재"},
            ],
            "ohang_ratio": {"mok": 30.0, "hwa": 20.0, "to": 20.0, "geum": 15.0, "su": 15.0},
            "shinsal": [
                {"name": "역마살", "trigger_ji": "인", "description": "여행과 이동"},
            ],
        }
    }


class TestInterpretEndpoint:
    """POST /api/v1/saju/interpret 엔드포인트 테스트."""

    def test_no_api_key_returns_200_with_fallback(
        self, client: TestClient, minimal_saju_payload: dict
    ) -> None:
        """OPENAI_API_KEY 없으면 200 + is_fallback=true를 반환해야 한다."""
        with patch("app.api.deps.get_settings") as mock_settings:
            settings = MagicMock()
            settings.openai_api_key = None
            mock_settings.return_value = settings

            response = client.post("/api/v1/saju/interpret", json=minimal_saju_payload)

        assert response.status_code == 200
        data = response.json()
        assert data["is_fallback"] is True
        assert "OPENAI_API_KEY" in data["interpretation"]

    def test_with_mocked_api_returns_200_not_fallback(
        self, client: TestClient, full_saju_payload: dict
    ) -> None:
        """API 키 있을 때 LLM 응답으로 is_fallback=false를 반환해야 한다."""
        mock_choice = MagicMock()
        mock_choice.message.content = "사주 해석 결과입니다."
        mock_response = MagicMock()
        mock_response.choices = [mock_choice]

        with patch("app.api.deps.get_settings") as mock_settings, patch(
            "openai.OpenAI"
        ) as mock_openai_cls:
            settings = MagicMock()
            settings.openai_api_key = "test-key"
            mock_settings.return_value = settings

            mock_client = MagicMock()
            mock_openai_cls.return_value = mock_client
            mock_client.chat.completions.create.return_value = mock_response

            response = client.post("/api/v1/saju/interpret", json=full_saju_payload)

        assert response.status_code == 200
        data = response.json()
        assert data["is_fallback"] is False
        assert "해석 결과" in data["interpretation"]

    def test_missing_saju_result_returns_422(
        self, client: TestClient
    ) -> None:
        """saju_result 없으면 422를 반환해야 한다."""
        response = client.post("/api/v1/saju/interpret", json={})
        assert response.status_code == 422

    def test_invalid_saju_result_returns_422(
        self, client: TestClient
    ) -> None:
        """saju_result 형식이 잘못되면 422를 반환해야 한다."""
        response = client.post(
            "/api/v1/saju/interpret",
            json={"saju_result": {"invalid_field": "value"}},
        )
        assert response.status_code == 422

    def test_api_status_error_returns_502(
        self, client: TestClient, minimal_saju_payload: dict
    ) -> None:
        """APIStatusError 발생 시 502를 반환해야 한다."""
        import openai

        with patch("app.api.deps.get_settings") as mock_settings, patch(
            "openai.OpenAI"
        ) as mock_openai_cls:
            settings = MagicMock()
            settings.openai_api_key = "test-key"
            mock_settings.return_value = settings

            mock_client = MagicMock()
            mock_openai_cls.return_value = mock_client
            mock_resp = MagicMock()
            mock_resp.status_code = 500
            mock_client.chat.completions.create.side_effect = openai.APIStatusError(
                "서버 오류", response=mock_resp, body=None
            )

            response = client.post("/api/v1/saju/interpret", json=minimal_saju_payload)

        assert response.status_code == 502

    def test_api_timeout_error_returns_504(
        self, client: TestClient, minimal_saju_payload: dict
    ) -> None:
        """APITimeoutError 발생 시 504를 반환해야 한다."""
        import openai

        with patch("app.api.deps.get_settings") as mock_settings, patch(
            "openai.OpenAI"
        ) as mock_openai_cls:
            settings = MagicMock()
            settings.openai_api_key = "test-key"
            mock_settings.return_value = settings

            mock_client = MagicMock()
            mock_openai_cls.return_value = mock_client
            mock_client.chat.completions.create.side_effect = openai.APITimeoutError(
                request=MagicMock()
            )

            response = client.post("/api/v1/saju/interpret", json=minimal_saju_payload)

        assert response.status_code == 504

    def test_with_user_context(
        self, client: TestClient, full_saju_payload: dict
    ) -> None:
        """user_context가 제공되면 요청에 포함되어야 한다."""
        mock_choice = MagicMock()
        mock_choice.message.content = "직업 운 해석입니다."
        mock_response = MagicMock()
        mock_response.choices = [mock_choice]

        payload = {**full_saju_payload, "user_context": "직업 운을 알고 싶어요"}

        with patch("app.api.deps.get_settings") as mock_settings, patch(
            "openai.OpenAI"
        ) as mock_openai_cls:
            settings = MagicMock()
            settings.openai_api_key = "test-key"
            mock_settings.return_value = settings

            mock_client = MagicMock()
            mock_openai_cls.return_value = mock_client
            mock_client.chat.completions.create.return_value = mock_response

            response = client.post("/api/v1/saju/interpret", json=payload)

        assert response.status_code == 200
        # user_context가 프롬프트에 포함되었는지 확인 (messages의 user 메시지 검사)
        call_kwargs = mock_client.chat.completions.create.call_args
        if call_kwargs and call_kwargs.kwargs.get("messages"):
            user_msg = call_kwargs.kwargs["messages"][1]["content"]
            assert "직업 운을 알고 싶어요" in user_msg

    def test_response_has_model_field(
        self, client: TestClient, minimal_saju_payload: dict
    ) -> None:
        """응답에 model 필드가 있어야 한다."""
        with patch("app.api.deps.get_settings") as mock_settings:
            settings = MagicMock()
            settings.openai_api_key = None
            mock_settings.return_value = settings

            response = client.post("/api/v1/saju/interpret", json=minimal_saju_payload)

        assert response.status_code == 200
        data = response.json()
        assert "model" in data
        assert data["model"] == "gpt-4o"
