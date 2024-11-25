import { fetcher } from "./api";
import { FollowType } from "../hooks/useCreateFollow"

export const updateFollow = async (follow: FollowType) => {
  try {
    const response = await fetcher(`/followups/${follow.id}`, {
      method: "PUT",
      body: JSON.stringify(follow),
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar el followe");
  }
}

export const addFollow = async (follow: FollowType) => {
  try {
    const response = await fetcher("/followups", {
      method: "POST",
      body: JSON.stringify(follow),
    });

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear el seguimiento");
  }
};

export const deleteFollow = async (id: number) => {
  try {
    const response = await fetcher(`/followups/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error al eliminar el seguimiento");
  }
};