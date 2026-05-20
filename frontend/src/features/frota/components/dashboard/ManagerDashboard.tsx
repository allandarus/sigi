import React, { Suspense } from "react";
import { getDashboardMetrics } from "../../api/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, AlertCircle, BarChart3, TrendingUp, Building } from "lucide-react";

async function ManagerStats() {
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
              <p className="text-sm font-medium text-text-muted">Aprovadas</p>
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
              <p className="text-sm font-medium text-text-muted">Aguardando Aprovação</p>
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

function DemandasPorMotorista() {
  const dados = [
    { nome: "João Pereira", carro: "Fiorino", viagens: 28, score: 95 },
    { nome: "André Souza", carro: "Corolla", viagens: 24, score: 90 },
    { nome: "Marcos Lima", carro: "Onix", viagens: 18, score: 85 },
  ];

  return (
    <Card className="border-0 shadow-sm bg-surface h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-text-heading text-lg">
          <BarChart3 className="w-5 h-5 text-primary" /> Demandas por Motorista/Carro
        </CardTitle>
        <CardDescription className="text-text-muted">Volume de viagens realizadas no mês</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dados.map((d, i) => (
            <div key={i} className="flex flex-col gap-2 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-heading text-sm">{d.nome}</p>
                  <p className="text-xs text-text-muted">Veículo: {d.carro}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary text-sm">{d.viagens} viagens</p>
                </div>
              </div>
              {/* Barra de progresso visual simulando volume */}
              <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-primary/60" style={{ width: `${d.score}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DestinosECentrosDeCusto() {
  const destinos = [
    { nome: "Sede Administrativa", count: 45 },
    { nome: "Aeroporto Regional", count: 32 },
    { nome: "Filial Campinas", count: 28 },
  ];

  const centrosDeCusto = [
    { nome: "Logística SP", count: 60, percent: "45%" },
    { nome: "Operações RJ", count: 40, percent: "30%" },
    { nome: "Diretoria", count: 33, percent: "25%" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-grid-gutter h-full">
      <Card className="border-0 shadow-sm bg-surface">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-text-heading text-lg">
            <TrendingUp className="w-5 h-5 text-status-info" /> Destinos Mais Solicitados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {destinos.map((dest, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                <span className="font-medium text-text-heading text-sm">{dest.nome}</span>
                <span className="text-sm font-bold text-status-info">{dest.count} res.</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-surface">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-text-heading text-lg">
            <Building className="w-5 h-5 text-status-warningText" /> Centros de Custo (Top 3)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {centrosDeCusto.map((cc, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                <div>
                  <p className="font-medium text-text-heading text-sm">{cc.nome}</p>
                  <p className="text-xs text-text-muted">{cc.count} reservas</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-status-warningBg text-status-warningText text-xs font-bold">
                    {cc.percent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ManagerDashboard() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<div className="h-[120px] bg-surface rounded-xl animate-pulse" />}>
        <ManagerStats />
      </Suspense>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-grid-gutter">
        <div className="xl:col-span-1">
          <DemandasPorMotorista />
        </div>
        <div className="xl:col-span-2">
          <DestinosECentrosDeCusto />
        </div>
      </div>
    </div>
  );
}
