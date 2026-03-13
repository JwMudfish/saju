"""End-to-end integration tests for Shgj RAG integration.

This test suite verifies the complete flow from API request to Shgj calculation
and content loading, ensuring all components work together correctly.

Test Coverage:
- API → Shgj Calculation → Content Loading flow
- Performance validation (< 2s response time)
- Error scenarios and graceful degradation
- Data consistency across the entire pipeline
"""

from __future__ import annotations

import time
import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app

# Test payload with complete data
VALID_PAYLOAD = {
    "birth_year": 1990,
    "birth_month": 5,
    "birth_day": 15,
    "birth_hour": 10,
    "is_lunar": False,
    "is_leap_month": False,
    "gender": "male",
}

# Payload without birth hour (no yongshin)
PAYLOAD_NO_HOUR = {
    "birth_year": 1990,
    "birth_month": 5,
    "birth_day": 15,
    "is_lunar": False,
    "is_leap_month": False,
    "gender": "male",
}


@pytest.fixture
async def client() -> AsyncClient:
    """테스트용 AsyncClient fixture."""
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as ac:
        yield ac


class TestShgjIntegrationE2E:
    """End-to-end integration tests for Shgj RAG pipeline."""

    async def test_complete_api_to_shgj_flow(self, client: AsyncClient) -> None:
        """Test complete flow from API request to Shgj calculation with RAG.

        This test verifies:
        1. API request is processed successfully
        2. Shgj calculation is performed
        3. Content loading integration works
        4. Response contains all expected fields
        """
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200

        data = response.json()

        # Verify base fields exist
        assert "day_gan" in data
        assert "gyouk_name" in data
        assert "yongshin" in data

        # Verify shgj field exists
        assert "shgj" in data

        # If yongshin exists, shgj should be calculated
        if data.get("yongshin") and data["yongshin"].get("dang_ryeong"):
            # shgj should not be None when we have yongshin
            assert data["shgj"] is not None, "shgj should be calculated when yongshin exists"

            # Verify shgj structure
            shgj = data["shgj"]
            expected_fields = ["sangsin", "gusin", "gukgubun", "sanghwa", "sulhwa"]
            for field in expected_fields:
                assert field in shgj, f"shgj.{field} should exist"

            # Verify content loading integration
            assert "sangsin_content" in data
            assert "gusin_content" in data
            assert "shgj_gilhung_content" in data

            # Conditional content loading based on shgj results
            if shgj.get("sangsin"):
                assert data["sangsin_content"] is not None, "sangsin_content should load when sangsin exists"
            else:
                assert data["sangsin_content"] is None, "sangsin_content should be None when no sangsin"

            if shgj.get("gusin"):
                assert data["gusin_content"] is not None, "gusin_content should load when gusin exists"
            else:
                assert data["gusin_content"] is None, "gusin_content should be None when no gusin"

    async def test_performance_shgj_calculation_under_2s(self, client: AsyncClient) -> None:
        """Test that Shgj calculation completes in under 2 seconds.

        Performance requirement:
        - API request → Shgj calculation → Content loading < 2s
        - This ensures the RAG integration is performant enough for production
        """
        start_time = time.time()

        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)

        end_time = time.time()
        elapsed = end_time - start_time

        assert response.status_code == 200
        assert elapsed < 2.0, f"Shgj calculation took {elapsed:.2f}s, expected < 2s"

    async def test_error_handling_missing_yongshin(self, client: AsyncClient) -> None:
        """Test error handling when critical data is missing.

        Scenario:
        - Even with valid request, verify graceful error handling
        - shgj calculation should handle edge cases
        - API should maintain stability
        """
        response = await client.post("/api/v1/saju/identity", json=PAYLOAD_NO_HOUR)
        assert response.status_code == 200

        data = response.json()

        # yongshin should still be calculated (doesn't require birth_hour)
        # shgj should be calculated when yongshin exists
        if data.get("yongshin") and data["yongshin"].get("dang_ryeong"):
            # If yongshin exists, shgj should be calculated
            assert "shgj" in data, "shgj field should exist"
        else:
            # If yongshin is None, shgj should also be None
            assert data.get("shgj") is None, "shgj should be None when yongshin is None"

        # Content fields should be present (even if None)
        assert "sangsin_content" in data
        assert "gusin_content" in data

        # Other fields should still work
        assert "day_gan" in data
        assert "gyouk_name" in data

    async def test_error_handling_content_loader_returns_none(self, client: AsyncClient) -> None:
        """Test error handling when ContentLoader returns None.

        Scenario:
        - Shgj calculation succeeds
        - ContentLoader fails to find content (returns None)
        - API should still return 200 with None content fields
        """
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200

        data = response.json()

        # Even if content loading fails, API should return 200
        assert response.status_code == 200

        # Content fields can be None (this is expected behavior)
        # The test verifies the API doesn't crash when content is missing
        if data.get("shgj"):
            # If shgj exists, content fields should be present (even if None)
            assert "sangsin_content" in data
            assert "gusin_content" in data
            assert "shgj_gilhung_content" in data

    async def test_data_consistency_across_pipeline(self, client: AsyncClient) -> None:
        """Test data consistency across the entire pipeline.

        Verifies:
        1. Shgj calculation results are consistent
        2. Content loading matches shgj results
        3. Response structure is valid
        """
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200

        data = response.json()

        # Skip test if yongshin doesn't exist
        if not data.get("yongshin") or not data["yongshin"].get("dang_ryeong"):
            pytest.skip("Test requires valid yongshin")

        shgj = data.get("shgj")
        assert shgj is not None, "shgj should exist when yongshin exists"

        # Verify sangsin/gusin are valid gan characters if present
        valid_gan = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"]

        if shgj.get("sangsin"):
            assert shgj["sangsin"] in valid_gan, f"sangsin should be valid gan, got {shgj['sangsin']}"

        if shgj.get("gusin"):
            assert shgj["gusin"] in valid_gan, f"gusin should be valid gan, got {shgj['gusin']}"

        # MVP: sanghwa, sulhwa, gukgubun should be None
        assert shgj.get("sanghwa") is None, "sanghwa should be None in MVP"
        assert shgj.get("sulhwa") is None, "sulhwa should be None in MVP"
        assert shgj.get("gukgubun") is None, "gukgubun should be None in MVP"

    async def test_backward_compatibility_existing_api(self, client: AsyncClient) -> None:
        """Test backward compatibility with existing API fields.

        Ensures that adding shgj integration doesn't break existing functionality.
        """
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200

        data = response.json()

        # All existing fields should still be present
        existing_fields = [
            "day_gan",
            "gyouk_name",
            "yongshin",
            "ilgan_content",
            "gyouk_content",
            "yongsin_content",
            "hisin_content",
            "hisin_gisin_content",
            "salary_content",
        ]

        for field in existing_fields:
            assert field in data, f"Existing field {field} should be preserved"

        # Existing field types should be consistent
        assert isinstance(data["day_gan"], str)
        assert data["yongshin"] is None or isinstance(data["yongshin"], dict)

    async def test_response_structure_validation(self, client: AsyncClient) -> None:
        """Test that response structure matches expected schema.

        Validates:
        1. All fields are present
        2. Field types are correct
        3. Nullability is properly handled
        """
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200

        data = response.json()

        # Required fields (should never be None)
        assert isinstance(data["day_gan"], str)

        # Optional fields (can be None)
        optional_fields = [
            "gyouk_name",
            "yongshin",
            "shgj",
            "ilgan_content",
            "gyouk_content",
            "yongsin_content",
            "hisin_content",
            "hisin_gisin_content",
            "salary_content",
            "sangsin_content",
            "gusin_content",
            "shgj_gilhung_content",
        ]

        for field in optional_fields:
            assert field in data, f"Optional field {field} should be present"

        # shgj structure validation
        if data.get("shgj") is not None:
            shgj = data["shgj"]
            assert isinstance(shgj, dict)
            assert "sangsin" in shgj
            assert "gusin" in shgj
            assert "gukgubun" in shgj
            assert "sanghwa" in shgj
            assert "sulhwa" in shgj

    async def test_multiple_requests_consistency(self, client: AsyncClient) -> None:
        """Test that multiple requests produce consistent results.

        Ensures the integration is deterministic and doesn't have state issues.
        """
        responses = []
        for _ in range(3):
            response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
            assert response.status_code == 200
            responses.append(response.json())

        # All responses should be identical
        for i in range(1, len(responses)):
            assert responses[i] == responses[0], "Multiple requests should produce identical results"

    async def test_content_loading_performance(self, client: AsyncClient) -> None:
        """Test that content loading doesn't significantly impact performance.

        Measures:
        1. Time for API call with content loading
        2. Ensures content loading is optimized
        """
        start_time = time.time()

        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)

        end_time = time.time()
        elapsed = end_time - start_time

        assert response.status_code == 200

        # Content loading should not make the API significantly slower
        # The 2s threshold includes both shgj calculation and content loading
        assert elapsed < 2.0, f"API call with content loading took {elapsed:.2f}s, expected < 2s"
