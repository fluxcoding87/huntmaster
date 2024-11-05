import { CompleteProfile } from "@/types/profile";
import { Profile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetProfile() {
  const query = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axios.get<CompleteProfile>("/api/profile");
      if (!response.data) {
        return null;
      }
      const { data } = response;
      return data;
    },
  });
  return query;
}
