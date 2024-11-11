import { useQuery } from "@tanstack/react-query";
import { getOpportunityFollowups } from "../services/opportunityServices";

export const useGetOppFollowups = (opportunity_id: number) => {
  return useQuery({
    queryKey: ["opportunityFollowups", opportunity_id],
    queryFn: () => getOpportunityFollowups(opportunity_id),
    enabled: !!opportunity_id,
  });
};