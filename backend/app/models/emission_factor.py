"""
LUMEN — Emission Factor Model
=============================

Converts energy (kWh) into carbon emissions (kg CO₂).
Factors vary by source (grid, solar, diesel, etc.) and region.
"""

from datetime import date

from sqlalchemy import (
    Boolean,
    Date,
    Float,
    ForeignKey,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.db.mixins import SoftDeleteMixin, TimestampMixin


class EmissionFactor(Base, TimestampMixin, SoftDeleteMixin):
    """Emission factor for converting energy to CO₂."""

    __tablename__ = "emission_factors"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    organization_id: Mapped[int] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Optional — an emission factor can be tied to a specific source
    energy_source_id: Mapped[int | None] = mapped_column(
        ForeignKey("energy_sources.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    # Identity
    name: Mapped[str] = mapped_column(String(200), nullable=False, index=True)
    region: Mapped[str | None] = mapped_column(String(100), nullable=True)

    # Factor — kg CO2 per kWh
    factor_kg_per_kwh: Mapped[float] = mapped_column(Float, nullable=False)

    # Validity
    effective_from: Mapped[date | None] = mapped_column(Date, nullable=True)
    effective_to: Mapped[date | None] = mapped_column(Date, nullable=True)

    # Source metadata
    source: Mapped[str | None] = mapped_column(String(200), nullable=True)  # e.g., "CEA India 2024"
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    def __repr__(self) -> str:
        return f"<EmissionFactor id={self.id} factor={self.factor_kg_per_kwh}>"