import { loginFormSchema } from "@/types/auth";
import { listJobSchema } from "@/types/list-job";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
export const useListJob = (userId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof listJobSchema>) => {
      const response = await axios.post(`/api/list/${userId}`, values);
      if (!response.data) {
        throw new Error("Something went wrong!");
      }
      return response?.data;
    },
    onSuccess: ({ data }) => {
      toast.success("Job Posted Successfully!");
      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: () => {
      console.error("Failed");
      toast.error("Something went wrong!");
    },
  });

  return mutation;
};
