import { useQuery } from "@tanstack/react-query";
import { getOpportunityFollowups } from "../services/opportunityServices";
import { Followup } from "../hooks/types";

export const useGetOppFollowups = (opportunity_id: number) => {
  return useQuery<Followup[]>({
    queryKey: ["opportunityFollowups", opportunity_id],
    queryFn: () => getOpportunityFollowups(opportunity_id),
    enabled: !!opportunity_id,
  });
};