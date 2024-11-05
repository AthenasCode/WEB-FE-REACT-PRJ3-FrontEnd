import { ClientType } from "../hooks/useCreateClient";
import { fetcher } from "./api";

export const addClient = async (client: ClientType) => {
  try {
    const response = await fetcher("/clients", {
      method: "POST",
      body: JSON.stringify(client),
    });

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear el cliente");
  }
};

export const getClients = async () => {
  return fetcher("/clients");
};

export const getClientById = async (id: number) => {
  try {
    const response = await fetcher(`/clients/${id}`, {
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los datos del cliente");
  }
};


export const updateClient = async (client: ClientType) => {
  try {
    const response = await fetcher(`/clients/${client.id}`, {
      method: "PUT",
      body: JSON.stringify(client),
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar el cliente");
  }
};