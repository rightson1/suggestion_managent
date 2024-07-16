import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IDepartment, IDepartmentBasic } from "../types/data_types";
import { eCheck } from "../utils";

export const useGetDepartments = (id?: string) => {
  const query = id ? `?id=${id}` : "";
  return useQuery<IDepartment[]>({
    queryKey: ["departments"],
    queryFn: async () => {
      return await axios
        .get("/api/departments", {
          params: {
            query,
          },
        })
        .then(eCheck);
    },
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["departments"],
    mutationFn: async (data: IDepartmentBasic) => {
      return await axios.post("/api/departments", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },
  });
};
export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["departments"],
    mutationFn: async (data: IDepartment) => {
      return await axios.put("/api/departments", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },
  });
};
