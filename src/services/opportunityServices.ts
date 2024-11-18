import { OpportunityType } from "../hooks/useCreateOpportunity";
import { Followup } from "../hooks/types";
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
export const getOpportunityFollowups = async (opportunity_id: number): Promise<Followup[]> => {
  try {
    const response = await fetcher(`/followups?opportunity_id=${opportunity_id}`, {
      method: "GET",
    });
    return response; 
  } catch (error) {
    console.error("Error al obtener los seguimientos:", error);
    throw new Error("Error al obtener los seguimientos");
  }
};

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

export const deleteOpportunity = async (opportunity_id: number) => {
  try {
    console.log("Intentando obtener seguimientos para la oportunidad:", opportunity_id);

    // Obtén los seguimientos relacionados con la oportunidad
    const followups = await fetcher(`/followups?opportunity_id=${opportunity_id}`, {
      method: "GET",
    });

    console.log("Seguimientos obtenidos:", followups);

    // Elimina cada seguimiento individualmente (si hay alguno)
    for (const followup of followups) {
      const followupId = followup.id; // Obtén el ID del seguimiento
      console.log(`Eliminando seguimiento con ID: ${followupId}`);
      await fetcher(`/followups/${followupId}`, {
        method: "DELETE",
      });
    }

    console.log("Intentando eliminar la oportunidad:", opportunity_id);

    // Elimina la oportunidad
    const opportunityResponse = await fetcher(`/opportunities/${opportunity_id}`, {
      method: "DELETE",
    });

    console.log("Oportunidad eliminada:", opportunityResponse);

    return {
      followupResponse: "Seguimientos eliminados correctamente",
      opportunityResponse,
    };
  } catch (error: any) {
    console.error("Error en deleteOpportunity:", error.message);
    throw new Error(error.message || "Error al eliminar la oportunidad");
  }
};