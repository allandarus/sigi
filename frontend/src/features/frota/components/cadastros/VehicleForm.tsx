"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VehicleSchema, type Vehicle, type Driver } from "../../schemas/fleet";
import { createVehicle } from "../../api/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Car, Loader2 } from "lucide-react";

export function VehicleForm({ drivers }: { drivers: Driver[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<Vehicle>({
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      brand: "",
      modelName: "",
      manufactureYear: new Date().getFullYear(),
      modelYear: new Date().getFullYear() + 1,
      initialMileage: 0,
    }
  });

  const onSubmit = async (data: Vehicle) => {
    setIsSubmitting(true);
    try {
      await createVehicle(data);
      reset();
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
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-heading-start">Novo Veículo para Frota</CardTitle>
            <CardDescription>Insira os detalhes técnicos para registro patrimonial.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="brand" className="text-text-muted">Marca</Label>
              <Input 
                id="brand" 
                placeholder="Ex: Volkswagen, Toyota" 
                className={`bg-white border-border placeholder:text-text-placeholder ${errors.brand ? 'border-status-danger' : ''}`}
                {...register("brand")}
              />
              {errors.brand && <p className="text-xs text-status-dangerText">{errors.brand.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelName" className="text-text-muted">Modelo</Label>
              <Input 
                id="modelName" 
                placeholder="Ex: Gol 1.0, Corolla" 
                className={`bg-white border-border placeholder:text-text-placeholder ${errors.modelName ? 'border-status-danger' : ''}`}
                {...register("modelName")}
              />
              {errors.modelName && <p className="text-xs text-status-dangerText">{errors.modelName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="manufactureYear" className="text-text-muted">Ano de Fabricação</Label>
              <Input 
                id="manufactureYear" 
                type="number"
                placeholder="2023" 
                className={`bg-white border-border ${errors.manufactureYear ? 'border-status-danger' : ''}`}
                {...register("manufactureYear")}
              />
              {errors.manufactureYear && <p className="text-xs text-status-dangerText">{errors.manufactureYear.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelYear" className="text-text-muted">Ano do Modelo</Label>
              <Input 
                id="modelYear" 
                type="number"
                placeholder="2024" 
                className={`bg-white border-border ${errors.modelYear ? 'border-status-danger' : ''}`}
                {...register("modelYear")}
              />
              {errors.modelYear && <p className="text-xs text-status-dangerText">{errors.modelYear.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="initialMileage" className="text-text-muted">Quilometragem Inicial (KM)</Label>
              <Input 
                id="initialMileage" 
                type="number"
                placeholder="0" 
                className={`bg-white border-border ${errors.initialMileage ? 'border-status-danger' : ''}`}
                {...register("initialMileage")}
              />
              {errors.initialMileage && <p className="text-xs text-status-dangerText">{errors.initialMileage.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="driverId" className="text-text-muted">Motorista Principal (Opcional)</Label>
              <Select onValueChange={(value) => setValue("driverId", parseInt(value))}>
                <SelectTrigger className={`bg-white border-border ${errors.driverId ? 'border-status-danger' : ''}`}>
                  <SelectValue placeholder="Selecione o motorista responsável..." />
                </SelectTrigger>
                <SelectContent>
                  {drivers.map(driver => (
                    <SelectItem key={driver.id} value={driver.id!.toString()}>{driver.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.driverId && <p className="text-xs text-status-dangerText">{errors.driverId.message}</p>}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => reset()}
              className="bg-border hover:bg-text-muted text-white border-0"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-status-info hover:bg-status-info/90 text-white font-medium min-w-[140px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Salvar Veículo
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function VehicleStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <Card className="border-0 shadow-sm bg-background">
        <CardContent className="p-4 flex flex-col justify-center">
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Último Cadastro</p>
          <p className="font-heading-start text-text-heading text-sm">Hilux 2023 - PRK-0922</p>
        </CardContent>
      </Card>
      
      <Card className="border-0 shadow-sm bg-status-info/10">
        <CardContent className="p-4 flex flex-col justify-center">
          <p className="text-xs font-bold text-status-info uppercase tracking-wider mb-1">Capacidade</p>
          <p className="font-heading-start text-text-heading text-sm">Vagas disponíveis: 08</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-status-warningBg/30">
        <CardContent className="p-4 flex flex-col justify-center">
          <p className="text-xs font-bold text-status-warningText uppercase tracking-wider mb-1 flex items-center gap-2">
             Pendências
          </p>
          <p className="font-heading-start text-text-heading text-sm">03 veículos sem revisões</p>
        </CardContent>
      </Card>
    </div>
  );
}
