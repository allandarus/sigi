from fastapi import APIRouter, Depends, Query
from sqlmodel import Session, select, func
from typing import Optional, List
from datetime import datetime

from app.core.db import get_session
from ..models import Reservation, Vehicle, Driver, ReservationStatus
from ..schemas import ReportDataResponse, ReportDataItem, ReportTableItem

router = APIRouter(tags=["Reports"])

@router.get("/reports", response_model=ReportDataResponse)
async def get_reports(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    vehicle_id: Optional[int] = None,
    driver_id: Optional[int] = None,
    session: Session = Depends(get_session)
):
    # Base query for reservations
    query = select(Reservation).join(Vehicle, isouter=True).join(Driver, Vehicle.driver_id == Driver.id, isouter=True)
    
    if start_date:
        query = query.where(Reservation.start_datetime >= start_date)
    if end_date:
        query = query.where(Reservation.start_datetime <= end_date)
    if vehicle_id:
        query = query.where(Reservation.vehicle_id == vehicle_id)
    if driver_id:
        query = query.where(Vehicle.driver_id == driver_id)
        
    # Execute query
    reservations_result = await session.execute(query)
    reservations = reservations_result.scalars().all()
    
    # 1. Total agendas
    total_agendas = len(reservations)
    
    # Python-level aggregations (Dialect-independent)
    by_vehicle_dict = {}
    by_driver_dict = {}
    by_cost_center_dict = {}
    by_period_dict = {}
    
    for r in reservations:
        # By Vehicle
        if r.vehicle:
            v_name = f"{r.vehicle.brand} {r.vehicle.model_name}"
            by_vehicle_dict[v_name] = by_vehicle_dict.get(v_name, 0) + 1
            
            # By Driver & Cost Center
            if r.vehicle.driver:
                d_name = r.vehicle.driver.name
                cc = r.vehicle.driver.cost_center
                by_driver_dict[d_name] = by_driver_dict.get(d_name, 0) + 1
                by_cost_center_dict[cc] = by_cost_center_dict.get(cc, 0) + 1
        
        # By Period (YYYY-MM)
        period = r.start_datetime.strftime("%Y-%m")
        by_period_dict[period] = by_period_dict.get(period, 0) + 1

    # Formatting lists
    by_vehicle = [ReportDataItem(name=k, count=v) for k, v in by_vehicle_dict.items()]
    by_driver = [ReportDataItem(name=k, count=v) for k, v in by_driver_dict.items()]
    by_cost_center = [ReportDataItem(name=k, count=v) for k, v in by_cost_center_dict.items()]
    by_period = [ReportDataItem(name=k, count=v) for k, v in by_period_dict.items()]
    
    # Sort
    by_vehicle.sort(key=lambda x: x.count, reverse=True)
    by_driver.sort(key=lambda x: x.count, reverse=True)
    by_cost_center.sort(key=lambda x: x.count, reverse=True)
    by_period.sort(key=lambda x: x.name)
    
    # 6. Table Data (All vehicles and their stats)
    # Re-querying vehicles to get all, even those without reservations in the filter
    v_query = select(Vehicle)
    if vehicle_id:
        v_query = v_query.where(Vehicle.id == vehicle_id)
    if driver_id:
        v_query = v_query.where(Vehicle.driver_id == driver_id)
        
    v_result = await session.execute(v_query)
    vehicles = v_result.scalars().all()
    
    table_data = []
    for v in vehicles:
        # Count trips for this specific vehicle in the period
        trip_count = sum(1 for r in reservations if r.vehicle_id == v.id)
        table_data.append(ReportTableItem(
            vehicle_id=f"{v.brand} {v.model_name}",
            plate=f"PL-{v.id:04d}", # Placeholder for plate since it's not in the model
            trip_count=trip_count,
            km_total=v.initial_mileage + (trip_count * 15), # Mock calculation for KM
            status="ATIVO" if trip_count > 0 else "MANUTENÇÃO"
        ))
        
    return ReportDataResponse(
        total_agendas=total_agendas,
        by_vehicle=by_vehicle,
        by_cost_center=by_cost_center,
        by_driver=by_driver,
        by_period=by_period,
        table_data=table_data
    )
