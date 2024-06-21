import { useQuery } from "@tanstack/react-query"
 import { fetchExpenseGroupById, fetchExpenseGroups } from "../services/apis"

 export function useExpenseGroup(id) {
    return useQuery({
      queryKey: ['expense_groups',{id}],
      queryFn: ()=>fetchExpenseGroupById(id),
      staleTime:Infinity
    })
  }
export function useExpenseGroups() {
    return useQuery({
      queryKey: ['expense_groups'],
      queryFn: fetchExpenseGroups,
      staleTime: Infinity // keep data fresh for this period (1 min.)
    })
  }
