"""
LUMEN — Application Configuration
==================================

Centralizes all environment-driven configuration using Pydantic Settings.
Every other module imports `settings` from here.
"""

from functools import lru_cache
from typing import List, Union

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables / .env file."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # ------------------------------------------------------------
    # Application
    # ------------------------------------------------------------
    APP_NAME: str = "LUMEN"
    APP_ENV: str = "development"
    DEBUG: bool = True
    API_V1_PREFIX: str = "/api/v1"

    BACKEND_CORS_ORIGINS: Union[str, List[str]] = [
        "http://localhost:5173",
        "http://localhost:3000",
    ]

    # ------------------------------------------------------------
    # Database
    # ------------------------------------------------------------
    DATABASE_URL: str = "sqlite:///./lumen.db"

    # ------------------------------------------------------------
    # Security / JWT
    # ------------------------------------------------------------
    JWT_SECRET: str = "CHANGE_ME"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # ------------------------------------------------------------
    # Redis / Celery
    # ------------------------------------------------------------
    REDIS_URL: str = "redis://localhost:6379/0"
    CELERY_BROKER_URL: str = "redis://localhost:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/1"

    # ------------------------------------------------------------
    # Files / Uploads
    # ------------------------------------------------------------
    UPLOAD_DIR: str = "./uploads"
    MAX_UPLOAD_MB: int = 50

    REPORTS_DIR: str = "./reports_output"

    # ------------------------------------------------------------
    # Logging
    # ------------------------------------------------------------
    LOG_LEVEL: str = "INFO"

    # ------------------------------------------------------------
    # Validators
    # ------------------------------------------------------------
    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def _parse_cors(cls, v):
        """Allow CORS origins to be a comma-separated string in .env."""
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v


@lru_cache
def get_settings() -> Settings:
    """Return a cached Settings instance (created only once)."""
    return Settings()


# Module-level singleton — import this everywhere
settings = get_settings()