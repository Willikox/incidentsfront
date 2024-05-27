import Link from "next/link";
import { Card } from "primereact/card";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

const HomePage = () => {
  const items = [
    {
      icon: "pi pi-fw pi-plus",
      command: () => (window.location.href = "/incidents"),
    },
    {
      icon: "pi pi-fw pi-pencil",
      command: () => (window.location.href = "/attend-incidents"),
    },
    {
      icon: "pi pi-fw pi-exclamation-circle",
      command: () => (window.location.href = "/pending-incidents"),
    },
    {
      icon: "pi pi-fw pi-check",
      command: () => (window.location.href = "/attended-incidents"),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Menubar model={items} />
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-4">
          <Card title="Ingreso Incidentes" style={{ marginBottom: "2em" }}>
            <p>Registrar nuevos incidentes en el sistema.</p>
            <Link href="/incidents">
              <Button
                label="Link"
                icon="pi pi-plus"
                className="p-button-outlined p-button-info"
              />
            </Link>
          </Card>
        </div>
        <div className="col-12 md:col-6 lg:col-4">
          <Card title="Atención del Incidente" style={{ marginBottom: "2em" }}>
            <p>Gestionar y atender incidentes reportados.</p>
            <Link href="/attend-incidents">
              <Button
                label="Link"
                icon="pi pi-pencil"
                className="p-button-outlined p-button-warning"
              />
            </Link>
          </Card>
        </div>
        <div className="col-12 md:col-6 lg:col-4">
          <Card title="Incidentes Pendientes" style={{ marginBottom: "2em" }}>
            <p>Ver y gestionar incidentes pendientes.</p>
            <Link href="/pending-incidents">
              <Button
                label="Link"
                icon="pi pi-exclamation-circle"
                className="p-button-outlined p-button-danger"
              />
            </Link>
          </Card>
        </div>
        <div className="col-12 md:col-6 lg:col-4">
          <Card title="Incidentes Atendidos" style={{ marginBottom: "2em" }}>
            <p>Consultar incidentes que han sido atendidos.</p>
            <Link href="/attended-incidents">
              <Button
                label="Link"
                icon="pi pi-check"
                className="p-button-outlined p-button-success"
              />
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
