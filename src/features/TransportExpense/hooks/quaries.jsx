import { useQuery } from "@tanstack/react-query"
import { fetchTransportExpense, fetchTransportExpenses } from "../services/apis"

  export function useTransportExpenses(payload) {

    return useQuery({
      queryKey: ['transport_expenses','filter',payload],
      queryFn: ()=>fetchTransportExpenses(payload),
      staleTime:1000*60,
      enabled:!!payload
    })
  }
  export function useTransportExpense(id) {
    return useQuery({
      queryKey: ['transport_expenses',id],
      queryFn: ()=>fetchTransportExpense(id),
    })
  }
  export function useTransportExpensesBySessionNClass(payload) {
    return useQuery({
      queryKey: ['transport_expenses',payload],
      queryFn: ()=>fetchTransportExpensesBySessionNClass(payload),
    })
  }
