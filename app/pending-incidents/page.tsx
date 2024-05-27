"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { Incident } from "../../types/Incident";

const fetchPendingIncidents = async () => {
  const { data } = await api.get<Incident[]>("/incidents/pending");
  return data;
};

const PendingIncidentsPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pendingIncidents"],
    queryFn: fetchPendingIncidents,
  });

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error en el fetching de incidentes</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Incidentes Pendientes</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Descripción</th>
            <th className="py-2 px-4 border-b">Estado</th>
            <th className="py-2 px-4 border-b">Fecha de Creación</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((incident) => (
            <tr key={incident.id}>
              <td className="py-2 px-4 border-b">{incident.id}</td>
              <td className="py-2 px-4 border-b">{incident.description}</td>
              <td className="py-2 px-4 border-b">{incident.status}</td>
              <td className="py-2 px-4 border-b">
                {new Date(incident.createdAt || "").toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingIncidentsPage;
