import { useQuery } from "@tanstack/react-query";
import { getClientById } from "../services/clientServices";
import { ClientType } from "./useCreateClient";

export const useGetClientById = (id: number) => {
  return useQuery<ClientType>({
    queryKey: ["client", id],
    queryFn: () => getClientById(id),
    enabled: !!id, 
  });
};