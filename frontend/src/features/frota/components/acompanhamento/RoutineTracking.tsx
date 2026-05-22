"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, History, Edit2, Filter } from "lucide-react";

function DailyAgenda() {
  const timeSlots = ["08h", "10h", "12h", "14h", "16h"];
  const vehicles: {
    id: string;
    name: string;
    bookings: {
      start: number;
      span: number;
      label: string;
      driver?: string;
      isDone?: boolean;
      isFree?: boolean;
    }[];
  }[] = [
    { id: "v1", name: "ABC-1234 (SUV)", bookings: [{ start: 0, span: 2, label: "Entrega Setor Sul", driver: "João P." }, { start: 3, span: 2, label: "Manutenção Prev." }] },
    { id: "v2", name: "XYZ-5678 (Sedan)", bookings: [{ start: 2, span: 2, label: "Viagem Executiva", driver: "Maria L." }] },
    { id: "v3", name: "KJH-9012 (Van)", bookings: [{ start: 0, span: 2, label: "Transporte Equipe", driver: "Finalizado", isDone: true }, { start: 3, span: 2, label: "Disponível", isFree: true }] },
  ];

  return (
    <Card className="border-0 shadow-sm bg-surface">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-heading-start text-text-heading">Agenda Diária da Frota</CardTitle>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
          <span className="text-sm font-medium">Hoje, 24 de Outubro</span>
          <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Header timeline */}
            <div className="flex border-b border-border pb-2 mb-4">
              <div className="w-48 text-sm text-text-muted font-medium">Veículo</div>
              <div className="flex-1 flex justify-between px-4">
                {timeSlots.map(time => <div key={time} className="text-sm text-text-muted">{time}</div>)}
              </div>
            </div>

            {/* Timeline rows */}
            <div className="space-y-6">
              {vehicles.map(v => (
                <div key={v.id} className="flex relative items-center">
                  <div className="w-48 font-medium text-sm text-text-heading">{v.name}</div>
                  <div className="flex-1 h-12 relative border-l border-r border-border/50 rounded-md bg-background/50">
                    {v.bookings.map((b, i) => (
                      <div 
                        key={i} 
                        className={`absolute top-0 h-full p-2 rounded-md border text-xs flex flex-col justify-center
                          ${b.isDone ? 'bg-status-inactiveBg border-status-inactiveText/20 text-status-inactiveText opacity-60' : 
                            b.isFree ? 'bg-background border-dashed border-border text-text-muted justify-center items-center' : 
                            'bg-primary/10 border-primary/30 text-primary'}`}
                        style={{ left: `${(b.start / 5) * 100}%`, width: `${(b.span / 5) * 100}%`, zIndex: 10 }}
                      >
                        <span className="font-medium truncate">{b.label}</span>
                        {b.driver && <span className="truncate opacity-80 mt-0.5">Motorista: {b.driver}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function HeatmapOccupancy() {
  const bars = [2, 3, 5, 8, 6, 4, 1]; // Mock data
  const max = Math.max(...bars);

  return (
    <Card className="border-0 shadow-sm bg-surface">
      <CardHeader>
        <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Mapa de Calor (Ocupação)</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between h-32 gap-1 mb-4">
          {bars.map((val, i) => (
            <div key={i} className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-colors relative group" style={{ height: `${(val/max)*100}%` }}>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {val} veículos
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-center text-text-muted">Pico de demanda identificado: 10:00 - 14:00</p>
      </CardContent>
    </Card>
  );
}

function FleetStatusCard() {
  return (
    <Card className="border-0 shadow-lg bg-primary text-white overflow-hidden relative">
      <div className="absolute -right-10 -bottom-10 opacity-10">
        <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H5.3a2 2 0 0 0-1.6.8L1 11l-1 4.85a1 1 0 0 0 .84.99H4"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>
      </div>
      <CardHeader>
        <p className="text-xs font-bold text-white/70 uppercase tracking-wider">Status da Frota</p>
      </CardHeader>
      <CardContent>
        <h2 className="text-5xl font-heading-start mb-2">84%</h2>
        <p className="text-sm text-white/90 mb-6">Disponibilidade Operacional</p>
        
        <div className="grid grid-cols-3 gap-2 border-t border-white/20 pt-4">
          <div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-white/70 uppercase">Em Rota</p>
          </div>
          <div>
            <p className="text-2xl font-bold">03</p>
            <p className="text-xs text-white/70 uppercase">Pendente</p>
          </div>
          <div>
            <p className="text-2xl font-bold">02</p>
            <p className="text-xs text-white/70 uppercase">Manutenção</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AllocationTable() {
  const allocations = [
    { id: "#RES-2024-001", vehicle: "Chevrolet Onix - PLQ-9J12", driver: "Carlos Eduardo", status: "Aprovado", period: "08:00 - 12:00" },
    { id: "#RES-2024-002", vehicle: "Toyota Hilux - OXE-2W44", driver: "Ana Júlia", status: "Pendente", period: "13:30 - 17:00" },
    { id: "#RES-2024-003", vehicle: "Fiat Fiorino - JKL-0099", driver: "Marcos Silva", status: "Em Rota", period: "09:00 - 16:00" },
  ];

  return (
    <Card className="border-0 shadow-sm bg-surface">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-heading-start text-text-heading">Alocação de Reservas</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-background border-border">
            <Filter className="w-4 h-4 mr-2" /> Filtrar
          </Button>
          <a href="/frota/reservas/nova" className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-3 bg-action-save hover:bg-action-saveHover text-white">
            + Nova Reserva
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-muted bg-background border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Reserva ID</th>
                <th className="px-4 py-3 font-medium">Veículo / Motorista</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Período</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {allocations.map((a, idx) => (
                <tr key={idx} className="hover:bg-background/50 transition-colors">
                  <td className="px-4 py-4 font-medium text-text-heading">{a.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-md">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H5.3a2 2 0 0 0-1.6.8L1 11l-1 4.85a1 1 0 0 0 .84.99H4"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>
                      </div>
                      <div>
                        <p className="font-medium text-text-heading">{a.vehicle}</p>
                        <p className="text-xs text-text-muted">Motorista: {a.driver}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant="outline" className={
                      a.status === 'Aprovado' ? 'bg-status-activeBg text-status-activeText border-0' :
                      a.status === 'Pendente' ? 'bg-status-warningBg text-status-warningText border-0' :
                      'bg-status-info/20 text-status-info border-0'
                    }>
                      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
                      {a.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-text-muted">{a.period}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="text-text-muted hover:text-primary transition-colors p-1"><Edit2 className="w-4 h-4" /></button>
                      <button className="text-text-muted hover:text-primary transition-colors p-1"><History className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export function RoutineTracking() {
  const [view, setView] = useState<"gestor" | "motorista">("gestor");

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <div className="inline-flex items-center rounded-md border border-border p-1 bg-background">
          <button 
            onClick={() => setView("gestor")}
            className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${view === "gestor" ? "bg-surface shadow-sm text-text-heading" : "text-text-muted hover:text-text-heading"}`}
          >
            Visão Gestão
          </button>
          <button 
            onClick={() => setView("motorista")}
            className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${view === "motorista" ? "bg-surface shadow-sm text-text-heading" : "text-text-muted hover:text-text-heading"}`}
          >
            Visão Motorista
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-grid-gutter">
        <div className="lg:col-span-2 space-y-6">
          <DailyAgenda />
          <AllocationTable />
        </div>
        <div className="space-y-6">
          <FleetStatusCard />
          <HeatmapOccupancy />
        </div>
      </div>
    </div>
  );
}
