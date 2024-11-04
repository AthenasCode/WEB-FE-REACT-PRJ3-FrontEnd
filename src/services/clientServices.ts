import { ClientType } from "../hooks/useCreateClient";
import { fetcher } from "./api.ts";

export const addClient = async (client: ClientType) => {
  try {
    const response = await fetcher("/clients", {
      method: "POST",
      body: JSON.stringify(client),
    });

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear el automovil");
  }
};

export const getCars = async () => {
  return fetcher("/clients");
};
