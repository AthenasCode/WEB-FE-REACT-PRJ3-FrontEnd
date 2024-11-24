import { fetcher } from "./api";

export const getDashboardData = async () => {
    try {
      const response = await fetcher(`/dashboard`, {
        method: "GET",
      });
      return response;
    } catch (error) {
      console.error("Error al obtener datos del dashboard:", error);
      throw new Error("Error al obtener los datos del dashboard");
    }
};