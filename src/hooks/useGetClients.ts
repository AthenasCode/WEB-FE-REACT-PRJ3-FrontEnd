import { useQuery } from "@tanstack/react-query";
import { getClients } from "../services/clientServices";

export const useGetClients = () => {
  return useQuery({
    queryKey: ["cars"],
    queryFn: () => getClients(),
  });
};
