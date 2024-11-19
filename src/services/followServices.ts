import { fetcher } from "./api";
import {FollowType} from "../hooks/useUpdateFollow"
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
  export const createFollow = async (follow: Omit<FollowType, 'id'>) => {
    const { data } = await api.post("/followups", follow);
    return data;
  };