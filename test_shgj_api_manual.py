#!/usr/bin/env python3
"""Manual test for TASK-003: Shgj API integration.

This script makes a real API call to verify shgj integration.
"""

import asyncio
import json

from httpx import ASGITransport, AsyncClient

from app.main import app


async def main() -> None:
    """Test the identity endpoint with shgj integration."""
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as client:
        payload = {
            "birth_year": 1990,
            "birth_month": 5,
            "birth_day": 15,
            "birth_hour": 10,
            "is_lunar": False,
            "is_leap_month": False,
            "gender": "male",
        }

        response = await client.post("/api/v1/saju/identity", json=payload)
        print(f"Status Code: {response.status_code}")

        if response.status_code == 200:
            data = response.json()

            # Print key fields
            print("\n=== Key Fields ===")
            print(f"day_gan: {data.get('day_gan')}")
            print(f"gyouk_name: {data.get('gyouk_name')}")

            if data.get('yongshin'):
                print(f"yongshin.dang_ryeong: {data['yongshin'].get('dang_ryeong')}")

            # Print shgj fields
            print("\n=== Shgj Fields (TASK-003) ===")
            shgj = data.get('shgj')
            if shgj:
                print(f"shgj.sangsin: {shgj.get('sangsin')}")
                print(f"shgj.gusin: {shgj.get('gusin')}")
                print(f"shgj.gukgubun: {shgj.get('gukgubun')}")
                print(f"shgj.sanghwa: {shgj.get('sanghwa')}")
                print(f"shgj.sulhwa: {shgj.get('sulhwa')}")
            else:
                print("shgj: None")

            # Print shgj content fields
            print("\n=== Shgj Content Fields (TASK-003) ===")
            print(f"sangsin_content: {'Loaded' if data.get('sangsin_content') else 'None'}")
            print(f"gusin_content: {'Loaded' if data.get('gusin_content') else 'None'}")
            print(f"shgj_gilhung_content: {'Loaded' if data.get('shgj_gilhung_content') else 'None'}")

            # Print full shgj for debugging
            print("\n=== Full Shgj Object ===")
            print(json.dumps(shgj, indent=2, ensure_ascii=False))

        else:
            print(f"Error: {response.text}")


if __name__ == "__main__":
    asyncio.run(main())
