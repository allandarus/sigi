"use server";

import { DashboardMetrics, Reservation, Vehicle, Driver } from "../schemas/fleet";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:8000/api/v1";

// Dashboard
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    const res = await fetch(`${API_URL}/fleet/dashboard`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch dashboard metrics");
    return res.json();
  } catch (error) {
    console.warn("Using mock data for dashboard metrics", error);
    return {
      totalReservations: 145,
      approvedReservations: 112,
      pendingReservations: 33,
      pendingNext24h: 5,
    };
  }
}

// Drivers
export async function getDrivers(): Promise<Driver[]> {
  try {
    const res = await fetch(`${API_URL}/fleet/drivers`, { next: { tags: ['drivers'] } });
    if (!res.ok) throw new Error("Failed to fetch drivers");
    return res.json();
  } catch (error) {
    console.warn("Using mock data for drivers", error);
    return [
      { id: 1, name: "André Souza", registrationNumber: "445.890", costCenter: "Logística SP" },
      { id: 2, name: "Marcos Lima", registrationNumber: "112.334", costCenter: "Distribuição MG" },
      { id: 3, name: "Renata Carvalho", registrationNumber: "552.122", costCenter: "Operações RJ" },
      { id: 4, name: "Bruno Ferreira", registrationNumber: "887.654", costCenter: "Logística SP" },
    ];
  }
}

export async function createDriver(data: Driver): Promise<Driver> {
  // Try real create
  try {
    const res = await fetch(`${API_URL}/fleet/drivers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create driver");
    return res.json();
  } catch (error) {
    console.warn("Mocking driver creation", error);
    return { ...data, id: Math.floor(Math.random() * 1000) };
  }
}

// Vehicles
export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const res = await fetch(`${API_URL}/fleet/vehicles`, { next: { tags: ['vehicles'] } });
    if (!res.ok) throw new Error("Failed to fetch vehicles");
    return res.json();
  } catch (error) {
    console.warn("Using mock data for vehicles", error);
    return [
      { id: 1, brand: "Toyota", modelName: "Corolla", manufactureYear: 2022, modelYear: 2023, initialMileage: 15000 },
      { id: 2, brand: "Chevrolet", modelName: "Onix", manufactureYear: 2023, modelYear: 2024, initialMileage: 5000 },
    ];
  }
}

export async function createVehicle(data: Vehicle): Promise<Vehicle> {
  try {
    const res = await fetch(`${API_URL}/fleet/vehicles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create vehicle");
    return res.json();
  } catch (error) {
    console.warn("Mocking vehicle creation", error);
    return { ...data, id: Math.floor(Math.random() * 1000) };
  }
}

// Reservations
export async function createReservation(data: Reservation): Promise<Reservation> {
  try {
    const res = await fetch(`${API_URL}/fleet/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create reservation");
    return res.json();
  } catch (error) {
    console.warn("Mocking reservation creation", error);
    return { ...data, id: Math.floor(Math.random() * 1000), status: "PENDING" };
  }
}
