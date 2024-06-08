import { useQuery } from "@tanstack/react-query"
import { fetchFee, fetchFees } from "../services/apis"

  export function useFees(payload) {

    return useQuery({
      queryKey: ['fees','filter',payload],
      queryFn: ()=>fetchFees(payload),
      staleTime:1000*60,
      enabled:!!payload
    })
  }
  export function useFee(id) {
    return useQuery({
      queryKey: ['fees',id],
      queryFn: ()=>fetchFee(id),
    })
  }
  export function useFeesBySessionNClass(payload) {
    return useQuery({
      queryKey: ['fees',payload],
      queryFn: ()=>fetchFeesBySessionNClass(payload),
    })
  }
