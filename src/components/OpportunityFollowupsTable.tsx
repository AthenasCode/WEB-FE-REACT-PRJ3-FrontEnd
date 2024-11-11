import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getOpportunityFollowups } from "../services/opportunityServices";

type ClientContact = {
  firstname: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

type FollowupType = {
  opportunity_id: number;
  contact_type: string;
  contact_date: string;
  client_contact: ClientContact;
  executive: string;
  followup_description: string;
  id: number;
};

type OpportunityFollowupsTableProps = {
  opportunity_id: number;
};

const OpportunityFollowupsTable: React.FC<OpportunityFollowupsTableProps> = ({ opportunity_id }) => {
  const [followups, setFollowups] = useState<FollowupType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFollowups = async () => {
      try {
        const data = await getOpportunityFollowups(opportunity_id);
        setFollowups(data);
      } catch (err) {
        setError("Error fetching followups");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowups();
  }, [opportunity_id]);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={followups}
        columns={columns}
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default OpportunityFollowupsTable; 