"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit2, ShieldAlert } from "lucide-react";

export function UserList() {
  const users = [
    { id: 1, name: "Ricardo Silva", cargo: "Gestor de Frota", lotacao: "Unidade Central", centroCusto: "Logística SP", contato: "(11) 99999-9999" },
    { id: 2, name: "Ana Beatriz", cargo: "Motorista", lotacao: "Distribuição", centroCusto: "Operações RJ", contato: "(21) 98888-8888" },
    { id: 3, name: "João Pedro", cargo: "Motorista", lotacao: "Transporte Executivo", centroCusto: "Logística SP", contato: "(11) 97777-7777" },
  ];

  return (
    <Card className="border-0 shadow-sm bg-surface">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-heading-start text-text-heading">Usuários do Sistema</CardTitle>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
            <Input placeholder="Buscar usuários..." className="pl-9 h-9 w-64 bg-background" />
          </div>
          <Button size="sm" className="bg-action-save hover:bg-action-saveHover text-white">
            <Plus className="w-4 h-4 mr-1" /> Novo Usuário
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-muted bg-background border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">Cargo / Lotação</th>
                <th className="px-4 py-3 font-medium">Centro de Custo</th>
                <th className="px-4 py-3 font-medium">Contato</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-background/50 transition-colors">
                  <td className="px-4 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {user.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-medium text-text-heading">{user.name}</span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-text-heading">{user.cargo}</p>
                    <p className="text-xs text-text-muted">{user.lotacao}</p>
                  </td>
                  <td className="px-4 py-4 text-text-muted">{user.centroCusto}</td>
                  <td className="px-4 py-4 text-text-muted">{user.contato}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="text-text-muted hover:text-primary transition-colors p-1"><ShieldAlert className="w-4 h-4" /></button>
                      <button className="text-text-muted hover:text-primary transition-colors p-1"><Edit2 className="w-4 h-4" /></button>
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
