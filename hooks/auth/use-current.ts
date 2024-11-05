import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCurrent() {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await axios.get<User>("/api/current");
      if (!response.data) {
        return null;
      }
      const { data } = response;
      return data;
    },
  });
  return query;
}
