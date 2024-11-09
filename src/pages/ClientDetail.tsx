import { useParams, useNavigate } from "react-router-dom";
import { Main } from "../layout/Main";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useGetOpportByClientId } from "../hooks/useGetOpportByClientId";
import { useGetClientById } from "../hooks/useGetClientById";
import { OpportunityType } from "../hooks/useCreateOpportunity";

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id); 
  const navigate = useNavigate();

  const {
    data: client,
    isLoading: isClientLoading,
    isError: isClientError,
  } = useGetClientById(clientId);

  const {
    data: opportunitiesData,
    isLoading: isOpportunitiesLoading,
    isError: isOpportunitiesError,
  } = useGetOpportByClientId(clientId);

  const opportunities = opportunitiesData ?? [];

  const columns: GridColDef[] = [
    { field: "business_name", headerName: "Nombre del Negocio", width: 200 },
    { field: "business_line", headerName: "Línea de Negocio", width: 180 },
    { field: "opportunity_description", headerName: "Descripción", width: 250 },
    { field: "estimated_value", headerName: "Valor Estimado", width: 150 },
    { field: "estimated_date", headerName: "Fecha Estimada", width: 150 },
    { field: "status", headerName: "Estado", width: 120 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log(`Seguimiento de la oportunidad ${params.row.id}`)}
        >
          Seguimiento
        </Button>
      ),
    },
  ];

  if (isClientLoading) return <div>Loading...</div>;
  if (isClientError || !client) return <div>Error fetching client information.</div>;

  return (
    <Main>
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4 gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-bold"
            onClick={() => navigate(-1)}
          >
            ‹ Regresar
          </button>
          <h1 className="text-2xl font-bold mb-4 flex items-center mb-0">
            Información de: {client?.name}
          </h1>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg p-4">
          <tbody>
            <tr>
              <td className="py-3 px-4 font-semibold">NIT:</td>
              <td className="py-3 px-4">{client?.nit}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold">Direccion:</td>
              <td className="py-3 px-4">{client?.direction}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold">Ciudad:</td>
              <td className="py-3 px-4">{client?.city}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold">Pais:</td>
              <td className="py-3 px-4">{client?.country}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold">Email:</td>
              <td className="py-3 px-4">{client?.email}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold">Activo:</td>
              <td className="py-3 px-4">{client?.active ? "Si" : "No"}</td>
            </tr>
          </tbody>
        </table>
        <h1 className="text-2xl font-bold mb-4 mt-4">Oportunidades del cliente</h1>
        {isOpportunitiesLoading ? (
          <div>Loading opportunities...</div>
        ) : isOpportunitiesError ? (
          <div>Error loading opportunities</div>
        ) : (
          <div style={{ height: 400, width: "100%" }} className="mt-4">
            <DataGrid
              columns={columns}
              rows={opportunities as OpportunityType[]}
              getRowId={(row) => row.id}
              className="bg-white shadow-md rounded-lg"
            />
          </div>
        )}
      </div>
    </Main>
  );
};

export default ClientDetail;
