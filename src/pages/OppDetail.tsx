import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetOpportunityById } from "../hooks/useGetOpportunityById";
import { Main } from "../layout/Main";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetOppFollowups } from "../hooks/useGetOppFollowups";



const OppDetail = () => {
  const { id } = useParams<{ id: string }>();
  const opportunity_id = id ? parseInt(id, 10) : null;

  if (!opportunity_id) {
    return <div>Error: ID de oportunidad inválido</div>;
  }

  const { data: opportunity, isLoading: isOpportunityLoading, isError: isOpportunityError } =
    useGetOpportunityById(opportunity_id || 0);

  const { data: followups, isLoading: isFollowupsLoading, isError: isFollowupsError } =
    useGetOppFollowups(opportunity_id || 0);

  const navigate = useNavigate();

  if (isOpportunityLoading || isFollowupsLoading) return <div>Loading...</div>;
  if (isOpportunityError) return <div>Error fetching opportunity details</div>;
  if (isFollowupsError) return <div>Error fetching followups</div>;

  const columns: GridColDef[] = [
    { field: "opportunity_id", headerName: "Id Oportunidad", width: 120 },
    { field: "contact_date", headerName: "Fecha", width: 150 },
    { field: "contact_type", headerName: "Tipo de Contacto", width: 180 },
    { field: "followup_description", headerName: "Descripción", width: 350 },
    { field: "executive", headerName: "Ejecutivo", width: 150 },
    {
      field: "client_contact",
      headerName: "Contacto del Cliente",
      width: 300,
      renderCell: (params) => {
        const contact = params.value; // Esto ya debe ser un objeto, no un array
        
        if (!contact) {
          return <div>No contacts available</div>; 
        }
    
        return (
          <div>
            {contact.firstname} {contact.lastName} - {contact.email}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: () => (
        <>
          <div className="flex gap-2 mt-3">
            <button 
                style={{
                  height: "30px",
                  width: "110px",
                  color: "white",
                  cursor: "pointer",
                }}
                className="bg-blue-400 rounded flex items-center justify-center transition-all duration-200 hover:opacity-90"
            >
                Actualizar
            </button>
            <button 
                style={{
                  height: "30px",
                  width: "110px",
                  backgroundColor: "#ff6f61",
                  color: "white",
                  cursor: "pointer",
                }}
                className="rounded flex items-center justify-center transition-all duration-200 hover:opacity-90"
            >
                Eliminar
            </button>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      {opportunity && (
        <Main>
          <div className="container mx-auto p-4">
            <div className="flex items-center mb-4 gap-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-bold"
                onClick={() => navigate(-1)}
              >
                ‹ Regresar
              </button>
              <h1 className="text-blue-900 text-2xl font-bold mb-4 flex items-center mb-0">
                Detalles de oportunidad
              </h1>
            </div>
            <table className="min-w-full bg-white shadow-md rounded-lg p-4">
              <tbody>
                <tr>
                  <td className="py-3 px-4 font-semibold">ID:</td>
                  <td className="py-3 px-4">{opportunity.id}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">
                    Nombre de negocio:
                  </td>
                  <td className="py-3 px-4">{opportunity.business_name}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Descripcion:</td>
                  <td className="py-3 px-4">
                    {opportunity.opportunity_description}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Fecha estimada:</td>
                  <td className="py-3 px-4">{opportunity.estimated_date}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Linea de negocio:</td>
                  <td className="py-3 px-4">{opportunity.business_line}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Estado:</td>
                  <td className="py-3 px-4">{opportunity.status}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Valor estimado:</td>
                  <td className="py-3 px-4">{opportunity.estimated_value}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">Cliente:</td>
                  <td className="py-3 px-4">
                    <Link
                      to={"/client/" + opportunity.client_id}
                      className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    >
                      Ver Cliente
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
            <h2 style={{color: "bg-blue-900",
                }} className="text-blue-900 text-2xl font-bold mt-5">Actividades de Seguimiento</h2>
            {followups && followups.length > 0 ? (
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={followups || []} // followups debe ser un array de Followup
                  columns={columns}
                  className="mt-5 p-6 bg-white rounded-lg shadow-md"
                />
              </div>
            ) : (
              <div>No hay actividades de seguimiento para esta oportunidad.</div>
            )}
            
          </div>
        </Main>
      )}
    </>
  );
};

export default OppDetail;
