import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetOpportunityById } from "../hooks/useGetOpportunityById";
import { Main } from "../layout/Main";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetOppFollowups } from "../hooks/useGetOppFollowups";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useUpdateFollow } from "../hooks/useUpdateFollow"; 
import { useCreateFollow } from "../hooks/useCreateFollow";
import { useDeleteFollow } from "../hooks/useDeleteFollow.ts";
import { useGetClientById } from "../hooks/useGetClientById";

const OppDetail = () => {
  const { id } = useParams<{ id: string }>();
  const opportunity_id = id ? parseInt(id, 10) : null;

  const { mutate: updateFollow } = useUpdateFollow();
  const { mutate: createFollow } = useCreateFollow();
  const { mutate: deleteFollow } = useDeleteFollow();

  if (!opportunity_id) {
    return <div>Error: ID de oportunidad inválido</div>;
  }

  const {
    data: opportunity,
    isLoading: isOpportunityLoading,
    isError: isOpportunityError,
  } = useGetOpportunityById(opportunity_id || 0);

  const {
    data: followups,
    isLoading: isFollowupsLoading,
    isError: isFollowupsError,
    refetch,
  } = useGetOppFollowups(opportunity_id || 0);

  // Asegurarse de que 'opportunity' esté definido antes de usarlo
  const client_id = opportunity?.client_id;

  const { data: client } = useGetClientById(client_id || 0);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpen2, setDialogOpen2] = useState(false);
  const [selectedFollowup, setSelectedFollowup] = useState<any>(null);
  const [createdFollowup, setcreatedFollowup] = useState<any>({
    opportunity_id: opportunity_id,
    contact_type: "",
    contact_date: "",
    client_contact:[], 
    executive:"",
    followup_description: ""
  });

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    followupToDelete: number | null;
  }>({
    open: false,
    followupToDelete: null,
  });

  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  if (isOpportunityLoading || isFollowupsLoading) return <div>Loading...</div>;
  if (isOpportunityError) return <div>Error fetching opportunity details</div>;
  if (isFollowupsError) return <div>Error fetching followups</div>;

  const handleOpenDialog = (followup: any) => {
    setSelectedFollowup(followup);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedFollowup(null);
    setFormError(null);
  };

  const handleOpenDialog2 = () => {
    setDialogOpen2(true);
  };

  const handleCloseDialog2 = () => {
    setDialogOpen2(false);
    setFormError(null);
  };

  const handleOpenDeleteDialog = (followupId: number) => {
    setDeleteDialog({ open: true, followupToDelete: followupId });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({ open: false, followupToDelete: null });
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.followupToDelete !== null) {
      deleteFollow(deleteDialog.followupToDelete, {
        onSuccess: () => {
          refetch(); // Refresca la tabla de seguimientos
          handleCloseDeleteDialog(); // Cierra el diálogo
        },
        onError: (error: any) => {
          console.error("Error al eliminar el seguimiento:", error);
          setFormError(
            error.response?.data?.message ||
            "Error al eliminar el seguimiento. Por favor, inténtelo nuevamente."
          );
        },
      });
    }
  };

  const handleSaveChanges = () => {
    updateFollow(selectedFollowup, {
      onSuccess: () => {
        refetch();
        handleCloseDialog();
      },
      onError: (error: any) => {
        console.error("Error al actualizar el seguimiento:", error);
        setFormError(
          error.response?.data?.message || 
          "Error al actualizar el seguimiento. Por favor, inténtelo nuevamente."
        );
      },
    });
  };

  const handleSaveChanges2 = () => {
    console.log(createdFollowup)
    createFollow(createdFollowup, {
      onSuccess: () => {
        refetch();
        handleCloseDialog2();
      },
      onError: (error: any) => {
        console.error("Error al actualizar el seguimiento:", error);
        setFormError(
          error.response?.data?.message ||
          "Error al actualizar el seguimiento. Por favor, inténtelo nuevamente."
        );
      },
    });
  };

  const handleInputChange = (field: keyof any, value: any) => {
    setSelectedFollowup((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputChange2 = (field: keyof any, value: any) => {
    setcreatedFollowup((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

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
        const contact = params.value;

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
      renderCell: (params) => (
        <div className="flex gap-2 mt-3">
          <button
            style={{
              height: "30px",
              width: "110px",
              color: "white",
              cursor: "pointer",
            }}
            className="bg-blue-400 rounded flex items-center justify-center transition-all duration-200 hover:opacity-90"
            onClick={() => handleOpenDialog(params.row)}
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
            onClick={() => handleOpenDeleteDialog(params.row.id)}
          >
            Eliminar
          </button>
        </div>
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
            <h2
              style={{ color: "bg-blue-900" }}
              className="text-blue-900 text-2xl font-bold mt-5"
            >
              Actividades de Seguimiento
            </h2>
            <button
              type="button"
              onClick={handleOpenDialog2}
              className="mt-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-bold"
            >
              + Añadir seguimiento
            </button>
            {followups && followups.length > 0 ? (
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={followups || []}
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



      {/* Cuadro de diálogo */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Actualizar Actividad de Seguimiento</DialogTitle>
        <DialogContent>
          {formError && <div className="text-red-500 mb-3">{formError}</div>}
          {selectedFollowup && (
            <>
              <div className="mb-3">
              <label htmlFor="client-contact" className="block text-sm font-medium text-gray-700">
                Contacto del Cliente
              </label>
              <select
                id="client-contact"
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={selectedFollowup.client_contact?.email || ""}
                onChange={(e) => {
                  const contactos = client?.contacts
                  const selectedContact = (contactos || []).find(
                    (contact) => contact.email === e.target.value
                  );
                  handleInputChange("client_contact", selectedContact || {});
                }}
              >
                <option value="">Selecciona un contacto</option>
                {(client?.contacts || []).map((contact) => (
                  <option key={contact.email} value={contact.email}>
                    {contact.firstname} {contact.lastName} - {contact.email}
                  </option>
                ))}
              </select>
            </div>
              <TextField
                label="Fecha"
                type="date"
                fullWidth
                value={selectedFollowup.contact_date || ""}
                onChange={(e) => handleInputChange("contact_date", e.target.value)}
                margin="normal"
              />
              <div className="mb-3">
                <label htmlFor="contact-type" className="block text-sm font-medium text-gray-700">
                  Tipo de Contacto
                </label>
                <select
                  id="contact-type"
                  className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={selectedFollowup.contact_type || ""}
                  onChange={(e) => handleInputChange("contact_type", e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="llamada">Llamada</option>
                  <option value="correo">Correo</option>
                  <option value="reunión presencial">Reunión Presencial</option>
                </select>
              </div>
              <TextField
                label="Descripción"
                fullWidth
                value={selectedFollowup.followup_description || ""}
                onChange={(e) => handleInputChange("followup_description", e.target.value)}
                margin="normal"
              />
              <TextField
                label="Ejecutivo"
                fullWidth
                value={selectedFollowup.executive || ""}
                onChange={(e) => handleInputChange("executive", e.target.value)}
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

          {/* Dialog de confirmación para eliminar */}
      <Dialog open={deleteDialog.open} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <div className="p-4">
            ¿Estás seguro que deseas eliminar esta actividad de seguimiento? Esta acción no se puede deshacer.
          </div>
          {formError && (
            <div className="text-red-500 px-4">
              {formError}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>  

      <Dialog open={isDialogOpen2} onClose={handleCloseDialog2}>
        <DialogTitle>Crear Actividad de Seguimiento</DialogTitle>
        <DialogContent>
          {formError && <div className="text-red-500 mb-3">{formError}</div>}
          { (
            <>
            <div className="mb-3">
              <label htmlFor="client-contact" className="block text-sm font-medium text-gray-700">
                Contacto del Cliente
              </label>
              <select
                id="client-contact"
                className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={createdFollowup.client_contact?.email || ""}
                onChange={(e) => {
                  const contactos = client?.contacts
                  const selectedContact = (contactos || []).find(
                    (contact) => contact.email === e.target.value
                  );
                  handleInputChange2("client_contact", selectedContact || {});
                }}
              >
                <option value="">Selecciona un contacto</option>
                {(client?.contacts || []).map((contact) => (
                  <option key={contact.email} value={contact.email}>
                    {contact.firstname} {contact.lastName} - {contact.email}
                  </option>
                ))}
              </select>
            </div>
              <TextField
                label="Fecha"
                type="date"
                fullWidth
                value={createdFollowup.contact_date || ""}
                onChange={(e) => handleInputChange2("contact_date", e.target.value)}
                margin="normal"
              />
              <div className="mb-3">
                <label htmlFor="contact-type" className="block text-sm font-medium text-gray-700">
                  Tipo de Contacto
                </label>
                <select
                  id="contact-type"
                  className="mt-1 border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={createdFollowup.contact_type || ""}
                  onChange={(e) => handleInputChange2("contact_type", e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="llamada">Llamada</option>
                  <option value="correo">Correo</option>
                  <option value="reunión presencial">Reunión Presencial</option>
                </select>
              </div>
              <TextField
                label="Descripción"
                fullWidth
                value={createdFollowup.followup_description || ""}
                onChange={(e) => handleInputChange2("followup_description", e.target.value)}
                margin="normal"
              />
              <TextField
                label="Ejecutivo"
                fullWidth
                value={createdFollowup.executive || ""}
                onChange={(e) => handleInputChange2("executive", e.target.value)}
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog2} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveChanges2} color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OppDetail;
