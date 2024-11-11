import { useParams, useNavigate } from "react-router-dom";
import { Main } from "../layout/Main";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useGetOpportByClientId } from "../hooks/useGetOpportByClientId";
import { useGetClientById } from "../hooks/useGetClientById";
import { OpportunityType } from "../hooks/useCreateOpportunity";
import { useState } from "react";
import OpportunityFollowupsTable from "../components/OpportunityFollowupsTable";

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any | null>(
    null
  );

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

  const handleModalOpen = (info: any) => {
    setSelectedOpportunity(info);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
    setSelectedOpportunity(null);
  };

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
          onClick={() => handleModalOpen(params.row)}
        >
          Seguimiento
        </Button>
      ),
    },
  ];

  if (isClientLoading) return <div>Loading...</div>;
  if (isClientError || !client)
    return <div>Error fetching client information.</div>;

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
        <h1 className="text-2xl font-bold mb-4 mt-4">
          Oportunidades del cliente
        </h1>
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
        <Modal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 900,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            {selectedOpportunity && (
              <>
                <Typography
                  id="modal-title"
                  variant="h6"
                  component="h2"
                  gutterBottom
                >
                  Detalles de la Oportunidad:{" "}
                  {selectedOpportunity.business_name}
                </Typography>
                <OpportunityFollowupsTable
                  opportunity_id={selectedOpportunity.id}
                ></OpportunityFollowupsTable>
              </>
            )}
            <Button
              onClick={handleModalClose}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Cerrar
            </Button>
          </Box>
        </Modal>
      </div>
    </Main>
  );
};

export default ClientDetail;
