import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addClient } from "../services/clientServices";

export type ContactType = {
    firstname: string;
    lastName: string;
    email:string;
    phoneNumber:number;
};
export type ClientType = {
    id: number;
    nit: number;
    name: string;
    direction: string;
    city: string;
    country: string;
    email:string;
    active:boolean;
    contacts:ContactType[];
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (client: ClientType) => addClient(client),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client"] });
    },
  });
};
