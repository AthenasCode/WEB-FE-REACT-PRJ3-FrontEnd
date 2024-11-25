import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFollow } from "../services/followServices";

export const useDeleteFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteFollow(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["follows"] }); // Refresca la lista de follows
    },
    onError: (error) => {
      console.error("Error al eliminar el seguimiento:", error);
      alert("No se pudo eliminar el seguimiento. Por favor, intente nuevamente.");
    },
  });
};