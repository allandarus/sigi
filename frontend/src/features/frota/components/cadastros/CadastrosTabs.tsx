"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DriverForm, DriverList } from "./DriverForm";
import { VehicleForm, VehicleStats } from "./VehicleForm";
import type { Driver } from "../../schemas/fleet";

export function CadastrosTabs({ drivers }: { drivers: Driver[] }) {
  return (
    <Tabs defaultValue="motoristas" className="w-full">
      <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none p-0 h-auto space-x-6 mb-6">
        <TabsTrigger 
          value="motoristas" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary px-0 py-3 text-text-muted text-base"
        >
          <span className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Motoristas
          </span>
        </TabsTrigger>
        <TabsTrigger 
          value="veiculos" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary px-0 py-3 text-text-muted text-base"
        >
          <span className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H5.3a2 2 0 0 0-1.6.8L1 11l-1 4.85a1 1 0 0 0 .84.99H4"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>
            Veículos
          </span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="motoristas" className="mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-grid-gutter">
          <DriverForm />
          <DriverList initialDrivers={drivers} />
        </div>
      </TabsContent>
      
      <TabsContent value="veiculos" className="mt-0">
        <div className="max-w-4xl mx-auto">
          <VehicleForm drivers={drivers} />
          <VehicleStats />
        </div>
      </TabsContent>
    </Tabs>
  );
}
