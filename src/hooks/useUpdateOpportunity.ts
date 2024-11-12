import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOpportunity } from "../services/opportunityServices";
import { OpportunityType } from "./useCreateOpportunity";

export const useUpdateOpportunity = () => {
  const queryOpportunity = useQueryClient();
  return useMutation({
    mutationFn: (opportunity: OpportunityType) => updateOpportunity(opportunity),
    onSuccess: () => {
      queryOpportunity.invalidateQueries({ queryKey: ["opportunity"] });
    },
  });
};
