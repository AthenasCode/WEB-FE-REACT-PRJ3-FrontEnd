import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetOpp } from "../hooks/useGetOpp";
import { useDeleteOpportunity } from "../hooks/useDeleteOpp";
import { Main } from "../layout/Main";
import { useNavigate } from "react-router-dom";

function Opport() {
  const { data: opportunities, refetch } = useGetOpp(); // Refetch para actualizar datos
  const { mutateAsync: deleteOpportunity } = useDeleteOpportunity(); // Cambiamos a `mutateAsync` para usar `await`
  const navigate = useNavigate();

  const handleCreateOpportunity = () => {
    navigate("/AddOpportunity");
  };

  const handleUpdateOpportunity = (id: number) => {
    navigate(`/edit-opportunity/${id}`);
  };

  const handleDeleteOpportunity = async (id: number) => {
    const isConfirmed = window.confirm("¿Está seguro de que desea eliminar esta oportunidad?");
    if (isConfirmed) {
      try {
        await deleteOpportunity(id); // Eliminación de la oportunidad
        await refetch(); // Actualiza los datos tras la eliminación
        console.log("Oportunidad eliminada y datos actualizados");
      } catch (error) {
        console.error("Error al eliminar la oportunidad:", error);
      }
    }
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
        <div className="flex gap-1 mt-2">
          <button
            style={{ height: "30px", width: "70px" }}
            className="bg-blue-400 text-black rounded flex items-center justify-center"
            onClick={() => handleUpdateOpportunity(params.row.id)}
          >
            Actualizar
          </button>
          <button
            style={{ height: "30px", width: "110px" }}
            className="bg-red-400 text-black rounded flex items-center justify-center"
            onClick={() => handleDeleteOpportunity(params.row.id)}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <Main>
      <div
        className="inlineblock"
        style={{ padding: "10px 0", maxWidth: "2000px", margin: "0 auto" }}
      >
        <h1 className="text-center text-2xl text-blue-900 font-bold">Lista de oportunidades</h1>
        <button
          onClick={handleCreateOpportunity}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-6"
        >
          Crear Oportunidad
        </button>
        <DataGrid
          columns={columns}
          rows={opportunities || []}
          autoHeight
          style={{ marginTop: "10px" }}
        />
      </div>
    </Main>
  );
}

export default Opport;
