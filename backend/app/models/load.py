"""
LUMEN — Load / Asset Model
==========================

Represents a physical or logical load (machine, HVAC unit, production line, etc.)
Loads are classified for the optimizer:

    - fixed          : cannot be shifted
    - flexible       : can be moved within a time window
    - interruptible  : can be paused
    - priority       : must run continuously
"""

from sqlalchemy import (
    Boolean,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.db.mixins import SoftDeleteMixin, TimestampMixin


class Load(Base, TimestampMixin, SoftDeleteMixin):
    """A load / asset that consumes energy."""

    __tablename__ = "loads"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    # Tenant
    organization_id: Mapped[int] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Physical location (optional — a load may not belong to a specific area)
    building_id: Mapped[int | None] = mapped_column(
        ForeignKey("buildings.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    location_id: Mapped[int | None] = mapped_column(
        ForeignKey("locations.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    # Identity
    name: Mapped[str] = mapped_column(String(200), nullable=False, index=True)
    code: Mapped[str | None] = mapped_column(String(50), nullable=True, index=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    load_type: Mapped[str | None] = mapped_column(String(50), nullable=True)  # hvac / motor / lighting

    # ------------------------------------------------------------
    # Optimization classification
    # ------------------------------------------------------------
    # fixed | flexible | interruptible | priority
    flexibility: Mapped[str] = mapped_column(
        String(20), nullable=False, default="fixed", index=True
    )

    # Priority for the optimizer (lower number = more important)
    priority: Mapped[int] = mapped_column(Integer, nullable=False, default=5)

    # ------------------------------------------------------------
    # Operating characteristics
    # ------------------------------------------------------------
    rated_power_kw: Mapped[float | None] = mapped_column(Float, nullable=True)
    min_power_kw: Mapped[float | None] = mapped_column(Float, nullable=True)
    max_power_kw: Mapped[float | None] = mapped_column(Float, nullable=True)

    # Time window for flexible loads (24h format strings, e.g. "14:00")
    earliest_start: Mapped[str | None] = mapped_column(String(5), nullable=True)
    latest_end: Mapped[str | None] = mapped_column(String(5), nullable=True)

    # Duration constraints (hours)
    min_run_hours: Mapped[float | None] = mapped_column(Float, nullable=True)
    max_run_hours: Mapped[float | None] = mapped_column(Float, nullable=True)

    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    # Relationships
    def __repr__(self) -> str:
        return f"<Load id={self.id} name={self.name!r} flex={self.flexibility!r}>"