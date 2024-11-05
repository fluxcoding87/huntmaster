import { registerFormSchema } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: z.infer<typeof registerFormSchema>) => {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      if (!response.data) {
        throw new Error("Something went wrong");
      }
      return response?.data;
    },
    onSuccess: () => {
      router.push("/sign-in");
      toast.success("Registered Successfully!");
      // queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: () => {
      console.error("Failed");
      toast.error("Something went wrong!");
    },
  });

  return mutation;
};
