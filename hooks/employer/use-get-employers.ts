import { Employer } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetEmployers() {
  const query = useQuery({
    queryKey: ["employers"],
    queryFn: async () => {
      const response = await axios.get<Employer[]>("/api/current/employer");
      if (!response.data) {
        return null;
      }
      const { data } = response;
      return data;
    },
  });
  return query;
}
