import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../../services";

export function useAuthUser() {
    return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: Infinity
  })
}