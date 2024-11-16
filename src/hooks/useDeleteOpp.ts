import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOpportunity } from "../services/opportunityServices";

export const useDeleteOpportunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteOpportunity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["oppo"] }); // Refresca la lista de oportunidades
    },
    onError: (error) => {
      console.error("Error al eliminar la oportunidad:", error);
      alert("No se pudo eliminar la oportunidad. Por favor, intente nuevamente.");
    },
  });
};