from fastapi import APIRouter
from .endpoints import drivers, vehicles, reservations, reports

fleet_router = APIRouter(prefix="/fleet")

fleet_router.include_router(drivers.router)
fleet_router.include_router(vehicles.router)
fleet_router.include_router(reservations.router)
fleet_router.include_router(reports.router)
