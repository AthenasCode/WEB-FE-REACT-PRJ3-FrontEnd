import { useParams, useNavigate, Link } from "react-router-dom";
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
    {
      field: "business_name",
      headerName: "Business Name",
      width: 220,
      renderCell: (params) => (
        <Link
          to={`/opp/${params.row.id}`}
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          {params.value}
        </Link>
      ),
    },
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
          <h1 className="text-blue-900 text-2xl font-bold mb-4 flex items-center">
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
        <h1 className="text-2xl font-bold mb-4 text-blue-900 mt-4 flex items-center">
          Contactos:
        </h1>
        {client.contacts.length === 0 ? ( // Check if there are no contacts
          <h1 className="text-xl font-bold text-red-500">
            No hay contactos para este cliente.
          </h1> // Display message
        ) : (
          <div className="client-detail grid grid-cols-1 gap-4">
            {client.contacts.map((contact: any, index: number) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex items-center"
              >
                <img
                  src="https://via.placeholder.com/150"
                  alt={`${contact.firstname} ${contact.lastName}`}
                  className="w-32 h-32 object-cover rounded-lg mr-4"
                />
                <div>
                  <h1 className="text-xl font-bold">
                    {contact.firstname} {contact.lastName}
                  </h1>
                  <p className="text-gray-600">
                    Telefono: {contact.phoneNumber}
                  </p>
                  <p className="text-gray-600">E-mail: {contact.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <h1 className="text-blue-900 text-2xl font-bold mt-4 mb-4 flex items-center">
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
                  <Link
                    to={`/opp/${selectedOpportunity.id}`}
                    className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                  >
                    {selectedOpportunity.business_name}
                  </Link>
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
