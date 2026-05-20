import React from "react";
import { ReservationForm } from "@/features/frota/components/reservas/ReservationForm";
import { ReservationSidebar } from "@/features/frota/components/reservas/ReservationSidebar";

export default function NovaReservaPage() {
  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-heading-start text-heading-start text-text-heading mb-1 text-primary text-2xl font-semibold">
            Nova Reserva de Veículo
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ReservationForm />
        </div>
        <div>
          <ReservationSidebar />
        </div>
      </div>
    </>
  );
}
