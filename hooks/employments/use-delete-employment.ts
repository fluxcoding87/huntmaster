import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
export const useDeleteEmployment = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({}: { userId?: string }) => {
      const response = await axios.delete(`/api/profile/employment/${id}`);
      if (!response.data) {
        throw new Error("Something went wrong!");
      }
      return response?.data;
    },
    onSuccess: ({ data }) => {
      toast.success("Employment Details Deleted!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["employments"] });
    },
    onError: () => {
      console.error("Failed");
      toast.error("Something went wrong!");
    },
  });

  return mutation;
};
