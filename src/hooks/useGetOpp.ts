import { useQuery } from "@tanstack/react-query";
import { getOpp } from "../services/oppService";

export const useGetOpp = () => {
    return useQuery({
      queryKey: ["opportunities"],
      queryFn: async () => {
        const data = await getOpp();
        console.log("Datos en useQuery:", data); // <-- Aquí
        return data;
      },
    });
  };
  