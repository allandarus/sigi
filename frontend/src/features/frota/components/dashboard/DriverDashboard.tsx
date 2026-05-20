import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Car, MapPin, Navigation, Settings2, ShieldCheck, Thermometer } from "lucide-react";

function MeuVeiculo() {
  return (
    <Card className="border-0 shadow-sm bg-surface h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-text-heading text-lg">
          <Car className="w-5 h-5 text-primary" /> Meu Veículo Atribuído
        </CardTitle>
        <CardDescription className="text-text-muted">Detalhes e status do seu carro hoje</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start p-4 rounded-xl border border-border bg-background/50">
          <div className="w-32 h-32 shrink-0 bg-primary/10 rounded-lg flex flex-col items-center justify-center text-primary border border-primary/20">
             <Car className="w-12 h-12 mb-2" />
             <span className="font-bold text-lg">FIAT</span>
          </div>
          <div className="flex-1 w-full space-y-4">
            <div>
              <h3 className="text-xl font-heading-start text-text-heading">Fiat Fiorino (2021)</h3>
              <p className="text-sm font-medium text-text-muted mt-1">Placa: <span className="text-text-heading font-bold bg-surface px-2 py-1 border border-border rounded uppercase">MOT-001</span></p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-sm text-text-heading bg-surface p-2 rounded-lg border border-border">
                <Thermometer className="w-4 h-4 text-status-warningText" />
                <span>Ar Condic. OK</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-heading bg-surface p-2 rounded-lg border border-border">
                <ShieldCheck className="w-4 h-4 text-status-info" />
                <span>Seguro Ativo</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-heading bg-surface p-2 rounded-lg border border-border">
                <Settings2 className="w-4 h-4 text-text-muted" />
                <span>Rev. em 2.500km</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MinhaRota() {
  return (
    <Card className="border-0 shadow-sm bg-surface h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-text-heading text-lg">
          <Navigation className="w-5 h-5 text-status-info" /> Minha Rota de Hoje
        </CardTitle>
        <CardDescription className="text-text-muted">Próximos trechos e destinos atribuídos a si</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-primary/20 bg-primary/5 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-primary text-sm">AGORA (08:30)</span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-primary text-white">EM PROGRESSO</span>
              </div>
              <h4 className="font-heading-start text-text-heading text-base">Coleta - Sede Administrativa</h4>
              <p className="text-sm text-text-muted mt-2">Passageiro: Maria Silva</p>
            </div>
          </div>

          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface bg-background text-text-muted shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-background shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-text-muted text-sm">10:00</span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-surface text-text-muted">A SEGUIR</span>
              </div>
              <h4 className="font-heading-start text-text-heading text-base">Desembarque - Aeroporto</h4>
              <p className="text-sm text-text-muted mt-2">Levar passageira ao portão 2.</p>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}

export function DriverDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-grid-gutter">
        <div>
          <MeuVeiculo />
        </div>
        <div>
          <MinhaRota />
        </div>
      </div>
    </div>
  );
}
