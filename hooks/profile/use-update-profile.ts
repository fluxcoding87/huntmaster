import { loginFormSchema } from "@/types/auth";
import { listJobSchema } from "@/types/list-job";
import { profileSchema } from "@/types/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
export const useUpdateProfile = (profileId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({ resumeUrl }: { resumeUrl: string }) => {
      const response = await axios.patch(`/api/profile/${profileId}`, {
        resumeUrl,
      });
      if (!response.data) {
        throw new Error("Something went wrong!");
      }
      return response?.data;
    },
    onSuccess: ({ data }) => {
      toast.success("Profile Updated Successfully!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      console.error("Failed");
      toast.error("Something went wrong!");
    },
  });

  return mutation;
};
