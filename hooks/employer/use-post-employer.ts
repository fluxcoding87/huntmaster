import { addEmployerSchema } from "@/types/employer";
import { addEmploymentSchema } from "@/types/employments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";

export const usePostEmployer = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof addEmployerSchema>) => {
      const response = await axios.post(`/api/current/employer`, {
        ...values,
      });
      if (!response.data) {
        throw new Error("Something went wrong!");
      }
      return response?.data;
    },
    onSuccess: () => {
      toast.success("Your Enquiry has been sent successfully!");
      queryClient.invalidateQueries({ queryKey: ["current"] });
      queryClient.invalidateQueries({ queryKey: ["employers"] });
    },
    onError: () => {
      console.error("Failed");
      toast.error("Something went wrong!");
    },
  });

  return mutation;
};
