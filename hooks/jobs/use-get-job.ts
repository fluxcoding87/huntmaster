import { Job } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetJob(jobId: string) {
  const query = useQuery({
    queryKey: ["jobs", jobId],
    queryFn: async () => {
      const response = await axios.get<Job>(`/api/jobs/${jobId}`);
      if (!response.data) {
        return null;
      }
      const { data } = response;
      return data;
    },
  });
  return query;
}
