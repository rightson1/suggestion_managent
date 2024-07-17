import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IForm,
  IFormFetched,
  IFormUser,
  IResponse,
  IResponseFetched,
} from "../types/data_types";
import axios from "axios";
import { eCheck } from "../utils";

export const useCreateForm = () => {
  return useMutation({
    mutationFn: async (data: IForm) => {
      return await axios.post("/api/forms", data).then(eCheck);
    },
  });
};

export const useGetForms = () => {
  return useQuery<IFormFetched[]>({
    queryKey: ["forms"],
    queryFn: async () => {
      return await axios.get("/api/forms").then(eCheck);
    },
  });
};

export const useGetUserForms = (userId?: string) => {
  return useQuery<IFormUser[]>({
    queryKey: ["forms", userId],
    queryFn: async () => {
      return await axios.get(`/api/forms/users?_id=${userId}`).then(eCheck);
    },
    enabled: !!userId,
  });
};
export const useGetForm = (formId?: string) => {
  return useQuery<IFormFetched>({
    queryKey: ["form", formId],
    queryFn: async () => {
      return await axios.get(`/api/forms?form_id=${formId}`).then(eCheck);
    },
    enabled: !!formId,
  });
};
export const useCreateResponse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IResponse) => {
      return await axios.post("/api/responses", data).then(eCheck);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
    },
  });
};

export const useGetResponsesAdmin = ({
  form_id,
  user_id,
}: {
  form_id: string;
  user_id?: string;
}) => {
  return useQuery<IResponseFetched[]>({
    queryKey: ["responses", form_id, user_id],
    queryFn: async () => {
      return await axios
        .get(`/api/responses/admin?form_id=${form_id}`, {
          params: {
            form_id,
            user_id,
          },
        })
        .then(eCheck);
    },
  });
};

//edit
export const useUpdateForm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<IFormFetched>) => {
      return await axios.put("/api/forms", data).then(eCheck);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
    },
  });
};
