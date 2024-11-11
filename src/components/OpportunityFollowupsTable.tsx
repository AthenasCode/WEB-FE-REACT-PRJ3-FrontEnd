import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetOppFollowups } from "../hooks/useGetOppFollowups";

type ClientContact = {
  firstname: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};



type OpportunityFollowupsTableProps = {
  opportunity_id: number;
};

const OpportunityFollowupsTable: React.FC<OpportunityFollowupsTableProps> = ({ opportunity_id }) => {
  const { data: followups, isLoading, isError } = useGetOppFollowups(opportunity_id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching followups</div>;

  const columns: GridColDef[] = [
    { field: "contact_type", headerName: "Tipo de Contacto", width: 150 },
    { field: "contact_date", headerName: "Fecha de Contacto", width: 150 },
    { 
      field: "client_contact", 
      headerName: "Identificacion del cliente", 
      width: 200,
      valueGetter: (params: any) => {
        const contact = params;
        return contact ? `${contact.firstname} ${contact.lastName}` : "N/A";
      }
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
    </div>
  );
};

export default OpportunityFollowupsTable; 