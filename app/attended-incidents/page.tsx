"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { Incident } from "../../types/Incident";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const fetchAttendedIncidents = async (): Promise<Incident[]> => {
  const { data } = await api.get<Incident[]>("/incidents/attended");
  return data;
};

const AttendedIncidentsPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["attendedIncidents"],
    queryFn: fetchAttendedIncidents,
  });

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los incidentes atendidos</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Incidentes Atendidos</h1>
      <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
        <Column field="id" header="ID"></Column>
        <Column field="description" header="Descripción"></Column>
        <Column field="observation" header="Observación"></Column>
        <Column
          field="updateAt"
          header="Fecha de Actualización"
          body={(rowData) =>
            new Date(rowData.updateAt).toLocaleString()
          }></Column>
      </DataTable>
    </div>
  );
};

export default AttendedIncidentsPage;
