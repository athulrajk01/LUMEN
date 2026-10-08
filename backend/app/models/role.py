"""
LUMEN — Role Model
==================

Roles for RBAC. Six roles defined in spec §35:
    ADMIN, ENERGY_MANAGER, FACILITY_MANAGER, ANALYST, EXECUTIVE, VIEWER
"""

from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.db.mixins import TimestampMixin


class Role(Base, TimestampMixin):
    """A role assigned to users."""

    __tablename__ = "roles"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(
        String(50), nullable=False, unique=True, index=True
    )
    display_name: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Relationships
    users: Mapped[list["User"]] = relationship(  # noqa: F821
        "User",
        secondary="user_roles",
        back_populates="roles",
        lazy="selectin",
    )

    def __repr__(self) -> str:
        return f"<Role id={self.id} name={self.name!r}>"