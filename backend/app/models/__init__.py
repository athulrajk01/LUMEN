"""
LUMEN — Models Package
======================

Import every model here so SQLAlchemy's metadata knows about all of them.
"""

from app.models.organization import Organization
from app.models.role import Role
from app.models.user import User, user_roles
from app.models.building import Building
from app.models.location import Location
from app.models.energy_source import EnergySource
from app.models.consumption_category import ConsumptionCategory
from app.models.load import Load
from app.models.energy_record import EnergyRecord
from app.models.tariff import Tariff
from app.models.cost import Cost
from app.models.emission_factor import EmissionFactor

__all__ = [
    "Organization",
    "Role",
    "User",
    "user_roles",
    "Building",
    "Location",
    "EnergySource",
    "ConsumptionCategory",
    "Load",
    "EnergyRecord",
    "Tariff",
    "Cost",
    "EmissionFactor",
]