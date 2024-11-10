import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetOpp } from "../hooks/useGetOpp";

import { Main } from '../layout/Main';

type CarFormType = {
    client_id: number;
    business_name: string;
    business_line: string;
    opportunity_description: string;
    estimated_value: number;
    estimated_date:string;
    status: string;
    id: number;
};

const columns: GridColDef[] = [
  { field: "client_id", headerName: "Client Id", width: 80 },
  { field: "business_name", headerName: "Business Name", width: 220 },
  { field: "business_line", headerName: "Business Line", width: 120 },
  { field: "opportunity_description", headerName: "Opportunity Description", width: 400 },
  { field: "estimated_value", headerName: "Estimated Value", width: 130 },
  { field: "estimated_date", headerName: "Estimated Date", width: 130 },
  { field: "status", headerName: "Status", width: 90 },
  { field: "id", headerName: "Id", width: 70 },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => (
      <>
        <div className="flex gap-1 mt-2">
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
              Eliminar
          </button>
        </div>
      </>
    ),
  },
];

function Opport() {
  const { data: opportunities } = useGetOpp();
  console.log("Datos de oportunidades en Opport:", opportunities);
  return (
    <Main>
      <div className="inlineblock" style={{ padding: '10px 0', maxWidth: '2000px', margin: '0 auto' }}> {/* Ajusta el maxWidth */}
        <h1 className="text-center text-2xl text-blue-900 font-bold">Opportunities List</h1>
        <DataGrid
          columns={columns}
          rows={opportunities || []}
          autoHeight
          style={{ marginTop: '10px' }}
        />
      </div>
    </Main>
  );
}

export default Opport;
