import React from "react";
import Link from "next/link";
import { getReportsData, getVehicles, getDrivers } from "@/features/frota/api/actions";
import { ReportsDashboard } from "@/features/frota/components/relatorios/ReportsDashboard";
import { FileText, Download } from "lucide-react";

export default async function RelatoriosPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  
  const filters = {
    startDate: typeof searchParams.start_date === 'string' ? searchParams.start_date : undefined,
    endDate: typeof searchParams.end_date === 'string' ? searchParams.end_date : undefined,
    vehicleId: typeof searchParams.vehicle_id === 'string' ? parseInt(searchParams.vehicle_id) : undefined,
    driverId: typeof searchParams.driver_id === 'string' ? parseInt(searchParams.driver_id) : undefined,
  };

  const [reportData, vehicles, drivers] = await Promise.all([
    getReportsData(filters),
    getVehicles(),
    getDrivers()
  ]);

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-text-muted mb-2">
            <Link href="/frota" className="hover:text-primary transition-colors">Frota</Link>
            <span>/</span>
            <span className="text-primary font-medium">Relatórios</span>
          </div>
          <h2 className="font-heading-start text-heading-start text-text-heading mb-1">
            Relatórios de Frota
          </h2>
          <p className="font-text-muted text-text-muted text-outline">
            Analise métricas de desempenho e utilização da frota corporativa.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 border border-border bg-background hover:bg-surface text-text-heading shadow-sm"
          >
            <FileText className="w-4 h-4" />
            Exportar CSV
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-action-save hover:bg-action-saveHover text-white shadow-sm"
          >
            <Download className="w-4 h-4" />
            Exportar PDF
          </button>
        </div>
      </div>

      <ReportsDashboard initialData={reportData} vehicles={vehicles} drivers={drivers} />
    </>
  );
}
