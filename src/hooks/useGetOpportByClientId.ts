import { useQuery } from "@tanstack/react-query";
import { getOpportByClientId } from "../services/opportunityServices";
import { OpportunityType } from "./useCreateOpportunity";

export const useGetOpportByClientId = (client_id: number) => {
  return useQuery<OpportunityType>({
    queryKey: ["opportunity", client_id],
    queryFn: () => getOpportByClientId(client_id),
    enabled: !!client_id, 
  });
};