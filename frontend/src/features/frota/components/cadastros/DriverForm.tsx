"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DriverSchema, type Driver } from "../../schemas/fleet";
import { createDriver, getDrivers } from "../../api/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Loader2 } from "lucide-react";

export function DriverForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<Driver>({
    resolver: zodResolver(DriverSchema),
    defaultValues: {
      name: "",
      registrationNumber: "",
      costCenter: "",
    }
  });

  const onSubmit = async (data: Driver) => {
    setIsSubmitting(true);
    try {
      await createDriver(data);
      reset();
      // Em um app real, faríamos router.refresh() ou atualizaríamos o cache SWR/React Query.
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-0 shadow-sm bg-surface">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <CardTitle className="text-lg font-heading-start">Novo Motorista</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-text-muted">Nome Completo</Label>
            <Input 
              id="name" 
              placeholder="Ex: João da Silva Santos" 
              className={`bg-white border-border placeholder:text-text-placeholder ${errors.name ? 'border-status-danger' : ''}`}
              {...register("name")}
            />
            {errors.name && <p className="text-xs text-status-dangerText">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registrationNumber" className="text-text-muted">Matrícula</Label>
              <Input 
                id="registrationNumber" 
                placeholder="000.000" 
                className={`bg-white border-border placeholder:text-text-placeholder ${errors.registrationNumber ? 'border-status-danger' : ''}`}
                {...register("registrationNumber")}
              />
              {errors.registrationNumber && <p className="text-xs text-status-dangerText">{errors.registrationNumber.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="costCenter" className="text-text-muted">Centro de Custo</Label>
              <Select onValueChange={(value) => setValue("costCenter", value)}>
                <SelectTrigger className={`bg-white border-border ${errors.costCenter ? 'border-status-danger' : ''}`}>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Logística SP">Logística SP</SelectItem>
                  <SelectItem value="Distribuição MG">Distribuição MG</SelectItem>
                  <SelectItem value="Operações RJ">Operações RJ</SelectItem>
                </SelectContent>
              </Select>
              {errors.costCenter && <p className="text-xs text-status-dangerText">{errors.costCenter.message}</p>}
            </div>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-status-info hover:bg-status-info/90 text-white font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Salvar Motorista
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function DriverList({ initialDrivers }: { initialDrivers: Driver[] }) {
  // Num app real, usaríamos um hook para re-fetch (como SWR)
  const drivers = initialDrivers;

  return (
    <Card className="border-0 shadow-sm bg-surface">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-heading-start text-text-heading">Motoristas Cadastrados</CardTitle>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/15 text-primary">
          {drivers.length} Ativos
        </span>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-muted bg-background border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Motorista</th>
                <th className="px-4 py-3 font-medium">Matrícula</th>
                <th className="px-4 py-3 font-medium">Centro de Custo</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-background/50 transition-colors">
                  <td className="px-4 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {driver.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-medium text-text-heading">{driver.name}</span>
                  </td>
                  <td className="px-4 py-4 text-text-muted">{driver.registrationNumber}</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-background border border-border rounded-md text-xs text-text-muted">
                      {driver.costCenter}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button className="text-text-muted hover:text-primary transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
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
