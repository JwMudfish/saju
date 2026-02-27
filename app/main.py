from __future__ import annotations

from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.config import Settings


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """FastAPI 라이프사이클 관리."""
    # 시작 이벤트
    yield
    # 종료 이벤트


def create_app(settings: Settings | None = None) -> FastAPI:
    """FastAPI 애플리케이션 팩토리."""
    s = settings or Settings()
    application = FastAPI(
        title=s.app_name,
        version=s.app_version,
        debug=s.debug,
        lifespan=lifespan,
    )
    application.add_middleware(
        CORSMiddleware,
        allow_origins=s.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    application.include_router(api_router)
    return application


app = create_app()
