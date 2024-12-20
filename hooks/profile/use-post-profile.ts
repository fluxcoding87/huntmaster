import { profileSchema } from "@/types/profile";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { toast } from "sonner";
import { z } from "zod";
export const usePostProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof profileSchema>) => {
      const response = await axios.post(`/api/profile`, values);
      if (!response.data) {
        throw new Error("Something went wrong!");
      }
      return response?.data;
    },
    onSuccess: () => {
      toast.success("Profile Created!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      console.error("Failed");
      toast.error("Something went wrong!");
    },
  });

  return mutation;
};
