import { OpportunityType } from "../hooks/useCreateOpportunity";
import { fetcher } from "./api";

export const addopp = async (opportunity: OpportunityType) => {
  try {
    const response = await fetcher("/opportunities", {
      method: "POST",
      body: JSON.stringify(opportunity),
    });

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear la oportunidad");
  }
};

export const getOpp = async () => {
    const response = await fetcher("/opportunities");
    console.log("Datos obtenidos en getOpp:", response); // Verifica que los datos existan aquí
    return response;
  };
  