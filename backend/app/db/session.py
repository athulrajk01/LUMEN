"""
LUMEN — Database Session Management
====================================

Creates the SQLAlchemy engine and provides a session factory.
Supports both SQLite (development) and PostgreSQL (production).
"""

from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings


# ------------------------------------------------------------
# Engine configuration
# ------------------------------------------------------------
# For SQLite, we must disable thread-checking (FastAPI is async)
# For PostgreSQL, this is ignored and pooling is enabled by default.

connect_args = {}
engine_kwargs = {
    "echo": settings.DEBUG and settings.APP_ENV == "development",
    "future": True,
}

if settings.DATABASE_URL.startswith("sqlite"):
    connect_args["check_same_thread"] = False
    engine_kwargs["connect_args"] = connect_args


engine = create_engine(settings.DATABASE_URL, **engine_kwargs)


# ------------------------------------------------------------
# Session factory
# ------------------------------------------------------------
SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
    class_=Session,
)


# ------------------------------------------------------------
# FastAPI dependency
# ------------------------------------------------------------
def get_db() -> Generator[Session, None, None]:
    """
    FastAPI dependency that yields a database session.

    Usage:
        @router.get("/items")
        def read_items(db: Session = Depends(get_db)):
            ...
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()