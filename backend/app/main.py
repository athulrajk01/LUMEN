"""
LUMEN — FastAPI Application
============================

Main entry point for the backend API.

Run with:
    uvicorn app.main:app --reload --port 8000
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.logging import configure_logging, get_logger


# ------------------------------------------------------------
# Configure logging at import time
# ------------------------------------------------------------
configure_logging()
log = get_logger("lumen.main")


# ------------------------------------------------------------
# Lifespan — startup / shutdown hooks
# ------------------------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    log.info(
        "app_startup",
        app_name=settings.APP_NAME,
        env=settings.APP_ENV,
        debug=settings.DEBUG,
    )
    yield
    log.info("app_shutdown", app_name=settings.APP_NAME)


# ------------------------------------------------------------
# Create the FastAPI app
# ------------------------------------------------------------
app = FastAPI(
    title=settings.APP_NAME,
    description="LUMEN — Intelligent Energy Intelligence, Optimization & Decision Platform",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)


# ------------------------------------------------------------
# CORS — allow the frontend to call us
# ------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ------------------------------------------------------------
# Health endpoints
# ------------------------------------------------------------
@app.get("/", tags=["Health"])
async def root():
    """Root endpoint — quick sanity check."""
    return {
        "app": settings.APP_NAME,
        "version": "0.1.0",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health", tags=["Health"])
async def health():
    """Health check endpoint used by monitoring / load balancers."""
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "env": settings.APP_ENV,
    }


# ------------------------------------------------------------
# API v1 router (added later once we build endpoints)
# ------------------------------------------------------------
# from app.api.v1.router import api_router
# app.include_router(api_router, prefix=settings.API_V1_PREFIX)