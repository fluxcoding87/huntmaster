import { Job } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetJobs() {
  const query = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await axios.get<Job[]>("/api/jobs");
      if (!response.data) {
        return null;
      }
      const { data } = response;
      return data;
    },
  });
  return query;
}
