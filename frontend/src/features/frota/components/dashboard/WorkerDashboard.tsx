import React, { Suspense } from "react";
import { getDashboardMetrics } from "../../api/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, MapPin, AlertCircle } from "lucide-react";

async function WorkerStats() {
  const metrics = await getDashboardMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-grid-gutter mb-8">
      <Card className="border-0 shadow-sm bg-surface">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/15 rounded-xl">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-text-muted">Total Solicitado</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-heading-start text-text-heading">{metrics.totalReservations}</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-surface">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-status-info/15 rounded-xl">
                <CheckCircle className="w-5 h-5 text-status-info" />
              </div>
              <p className="text-sm font-medium text-text-muted">Reservas Aprovadas</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-heading-start text-text-heading">{metrics.approvedReservations}</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-surface">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-status-warningBg rounded-xl">
                <Clock className="w-5 h-5 text-status-warningText" />
              </div>
              <p className="text-sm font-medium text-text-muted">Aguardando</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-heading-start text-text-heading">{metrics.pendingReservations}</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-status-danger bg-status-dangerBg/10 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-status-dangerBg rounded-xl">
                <AlertCircle className="w-5 h-5 text-status-dangerText" />
              </div>
              <p className="text-sm font-medium text-status-dangerText">Críticas (&lt;24h)</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-heading-start text-status-dangerText">{metrics.pendingNext24h}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CurrentAgenda() {
  // Mock for current agenda
  return (
    <Card className="border-0 shadow-sm bg-surface h-full">
      <CardHeader>
        <CardTitle className="text-text-heading text-lg">Agenda Atual</CardTitle>
        <CardDescription className="text-text-muted">Próximas viagens confirmadas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4 items-start p-4 border border-border rounded-lg bg-background">
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-primary">HOJE</span>
              <span className="text-xl font-heading-start text-text-heading">14:00</span>
            </div>
            <div className="w-px h-12 bg-border mx-2"></div>
            <div className="flex-1">
              <h4 className="font-medium text-text-heading">Reunião na Sede Administrativa</h4>
              <div className="flex items-center gap-2 mt-2 text-sm text-text-muted">
                <MapPin className="w-4 h-4" />
                <span>Aeroporto Regional</span>
                <span className="mx-1">→</span>
                <span>Sede Admin</span>
              </div>
            </div>
            <div className="text-right text-sm">
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-status-activeBg text-status-activeText text-xs font-medium">
                Confirmado
              </span>
              <p className="mt-1 text-text-muted">Motorista: João P.</p>
              <p className="text-text-muted">Veículo: Hilux (DEF-5678)</p>
            </div>
          </div>
          <div className="text-center p-4 text-text-muted text-sm bg-background/50 rounded-lg border border-dashed border-border">
            Não há mais agendas para hoje.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TopDestinations() {
  const destinations = [
    { name: "Sede Administrativa", count: 12, type: "Interno" },
    { name: "Aeroporto Regional", count: 5, type: "Externo" },
    { name: "Canteiro de Obras A", count: 3, type: "Obra" },
  ];

  return (
    <Card className="border-0 shadow-sm bg-surface h-full">
      <CardHeader>
        <CardTitle className="text-text-heading text-lg">Destinos Mais Solicitados</CardTitle>
        <CardDescription className="text-text-muted">Seus destinos frequentes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {destinations.map((dest, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-background rounded-lg border border-border">
                  <MapPin className="w-4 h-4 text-text-muted" />
                </div>
                <div>
                  <p className="font-medium text-text-heading text-sm">{dest.name}</p>
                  <p className="text-xs text-text-muted">{dest.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-primary text-sm">{dest.count} viagens</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function WorkerDashboard() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<div className="h-[120px] bg-surface rounded-xl animate-pulse" />}>
        <WorkerStats />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-grid-gutter">
        <div className="lg:col-span-2">
          <CurrentAgenda />
        </div>
        <div>
          <TopDestinations />
        </div>
      </div>
    </div>
  );
}
