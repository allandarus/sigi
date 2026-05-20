import React from "react";
import { UserList } from "@/features/configuracoes/components/usuarios/UserList";

export default function UsuariosConfigPage() {
  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-text-muted mb-2">
            <span>Configurações</span>
            <span>/</span>
            <span className="text-primary font-medium">Usuários e Permissões</span>
          </div>
          <h2 className="font-heading-start text-heading-start text-text-heading mb-1 text-2xl font-semibold">
            Gestão de Usuários
          </h2>
        </div>
      </div>

      <UserList />
    </>
  );
}
