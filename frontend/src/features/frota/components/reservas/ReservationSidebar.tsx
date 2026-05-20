import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

function VisualMapPrototype() {
  return (
    <div className="relative w-full h-48 bg-slate-900 rounded-lg overflow-hidden border border-border">
      {/* Fake Map Background */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-slate-700" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <path d="M 50 150 Q 150 50, 250 100 T 400 120" fill="none" stroke="#59BCD6" strokeWidth="3" strokeDasharray="5,5" />
      </svg>
      
      {/* Map Points */}
      <div className="absolute left-[50px] top-[140px] w-4 h-4 bg-status-info rounded-full border-2 border-white shadow-lg"></div>
      <div className="absolute left-[250px] top-[95px] w-3 h-3 bg-status-warningText rounded-full border-2 border-white shadow-lg"></div>
      <div className="absolute left-[400px] top-[115px] w-4 h-4 bg-status-dangerText rounded-full border-2 border-white shadow-lg"></div>

      <div className="absolute bottom-3 left-3 right-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-md p-2 flex items-center justify-between">
        <span className="text-white text-xs font-medium flex items-center gap-1">
          <Info className="w-3 h-3" /> Rota Sugerida: 12.4km
        </span>
      </div>
    </div>
  );
}

export function ReservationSidebar() {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm bg-primary text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-heading-start text-white">Agenda de Veículos</CardTitle>
          <div className="flex gap-1">
            <button className="p-1 hover:bg-white/20 rounded-md transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <button className="p-1 hover:bg-white/20 rounded-md transition-colors"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Quinta, 24 de Outubro</span>
            <span className="text-xs text-white/70">5 Reservas Ativas</span>
          </div>
          
          <div className="relative pl-4 border-l-2 border-white/20 space-y-4">
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-white rounded-full"></div>
              <div className="text-xs text-white/70 mb-1">08:00</div>
              <div className="bg-white text-text-heading rounded-md p-2 shadow-sm">
                <p className="font-medium text-sm">Logística Central</p>
                <p className="text-xs text-text-muted">Corolla - Placa ABC-1234</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-white rounded-full"></div>
              <div className="text-xs text-white/70 mb-1">10:30</div>
              <div className="bg-white text-text-heading rounded-md p-2 shadow-sm">
                <p className="font-medium text-sm">Vistoria Financeira</p>
                <p className="text-xs text-text-muted">Hilux - Placa DEF-5678</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-white/40 rounded-full"></div>
              <div className="text-xs text-white/70 mb-1">14:00</div>
              <div className="bg-white/10 border border-white/20 text-white rounded-md p-2 border-dashed">
                <p className="font-medium text-sm text-center opacity-70">Livre para Reserva</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-status-warningText/30 bg-status-warningBg/20 shadow-sm">
        <CardContent className="p-4 flex gap-3">
          <Info className="w-5 h-5 text-status-warningText flex-shrink-0" />
          <div>
            <h4 className="font-medium text-status-warningText text-sm mb-1">DICA DE DISPONIBILIDADE</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              O período da tarde possui 60% mais veículos livres para agendamento.
            </p>
          </div>
        </CardContent>
      </Card>

      <VisualMapPrototype />
    </div>
  );
}
