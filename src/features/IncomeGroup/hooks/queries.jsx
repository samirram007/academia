import { useQuery } from "@tanstack/react-query"
 import { fetchIncomeGroupById, fetchIncomeGroups } from "../services/apis"

 export function useIncomeGroup(id) {
    return useQuery({
      queryKey: ['income_groups',{id}],
      queryFn: ()=>fetchIncomeGroupById(id),
      staleTime:Infinity
    })
  }
export function useIncomeGroups() {
    return useQuery({
      queryKey: ['income_groups'],
      queryFn: fetchIncomeGroups,
      staleTime: Infinity // keep data fresh for this period (1 min.)
    })
  }
