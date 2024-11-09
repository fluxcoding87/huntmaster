import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const usePostApplicant = (jobId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/api/jobs/${jobId}/apply`);
      if (!response.data) {
        throw new Error("Something went wrong!");
      }
      return response?.data;
    },
    onSuccess: ({ data }) => {
      toast.success("Applied Successfully!");
      queryClient.invalidateQueries({ queryKey: ["applicant", jobId] });
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
    },
    onError: () => {
      console.error("Failed");
      toast.error("Something went wrong!");
    },
  });

  return mutation;
};
