import React, { Suspense } from "react";
import { CadastrosTabs } from "@/features/frota/components/cadastros/CadastrosTabs";
import { getDrivers } from "@/features/frota/api/actions";

async function CadastrosWrapper() {
  const drivers = await getDrivers();
  return <CadastrosTabs drivers={drivers} />;
}

export default function CadastrosPage() {
  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-text-muted mb-2">
            <span>Frota</span>
            <span>/</span>
            <span className="text-primary font-medium">Gestão de Cadastros</span>
          </div>
          <h2 className="font-heading-start text-heading-start text-text-heading mb-1">
            Cadastro de Motoristas e Veículos
          </h2>
        </div>
      </div>

      <Suspense fallback={<div className="h-[400px] w-full bg-surface rounded-xl animate-pulse"></div>}>
        <CadastrosWrapper />
      </Suspense>
    </>
  );
}
