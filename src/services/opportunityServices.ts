
import { fetcher } from "./api";

export const getOpportByClientId = async (client_id: number) => {
  try {
    const response = await fetcher(`/opportunities?client_id=${client_id}`, {
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error al obtener las oportunidades del cliente:", error);
    throw new Error("Error al obtener los datos del cliente");
  }
};
export const getOpportunityFollowups = async (opportunity_id: number) => {
  try {
    const response = await fetcher(`/followups?opportunity_id=${opportunity_id}`, {
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error al obtener las oportunidades del cliente:", error);
    throw new Error("Error al obtener los datos del cliente");
  }  
}