"""
LUMEN — Energy Record Model
===========================

The core fact table. Every consumption reading lives here.

Supports:
    - Timestamp
    - Energy (kWh)
    - Power (kW)
    - Cost + currency
    - Source + category
    - Optional context (occupancy, production, tariff period)
    - Data quality metadata
"""

from datetime import datetime

from sqlalchemy import (
    DateTime,
    Float,
    ForeignKey,
    Index,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.db.mixins import TimestampMixin


class EnergyRecord(Base, TimestampMixin):
    """A single energy consumption reading."""

    __tablename__ = "energy_records"

    # Composite indexes for common query patterns
    __table_args__ = (
        Index("ix_energy_records_org_ts", "organization_id", "timestamp"),
        Index("ix_energy_records_building_ts", "building_id", "timestamp"),
        Index("ix_energy_records_location_ts", "location_id", "timestamp"),
        Index("ix_energy_records_category_ts", "category_id", "timestamp"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    # Tenant
    organization_id: Mapped[int] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Physical hierarchy (nullable — record can be scoped at any level)
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

    # Categorization
    energy_source_id: Mapped[int | None] = mapped_column(
        ForeignKey("energy_sources.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    category_id: Mapped[int | None] = mapped_column(
        ForeignKey("consumption_categories.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    load_id: Mapped[int | None] = mapped_column(
        ForeignKey("loads.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    # ------------------------------------------------------------
    # Core measurements
    # ------------------------------------------------------------
    timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, index=True
    )

    energy_kwh: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    power_kw: Mapped[float | None] = mapped_column(Float, nullable=True)

    cost: Mapped[float | None] = mapped_column(Float, nullable=True)
    currency: Mapped[str] = mapped_column(String(8), nullable=False, default="INR")

    carbon_emission: Mapped[float | None] = mapped_column(Float, nullable=True)  # kg CO2

    # ------------------------------------------------------------
    # Context — helps baselines and anomaly detection
    # ------------------------------------------------------------
    operating_status: Mapped[str | None] = mapped_column(String(30), nullable=True)  # on/off/idle
    occupancy: Mapped[float | None] = mapped_column(Float, nullable=True)             # 0..1
    production_level: Mapped[float | None] = mapped_column(Float, nullable=True)      # 0..1 or units
    tariff_period: Mapped[str | None] = mapped_column(String(30), nullable=True)      # peak/off-peak

    # ------------------------------------------------------------
    # Data quality / provenance
    # ------------------------------------------------------------
    data_source: Mapped[str] = mapped_column(String(30), nullable=False, default="manual")
    # e.g. csv_upload, xlsx_upload, api, manual, synthetic
    quality_score: Mapped[float | None] = mapped_column(Float, nullable=True)  # 0..100
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    def __repr__(self) -> str:
        return (
            f"<EnergyRecord id={self.id} ts={self.timestamp} "
            f"kwh={self.energy_kwh}>"
        )