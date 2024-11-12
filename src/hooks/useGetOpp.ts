import { useQuery } from "@tanstack/react-query";
import { getOpps } from "../services/opportunityServices";

export const useGetOpp = () => {
    return useQuery({
      queryKey: ["opportunities"],
      queryFn: async () => {
        const data = await getOpps();
        console.log("Datos en useQuery:", data); // <-- Aquí
        return data;
      },
    });
  };
  