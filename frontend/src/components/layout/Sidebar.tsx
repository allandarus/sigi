"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  Banknote,
  Car,
  Building2,
  Headset,
  Shapes,
  Settings,
  Plus,
  User,
  LogOut,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Almoxarifado", icon: Package, href: "/almoxarifado" },
  { label: "Diárias", icon: Banknote, href: "/diarias" },
  { label: "Frota", icon: Car, href: "/frota" },
  { label: "Reserva de Espaço", icon: Building2, href: "/reserva-de-espaco" },
  { label: "Suporte", icon: Headset, href: "/suporte" },
  { label: "Ativos", icon: Shapes, href: "/ativos" },
  { label: "Configurações", icon: Settings, href: "/configuracoes" },
];

export function Sidebar({ 
  isCollapsed, 
  setIsCollapsed 
}: { 
  isCollapsed: boolean; 
  setIsCollapsed: (v: boolean) => void; 
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 flex flex-col h-full z-40 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 overflow-hidden">
          {/* Mock Logo using div if image is unavailable, but sticking to next/image */}
          <div className="w-10 h-10 rounded-lg bg-primary/20 shrink-0 flex items-center justify-center text-primary font-bold">
            SG
          </div>
          {!isCollapsed && (
            <div className="whitespace-nowrap transition-opacity duration-300">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 font-heading-start">
                Gestão Interna
              </h1>
              <p className="font-text-muted text-xs text-text-muted">
                Portal Corporativo
              </p>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="shrink-0 p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-all group",
                    pathname.startsWith(item.href) && item.href !== "#"
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-2 border-blue-600"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={20} className="shrink-0" aria-hidden="true" />
                  {!isCollapsed && (
                    <span className="font-heading-start text-sm antialiased whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 mt-auto">
        <ul className="space-y-1">
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title={isCollapsed ? "Perfil" : undefined}
            >
              <User size={20} className="shrink-0" aria-hidden="true" />
              {!isCollapsed && (
                <span className="font-heading-start text-sm antialiased whitespace-nowrap">
                  Perfil
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title={isCollapsed ? "Sair" : undefined}
            >
              <LogOut size={20} className="shrink-0" aria-hidden="true" />
              {!isCollapsed && (
                <span className="font-heading-start text-sm antialiased whitespace-nowrap">
                  Sair
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
