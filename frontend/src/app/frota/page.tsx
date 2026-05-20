import React from "react";
import Link from "next/link";
import { WorkerDashboard } from "@/features/frota/components/dashboard/WorkerDashboard";
import { ManagerDashboard } from "@/features/frota/components/dashboard/ManagerDashboard";
import { DriverDashboard } from "@/features/frota/components/dashboard/DriverDashboard";

export default async function FrotaDashboardPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const role = typeof searchParams.role === 'string' ? searchParams.role : 'fesf';
  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h2 className="font-heading-start text-heading-start text-text-heading mb-1">
            Gestão de Frota
          </h2>
          <p className="font-text-muted text-text-muted text-outline">
            {role === 'gestor' && "Visão Geral do Gestor de Logística"}
            {role === 'motorista' && "Visão do Motorista"}
            {role === 'fesf' && "Visão do Trabalhador FESF"}
          </p>
        </div>
        
        <div className="flex gap-3">
          <Link
            href="/frota/acompanhamento"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 border border-border bg-background hover:bg-surface text-text-heading shadow-sm"
          >
            Gestão de Agendas
          </Link>
          <Link
            href="/frota/reservas/nova"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-action-save hover:bg-action-saveHover text-white shadow-sm"
          >
            + Nova Reserva
          </Link>
        </div>
      </div>

      {/* Simulador de Perfis (Apenas para Teste Visual) */}
      <div className="mb-8 border-b border-border">
        <nav className="-mb-px flex gap-6" aria-label="Tabs">
          <Link
            href="?role=fesf"
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
              role === 'fesf'
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:border-border hover:text-text-heading"
            }`}
          >
            Trabalhador FESF
          </Link>
          <Link
            href="?role=gestor"
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
              role === 'gestor'
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:border-border hover:text-text-heading"
            }`}
          >
            Gestor de Logística
          </Link>
          <Link
            href="?role=motorista"
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
              role === 'motorista'
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:border-border hover:text-text-heading"
            }`}
          >
            Motorista
          </Link>
        </nav>
      </div>

      {role === 'fesf' && <WorkerDashboard />}
      {role === 'gestor' && <ManagerDashboard />}
      {role === 'motorista' && <DriverDashboard />}
    </>
  );
}
