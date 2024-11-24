import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetOpp } from "../hooks/useGetOpp";
import { useDeleteOpportunity } from "../hooks/useDeleteOpp";
import { Main } from "../layout/Main";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar, Alert, AlertColor, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

function Opport() {
  const { data: opportunities, refetch } = useGetOpp();
  const { mutateAsync: deleteOpportunity } = useDeleteOpportunity();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const [dialog, setDialog] = useState<{
    open: boolean;
    idToDelete: number | null;
  }>({
    open: false,
    idToDelete: null,
  });

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });
  const handleOpenDialog = (id: number) => setDialog({ open: true, idToDelete: id });
  const handleCloseDialog = () => setDialog({ open: false, idToDelete: null });

  const handleCreateOpportunity = () => {
    navigate("/AddOpportunity");
  };

  const handleUpdateOpportunity = (id: number) => {
    navigate(`/edit-opportunity/${id}`);
  };

  const handleConfirmDelete = async () => {
    if (dialog.idToDelete !== null) {
      try {
        await deleteOpportunity(dialog.idToDelete);
        await refetch();
        setSnackbar({
          open: true,
          message: "Oportunidad eliminada con éxito.",
          severity: "success",
        });
      } catch (error) {
        console.error("Error al eliminar la oportunidad:", error);
        setSnackbar({
          open: true,
          message: "Error al eliminar la oportunidad. Intente nuevamente.",
          severity: "error",
        });
      } finally {
        handleCloseDialog();
      }
    }
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
    { field: "business_line", headerName: "Business Line", width: 120 },
    { field: "opportunity_description", headerName: "Opportunity Description", width: 280 },
    { field: "estimated_value", headerName: "Estimated Value", width: 130 },
    { field: "estimated_date", headerName: "Estimated Date", width: 130 },
    { field: "status", headerName: "Status", width: 90 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="flex gap-1 mt-2">
          <button
            style={{ height: "30px", width: "70px", color: "white" }}
            className="bg-blue-400 rounded flex items-center justify-center"
            onClick={() => handleUpdateOpportunity(params.row.id)}
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
            onClick={() => handleOpenDialog(params.row.id)} // Abre el diálogo
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-bold"
        >
          + Crear Oportunidad
        </button>
        <DataGrid
          columns={columns}
          rows={opportunities || []}
          className="mt-10 p-6 bg-white rounded-lg shadow-md"
        />
      </div>

      {/* Snackbar para mensajes */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Dialogo de confirmación */}
      <Dialog open={dialog.open} onClose={handleCloseDialog}>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea eliminar esta oportunidad? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Main>
  );
}

export default Opport;
