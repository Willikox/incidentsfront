"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import { Incident } from "../../types/Incident";
import { ChangeEvent, FormEvent, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";

const createIncident = async (
  incident: Pick<Incident, "description">
): Promise<Incident> => {
  const { data } = await api.post<Incident>("/incidents", {
    ...incident,
    status: "Pendiente",
  });
  return data;
};

const CreateIncidentPage = () => {
  const queryClient = useQueryClient();
  const [description, setDescription] = useState<string>("");

  const { mutate, status } = useMutation<
    Incident,
    Error,
    Pick<Incident, "description">
  >({
    mutationFn: createIncident,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      setDescription("");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ description });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Creación de Incidente</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2">
            Descripción del Incidente
          </label>
          <div className="flex flex-column gap-2">
            <InputText
              id="description"
              value={description}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
              aria-describedby="description-help"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button
            label="Guardar"
            icon="pi pi-check"
            className="p-button-success"
            type="submit"
          />
        </div>
      </form>
      {status === "pending" && (
        <Message severity="info" text="Creando incidente..." />
      )}
      {status === "error" && (
        <Message severity="error" text="Error al crear el incidente." />
      )}
      {status === "success" && (
        <Message
          severity="success"
          text="Incidente creado satisfactoriamente."
        />
      )}
    </div>
  );
};

export default CreateIncidentPage;
