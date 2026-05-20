import { z } from "zod";

export const ReservationStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED", "COMPLETED"]);

export const DriverSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  registrationNumber: z.string().min(1, "Matrícula é obrigatória"),
  costCenter: z.string().min(1, "Centro de Custo é obrigatório"),
  userId: z.number().nullable().optional(),
});

export const VehicleSchema = z.object({
  id: z.number().optional(),
  brand: z.string().min(1, "Marca é obrigatória"),
  modelName: z.string().min(1, "Modelo é obrigatório"),
  manufactureYear: z.coerce.number().int().min(1900, "Ano inválido"),
  modelYear: z.coerce.number().int().min(1900, "Ano inválido"),
  initialMileage: z.coerce.number().int().min(0, "Quilometragem inválida"),
  driverId: z.number().nullable().optional(),
});

export const ReservationDestinationSchema = z.object({
  destination: z.string().min(1, "Destino é obrigatório"),
});

export const ReservationPassengerSchema = z.object({
  passengerName: z.string().min(1, "Nome do passageiro é obrigatório"),
});

export const ReservationSchema = z.object({
  id: z.number().optional(),
  requesterId: z.number().optional(),
  startDatetime: z.string().datetime(),
  endDatetime: z.string().datetime(),
  origin: z.string().min(1, "Origem é obrigatória"),
  destinations: z.array(ReservationDestinationSchema).min(1, "Pelo menos um destino é obrigatório"),
  activity: z.string().min(1, "Atividade é obrigatória"),
  passengerCount: z.coerce.number().int().min(1, "Mínimo de 1 passageiro"),
  passengers: z.array(ReservationPassengerSchema),
  observation: z.string().optional(),
  status: ReservationStatusSchema.optional().default("PENDING"),
  vehicleId: z.number().nullable().optional(),
});

export const DashboardMetricsSchema = z.object({
  totalReservations: z.number(),
  approvedReservations: z.number(),
  pendingReservations: z.number(),
  pendingNext24h: z.number(),
});

export interface ReportDataItem {
  name: string;
  count: number;
}

export interface ReportTableItem {
  vehicleId: string;
  plate: string;
  tripCount: number;
  kmTotal: number;
  status: string;
}

export interface ReportDataResponse {
  totalAgendas: number;
  byVehicle: ReportDataItem[];
  byCostCenter: ReportDataItem[];
  byDriver: ReportDataItem[];
  byPeriod: ReportDataItem[];
  tableData: ReportTableItem[];
}

export type Driver = z.infer<typeof DriverSchema>;
export type Vehicle = z.infer<typeof VehicleSchema>;
export type Reservation = z.infer<typeof ReservationSchema>;
export type DashboardMetrics = z.infer<typeof DashboardMetricsSchema>;
export type ReservationStatus = z.infer<typeof ReservationStatusSchema>;
