import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface UpdateProfileFunctionProps {
  resumeUrl?: string;
  phoneNumber?: string;
  gender?: string;
  location?: string;
  birthday?: string;
  experienceYears?: string;
  role?: string;
  skills?: string[];
  description?: string;
}

export const useUpdateProfile = (profileId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: UpdateProfileFunctionProps) => {
      const response = await axios.patch(`/api/profile/${profileId}`, values);
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
