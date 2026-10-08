"""
LUMEN — Energy Source Model
===========================

Types of energy consumed (Grid, Solar, Diesel, Natural Gas, etc.)
"""

from sqlalchemy import Boolean, Float, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.db.mixins import SoftDeleteMixin, TimestampMixin


class EnergySource(Base, TimestampMixin, SoftDeleteMixin):
    """A source of energy (grid electricity, solar, etc.)."""

    __tablename__ = "energy_sources"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    organization_id: Mapped[int] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Identity
    name: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    code: Mapped[str | None] = mapped_column(String(50), nullable=True, unique=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Category — grid, solar, wind, diesel, gas, etc.
    source_type: Mapped[str] = mapped_column(String(50), nullable=False, default="grid")

    # Unit (usually kWh)
    unit: Mapped[str] = mapped_column(String(20), nullable=False, default="kWh")

    # Emission factor (kg CO2 per kWh) — renewable sources have 0
    default_emission_factor: Mapped[float | None] = mapped_column(Float, nullable=True)

    # Cost default (per kWh) — useful when cost isn't provided in the record
    default_cost_per_unit: Mapped[float | None] = mapped_column(Float, nullable=True)

    is_renewable: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    def __repr__(self) -> str:
        return f"<EnergySource id={self.id} name={self.name!r} type={self.source_type!r}>"