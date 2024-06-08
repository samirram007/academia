import { useQuery } from "@tanstack/react-query";
import { fetchMonthService } from "../services/apis";

export function useMonths() {

    return useQuery({
        queryKey: ['months'],
        queryFn: fetchMonthService,
        staleTime: Infinity,
    })
}