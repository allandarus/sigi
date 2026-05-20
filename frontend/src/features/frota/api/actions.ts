"use server";

import { DashboardMetrics, Reservation, Vehicle, Driver } from "../schemas/fleet";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:8000";

// Headers padrão para testes (Mock de autenticação baseada em roles)
const getHeaders = (role: string = "Gestor de Logistica") => ({
  "Content-Type": "application/json",
  "role": role,
});

// Dashboard
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    const res = await fetch(`${API_URL}/fleet/reservations/metrics`, { 
      headers: getHeaders("Gestor de Logistica"),
      cache: 'no-store'
    });
    if (!res.ok) throw new Error("Failed to fetch dashboard metrics");
    return res.json();
  } catch (error) {
    console.error("Dashboard metrics API error:", error);
    // Fallback minimal just in case
    return {
      totalReservations: 0,
      approvedReservations: 0,
      pendingReservations: 0,
      pendingNext24h: 0,
    };
  }
}

// Drivers
export async function getDrivers(): Promise<Driver[]> {
  try {
    const res = await fetch(`${API_URL}/fleet/drivers`, { 
      headers: getHeaders("Gestor de Logistica"),
      cache: 'no-store'
    });
    if (!res.ok) throw new Error("Failed to fetch drivers");
    return res.json();
  } catch (error) {
    console.error("Drivers API error:", error);
    return [];
  }
}

export async function createDriver(data: Driver): Promise<Driver> {
  const res = await fetch(`${API_URL}/fleet/drivers`, {
    method: "POST",
    headers: getHeaders("Gestor de Logistica"),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create driver");
  return res.json();
}

// Vehicles
export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const res = await fetch(`${API_URL}/fleet/vehicles`, { 
      headers: getHeaders("Gestor de Logistica"),
      cache: 'no-store'
    });
    if (!res.ok) throw new Error("Failed to fetch vehicles");
    return res.json();
  } catch (error) {
    console.error("Vehicles API error:", error);
    return [];
  }
}

export async function createVehicle(data: Vehicle): Promise<Vehicle> {
  const res = await fetch(`${API_URL}/fleet/vehicles`, {
    method: "POST",
    headers: getHeaders("Gestor de Logistica"),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create vehicle");
  return res.json();
}

// Reservations
export async function createReservation(data: Reservation): Promise<Reservation> {
  const res = await fetch(`${API_URL}/fleet/reservations`, {
    method: "POST",
    headers: getHeaders("Trabalhador FESF"), // Requerido para criar
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create reservation");
  return res.json();
}

export async function getReservations(): Promise<Reservation[]> {
  try {
    const res = await fetch(`${API_URL}/fleet/reservations`, { 
      headers: getHeaders("Gestor de Logistica"),
      cache: 'no-store'
    });
    if (!res.ok) throw new Error("Failed to fetch reservations");
    return res.json();
  } catch (error) {
    console.error("Reservations API error:", error);
    return [];
  }
}
