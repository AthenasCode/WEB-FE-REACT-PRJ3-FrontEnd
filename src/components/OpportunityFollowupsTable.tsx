import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetOppFollowups } from "../hooks/useGetOppFollowups";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

type OpportunityFollowupsTableProps = {
  opportunity_id: number;
};

const OpportunityFollowupsTable: React.FC<OpportunityFollowupsTableProps> = ({
  opportunity_id,
}) => {
  const {
    data: followups,
    isLoading,
    isError,
  } = useGetOppFollowups(opportunity_id);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const handleModalOpen = (client: any) => {
    setSelectedClient(client);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
    setSelectedClient(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching followups</div>;

  const columns: GridColDef[] = [
    { field: "contact_type", headerName: "Tipo de Contacto", width: 150 },
    { field: "contact_date", headerName: "Fecha de Contacto", width: 150 },
    {
      field: "client_contact",
      headerName: "Identificacion del cliente",
      width: 200,
      renderCell: (params: any) => {
        const client = params.row.client_contact;
        return (
          <button
            onClick={() => handleModalOpen(client)}
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          >
            {client.firstname} {client.lastName} - Ver más
          </button>
        );
      },
    },
    { field: "executive", headerName: "Ejecutivo", width: 150 },
    { field: "followup_description", headerName: "Descripción", width: 300 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={followups || []}
        columns={columns}
        getRowId={(row) => row.id}
      />
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="client-info-modal"
        aria-describedby="client-info-description"
      >
        <Box sx={{ m: 4, p: 4, bgcolor: "background.paper", borderRadius: 1 }}>
          {selectedClient && (
            <div>
              <strong>Información del Cliente</strong>
              <hr className="mt-4 mb-4"/>
              <p>
                <strong>Nombre:</strong> {selectedClient.firstname}{" "}
                {selectedClient.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedClient.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {selectedClient.phoneNumber}
              </p>
              <hr className="mt-4 mb-4"/>
              <Button onClick={handleModalClose} variant="contained">
                Cerrar
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default OpportunityFollowupsTable;
