"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReservationSchema, type Reservation } from "../../schemas/fleet";
import { createReservation } from "../../api/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Flag, Car, Info, Map as MapIcon, Loader2, Plus, X } from "lucide-react";

export function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<Reservation>({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      origin: "",
      destinations: [{ destination: "" }],
      passengers: [{ passengerName: "" }],
      passengerCount: 1,
      status: "PENDING"
    }
  });

  const { fields: destinationFields, append: appendDestination, remove: removeDestination } = useFieldArray({
    control,
    name: "destinations"
  });

  const { fields: passengerFields, append: appendPassenger, remove: removePassenger } = useFieldArray({
    control,
    name: "passengers"
  });

  const onSubmit = async (data: Reservation) => {
    setIsSubmitting(true);
    try {
      await createReservation(data);
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="border-0 shadow-sm bg-surface">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-heading-start">Informações Básicas</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-text-muted">Solicitante</Label>
            <Input disabled value="Ricardo Oliveira" className="bg-background text-text-muted" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-text-muted">Data/Hora de Início</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
                  <Input type="datetime-local" className="pl-9 bg-white" {...register("startDatetime")} />
                </div>
              </div>
              {errors.startDatetime && <p className="text-xs text-status-dangerText">{errors.startDatetime.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label className="text-text-muted">Data/Hora de Término</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
                  <Input type="datetime-local" className="pl-9 bg-white" {...register("endDatetime")} />
                </div>
              </div>
              {errors.endDatetime && <p className="text-xs text-status-dangerText">{errors.endDatetime.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-surface">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <MapIcon className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-heading-start">Trajeto e Itinerário</CardTitle>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => appendDestination({ destination: "" })} className="text-primary border-primary hover:bg-primary/10">
            <Plus className="w-4 h-4 mr-1" /> Adicionar Destino
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-text-muted">Origem</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-status-info" />
              <Input placeholder="Sede Administrativa - Bloco A" className="pl-9 bg-white" {...register("origin")} />
            </div>
            {errors.origin && <p className="text-xs text-status-dangerText">{errors.origin.message}</p>}
          </div>

          <div className="space-y-3">
            <Label className="text-text-muted">Destinos</Label>
            {destinationFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <div className="relative flex-1">
                  <Flag className="absolute left-3 top-2.5 h-4 w-4 text-status-dangerText" />
                  <Input 
                    placeholder="Aeroporto Regional" 
                    className="pl-9 bg-white" 
                    {...register(`destinations.${index}.destination`)} 
                  />
                </div>
                {index > 0 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeDestination(index)} className="text-status-dangerText hover:bg-status-dangerBg">
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            {errors.destinations && <p className="text-xs text-status-dangerText">{errors.destinations.message}</p>}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-surface">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-heading-start">Detalhes da Viagem</CardTitle>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => appendPassenger({ passengerName: "" })} className="text-primary border-primary hover:bg-primary/10">
            <Plus className="w-4 h-4 mr-1" /> Adicionar Passageiro
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2 col-span-2">
              <Label className="text-text-muted">Atividade a Realizar</Label>
              <Input placeholder="Ex: Vistoria técnica em obra" className="bg-white" {...register("activity")} />
              {errors.activity && <p className="text-xs text-status-dangerText">{errors.activity.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-text-muted">Nº de Passageiros</Label>
              <Input type="number" className="bg-white" {...register("passengerCount")} />
              {errors.passengerCount && <p className="text-xs text-status-dangerText">{errors.passengerCount.message}</p>}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-text-muted">Nome dos Passageiros</Label>
            {passengerFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Input placeholder="Nome do passageiro..." className="bg-white" {...register(`passengers.${index}.passengerName`)} />
                {index > 0 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => removePassenger(index)} className="text-status-dangerText hover:bg-status-dangerBg">
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label className="text-text-muted">Observações Adicionais</Label>
            <textarea 
              className="flex min-h-[80px] w-full rounded-md border border-border bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-text-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Informações relevantes como carga extra..."
              {...register("observation")}
            ></textarea>
          </div>
        </CardContent>
      </Card>

      <div className="bg-status-warningBg/30 border border-status-warningText/30 rounded-lg p-4 flex gap-3 items-start">
        <AlertCircle className="w-5 h-5 text-status-warningText flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-status-warningText text-sm">Aviso de Protocolo</h4>
          <p className="text-xs text-text-muted mt-1">As reservas devem ser feitas com no mínimo <strong className="text-text-heading">12h de antecedência</strong>.</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button type="button" variant="outline" className="bg-white border-border text-text-heading">Cancelar</Button>
        <Button type="submit" disabled={isSubmitting} className="bg-action-save hover:bg-action-saveHover text-white px-8">
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Confirmar Reserva
        </Button>
      </div>
    </form>
  );
}

function AlertCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}
