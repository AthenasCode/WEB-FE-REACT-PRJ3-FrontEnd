import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetClients } from "../hooks/useGetClients";
import { Main } from "../layout/Main";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type ContactType = {
  firstname: string;
  lastName: string;
  email: string;
  phoneNumber: string; // Si necesitas mostrar el número de teléfono también
};
type ClientType = {
  id: string;
  nit: string;
  name: string;
  direction: string;
  city: string;
  country: string;
  email: string;
  active: boolean;
  contacts: ContactType[];
};

function Home() {
  const { data: clientsData } = useGetClients();
  const [clients, setClients] = useState<ClientType[]>([]);
  const toggleActiveStatus = (id: string) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === id ? { ...client, active: !client.active } : client
      )
    );
  };
  const columns: GridColDef[] = [
    { field: "nit", headerName: "Nit", width: 100 },
    { field: "name", headerName: "Nombre", width: 140 },
    { field: "direction", headerName: "Direccion", width: 150 },
    { field: "city", headerName: "Ciudad", width: 100 },
    { field: "country", headerName: "Pais", width: 100 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "active", headerName: "Activo", width: 80 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 300,
      renderCell: (params) => {
        const client: ClientType = params.row;

        return (
          <div className="flex gap-2 mt-3">
            <button
              style={{
                height: "30px",
                width: "70px",
                backgroundColor: client.active ? "#6b5b95" : "#a9a9a9",
                color: "white",
                cursor: client.active ? "pointer" : "not-allowed",
                opacity: client.active ? 1 : 0.6,
              }}
              className="rounded flex items-center justify-center transition-all duration-200"
              disabled={!client.active}
              onClick={() => {
                /* Add edit functionality here */
              }}
            >
              Editar
            </button>
            <Link
              to={`/client/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <button
                style={{ height: "30px", width: "70px", color: "white" }}
                className="bg-blue-400 rounded flex items-center justify-center"
              >
                Ver Info
              </button>
            </Link>
            <button
              style={{
                height: "30px",
                width: "110px",
                backgroundColor: client.active ? "#ff6f61" : "#88b04b",
                color: "white",
                cursor: "pointer",
              }}
              className="rounded flex items-center justify-center transition-all duration-200 hover:opacity-90"
              onClick={() => toggleActiveStatus(client.id)}
            >
              {client.active ? "Desactivar" : "Activar"}
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    // First, check if we have new data from the query
    if (clientsData) {
      setClients(clientsData);
      localStorage.setItem("clients", JSON.stringify(clientsData));
    } else {
      // If no query data, try to load from localStorage
      const storedClients = localStorage.getItem("clients");
      if (storedClients) {
        setClients(JSON.parse(storedClients));
      }
    }
  }, [clientsData]);

  return (
    <Main>
      <div className="inlineblock" style={{ padding: "10px 0" }}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-center text-2xl text-blue-900 font-bold">
            Lista de clientes
          </h1>
        </div>
        <DataGrid
          columns={columns}
          rows={clients || []}
          getRowClassName={(params) =>
            params.row.active ? "" : "inactive-row"
          }
          style={{ marginTop: "10px" }}
        />
      </div>
    </Main>
  );
}

export default Home;
