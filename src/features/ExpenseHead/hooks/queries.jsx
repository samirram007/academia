import { useQuery } from "@tanstack/react-query"
 import { fetchExpenseHeadById, fetchExpenseHeads } from "../services/apis"

 export function useExpenseHead(id) {
    return useQuery({
      queryKey: ['expense_heads',{id}],
      queryFn: ()=>fetchExpenseHeadById(id),
      staleTime:Infinity
    })
  }
export function useExpenseHeads() {
    return useQuery({
      queryKey: ['expense_heads'],
      queryFn: fetchExpenseHeads,
      staleTime: Infinity // keep data fresh for this period (1 min.)
    })
  }
