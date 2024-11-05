import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetClients } from "../hooks/useGetClients";
import { Main } from "../layout/Main";
import { useState, useEffect } from "react";

type ContactType = {
  firstname: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
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

const Home = () => {
  const { data: clientsData } = useGetClients();

  const [clients, setClients] = useState<ClientType[]>(() => {
    const storedClients = localStorage.getItem("clients");
    return storedClients ? JSON.parse(storedClients) : clientsData || [];
  });

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  const toggleActiveStatus = (id: string) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === id ? { ...client, active: !client.active } : client
      )
    );
  };

  const columns: GridColDef[] = [
    { field: "nit", headerName: "Nit", width: 100 },
    { field: "name", headerName: "Name", width: 140 },
    { field: "direction", headerName: "Direction", width: 150 },
    { field: "city", headerName: "City", width: 100 },
    { field: "country", headerName: "Country", width: 100 },
    { field: "email", headerName: "Email", width: 150 },
    { 
      field: "active", 
      headerName: "Active", 
      width: 80,
      renderCell: (params) => (
        <span style={{ color: params.value ? "black" : "red" }}>
          {params.value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      field: "contacts",
      headerName: "Contacts",
      width: 250,
      renderCell: (params) => {
        const contacts: ContactType[] = params.value || [];
        
        if (!contacts.length) {
          return <div>No contacts available</div>;
        }

        return (
          <div>
            {contacts.map((contact: ContactType, index: number) => (
              <div key={index}>
                {contact.firstname} {contact.lastName} - {contact.email}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => {
        const client: ClientType = params.row;

        return (
          <div className="flex gap-2 mt-3">
            <button
              style={{
                height: "30px",
                width: "70px",
                backgroundColor: client.active ? "#6b5b95" : "#a9a9a9", // morado claro o gris
                color: "white",
              }}
              className="text-black rounded flex items-center justify-center"
              disabled={!client.active}
            >
              Editar
            </button>
            <button
              style={{
                height: "30px",
                width: "110px",
                backgroundColor: client.active ? "#ff6f61" : "#88b04b", // naranja o verde
                color: "white",
              }}
              className="text-black rounded flex items-center justify-center"
              onClick={() => toggleActiveStatus(client.id)}
            >
              {client.active ? "Inactivar" : "Activar"}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <Main>
      <div className="inlineblock" style={{ padding: "10px 0" }}>
        <h1 className="text-center text-2xl text-blue-900 font-bold">
          Customer List
        </h1>
        <DataGrid
          columns={columns}
          rows={clients}
          getRowClassName={(params) =>
            params.row.active ? "" : "inactive-row"
          }
          style={{ marginTop: "10px" }}
        />
      </div>
    </Main>
  );
};

export default Home;
