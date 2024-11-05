import { loginFormSchema } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: z.infer<typeof loginFormSchema>) => {
      const callback = await signIn("credentials", { email, password });
      if (callback?.error) {
        throw new Error("Invalid Credentials");
      }
    },
    onSuccess: () => {
      toast.success("Logged In!");
    },
    onError: () => {
      console.error("Failed");
      toast.error("Something went wrong!");
    },
  });

  return mutation;
};
