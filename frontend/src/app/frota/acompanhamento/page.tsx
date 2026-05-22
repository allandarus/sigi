import React from "react";
import Link from "next/link";
import { RoutineTracking } from "@/features/frota/components/acompanhamento/RoutineTracking";

export default function AcompanhamentoPage() {
  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-text-muted mb-2">
            <Link href="/frota" className="hover:text-primary transition-colors">Frota</Link>
            <span>/</span>
            <span className="text-primary font-medium">Acompanhamento de Rotinas</span>
          </div>
          <h2 className="font-heading-start text-heading-start text-text-heading mb-1 text-2xl font-semibold">
            Acompanhamento de Rotinas
          </h2>
        </div>
      </div>

      <RoutineTracking />
    </>
  );
}
