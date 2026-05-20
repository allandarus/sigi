import React from "react";
import { WorkerDashboard } from "@/features/frota/components/dashboard/WorkerDashboard";

export default function FrotaDashboardPage() {
  return (
    <>
      {/* Page Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-heading-start text-heading-start text-text-heading mb-1">
            Gestão de Frota
          </h2>
          <p className="font-text-muted text-text-muted text-outline">
            Visão Geral do Trabalhador FESF
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="/frota/reservas/nova"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-action-save hover:bg-action-saveHover text-white shadow-sm"
          >
            + Nova Reserva
          </a>
        </div>
      </div>

      <WorkerDashboard />
    </>
  );
}
