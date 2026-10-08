"""
LUMEN — Location Model
======================

A location is a sub-area within a building (floor, room, zone, area).
"""

from sqlalchemy import Boolean, Float, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.db.mixins import SoftDeleteMixin, TimestampMixin


class Location(Base, TimestampMixin, SoftDeleteMixin):
    """A specific area within a building."""

    __tablename__ = "locations"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    organization_id: Mapped[int] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    building_id: Mapped[int] = mapped_column(
        ForeignKey("buildings.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Identity
    name: Mapped[str] = mapped_column(String(200), nullable=False, index=True)
    code: Mapped[str | None] = mapped_column(String(50), nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Optional details
    floor: Mapped[str | None] = mapped_column(String(50), nullable=True)
    zone_type: Mapped[str | None] = mapped_column(String(50), nullable=True)  # office, warehouse, etc.
    floor_area_sqm: Mapped[float | None] = mapped_column(Float, nullable=True)

    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    # Relationships
    building: Mapped["Building"] = relationship(  # noqa: F821
        "Building", back_populates="locations", lazy="selectin"
    )

    def __repr__(self) -> str:
        return f"<Location id={self.id} name={self.name!r}>"