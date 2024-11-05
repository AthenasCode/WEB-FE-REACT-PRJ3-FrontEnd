import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClient } from "../services/clientServices";
import { ClientType } from "./useCreateClient";

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (client: ClientType) => updateClient(client),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client"] });
    },
  });
};
