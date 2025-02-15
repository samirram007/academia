import { useQuery } from "@tanstack/react-query"
import { fetchExpense, fetchExpenses } from "../services/apis"

  export function useExpenses(payload) {

    return useQuery({
      queryKey: ['expenses','filter',payload],
      queryFn: ()=>fetchExpenses(payload),
      staleTime:1000*60,
      enabled:!!payload
    })
  }
  export function useExpense(id) {
    return useQuery({
      queryKey: ['expenses',id],
      queryFn: ()=>fetchExpense(id),
    })
  }

