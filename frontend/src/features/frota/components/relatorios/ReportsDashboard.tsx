"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ReportDataResponse, Vehicle, Driver } from "../../schemas/fleet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Calendar, Car, Building, User, Info } from "lucide-react";

export function ReportsDashboard({ 
  initialData, 
  vehicles, 
  drivers 
}: { 
  initialData: ReportDataResponse, 
  vehicles: Vehicle[], 
  drivers: Driver[] 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State for Report Type Selection
  const [activeReport, setActiveReport] = useState<"veiculo" | "custos" | "staff" | "cronos">("veiculo");
  
  // Filter states
  const [startDate, setStartDate] = useState(searchParams.get("start_date") || "");
  const [endDate, setEndDate] = useState(searchParams.get("end_date") || "");
  const [vehicleId, setVehicleId] = useState(searchParams.get("vehicle_id") || "all");
  const [driverId, setDriverId] = useState(searchParams.get("driver_id") || "all");

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (startDate) params.set("start_date", startDate);
    if (endDate) params.set("end_date", endDate);
    if (vehicleId && vehicleId !== "all") params.set("vehicle_id", vehicleId);
    if (driverId && driverId !== "all") params.set("driver_id", driverId);
    
    router.push(`/frota/relatorios?${params.toString()}`);
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setVehicleId("all");
    setDriverId("all");
    router.push(`/frota/relatorios`);
  };

  // Determine which data to show on the chart based on activeReport
  let chartData: { name: string, count: number }[] = [];
  let chartTitle = "";
  
  switch(activeReport) {
    case "veiculo":
      chartData = initialData.byVehicle;
      chartTitle = "Visualização de Dados: Qtd por Veículo";
      break;
    case "custos":
      chartData = initialData.byCostCenter;
      chartTitle = "Visualização de Dados: Qtd por Centro de Custo";
      break;
    case "staff":
      chartData = initialData.byDriver;
      chartTitle = "Visualização de Dados: Qtd por Motorista";
      break;
    case "cronos":
      chartData = initialData.byPeriod;
      chartTitle = "Visualização de Dados: Qtd por Período";
      break;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-grid-gutter items-start">
      {/* Sidebar de Filtros */}
      <Card className="w-full lg:w-72 shrink-0 border-0 shadow-sm bg-surface">
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-lg text-text-heading flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={applyFilters} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-heading">Período de Análise</label>
              <input 
                type="date" 
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-heading placeholder:text-text-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input 
                type="date" 
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-heading placeholder:text-text-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-heading">Veículo</label>
              <select 
                className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm text-text-heading placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
              >
                <option value="all">Todos os Veículos</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id?.toString()}>{v.brand} {v.modelName}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-heading">Motorista</label>
              <select 
                className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm text-text-heading placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
              >
                <option value="all">Todos os Motoristas</option>
                {drivers.map(d => (
                  <option key={d.id} value={d.id?.toString()}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button 
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2 bg-primary hover:bg-primary/90 text-white shadow-sm"
              >
                Aplicar Filtros
              </button>
              <button 
                type="button"
                onClick={clearFilters}
                className="inline-flex w-full items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2 bg-transparent hover:bg-surface text-text-muted"
              >
                Limpar Filtros
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Painel Principal */}
      <div className="flex-1 space-y-6 overflow-hidden">
        
        {/* Top Cards (Tipos de Relatório) */}
        <div className="flex gap-4 overflow-x-auto pb-2 -mb-2 snap-x">
          
          <div className="shrink-0 snap-start">
            <Card className="w-[140px] h-[140px] flex flex-col justify-between border-0 shadow-sm bg-surface">
              <CardContent className="p-4 flex flex-col h-full">
                <div className="mb-auto">
                  <div className="w-10 h-10 rounded-lg bg-border/40 flex items-center justify-center mb-3 text-text-muted">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-text-muted">Total</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-heading leading-tight">Quantidade de Agendas Total</h3>
                  <p className="text-lg font-bold text-text-heading mt-1">{initialData.totalAgendas}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <button onClick={() => setActiveReport("veiculo")} className="shrink-0 snap-start text-left focus:outline-none">
            <Card className={`w-[140px] h-[140px] flex flex-col justify-between shadow-sm transition-all ${activeReport === "veiculo" ? "border-2 border-primary bg-primary/5 ring-4 ring-primary/10" : "border-0 bg-surface hover:bg-surface/80"}`}>
              <CardContent className="p-4 flex flex-col h-full">
                <div className="mb-auto">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${activeReport === "veiculo" ? "bg-primary text-white" : "bg-primary/15 text-primary"}`}>
                    <Car className="w-5 h-5" />
                  </div>
                  <p className={`text-xs font-bold ${activeReport === "veiculo" ? "text-primary" : "text-primary"}`}>Veículo</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-heading leading-tight">Qtd por Veículo</h3>
                </div>
              </CardContent>
            </Card>
          </button>

          <button onClick={() => setActiveReport("custos")} className="shrink-0 snap-start text-left focus:outline-none">
            <Card className={`w-[140px] h-[140px] flex flex-col justify-between shadow-sm transition-all ${activeReport === "custos" ? "border-2 border-primary bg-primary/5 ring-4 ring-primary/10" : "border-0 bg-surface hover:bg-surface/80"}`}>
              <CardContent className="p-4 flex flex-col h-full">
                <div className="mb-auto">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${activeReport === "custos" ? "bg-status-info text-white" : "bg-status-info/15 text-status-info"}`}>
                    <Building className="w-5 h-5" />
                  </div>
                  <p className={`text-xs font-bold ${activeReport === "custos" ? "text-status-info" : "text-status-info"}`}>Custos</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-heading leading-tight">Qtd por Centro de Custo</h3>
                </div>
              </CardContent>
            </Card>
          </button>

          <button onClick={() => setActiveReport("staff")} className="shrink-0 snap-start text-left focus:outline-none">
            <Card className={`w-[140px] h-[140px] flex flex-col justify-between shadow-sm transition-all ${activeReport === "staff" ? "border-2 border-primary bg-primary/5 ring-4 ring-primary/10" : "border-0 bg-surface hover:bg-surface/80"}`}>
              <CardContent className="p-4 flex flex-col h-full">
                <div className="mb-auto">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${activeReport === "staff" ? "bg-status-warningText text-white" : "bg-status-warningBg text-status-warningText"}`}>
                    <User className="w-5 h-5" />
                  </div>
                  <p className={`text-xs font-bold ${activeReport === "staff" ? "text-status-warningText" : "text-status-warningText"}`}>Staff</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-heading leading-tight">Qtd por Motorista</h3>
                </div>
              </CardContent>
            </Card>
          </button>

          <button onClick={() => setActiveReport("cronos")} className="shrink-0 snap-start text-left focus:outline-none">
            <Card className={`w-[140px] h-[140px] flex flex-col justify-between shadow-sm transition-all ${activeReport === "cronos" ? "border-2 border-primary bg-primary/5 ring-4 ring-primary/10" : "border-0 bg-surface hover:bg-surface/80"}`}>
              <CardContent className="p-4 flex flex-col h-full">
                <div className="mb-auto">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${activeReport === "cronos" ? "bg-status-dangerText text-white" : "bg-status-dangerBg text-status-dangerText"}`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <p className={`text-xs font-bold ${activeReport === "cronos" ? "text-status-dangerText" : "text-status-dangerText"}`}>Cronos</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-heading leading-tight">Qtd por Período</h3>
                </div>
              </CardContent>
            </Card>
          </button>
        </div>

        {/* Gráfico */}
        <Card className="border border-border bg-background shadow-sm">
          <CardHeader className="pb-2 border-b border-border">
            <CardTitle className="text-lg font-heading-start text-text-heading">
              {chartTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 h-[300px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBEBEB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8A8A8A' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8A8A8A' }} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #D9D9D9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={60}>
                    {
                      chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#798DDE" />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-text-muted">
                <BarChart className="w-12 h-12 mb-3 opacity-20" />
                <p>Nenhum dado encontrado para o filtro selecionado.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabela de Detalhes */}
        <Card className="border border-border bg-background shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-surface text-text-heading border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">Identificação do Veículo</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">Placa</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">Qtd. Viagens</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">KM Total</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {initialData.tableData.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-surface/50">
                    <td className="px-4 py-3 font-medium text-text-heading">{row.vehicleId}</td>
                    <td className="px-4 py-3 text-text-muted">{row.plate}</td>
                    <td className="px-4 py-3 text-text-muted">{row.tripCount}</td>
                    <td className="px-4 py-3 text-text-muted">{row.kmTotal} km</td>
                    <td className="px-4 py-3">
                      {row.status === "ATIVO" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-status-activeBg text-status-activeText">
                          ATIVO
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-status-warningBg text-status-warningText">
                          {row.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {initialData.tableData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-text-muted">
                      Nenhum veículo encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {initialData.tableData.length > 0 && (
            <div className="p-3 border-t border-border bg-background text-right">
              <a href="#" className="text-sm font-medium text-primary hover:underline flex items-center justify-end gap-1">
                Ver todos os registros 
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          )}
        </Card>

        {/* Info Alert */}
        <div className="bg-[#f0ece3]/50 border border-[#d6d0c4] rounded-lg p-4 flex gap-3">
          <Info className="w-5 h-5 text-[#8c8266] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-[#5c5542]">Dica de Exportação</h4>
            <p className="text-sm text-[#736a53] mt-1">
              Para relatórios com mais de 1.000 registros, recomendamos o uso da exportação em formato CSV para melhor processamento em ferramentas de BI.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
