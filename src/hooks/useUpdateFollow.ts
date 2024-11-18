import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFollow } from "../services/followServices";

type ClientContact = {
  firstname: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type FollowType = {
  opportunity_id: number;
  contact_type: string;
  contact_date: string; 
  client_contact: ClientContact;
  executive: string;
  followup_description: string;
  id: number;
};
export const useUpdateFollow = () => {
  const queryFollow = useQueryClient();
  return useMutation({
    mutationFn: (follow: FollowType) => updateFollow(follow),
    onSuccess: () => {
      queryFollow.invalidateQueries({ queryKey: ["follow"] });
    },
  });
};
