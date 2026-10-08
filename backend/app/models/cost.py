"""
LUMEN — Cost Model
==================

Aggregated cost records per period / scope. Used for cost analytics.
"""

from datetime import datetime

from sqlalchemy import (
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.db.mixins import TimestampMixin


class Cost(Base, TimestampMixin):
    """A cost record (energy cost over a period, per scope)."""

    __tablename__ = "costs"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    organization_id: Mapped[int] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Optional scope
    building_id: Mapped[int | None] = mapped_column(
        ForeignKey("buildings.id", ondelete="SET NULL"), nullable=True, index=True
    )
    location_id: Mapped[int | None] = mapped_column(
        ForeignKey("locations.id", ondelete="SET NULL"), nullable=True, index=True
    )
    category_id: Mapped[int | None] = mapped_column(
        ForeignKey("consumption_categories.id", ondelete="SET NULL"), nullable=True, index=True
    )

    # Period
    period_start: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, index=True)
    period_end: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    period_type: Mapped[str] = mapped_column(String(20), nullable=False, default="day", index=True)
    # hour | day | week | month | year

    # Amounts
    energy_kwh: Mapped[float | None] = mapped_column(Float, nullable=True)
    total_cost: Mapped[float] = mapped_column(Float, nullable=False)
    currency: Mapped[str] = mapped_column(String(8), nullable=False, default="INR")

    # Breakdown
    energy_charge: Mapped[float | None] = mapped_column(Float, nullable=True)
    demand_charge: Mapped[float | None] = mapped_column(Float, nullable=True)
    fixed_charge: Mapped[float | None] = mapped_column(Float, nullable=True)
    taxes: Mapped[float | None] = mapped_column(Float, nullable=True)

    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    def __repr__(self) -> str:
        return f"<Cost id={self.id} period={self.period_type} total={self.total_cost}>"