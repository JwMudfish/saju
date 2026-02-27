from __future__ import annotations

from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health_check() -> dict[str, str]:
    """헬스 체크 엔드포인트."""
    return {"status": "ok"}
