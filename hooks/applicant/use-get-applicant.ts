import { CompleteProfile } from "@/types/profile";
import { Applicant } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetApplicant(jobId: string) {
  const query = useQuery({
    queryKey: ["applicant", jobId],
    queryFn: async () => {
      const response = await axios.get<Applicant>(`/api/jobs/${jobId}/apply`);
      if (!response.data) {
        return null;
      }
      const { data } = response;
      return data;
    },
  });
  return query;
}
