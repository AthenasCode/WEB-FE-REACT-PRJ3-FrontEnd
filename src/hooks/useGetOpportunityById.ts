import { useQuery } from "@tanstack/react-query";
import { getOpportunityById } from "../services/opportunityServices";
import { OpportunityType } from "./useCreateOpportunity";

export const useGetOpportunityById = (id: number) => {
  return useQuery<OpportunityType>({
    queryKey: ["opportunity", id],
    queryFn: () => getOpportunityById(id),
    enabled: !!id, 
  });
};