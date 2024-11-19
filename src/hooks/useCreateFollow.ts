import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFollow } from "../services/followServices";

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
  id?: number;
};

export const useCreateFollow = () => {
  const queryFollow = useQueryClient();

  return useMutation({
    mutationFn: (follow: Omit<FollowType, 'id'>) => addFollow(follow),
    onSuccess: () => {
      queryFollow.invalidateQueries({ queryKey: ["follow"] });
    },
  });
};