"""
LUMEN — Tariff Model
====================

Electricity pricing structures:
    - Flat rate
    - Time-of-Use (TOU)
    - Peak / off-peak
    - Fixed charges, taxes, and surcharges
"""

from datetime import date

from sqlalchemy import (
    Boolean,
    Date,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.db.mixins import SoftDeleteMixin, TimestampMixin


class Tariff(Base, TimestampMixin, SoftDeleteMixin):
    """An electricity tariff / price plan."""

    __tablename__ = "tariffs"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    organization_id: Mapped[int] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Optionally scoped to a building
    building_id: Mapped[int | None] = mapped_column(
        ForeignKey("buildings.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    # Identity
    name: Mapped[str] = mapped_column(String(200), nullable=False, index=True)
    code: Mapped[str | None] = mapped_column(String(50), nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Type: flat | tou (time-of-use) | tiered | real_time
    tariff_type: Mapped[str] = mapped_column(
        String(20), nullable=False, default="flat", index=True
    )

    currency: Mapped[str] = mapped_column(String(8), nullable=False, default="INR")

    # ------------------------------------------------------------
    # Rates (per kWh)
    # ------------------------------------------------------------
    peak_rate: Mapped[float | None] = mapped_column(Float, nullable=True)
    off_peak_rate: Mapped[float | None] = mapped_column(Float, nullable=True)
    shoulder_rate: Mapped[float | None] = mapped_column(Float, nullable=True)
    flat_rate: Mapped[float | None] = mapped_column(Float, nullable=True)

    # Time windows (24h format strings, e.g. "18:00")
    peak_start: Mapped[str | None] = mapped_column(String(5), nullable=True)
    peak_end: Mapped[str | None] = mapped_column(String(5), nullable=True)
    off_peak_start: Mapped[str | None] = mapped_column(String(5), nullable=True)
    off_peak_end: Mapped[str | None] = mapped_column(String(5), nullable=True)

    # ------------------------------------------------------------
    # Charges & taxes
    # ------------------------------------------------------------
    fixed_charge_per_month: Mapped[float | None] = mapped_column(Float, nullable=True)
    demand_charge_per_kw: Mapped[float | None] = mapped_column(Float, nullable=True)
    tax_percent: Mapped[float | None] = mapped_column(Float, nullable=True)

    # ------------------------------------------------------------
    # Validity window
    # ------------------------------------------------------------
    effective_from: Mapped[date | None] = mapped_column(Date, nullable=True)
    effective_to: Mapped[date | None] = mapped_column(Date, nullable=True)

    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    def __repr__(self) -> str:
        return f"<Tariff id={self.id} name={self.name!r} type={self.tariff_type!r}>"