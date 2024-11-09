import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { toast } from "sonner";
export const useUpdateEmployer = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ is_Allowed }: { is_Allowed: boolean }) => {
      const response = await axios.patch(`/api/current/employer/${id}`, {
        is_Allowed,
      });
      if (!response.data) {
        throw new Error("Something went wrong!");
      }
      return response?.data;
    },
    onSuccess: ({ data }) => {
      toast.success("Employer Updated!");
      queryClient.invalidateQueries({ queryKey: ["employers"] });
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: () => {
      console.error("Failed");
      toast.error("Something went wrong!");
    },
  });

  return mutation;
};
