import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOpportunity } from "../services/opportunityServices";
export type OpportunityType = {
  id: number;
  client_id: number;
  business_name: string;
  business_line: string;
  opportunity_description: string;
  estimated_value: number;
  estimated_date: string; // Si deseas manejar esto como Date, puedes convertirlo después
  status: string;
};

export const useCreateOpportunity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (opportunity: OpportunityType) => addOpportunity(opportunity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["oppo"] });
    },
  });
};
