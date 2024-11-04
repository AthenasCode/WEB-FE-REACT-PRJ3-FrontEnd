import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetClients } from "../hooks/useGetClients";
import { Main } from "../layout/Main";

type ContactType = {
  firstname: string;
  lastName: string;
  email: string;
  phoneNumber: string; // Si necesitas mostrar el número de teléfono también
};

const columns: GridColDef[] = [
  { field: "nit", headerName: "Nit", width: 100 },
  { field: "name", headerName: "Name", width: 140 },
  { field: "direction", headerName: "Direction", width: 150 },
  { field: "city", headerName: "City", width: 100 },
  { field: "country", headerName: "Country", width: 100 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "active", headerName: "Active", width: 80 },
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
    renderCell: (params) => (
      <>
        <div className="flex gap-2 mt-3">
          <button 
              style={{ height: '30px', width: '70px' }} 
              className="bg-blue-400 text-black rounded flex items-center justify-center"
          >
              Actualizar
          </button>
          <button 
              style={{ height: '30px', width: '110px' }} 
              className="bg-red-400 text-black rounded flex items-center justify-center"
          >
              Inactivar/Activar
          </button>
        </div>
      </>
    ),
  },
];

function Home() {
  const { data: clients } = useGetClients();

  return (
    <Main>
      <div className="inlineblock" style={{ padding: '10px 0' }}>
        <h1 className="text-center text-2xl text-blue-900 font-bold">Customer List</h1>
        <DataGrid
          columns={columns}
          rows={clients || []}
          style={{ marginTop: '10px' }}
        />
      </div>
    </Main>
  );
}

export default Home;

