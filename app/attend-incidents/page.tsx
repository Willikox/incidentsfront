"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import { ChangeEvent, useState } from "react";
import { Incident } from "../../types/Incident";

interface AttendIncidentParams {
  id: number;
  observation: string;
}

const fetchPendingIncidents = async (): Promise<Incident[]> => {
  const { data } = await api.get<Incident[]>("/incidents/pending");
  return data;
};

const attendIncident = async ({
  id,
  observation,
}: AttendIncidentParams): Promise<Incident> => {
  const { data } = await api.put<Incident>(`/incidents/${id}`, {
    status: "Atendida",
    observation,
  });
  return data;
};

const AttendIncidentPage = () => {
  const queryClient = useQueryClient();
  const [id, setId] = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");
  const [observation, setObservation] = useState<string>("");

  const { data: pendingIncidents } = useQuery({
    queryKey: ["pendingIncidents"],
    queryFn: fetchPendingIncidents,
  });

  const { mutate, status } = useMutation<Incident, Error, AttendIncidentParams>(
    {
      mutationFn: attendIncident,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["incidents"] });
        queryClient.invalidateQueries({ queryKey: ["pendingIncidents"] });
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id && observation) {
      mutate({ id, observation });
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    const selectedIncident = pendingIncidents?.find(
      (incident: { description: string }) =>
        incident.description.toLowerCase() === e.target.value.toLowerCase()
    );
    if (selectedIncident) {
      setId(selectedIncident.id);
    } else {
      setId(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Atender Incidente</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Descripción del Incidente
          </label>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            list="incident-descriptions"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <datalist id="incident-descriptions">
            {pendingIncidents?.map((incident) => (
              <option key={incident.id} value={incident.description} />
            ))}
          </datalist>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Observación
          </label>
          <input
            type="text"
            value={observation}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setObservation(e.target.value)
            }
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Enviar
          </button>
        </div>
      </form>
      {status === "pending" && (
        <p className="text-yellow-500">Atendiendo incidente...</p>
      )}
      {status === "error" && (
        <p className="text-red-500">Error al atender el incidente.</p>
      )}
      {status === "success" && (
        <p className="text-green-500">Incidente atendido satisfactoriamente.</p>
      )}
    </div>
  );
};

export default AttendIncidentPage;
