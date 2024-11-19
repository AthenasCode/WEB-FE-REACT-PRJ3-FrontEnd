import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFollow } from "../services/followServices";
import {FollowType} from "./useCreateFollow"

export const useUpdateFollow = () => {
  const queryFollow = useQueryClient();
  return useMutation({
    mutationFn: (follow: FollowType) => updateFollow(follow),
    onSuccess: () => {
      queryFollow.invalidateQueries({ queryKey: ["follow"] });
    },
  });
};
