import { OpportunityType } from "../hooks/useCreateOpportunity";

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

export const updateOpportunity = async (opportunity: OpportunityType) => {
  try {
    const response = await fetcher(`/opportunities/${opportunity.id}`, {
      method: "PUT",
      body: JSON.stringify(opportunity),
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar el opportunitye");
  }
};

export const addOpportunity = async (opportunity: OpportunityType) => {
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

export const getOpportunityById = async (id: number) => {
  try {
    const response = await fetcher(`/opportunities/${id}`, {
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los datos del opportunitye");
  }
};

export const getOpps = async () => {
  const response = await fetcher("/opportunities");
  console.log("Datos obtenidos en getOpp:", response); // Verifica que los datos existan aquí
  return response;
};
