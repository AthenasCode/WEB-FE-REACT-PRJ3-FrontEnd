import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../services/dashboardServices";

export const useGetTotalValueByClient = () => {
    return useQuery({
      queryKey: ["opportunities"],
      queryFn: async () => {
        const data = await getDashboardData();
        console.log("Datos en useQuery:", data); // <-- Aquí
        return data;
      },
    });
  };