import { addLanguageSchema } from "@/types/languages";
import { profileSchema } from "@/types/profile";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { toast } from "sonner";
import { z } from "zod";
export const useUpdateLang = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof addLanguageSchema>) => {
      const response = await axios.patch(`/api/profile/language/${id}`, {
        ...values,
      });
      if (!response.data) {
        throw new Error("Something went wrong!");
      }
      return response?.data;
    },
    onSuccess: () => {
      toast.success("Language Updated!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["languages"] });
    },
    onError: () => {
      console.error("Failed");
      toast.error("Something went wrong!");
    },
  });

  return mutation;
};
