"""
LUMEN — Consumption Category Model
==================================

Categories of energy use: HVAC, Lighting, Production, etc.
"""

from sqlalchemy import Boolean, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.db.mixins import SoftDeleteMixin, TimestampMixin


class ConsumptionCategory(Base, TimestampMixin, SoftDeleteMixin):
    """A category of energy consumption."""

    __tablename__ = "consumption_categories"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    organization_id: Mapped[int] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Identity
    name: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    code: Mapped[str | None] = mapped_column(String(50), nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Optional parent for hierarchy (e.g., "Lighting" under "Office")
    parent_id: Mapped[int | None] = mapped_column(
        ForeignKey("consumption_categories.id", ondelete="SET NULL"),
        nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    def __repr__(self) -> str:
        return f"<ConsumptionCategory id={self.id} name={self.name!r}>"