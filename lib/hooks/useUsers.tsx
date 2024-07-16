import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUser, IUserBasic } from "../types/data_types";
import axios from "axios";
import { eCheck } from "../utils";
export const useCreateNewUser = () => {
  return useMutation({
    mutationKey: ["New User"],
    mutationFn: async (newUser: IUserBasic) => {
      return await axios.post("/api/users", newUser);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["Update User"],
    mutationFn: async (updatedUser: Partial<IUser>) => {
      return await axios.put("/api/users", updatedUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Users"],
      });
    },
  });
};
export const useGetUsers = () => {
  return useQuery<IUser[]>({
    queryKey: ["Users"],
    queryFn: async () => {
      return await axios.get("/api/users/list").then(eCheck);
    },
  });
};
