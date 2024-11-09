import { FullApplicant } from "@/types/applicants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetApplicants() {
  const query = useQuery({
    queryKey: ["applicants"],
    queryFn: async () => {
      const response = await axios.get<FullApplicant[]>(`/api/applicants`);
      if (!response.data) {
        return null;
      }
      const { data } = response;
      return data;
    },
  });
  return query;
}
