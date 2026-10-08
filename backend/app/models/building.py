"""
LUMEN — Building Model
======================

A building belongs to an organization and contains locations.
"""

from sqlalchemy import Boolean, Float, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.db.mixins import SoftDeleteMixin, TimestampMixin


class Building(Base, TimestampMixin, SoftDeleteMixin):
    """A physical building / facility."""

    __tablename__ = "buildings"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    organization_id: Mapped[int] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Identity
    name: Mapped[str] = mapped_column(String(200), nullable=False, index=True)
    code: Mapped[str | None] = mapped_column(String(50), nullable=True, index=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Address
    address: Mapped[str | None] = mapped_column(Text, nullable=True)
    city: Mapped[str | None] = mapped_column(String(100), nullable=True)
    state: Mapped[str | None] = mapped_column(String(100), nullable=True)
    country: Mapped[str | None] = mapped_column(String(100), nullable=True)
    postal_code: Mapped[str | None] = mapped_column(String(20), nullable=True)

    # Physical attributes
    floor_area_sqm: Mapped[float | None] = mapped_column(Float, nullable=True)
    building_type: Mapped[str | None] = mapped_column(String(50), nullable=True)

    # Operations
    timezone: Mapped[str] = mapped_column(String(64), nullable=False, default="UTC")
    operating_hours_start: Mapped[str | None] = mapped_column(String(5), nullable=True)  # "09:00"
    operating_hours_end: Mapped[str | None] = mapped_column(String(5), nullable=True)    # "18:00"

    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    # Relationships
    organization: Mapped["Organization"] = relationship(  # noqa: F821
        "Organization", back_populates="buildings", lazy="selectin"
    )

    locations: Mapped[list["Location"]] = relationship(  # noqa: F821
        "Location",
        back_populates="building",
        cascade="all, delete-orphan",
        lazy="selectin",
    )

    def __repr__(self) -> str:
        return f"<Building id={self.id} name={self.name!r}>"